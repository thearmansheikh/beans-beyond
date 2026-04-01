import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey   = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const anonKey      = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Server-side admin client — bypasses RLS entirely.
 * Use ONLY in API routes / server actions. Never expose to the browser.
 */
export function createAdminClient() {
  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * Server-side anon client — respects RLS, same as browser client.
 * Use when you want RLS to apply server-side (e.g. reading public data).
 */
export function createServerAnonClient() {
  return createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
