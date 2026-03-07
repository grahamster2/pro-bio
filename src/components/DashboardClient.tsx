'use client'

import { useState } from 'react'
import MobilePreview from './MobilePreview'
import BuilderForm from './BuilderForm'
import { updateProfile } from '@/app/dashboard/actions'
import { Save, AlertCircle } from 'lucide-react'

export default function DashboardClient({ initialProfile }: { initialProfile: any }) {
    const [profile, setProfile] = useState(initialProfile)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    const handleSave = async () => {
        setSaving(true)
        setMessage('')
        try {
            await updateProfile({
                business_name: profile.business_name,
                trade_category: profile.trade_category,
                bio: profile.bio,
                phone_number: profile.phone_number,
                license_number: profile.license_number,
                links: profile.links || [],
            })
            setMessage('Profile saved successfully!')
            setTimeout(() => setMessage(''), 3000)
        } catch (e) {
            console.error(e)
            setMessage('Error saving profile.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="grid lg:grid-cols-2 gap-8 flex-1 min-h-0 pb-10">
            {/* Left Column: Edit Fields */}
            <div className="flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden h-full">
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
                    <h2 className="font-medium text-slate-100 flex items-center gap-2">
                        Editor
                        {message && <span className="text-xs text-brand-amber ml-2">{message}</span>}
                    </h2>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-brand-amber text-zinc-950 px-4 py-1.5 rounded-md font-bold text-sm hover:bg-amber-400 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <BuilderForm profile={profile} onChange={(updates: any) => setProfile({ ...profile, ...updates })} />
                </div>
            </div>

            {/* Right Column: Live Preview */}
            <div className="hidden lg:flex items-center justify-center bg-zinc-950/30 border border-zinc-800 rounded-2xl p-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/50 to-transparent pointer-events-none"></div>
                <MobilePreview profile={profile} />
            </div>
        </div>
    )
}
