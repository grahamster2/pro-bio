'use client'

import { useState } from 'react'
import { CheckCircle2, Layout, Settings, Share2, X } from 'lucide-react'
import { updateProfile } from '@/app/dashboard/actions'

export default function DashboardTutorial({ onComplete }: { onComplete: () => void }) {
    const [isOpen, setIsOpen] = useState(true)
    const [step, setStep] = useState(0)
    const [saving, setSaving] = useState(false)

    const steps = [
        {
            title: 'Welcome to Rovult',
            description: 'Your beautiful, modern Link-in-Bio profile for your contracting business is ready. Let’s take a quick tour.',
            icon: <CheckCircle2 className="w-10 h-10 text-brand-amber mb-4" />
        },
        {
            title: 'Profile Builder',
            description: 'Use the left panel to customize your services, upload a gallery of photos, and manage trust verification badges. Everything updates live on the right.',
            icon: <Layout className="w-10 h-10 text-brand-amber mb-4" />
        },
        {
            title: 'Feature Settings',
            description: 'Head over to Settings in the sidebar to enable powerful features like 24/7 Emergency Badges, Financing indicators, and Free Estimates.',
            icon: <Settings className="w-10 h-10 text-brand-amber mb-4" />
        },
        {
            title: 'Share Your Link',
            description: 'Once you are ready, add your custom probio.app link to your Instagram, Facebook, and business cards to capture more leads!',
            icon: <Share2 className="w-10 h-10 text-brand-amber mb-4" />
        }
    ]

    const handleDismiss = async () => {
        setSaving(true)
        try {
            await updateProfile({ has_seen_tutorial: true })
        } catch (e) {
            console.error("Failed to dismiss tutorial:", e)
        } finally {
            setSaving(false)
            setIsOpen(false)
            onComplete()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-400">

                {/* Close Button */}
                <button
                    onClick={handleDismiss}
                    disabled={saving}
                    className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Progress Bar */}
                <div className="flex gap-1 p-4 pb-0">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-brand-amber' : 'bg-zinc-800'}`}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="p-8 text-center flex flex-col items-center">
                    {steps[step].icon}
                    <h2 className="text-2xl font-heading font-bold text-slate-100 mb-3">{steps[step].title}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm mb-8">{steps[step].description}</p>

                    <div className="flex w-full gap-3 mt-auto">
                        {step > 0 && (
                            <button
                                onClick={() => setStep(s => s - 1)}
                                className="flex-1 py-3 px-4 rounded-xl font-bold bg-zinc-800 text-slate-300 hover:bg-zinc-700 transition-colors"
                            >
                                Back
                            </button>
                        )}

                        {step < steps.length - 1 ? (
                            <button
                                onClick={() => setStep(s => s + 1)}
                                className="flex-[2] py-3 px-4 rounded-xl font-bold bg-brand-amber text-zinc-950 hover:bg-amber-400 transition-colors"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleDismiss}
                                disabled={saving}
                                className="flex-[2] py-3 px-4 rounded-xl font-bold bg-brand-amber text-zinc-950 hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
                            >
                                {saving ? "Saving..." : "Get Started"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
