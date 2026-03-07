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
        <div className="p-6 md:p-8 h-full">
            <h1 className="text-3xl font-heading font-bold text-slate-100 mb-8">Settings</h1>

            <div className="max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-8">
                <div className="p-4 border-b border-zinc-800 bg-zinc-950/50">
                    <h2 className="font-medium text-slate-100">Preferences</h2>
                </div>
                <div className="p-2 sm:p-6">
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
                <div className="max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-zinc-800 bg-zinc-950/50">
                        <h2 className="font-medium text-slate-100">Subscription</h2>
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-slate-400 mb-4">Manage your Rovult Premium subscription, update your payment method, or view billing history.</p>
                        <PortalButton />
                    </div>
                </div>
            )}
        </div>
    )
}
