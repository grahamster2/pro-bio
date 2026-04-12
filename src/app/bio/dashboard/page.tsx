import { createClient } from '@/lib/supabase/server'
import DashboardClient from '@/components/DashboardClient'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { DashboardHeader } from '@/components/DashboardHeader'

export default async function DashboardPage() {
    const { userId } = await auth()

    if (!userId) redirect('/sign-in')

    const supabase = await createClient()

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()

    if (!profile) redirect('/onboarding')

    return (
        <div className="p-4 md:p-5 lg:p-7 h-full flex flex-col gap-4 md:gap-5">
            {/* Page header */}
            <DashboardHeader 
                slug={profile.slug || ''} 
                businessName={profile.business_name || undefined} 
            />

            <DashboardClient initialProfile={profile} />
        </div>
    )
}
