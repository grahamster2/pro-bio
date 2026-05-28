import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Service-role Supabase client (full access, bypasses RLS). Server-only —
 * never import this into client/browser code. Used by the intake API route
 * to insert submissions and read private data.
 */
export function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
