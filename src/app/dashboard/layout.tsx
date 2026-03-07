import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { LayoutDashboard, Settings, Star, BarChart2 } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import { UpgradeTrigger } from '@/components/UpgradeTrigger'

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
            <aside className="w-full md:w-64 border-r border-zinc-800 bg-zinc-950/50 p-6 hidden md:flex flex-col">
                <Logo className="mb-10" />

                <nav className="flex-1 flex flex-col gap-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-900 text-slate-300 hover:text-slate-100 font-medium transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        Builder
                    </Link>
                    <Link href="/dashboard/leads" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-900 text-slate-300 hover:text-slate-100 font-medium transition-colors">
                        <BarChart2 className="w-5 h-5" />
                        Leads & Analytics
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-900 text-slate-400 hover:text-slate-100 font-medium transition-colors">
                        <Settings className="w-5 h-5" />
                        Settings
                    </Link>
                </nav>

                {profile.is_premium ? (
                    <div className="mt-auto mb-6">
                        <div className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-slate-300 font-medium cursor-default">
                            <Star className="w-4 h-4 fill-brand-amber text-brand-amber" />
                            Premium Active
                        </div>
                    </div>
                ) : (
                    <UpgradeTrigger variant="desktop" />
                )}

                <div className="pt-6 border-t border-zinc-800 flex items-center gap-4">
                    <UserButton appearance={{
                        elements: {
                            userButtonAvatarBox: "w-10 h-10 border-2 border-zinc-800"
                        }
                    }} />
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-300 truncate flex items-center gap-1.5" title={profile.business_name}>
                            {profile.business_name}
                            {profile.is_premium && (
                                <span className="flex-shrink-0 flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-1.5 py-0.5 rounded border border-brand-amber/20">PRO</span>
                            )}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile nav */}
            <div className="md:hidden border-b border-zinc-800 p-4 flex justify-between items-center bg-zinc-950">
                <Logo />
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-end gap-3 text-sm font-medium">
                        <Link href="/dashboard" className="text-slate-300">Builder</Link>
                        <Link href="/dashboard/leads" className="text-slate-300">Leads</Link>
                        <Link href="/dashboard/settings" className="text-slate-300">Settings</Link>
                        <UserButton />
                    </div>
                    {profile.is_premium ? (
                        <div className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-slate-400 text-xs font-medium cursor-default">
                            <Star className="w-3.5 h-3.5 fill-brand-amber text-brand-amber" /> Premium Active
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
