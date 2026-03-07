'use server'

import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function markLeadAsContacted(leadId: string) {
    const { userId } = await auth()

    if (!userId) {
        throw new Error('Unauthorized')
    }

    const supabase = await createClient()

    // 1. Get user profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .single()

    if (!profile) {
        throw new Error('Profile not found')
    }

    // 2. Update lead (with RLS check, it has to match profile_id anyway)
    const { error } = await (supabase as any)
        .from('leads')
        .update({ status: 'contacted' })
        .eq('id', leadId)
        .eq('profile_id', profile.id)

    if (error) {
        console.error('Error marking lead as contacted:', error)
        throw new Error('Failed to update lead status')
    }

    revalidatePath('/dashboard/leads')
    return { success: true }
}
