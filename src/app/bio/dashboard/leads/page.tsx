import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import LeadsClient from '@/components/LeadsClient'

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
    const { userId } = await auth()

    if (!userId) redirect('/sign-in')

    const supabase = await createClient()

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()

    if (!profile) redirect('/onboarding')

    // Fetch analytics and leads
    const [viewsRes, clicksRes, leadsRes, clickDataRes] = await Promise.all([
        (supabase as any).from('page_views').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id),
        (supabase as any).from('link_clicks').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id),
        (supabase as any).from('leads').select('*').eq('profile_id', profile.id).order('created_at', { ascending: false }),
        (supabase as any).from('link_clicks').select('link_type').eq('profile_id', profile.id)
    ]);

    const totalViews = viewsRes.count || 0;
    const totalClicks = clicksRes.count || 0;
    const leads = leadsRes.data || [];

    // Group link clicks for the chart
    const clickStats = (clickDataRes.data || []).reduce((acc: Record<string, number>, click: any) => {
        acc[click.link_type] = (acc[click.link_type] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="p-5 md:p-7 h-full flex flex-col gap-5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="shrink-0">
                <h1 className="text-2xl font-heading font-black text-slate-100 tracking-tight">
                    Leads & Analytics
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                    Track profile visits, link clicks, and manage quote requests.
                </p>
            </div>
            <LeadsClient
                totalViews={totalViews}
                totalClicks={totalClicks}
                clickStats={clickStats}
                leads={leads}
                profile={profile}
                isPremium={profile.is_premium === true}
            />
        </div>
    )
}
