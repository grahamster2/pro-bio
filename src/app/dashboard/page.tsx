import { createClient } from '@/lib/supabase/server'
import DashboardClient from '@/components/DashboardClient'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { ExternalLink } from 'lucide-react'

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
        <div className="p-5 md:p-7 h-full flex flex-col gap-5">
            {/* Page header */}
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-2xl font-heading font-black text-slate-100 tracking-tight">
                        Profile Builder
                    </h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Edit your profile and see changes live in the preview.
                    </p>
                </div>

                <a
                    href={`/${profile.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-950 bg-brand-amber hover:bg-amber-400 px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:-translate-y-px active:translate-y-0"
                >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Live
                </a>
            </div>

            <DashboardClient initialProfile={profile} />
        </div>
    )
}
