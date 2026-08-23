import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Read-only client for pages (RLS restricts anon to SELECT). */
export function supabasePublic() {
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

/** Server-role client for the ingestion/enrichment route. Bypasses RLS. */
export function supabaseService() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
