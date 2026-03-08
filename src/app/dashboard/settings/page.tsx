import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SettingsClient from '@/components/SettingsClient'
import { auth } from '@clerk/nextjs/server'
import { PortalButton } from '@/components/PortalButton'

export default async function SettingsPage() {
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
        <div className="p-5 md:p-7 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="mb-7">
                <h1 className="text-2xl font-heading font-black text-slate-100 tracking-tight">
                    Settings
                </h1>
                <p className="text-sm text-slate-500 mt-0.5">
                    Manage your profile features and subscription.
                </p>
            </div>

            <div className="max-w-2xl flex flex-col gap-4">
                {/* Preferences card */}
                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-zinc-800/60 bg-zinc-950/40 flex items-center gap-2.5">
                        <div className="w-1.5 h-4 rounded-full bg-brand-amber/60" />
                        <h2 className="text-sm font-semibold text-slate-200">Profile Features</h2>
                    </div>
                    <div className="px-5 py-2">
                        <SettingsClient
                            isEmergencyAvailable={!!profile.is_emergency_available}
                            acceptsCreditCards={!!profile.accepts_credit_cards}
                            offersFinancing={!!profile.offers_financing}
                            freeConsultations={!!profile.free_consultations}
                            isPremium={!!profile.is_premium}
                        />
                    </div>
                </div>

                {profile.is_premium && (
                    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-zinc-800/60 bg-zinc-950/40 flex items-center gap-2.5">
                            <div className="w-1.5 h-4 rounded-full bg-brand-amber" />
                            <h2 className="text-sm font-semibold text-slate-200">Subscription</h2>
                        </div>
                        <div className="p-5">
                            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                                Manage your Rovult Premium subscription, update your payment method, or view billing history.
                            </p>
                            <PortalButton />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
