import OnboardingForm from '@/components/OnboardingForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Logo } from '@/components/Logo'
import { auth } from '@clerk/nextjs/server'

export default async function OnboardingPage() {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const supabase = await createClient()

    const { data: profile } = await supabase
        .from('profiles')
        .select('business_name')
        .eq('user_id', userId)
        .maybeSingle()

    if (profile?.business_name) {
        redirect('/dashboard')
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header className="px-6 py-4 flex items-center border-b border-zinc-800 bg-zinc-950/80">
                <Logo />
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-heading font-black text-slate-100 mb-3">Let's build your profile.</h1>
                    <p className="text-slate-400">Takes less than 3 minutes. Better than a business card.</p>
                </div>
                <OnboardingForm />
            </main>
        </div>
    )
}
