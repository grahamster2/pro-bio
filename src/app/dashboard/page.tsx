import { createClient } from '@/lib/supabase/server'
import DashboardClient from '@/components/DashboardClient'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function DashboardPage() {
    const { userId } = await auth()

    if (!userId) redirect('/login')

    const supabase = await createClient()

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()

    if (!profile) redirect('/onboarding')

    return (
        <div className="p-6 md:p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-heading font-bold text-slate-100">Profile Builder</h1>
                <a
                    href={`/${profile.slug}`}
                    target="_blank"
                    className="text-sm font-medium text-brand-amber hover:underline border border-brand-amber/30 px-3 py-1.5 rounded-md"
                >
                    View Live Profile
                </a>
            </div>
            <DashboardClient initialProfile={profile} />
        </div>
    )
}
