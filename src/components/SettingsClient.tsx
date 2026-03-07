'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/dashboard/actions'

export default function SettingsClient({ isEmergencyAvailable }: { isEmergencyAvailable: boolean }) {
    const [enabled, setEnabled] = useState(isEmergencyAvailable)
    const [saving, setSaving] = useState(false)

    const handleToggle = async () => {
        const newValue = !enabled
        setEnabled(newValue)
        setSaving(true)
        try {
            await updateProfile({ is_emergency_available: newValue })
        } catch (e) {
            console.error(e)
            setEnabled(!newValue) // Revert on failure
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="flex items-start justify-between">
            <div>
                <h3 className="text-lg font-bold text-slate-100 mb-1">24/7 Emergency Service</h3>
                <p className="text-sm text-slate-400 max-w-md">
                    When enabled, a pulsing red badge will appear on your profile letting customers know you are available for immediate, high-paying jobs.
                </p>
            </div>

            <button
                type="button"
                onClick={handleToggle}
                disabled={saving}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-amber focus:ring-offset-2 focus:ring-offset-zinc-900 ${enabled ? 'bg-brand-amber' : 'bg-zinc-700'}`}
                role="switch"
                aria-checked={enabled}
            >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </button>
        </div>
    )
}
