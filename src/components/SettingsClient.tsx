'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/dashboard/actions'
import { Star } from 'lucide-react'
import { UpgradeModal } from './UpgradeModal'

interface SettingsProps {
    isEmergencyAvailable: boolean
    acceptsCreditCards: boolean
    offersFinancing: boolean
    freeConsultations: boolean
    isPremium: boolean
}

export default function SettingsClient({
    isEmergencyAvailable,
    acceptsCreditCards,
    offersFinancing,
    freeConsultations,
    isPremium
}: SettingsProps) {
    const [settings, setSettings] = useState({
        is_emergency_available: isEmergencyAvailable,
        accepts_credit_cards: acceptsCreditCards,
        offers_financing: offersFinancing,
        free_consultations: freeConsultations
    })
    const [saving, setSaving] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleToggle = async (key: keyof typeof settings) => {
        const newValue = !settings[key]
        setSettings(prev => ({ ...prev, [key]: newValue }))
        setSaving(true)
        try {
            await updateProfile({ [key]: newValue })
        } catch (e) {
            console.error(e)
            setSettings(prev => ({ ...prev, [key]: !newValue })) // Revert on failure
        } finally {
            setSaving(false)
        }
    }

    const ToggleRow = ({
        title,
        description,
        stateKey
    }: {
        title: string,
        description: string,
        stateKey: keyof typeof settings
    }) => {
        const enabled = settings[stateKey];
        const isLocked = !isPremium;
        return (
            <div className={`flex items-start justify-between py-5 border-b border-zinc-900/50 last:border-0 ${isLocked ? 'opacity-80' : ''}`}>
                <div>
                    <h3 className="text-base font-bold text-slate-100 mb-1 flex items-center gap-2">
                        {title}
                        {isLocked && <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-2 py-0.5 rounded-full border border-brand-amber/20"><Star className="w-2.5 h-2.5 fill-brand-amber" /> PRO</span>}
                    </h3>
                    <p className="text-sm text-slate-400 max-w-md">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-2 pr-2">
                    <button
                        type="button"
                        onClick={() => {
                            if (!isLocked) {
                                handleToggle(stateKey);
                            } else {
                                setIsModalOpen(true);
                            }
                        }}
                        disabled={saving}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-amber focus:ring-offset-2 focus:ring-offset-zinc-900 ${enabled ? 'bg-brand-amber' : 'bg-zinc-700'} ${isLocked ? 'opacity-50 hover:opacity-80' : ''}`}
                        role="switch"
                        aria-checked={enabled}
                    >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                    {isLocked && <button type="button" onClick={() => setIsModalOpen(true)} className="text-[10px] font-medium text-brand-amber hover:text-amber-400 hover:underline">Unlock feature</button>}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <ToggleRow
                title="24/7 Emergency Service"
                description="When enabled, a pulsing red badge will appear on your profile letting customers know you are available for immediate, high-paying jobs."
                stateKey="is_emergency_available"
            />
            <ToggleRow
                title="Accepts Credit Cards"
                description="Show a prominent badge on your profile indicating that you accept card payments for convenience."
                stateKey="accepts_credit_cards"
            />
            <ToggleRow
                title="Offers Financing"
                description="Let customers know you provide financing options for larger projects."
                stateKey="offers_financing"
            />
            <ToggleRow
                title="Free Consultations / Estimates"
                description="Highlight that you offer free estimates to encourage more inbound quote requests."
                stateKey="free_consultations"
            />

            <UpgradeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}
