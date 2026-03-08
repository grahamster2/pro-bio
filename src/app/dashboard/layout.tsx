import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Logo } from '@/components/Logo'
import { Star } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import { UpgradeTrigger } from '@/components/UpgradeTrigger'
import { DashboardNav, MobileNav } from '@/components/DashboardNav'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const supabase = await createClient()

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()

    if (!profile || !profile.business_name) {
        redirect('/onboarding')
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-zinc-950">

            {/* Desktop Sidebar */}
            <aside className="w-full md:w-64 border-r border-zinc-800/80 bg-zinc-950 hidden md:flex flex-col relative overflow-hidden shrink-0">

                {/* Ambient glow at the top */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-amber/5 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-4 w-24 h-24 bg-brand-amber/8 blur-[60px] rounded-full pointer-events-none" />

                {/* Logo area */}
                <div className="relative z-10 px-5 pt-6 pb-5 border-b border-zinc-800/60">
                    <Logo />
                </div>

                {/* Nav section */}
                <div className="relative z-10 flex flex-col flex-1 px-3 py-4 gap-6">
                    <DashboardNav />

                    {/* Bottom section */}
                    <div className="mt-auto flex flex-col gap-3">
                        {profile.is_premium ? (
                            <div className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-brand-amber/5 border border-brand-amber/20 text-brand-amber font-semibold text-sm cursor-default">
                                <Star className="w-3.5 h-3.5 fill-brand-amber" />
                                Premium Active
                            </div>
                        ) : (
                            <UpgradeTrigger variant="desktop" />
                        )}

                        {/* User card */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                            <UserButton appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-8 h-8 ring-2 ring-zinc-700 ring-offset-1 ring-offset-zinc-950"
                                }
                            }} />
                            <div className="flex-1 min-w-0">
                                <div
                                    className="text-sm font-semibold text-slate-200 truncate flex items-center gap-1.5"
                                    title={profile.business_name}
                                >
                                    {profile.business_name}
                                    {profile.is_premium && (
                                        <span className="shrink-0 text-[9px] font-black uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-1.5 py-0.5 rounded border border-brand-amber/20">
                                            PRO
                                        </span>
                                    )}
                                </div>
                                {profile.slug && (
                                    <p className="text-[11px] text-slate-500 truncate mt-0.5">/{profile.slug}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical accent line */}
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-brand-amber/20 via-zinc-800/80 to-transparent pointer-events-none" />
            </aside>

            {/* Mobile top nav */}
            <div className="md:hidden border-b border-zinc-800/80 bg-zinc-950 relative">
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-amber/30 to-transparent" />
                <div className="px-4 pt-3 pb-2 flex justify-between items-center">
                    <Logo />
                    <UserButton />
                </div>
                <div className="px-3 pb-3 flex items-center justify-between gap-3">
                    <MobileNav />
                    {profile.is_premium ? (
                        <div className="flex items-center gap-1.5 text-brand-amber text-xs font-semibold border border-brand-amber/20 bg-brand-amber/5 px-2.5 py-1 rounded-lg shrink-0">
                            <Star className="w-3 h-3 fill-brand-amber" /> PRO
                        </div>
                    ) : (
                        <UpgradeTrigger variant="mobile" />
                    )}
                </div>
            </div>

            <main className="flex-1 h-screen overflow-hidden">
                {children}
            </main>
        </div>
    )
}
