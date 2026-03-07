import { createBrowserClient } from '@supabase/ssr'
import { Database } from '../database.types'

export function createClient(clerkToken?: string | null) {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: clerkToken ? { Authorization: `Bearer ${clerkToken}` } : {},
      },
    }
  )
}
