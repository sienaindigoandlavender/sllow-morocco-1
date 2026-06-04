import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// GET /api/admin/debug — tells you which Supabase key is active
// DELETE this file after the issue is resolved
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const usingKey = service ? "SERVICE_ROLE_KEY ✓" : "ANON_KEY (service role missing — this is why delete fails)";

  // Try a test delete on a fake ID to see what error comes back
  const client = createClient(url!, service || anon!);
  const { error, count } = await client
    .from("quotes")
    .delete({ count: "exact" })
    .eq("client_id", "__test_nonexistent__");

  return NextResponse.json({
    supabase_url_set: !!url,
    anon_key_set: !!anon,
    service_role_key_set: !!service,
    active_key: usingKey,
    test_delete_error: error?.message || null,
    test_delete_count: count,
    verdict: service
      ? "Keys look correct. Check Supabase RLS policies on the quotes table."
      : "SUPABASE_SERVICE_ROLE_KEY is not set in Vercel. Add it under Settings → Environment Variables → Production.",
  });
}
