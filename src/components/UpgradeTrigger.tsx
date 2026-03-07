'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { UpgradeModal } from './UpgradeModal'

interface UpgradeTriggerProps {
    variant: 'desktop' | 'mobile';
}

export function UpgradeTrigger({ variant }: UpgradeTriggerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            {variant === 'desktop' ? (
                <div className="mt-auto mb-6">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-amber to-amber-400 text-zinc-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:-translate-y-0.5"
                    >
                        <Star className="w-4 h-4 fill-zinc-950" />
                        Upgrade to Premium
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-brand-amber/10 border border-brand-amber/30 text-brand-amber text-xs font-bold uppercase tracking-wide hover:bg-brand-amber/20 transition-colors"
                >
                    <Star className="w-3.5 h-3.5 fill-brand-amber" /> Premium
                </button>
            )}

            <UpgradeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}
