"""
Pinterest auto-poster for Slow Morocco.

Picks the next pending row from `pinterest_queue` (ordered by queue_position),
posts it to Pinterest API v5, and writes the result back to Supabase.

Required env:
  SUPABASE_URL                    Supabase project URL
  SUPABASE_SERVICE_ROLE_KEY       Service-role key (server-side only)
  PINTEREST_ACCESS_TOKEN          Pinterest OAuth access token

Expected `pinterest_queue` columns (subset used here):
  id, queue_position, status, board_id, board_name,
  title, description, link, image_url, alt_text,
  pinned_at, pinterest_pin_id, error_message
"""

from __future__ import annotations

import logging
import os
import sys
from datetime import datetime, timezone
from typing import Any

import requests
from supabase import Client, create_client

PINTEREST_API_BASE = "https://api.pinterest.com/v5"
REQUEST_TIMEOUT = 30

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)
log = logging.getLogger("pinterest-auto-poster")


def env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        log.error("Missing required env var: %s", name)
        sys.exit(1)
    return value


def get_next_pending(supabase: Client) -> dict[str, Any] | None:
    res = (
        supabase.table("pinterest_queue")
        .select("*")
        .eq("status", "pending")
        .order("queue_position", desc=False)
        .limit(1)
        .execute()
    )
    rows = res.data or []
    return rows[0] if rows else None


def lookup_board_id(access_token: str, board_name: str) -> str | None:
    """Page through GET /v5/boards to find a board by case-insensitive name."""
    headers = {"Authorization": f"Bearer {access_token}"}
    bookmark: str | None = None
    target = board_name.strip().lower()

    while True:
        params: dict[str, Any] = {"page_size": 100}
        if bookmark:
            params["bookmark"] = bookmark
        resp = requests.get(
            f"{PINTEREST_API_BASE}/boards",
            headers=headers,
            params=params,
            timeout=REQUEST_TIMEOUT,
        )
        resp.raise_for_status()
        payload = resp.json()
        for board in payload.get("items", []):
            if board.get("name", "").strip().lower() == target:
                return board.get("id")
        bookmark = payload.get("bookmark")
        if not bookmark:
            return None


def create_pin(access_token: str, row: dict[str, Any], board_id: str) -> dict[str, Any]:
    body: dict[str, Any] = {
        "board_id": board_id,
        "media_source": {
            "source_type": "image_url",
            "url": row["image_url"],
        },
    }
    for src, dst in (("title", "title"), ("description", "description"),
                     ("link", "link"), ("alt_text", "alt_text")):
        if row.get(src):
            body[dst] = row[src]

    resp = requests.post(
        f"{PINTEREST_API_BASE}/pins",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        },
        json=body,
        timeout=REQUEST_TIMEOUT,
    )
    if resp.status_code >= 400:
        raise RuntimeError(
            f"Pinterest API {resp.status_code}: {resp.text[:500]}"
        )
    return resp.json()


def mark_posted(supabase: Client, row_id: Any, pin_id: str) -> None:
    supabase.table("pinterest_queue").update({
        "status": "posted",
        "pinned_at": datetime.now(timezone.utc).isoformat(),
        "pinterest_pin_id": pin_id,
        "error_message": None,
    }).eq("id", row_id).execute()


def mark_failed(supabase: Client, row_id: Any, error: str) -> None:
    supabase.table("pinterest_queue").update({
        "status": "failed",
        "error_message": error[:1000],
    }).eq("id", row_id).execute()


def main() -> int:
    supabase_url = env("SUPABASE_URL")
    supabase_key = env("SUPABASE_SERVICE_ROLE_KEY")
    access_token = env("PINTEREST_ACCESS_TOKEN")

    supabase: Client = create_client(supabase_url, supabase_key)

    row = get_next_pending(supabase)
    if not row:
        log.info("No pending rows in pinterest_queue. Nothing to do.")
        return 0

    row_id = row["id"]
    log.info("Processing queue row id=%s position=%s",
             row_id, row.get("queue_position"))

    try:
        if not row.get("image_url"):
            raise ValueError("Row is missing image_url")

        board_id = row.get("board_id")
        if not board_id:
            board_name = row.get("board_name")
            if not board_name:
                raise ValueError("Row has neither board_id nor board_name")
            log.info("Resolving board_id for board_name=%r", board_name)
            board_id = lookup_board_id(access_token, board_name)
            if not board_id:
                raise ValueError(f"No Pinterest board found named {board_name!r}")

        result = create_pin(access_token, row, board_id)
        pin_id = result.get("id")
        if not pin_id:
            raise RuntimeError(f"Pinterest response missing id: {result}")

        mark_posted(supabase, row_id, pin_id)
        log.info("Posted pin id=%s for queue row %s", pin_id, row_id)
        return 0

    except Exception as exc:
        log.exception("Failed to post queue row %s", row_id)
        try:
            mark_failed(supabase, row_id, str(exc))
        except Exception:
            log.exception("Also failed to mark row %s as failed", row_id)
        return 1


if __name__ == "__main__":
    sys.exit(main())
