import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SettingsClient from '@/components/SettingsClient'
import { auth } from '@clerk/nextjs/server'

export default async function SettingsPage() {
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
        <div className="p-6 md:p-8 h-full">
            <h1 className="text-3xl font-heading font-bold text-slate-100 mb-8">Settings</h1>

            <div className="max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-zinc-800 bg-zinc-950/50">
                    <h2 className="font-medium text-slate-100">Preferences</h2>
                </div>
                <div className="p-6">
                    <SettingsClient isEmergencyAvailable={!!profile.is_emergency_available} />
                </div>
            </div>
        </div>
    )
}
