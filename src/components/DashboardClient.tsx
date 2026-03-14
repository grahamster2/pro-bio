'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MobilePreview from './MobilePreview'
import BuilderForm from './BuilderForm'
import DashboardTutorial from './DashboardTutorial'
import { updateProfile } from '@/app/dashboard/actions'
import { Save, Sparkles, Settings2, Wrench, ImageIcon, Link2, Eye } from 'lucide-react'

export type TabType = 'general' | 'services' | 'display' | 'links' | 'preview';

export default function DashboardClient({ initialProfile }: { initialProfile: any }) {
    const [profile, setProfile] = useState(initialProfile)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    const searchParams = useSearchParams()
    const router = useRouter()
    const activeTab = (searchParams.get('tab') as TabType) || 'general'
    const setActiveTab = (tab: TabType) => {
        router.replace(`?tab=${tab}`, { scroll: false })
    }

    const tabs = [
        { id: 'general', label: 'Profile', icon: Settings2 },
        { id: 'services', label: 'Services', icon: Wrench },
        { id: 'display', label: 'Design', icon: ImageIcon },
        { id: 'links', label: 'Links', icon: Link2 },
        { id: 'preview', label: 'Preview', icon: Eye },
    ] as const;

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
                is_emergency_available: profile.is_emergency_available,
                is_licensed_insured: profile.is_licensed_insured,
                insurance_document_url: profile.insurance_document_url,
                verification_status: profile.verification_status,
                has_seen_tutorial: profile.has_seen_tutorial,
                links: profile.links || [],
                profile_image_url: profile.profile_image_url,
                photo_library_urls: profile.photo_library_urls || [],
                service_options: profile.service_options || [],
                theme_color: profile.theme_color,
                background_image_url: profile.background_image_url,
                card_color: profile.card_color,
                liquid_glass: profile.liquid_glass,
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
        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 flex-1 min-h-0 pb-24 md:pb-10">
            {!profile.has_seen_tutorial && (
                <DashboardTutorial onComplete={() => setProfile({ ...profile, has_seen_tutorial: true })} />
            )}

            {/* Left Column: Edit Fields */}
            <div className={`flex flex-col bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl md:rounded-3xl overflow-hidden md:h-full shadow-2xl relative ${activeTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-amber/30 to-transparent"></div>
                {/* Desktop header with save button */}
                <div className="hidden md:flex p-5 border-b border-zinc-800/60 justify-between items-center bg-zinc-950/60 backdrop-blur-sm relative z-10 flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <h2 className="font-heading font-bold text-slate-100 flex items-center gap-2.5 text-lg">
                            <Sparkles className="w-5 h-5 text-brand-amber" />
                            Live Editor
                            {message && <span className="text-xs font-medium text-brand-amber ml-3 px-2 py-0.5 rounded-full bg-brand-amber/10 border border-brand-amber/20 animate-in fade-in zoom-in-95">{message}</span>}
                        </h2>
                        {profile.has_seen_tutorial && (
                            <button
                                onClick={() => setProfile({ ...profile, has_seen_tutorial: false })}
                                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand-amber bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-brand-amber/30 px-3 py-1.5 rounded-lg transition-all"
                            >
                                <Sparkles className="w-3.5 h-3.5" /> Replay Tutorial
                            </button>
                        )}
                    </div>
                    <button
                        id="tutorial-save-button"
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-brand-amber text-zinc-950 px-5 py-2 rounded-xl font-black text-sm hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center gap-2 disabled:opacity-50 disabled:shadow-none ml-auto"
                    >
                        <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
                {/* Mobile Header (Shows when NOT in preview) */}
                <div className="flex md:hidden p-4 border-b border-zinc-800/60 justify-between items-center bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10">
                    <h2 className="font-heading font-bold text-slate-100 flex items-center gap-2 text-base">
                        <Sparkles className="w-4 h-4 text-brand-amber" /> Builder
                    </h2>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-brand-amber text-zinc-950 px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-amber-400 transition-all ml-auto disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>

                <div className="p-4 md:p-6 lg:p-8 overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-0">
                    <BuilderForm profile={profile} onChange={(updates: any) => setProfile({ ...profile, ...updates })} activeTab={activeTab !== 'preview' ? activeTab : 'general'} onTabChange={(tab) => setActiveTab(tab)} />
                </div>
            </div>

            {/* Right Column: Live Preview (desktop & mobile conditional) */}
            <div id="tutorial-preview" className={`${activeTab === 'preview' ? 'flex' : 'hidden'} lg:flex items-center justify-center bg-zinc-950/30 border border-zinc-800 rounded-2xl p-6 overflow-hidden relative group min-h-[600px] lg:min-h-0`}>
                {/* Glowing aesthetic backdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[80%] bg-brand-amber/10 blur-[100px] rounded-full z-0 pointer-events-none transition-all duration-700 group-hover:bg-brand-amber/20 group-hover:w-[90%] group-hover:h-[90%]"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/50 to-transparent pointer-events-none z-0"></div>

                {/* Scaled up phone container */}
                <div className="z-10 w-full max-w-[360px] transform transition-transform duration-500 hover:scale-[1.05] drop-shadow-[0_0_30px_rgba(245,158,11,0.15)] group-hover:drop-shadow-[0_0_50px_rgba(245,158,11,0.25)] flex items-center justify-center h-full">
                    <MobilePreview profile={profile} isPremium={profile.is_premium || false} />
                </div>
            </div>

        </div>
    )
}

