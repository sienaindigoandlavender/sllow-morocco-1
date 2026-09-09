/* ═══════════════════════════════════════════════════════════════
   VISITED — what the reader has actually stood in front of.

   No account, no server, no login wall. It lives in localStorage,
   which means it is private by construction: the list never leaves
   the device and there is nothing to leak, sell or subpoena.

   The cost is that it does not follow a reader to another browser.
   That is the right trade for a publication. Asking someone to make
   an account before they can tick a box is how you lose them.
   ═══════════════════════════════════════════════════════════════ */

const KEY = "sm.visited.v1";

function read(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function write(set: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(Array.from(set)));
    window.dispatchEvent(new CustomEvent("sm:visited"));
  } catch {
    /* private browsing, quota, whatever. Failing silently is correct. */
  }
}

export function all(): string[] {
  return Array.from(read());
}

export function has(slug: string): boolean {
  return read().has(slug);
}

export function toggle(slug: string): boolean {
  const s = read();
  const now = !s.has(slug);
  if (now) s.add(slug);
  else s.delete(slug);
  write(s);
  return now;
}

export function count(): number {
  return read().size;
}

/** How many of a given set have been visited. For a destination tally. */
export function countIn(slugs: string[]): number {
  const s = read();
  return slugs.filter((x) => s.has(x)).length;
}

export function clear() {
  write(new Set());
}
