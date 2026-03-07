'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

export async function updateProfile(formData: {
    business_name?: string
    trade_category?: string
    bio?: string
    phone_number?: string
    license_number?: string
    is_emergency_available?: boolean
    is_licensed_insured?: boolean
    insurance_document_url?: string
    verification_status?: string
    accepts_credit_cards?: boolean
    offers_financing?: boolean
    free_consultations?: boolean
    has_seen_tutorial?: boolean
    links?: any
    profile_image_url?: string
    photo_library_urls?: string[]
    service_options?: string[]
    theme_color?: string
    background_image_url?: string
}) {
    const { userId } = await auth()
    if (!userId) throw new Error('Not authenticated')

    const supabase = await createClient()

    const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('user_id', userId)

    if (error) throw error
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/settings')
    if (formData.business_name) {
        revalidatePath(`/${formData.business_name}`) // Can be fully dynamic later
    }
}
