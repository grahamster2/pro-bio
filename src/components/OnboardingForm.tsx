'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from '@/app/onboarding/actions'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

export default function OnboardingForm() {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        business_name: '',
        trade_category: '',
        phone_number: '',
    })

    const handleNext = () => setStep(s => Math.min(3, s + 1))
    const handleBack = () => setStep(s => Math.max(1, s - 1))

    const router = useRouter()

    const handleSubmit = async () => {
        setLoading(true)
        const res = await completeOnboarding(data)

        if (res?.error) {
            alert(res.error)
            setLoading(false)
        } else if (res?.success) {
            router.push('/dashboard')
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
            <div className="flex gap-2 mb-8 items-center justify-between">
                {[1, 2, 3].map(s => (
                    <div key={s} className="flex-1 flex flex-col items-center gap-2">
                        <div className={`w-full h-1 rounded-full ${s <= step ? 'bg-brand-amber' : 'bg-zinc-800'}`} />
                        <span className={`text-xs font-bold ${s <= step ? 'text-brand-amber' : 'text-zinc-600'}`}>Step {s}</span>
                    </div>
                ))}
            </div>

            <div className="min-h-[200px] flex flex-col justify-center">
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-2xl font-heading font-bold text-slate-100 mb-2">What is your business name?</h2>
                        <p className="text-slate-400 text-sm mb-6">This will appear on your public profile and determine your secure URL.</p>
                        <input
                            autoFocus
                            className="w-full rounded-md px-4 py-3 bg-zinc-950 border border-zinc-700 text-slate-100 focus:outline-none focus:border-brand-amber text-lg"
                            placeholder="e.g. JS Plumbing"
                            value={data.business_name}
                            onChange={e => setData({ ...data, business_name: e.target.value })}
                            onKeyDown={e => e.key === 'Enter' && data.business_name && handleNext()}
                        />
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-2xl font-heading font-bold text-slate-100 mb-2">What is your trade?</h2>
                        <p className="text-slate-400 text-sm mb-6">Let customers know exactly what you do.</p>
                        <input
                            autoFocus
                            className="w-full rounded-md px-4 py-3 bg-zinc-950 border border-zinc-700 text-slate-100 focus:outline-none focus:border-brand-amber text-lg"
                            placeholder="e.g. Plumbing, HVAC, Electrician"
                            value={data.trade_category}
                            onChange={e => setData({ ...data, trade_category: e.target.value })}
                            onKeyDown={e => e.key === 'Enter' && data.trade_category && handleNext()}
                        />
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-2xl font-heading font-bold text-slate-100 mb-2">Best phone number?</h2>
                        <p className="text-slate-400 text-sm mb-6">Where should customers call or text you for jobs?</p>
                        <input
                            autoFocus
                            type="tel"
                            className="w-full rounded-md px-4 py-3 bg-zinc-950 border border-zinc-700 text-slate-100 focus:outline-none focus:border-brand-amber text-lg"
                            placeholder="(555) 123-4567"
                            value={data.phone_number}
                            onChange={e => setData({ ...data, phone_number: e.target.value })}
                            onKeyDown={e => e.key === 'Enter' && data.phone_number && handleSubmit()}
                        />
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800">
                <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`px-4 py-2 font-medium flex items-center gap-2 transition-colors ${step === 1 ? 'text-zinc-600 cursor-not-allowed' : 'text-slate-300 hover:text-white'}`}
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                {step < 3 ? (
                    <button
                        onClick={handleNext}
                        disabled={step === 1 ? !data.business_name : !data.trade_category}
                        className="bg-brand-amber text-zinc-950 px-6 py-2 rounded-md font-bold hover:bg-amber-400 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next <ArrowRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!data.phone_number || loading}
                        className="bg-brand-amber text-zinc-950 px-6 py-2 rounded-md font-bold hover:bg-amber-400 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Finish Setup'} <Check className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    )
}
