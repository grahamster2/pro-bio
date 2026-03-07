'use server'

import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'

export async function completeOnboarding(formData: {
    business_name: string
    trade_category: string
    phone_number: string
}) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return { error: 'Not authenticated' }
        }

        const supabase = await createClient()

        const slug = formData.business_name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')

        // Use upsert instead of update since the auth trigger was removed
        const { error } = await supabase
            .from('profiles')
            .upsert({
                user_id: userId,
                business_name: formData.business_name,
                trade_category: formData.trade_category,
                phone_number: formData.phone_number,
                slug: slug,
            }, { onConflict: 'user_id' })

        if (error) {
            if (error.code === '23505') { // Unique violation for slug
                const { error: retryError } = await supabase.from('profiles').upsert({
                    user_id: userId,
                    business_name: formData.business_name,
                    trade_category: formData.trade_category,
                    phone_number: formData.phone_number,
                    slug: `${slug}-${Math.floor(Math.random() * 10000)}`,
                }, { onConflict: 'user_id' })

                if (retryError) return { error: retryError.message }
            } else {
                return { error: error.message }
            }
        }

        return { success: true }
    } catch (e: any) {
        console.error('Onboarding Error:', e)
        return { error: e.message || 'An unexpected error occurred' }
    }
}
