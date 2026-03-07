'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Star, Zap, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react'

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    if (!isOpen) return null

    const handleUpgrade = () => {
        setIsLoading(true)
        // Ensure this pushes to the Stripe checkout route
        router.push('/checkout')
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
                {/* Header Glow */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 to-brand-amber"></div>
                <div className="absolute top-0 right-1/4 w-32 h-32 bg-brand-amber/10 blur-[50px] rounded-full pointer-events-none"></div>

                <div className="p-6 sm:p-8">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 text-slate-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 p-2 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Title */}
                    <div className="mb-8 pr-10">
                        <div className="inline-flex items-center gap-1.5 bg-brand-amber/10 border border-brand-amber/20 text-brand-amber text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                            <Star className="w-3.5 h-3.5 fill-brand-amber" /> Rovult Premium
                        </div>
                        <h2 className="text-3xl font-heading font-black text-slate-50 mb-2">Unlock Growth <br />Features</h2>
                        <p className="text-slate-400 font-medium">Equip your profile with heavy-duty trust signals to capture high-paying leads.</p>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/80">
                            <div className="mt-0.5 bg-brand-amber/20 p-1.5 rounded-full shrink-0">
                                <Star className="w-4 h-4 text-brand-amber fill-brand-amber" />
                            </div>
                            <div>
                                <h4 className="text-slate-200 font-bold text-sm mb-0.5">Advanced Analytics & Leads</h4>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">See detailed link performance charts and unlock caller phone numbers for all lifetime leads.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/80">
                            <div className="mt-0.5 bg-zinc-800 p-1.5 rounded-full shrink-0">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div>
                                <h4 className="text-slate-200 font-bold text-sm mb-0.5">Unlimited Profile Freedom</h4>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">Showcase as many portfolio photos and custom website links as you want without limits.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/80">
                            <div className="mt-0.5 bg-zinc-800 p-1.5 rounded-full shrink-0">
                                <Zap className="w-4 h-4 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="text-slate-200 font-bold text-sm mb-0.5">24/7 Emergency Pulse</h4>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed">Turn on a flashing "Available Now" badge to instantly capture high-value emergency jobs.</p>
                            </div>
                        </div>
                    </div>

                    {/* Action */}
                    <div className="pt-2">
                        <button
                            onClick={handleUpgrade}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-br from-brand-amber to-amber-600 hover:from-amber-400 hover:to-brand-amber text-zinc-950 font-black text-lg tracking-wide shadow-[0_10px_30px_rgba(245,158,11,0.2)] hover:shadow-[0_10px_40px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Preparing Checkout...</>
                            ) : (
                                <>Upgrade Now - $14/mo <ArrowRight className="w-5 h-5 stroke-[3]" /></>
                            )}
                        </button>
                        <p className="text-center text-zinc-500 text-[10px] font-medium mt-4 uppercase tracking-wider">Secure processing by Stripe</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
