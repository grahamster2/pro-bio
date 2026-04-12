import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import LocalSEOClient from '@/components/LocalSEOClient'

export default async function LocalSEOPage() {
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
        <div className="p-5 md:p-7 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] safe-area-pt">
            <div className="mb-7">
                <h1 className="text-2xl font-heading font-black text-slate-100 tracking-tight">
                    Local SEO
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                    Boost your local search rankings with service areas and project locations.
                </p>
            </div>

            <LocalSEOClient isPremium={!!profile.is_premium} />
        </div>
    )
}
