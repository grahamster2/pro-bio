'use client'

import { useState, useEffect } from 'react'
import { X, Share, Plus, ArrowDown, Smartphone } from 'lucide-react'

/**
 * Detects iOS Safari and shows a guided "Add to Home Screen" prompt
 * so the site feels like a native app on the user's phone.
 */
export default function AddToHomeScreen() {
    const [show, setShow] = useState(false)
    const [step, setStep] = useState<'initial' | 'safari-check' | 'instructions'>(
        'initial'
    )

    useEffect(() => {
        // Only run on client
        if (typeof window === 'undefined') return

        // Check if already installed as a PWA (standalone mode)
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true

        if (isStandalone) return

        // Check if user already dismissed
        const dismissed = localStorage.getItem('a2hs-dismissed')
        if (dismissed) {
            // Re-show after 7 days
            const dismissedDate = parseInt(dismissed, 10)
            if (Date.now() - dismissedDate < 7 * 24 * 60 * 60 * 1000) return
        }

        // Detect mobile (iOS or Android)
        const ua = navigator.userAgent
        const isIOS =
            /iPad|iPhone|iPod/.test(ua) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
        const isAndroid = /Android/i.test(ua)
        const isMobile = isIOS || isAndroid

        if (!isMobile) return

        // Detect if in Safari (iOS) or Chrome (Android)
        const isSafari =
            isIOS && !(/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua)) && /Safari/.test(ua)
        const isChrome = isAndroid && /Chrome/.test(ua) && !/Edge|OPR/.test(ua)

        // If on iOS but NOT Safari, guide them to open in Safari
        if (isIOS && !isSafari) {
            setStep('safari-check')
            setTimeout(() => setShow(true), 2000)
            return
        }

        // If on iOS Safari or Android Chrome, show add instructions
        if (isSafari || isChrome) {
            setStep('instructions')
            setTimeout(() => setShow(true), 3000)
            return
        }

        // Other mobile browsers - show generic instructions
        if (isMobile) {
            setStep('instructions')
            setTimeout(() => setShow(true), 3000)
        }
    }, [])

    const handleDismiss = () => {
        setShow(false)
        localStorage.setItem('a2hs-dismissed', Date.now().toString())
    }

    if (!show) return null

    const isIOS =
        typeof navigator !== 'undefined' &&
        (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={handleDismiss}
            />

            {/* Popup - slides up from bottom on mobile */}
            <div className="fixed bottom-0 left-0 right-0 z-[9999] animate-in slide-in-from-bottom duration-500 ease-out">
                <div className="mx-auto max-w-lg">
                    <div className="bg-zinc-900 border border-zinc-700/80 rounded-t-3xl shadow-[0_-10px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                        {/* Grab handle */}
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 rounded-full bg-zinc-600" />
                        </div>

                        {/* Close button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
                            aria-label="Dismiss"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="px-6 pb-8 pt-2">
                            {step === 'safari-check' ? (
                                /* Step: User is on iOS but NOT in Safari */
                                <SafariRedirectContent />
                            ) : (
                                /* Step: Show add-to-home-screen instructions */
                                <AddInstructions isIOS={isIOS} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function SafariRedirectContent() {
    return (
        <div className="text-center">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/20">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
                </svg>
            </div>

            <h3 className="text-xl font-heading font-black text-white mb-2">
                Open in Safari
            </h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-xs mx-auto">
                To install this as an app on your home screen, you need to open this page in <span className="text-white font-semibold">Safari</span>.
            </p>

            {/* Steps */}
            <div className="space-y-3 text-left max-w-xs mx-auto mb-6">
                <StepItem number={1} text="Tap the three dots menu (⋯) or share button" />
                <StepItem number={2} text={'Select "Open in Safari"'} />
                <StepItem number={3} text="Then follow the instructions to add to your home screen" />
            </div>

            <p className="text-[11px] text-slate-500">
                This lets Rovult work like a native app — fast, fullscreen, no browser bars.
            </p>
        </div>
    )
}

function AddInstructions({ isIOS }: { isIOS: boolean }) {
    return (
        <div className="text-center">
            {/* App Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-amber to-amber-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-amber/30 ring-2 ring-brand-amber/20 ring-offset-2 ring-offset-zinc-900">
                <Smartphone className="w-8 h-8 text-zinc-900" />
            </div>

            <h3 className="text-xl font-heading font-black text-white mb-2">
                Add Rovult to Your Home Screen
            </h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-xs mx-auto">
                Get instant access — no app store needed. It&apos;ll look and feel just like a real app.
            </p>

            {isIOS ? (
                /* iOS Safari Instructions */
                <div className="space-y-4 text-left max-w-xs mx-auto mb-6">
                    <StepItem
                        number={1}
                        text={
                            <>
                                Tap the <strong className="text-white">Share</strong> button
                                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500/20 rounded-md ml-1.5 align-middle">
                                    <Share className="w-3.5 h-3.5 text-blue-400" />
                                </span>
                                {' '}at the bottom of your screen
                            </>
                        }
                    />
                    <StepItem
                        number={2}
                        text={
                            <>
                                Scroll down and tap{' '}
                                <strong className="text-white">&quot;Add to Home Screen&quot;</strong>
                                <span className="inline-flex items-center justify-center w-6 h-6 bg-brand-amber/20 rounded-md ml-1.5 align-middle">
                                    <Plus className="w-3.5 h-3.5 text-brand-amber" />
                                </span>
                            </>
                        }
                    />
                    <StepItem
                        number={3}
                        text={
                            <>
                                Tap <strong className="text-white">&quot;Add&quot;</strong> in the top right corner
                            </>
                        }
                    />
                </div>
            ) : (
                /* Android Chrome Instructions */
                <div className="space-y-4 text-left max-w-xs mx-auto mb-6">
                    <StepItem
                        number={1}
                        text={
                            <>
                                Tap the <strong className="text-white">menu</strong> (three dots ⋮) in the top right
                            </>
                        }
                    />
                    <StepItem
                        number={2}
                        text={
                            <>
                                Tap <strong className="text-white">&quot;Add to Home screen&quot;</strong> or{' '}
                                <strong className="text-white">&quot;Install app&quot;</strong>
                            </>
                        }
                    />
                    <StepItem
                        number={3}
                        text={
                            <>
                                Tap <strong className="text-white">&quot;Add&quot;</strong> to confirm
                            </>
                        }
                    />
                </div>
            )}

            {/* Visual arrow pointing down for iOS */}
            {isIOS && (
                <div className="flex justify-center mb-4 animate-bounce">
                    <ArrowDown className="w-5 h-5 text-brand-amber" />
                </div>
            )}

            <p className="text-[11px] text-slate-500">
                After adding, open Rovult from your home screen for the full app experience.
            </p>
        </div>
    )
}

function StepItem({ number, text }: { number: number; text: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3">
            <div className="shrink-0 w-7 h-7 rounded-full bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center text-brand-amber text-xs font-black mt-0.5">
                {number}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed pt-0.5">{text}</p>
        </div>
    )
}
