'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

async function isAdmin() {
    const { userId } = await auth();
    // In production on Vercel, make sure NEXT_PUBLIC_ADMIN_USER_ID or ADMIN_USER_ID is set
    return userId && userId === process.env.ADMIN_USER_ID;
}

export async function getAllVerifications() {
    if (!(await isAdmin())) throw new Error("Unauthorized");

    const supabase = await createClient();

    // Fetch all profiles that claim to be licensed/insured
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_licensed_insured', true);

    if (error) {
        console.error("Error fetching pending verifications:", error);
        return [];
    }

    return data;
}

export async function updateVerificationStatus(targetUserId: string, status: 'Verified' | 'Rejected') {
    if (!(await isAdmin())) throw new Error("Unauthorized");

    const supabase = await createClient();

    const { error } = await supabase
        .from('profiles')
        .update({ verification_status: status })
        .eq('user_id', targetUserId);

    if (error) {
        console.error("Error updating verification status:", error);
        throw error;
    }

    revalidatePath('/admin');
    // Also revalidate the specific user's public page if possible (would need their slug/business_name)
}
