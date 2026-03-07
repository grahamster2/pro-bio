import { createServerClient } from '@supabase/ssr'
import { auth } from '@clerk/nextjs/server'
import { Database } from '../database.types'

export async function createClient() {
    const { getToken } = await auth()
    const clerkToken = await getToken({ template: 'supabase' })

    const authHeaders: Record<string, string> = {}
    if (clerkToken) {
        authHeaders['Authorization'] = `Bearer ${clerkToken}`
    }

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return []
                },
                setAll() { },
            },
            global: {
                headers: authHeaders
            },
        }
    )
}
