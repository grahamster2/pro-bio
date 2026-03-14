'use client'

import { useState } from 'react'
import { Plus, Trash2, AlertCircle, Star, ShieldCheck, X, Settings2, Wrench, ImageIcon, Link2 } from 'lucide-react'
import { ImageUploader } from './ImageUploader'
import { UpgradeModal } from './UpgradeModal'
import Image from 'next/image'

const TRADE_SUGGESTIONS: Record<string, string[]> = {
    hvac: [
        "AC Repair", "AC Tune-up", "Furnace Installation", "Furnace Repair",
        "Duct Cleaning", "Heat Pump Service", "Thermostat Installation", "Emergency HVAC"
    ],
    plumb: [
        "Leak Detection", "Pipe Repair", "Water Heater Installation", "Water Heater Repair",
        "Drain Cleaning", "Toilet Installation", "Faucet Repair", "Garbage Disposal"
    ],
    electric: [
        "Panel Upgrade", "Wiring & Rewiring", "Lighting Installation", "Outlet Repair",
        "Ceiling Fan Installation", "Surge Protection", "Generator Installation", "Emergency Electrical"
    ],
    roof: [
        "Roof Inspection", "Roof Repair", "Complete Replacement", "Leak Repair",
        "Gutter Installation", "Gutter Cleaning", "Skylight Installation"
    ],
    landscape: [
        "Lawn Maintenance", "Tree Trimming", "Mulch & Pine Straw", "Hardscaping",
        "Irrigation Repair", "Sod Installation", "Weed Control"
    ],
    paint: [
        "Interior Painting", "Exterior Painting", "Cabinet Refinishing", "Deck Staining",
        "Drywall Repair", "Wallpaper Removal", "Pressure Washing"
    ],
    clean: [
        "Deep Cleaning", "Move In/Out Cleaning", "Carpet Cleaning", "Window Cleaning",
        "Post-Construction Cleaning", "Janitorial Services"
    ]
};

const COMMON_SERVICES = Array.from(new Set(Object.values(TRADE_SUGGESTIONS).flat())).concat([
    "Deck Building", "Fence Installation", "Kitchen Remodeling", "Bathroom Remodeling",
    "Flooring Installation", "Handyman Services", "General Carpentry", "Concrete Work"
]);

function getSuggestedTags(tradeCategory: string): string[] {
    if (!tradeCategory) return ["Handyman Services", "General Maintenance", "Emergency Service"];
    const lower = tradeCategory.toLowerCase();
    for (const [key, tags] of Object.entries(TRADE_SUGGESTIONS)) {
        if (lower.includes(key)) {
            return tags;
        }
    }
    return ["General Maintenance", "Emergency Service", "Consultation", "Repair Work"];
}

function fuzzyMatch(str: string, pattern: string) {
    pattern = pattern.toLowerCase().replace(/\s/g, '');
    str = str.toLowerCase().replace(/\s/g, '');
    let patternIdx = 0;
    let strIdx = 0;
    while (patternIdx < pattern.length && strIdx < str.length) {
        if (pattern[patternIdx] === str[strIdx]) {
            patternIdx++;
        }
        strIdx++;
    }
    return patternIdx === pattern.length;
}

export default function BuilderForm({ profile, onChange, activeTab: externalActiveTab, onTabChange }: { profile: any, onChange: (u: any) => void, activeTab?: 'general' | 'services' | 'display' | 'links', onTabChange?: (tab: 'general' | 'services' | 'display' | 'links') => void }) {
    const [serviceInput, setServiceInput] = useState('');
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const [internalActiveTab, setInternalActiveTab] = useState<'general' | 'services' | 'display' | 'links'>('general');

    const activeTab = externalActiveTab || internalActiveTab;
    const setTab = onTabChange || setInternalActiveTab;

    const tabs = [
        { id: 'general', label: 'General', icon: Settings2 },
        { id: 'services', label: 'Services', icon: Wrench },
        { id: 'display', label: 'Display', icon: ImageIcon },
        { id: 'links', label: 'Links', icon: Link2 },
    ] as const;

    const handleLinkAdd = () => {
        // Gating logic: Free users get max 1 custom link.
        if (!profile.is_premium && (profile.links || []).length >= 1) {
            setIsUpgradeModalOpen(true);
            return;
        }

        const newLinks = [...(profile.links || []), { title: '', url: '' }]
        onChange({ links: newLinks })
    }

    const handleLinkChange = (index: number, key: string, value: string) => {
        const newLinks = [...(profile.links || [])]
        newLinks[index][key] = value
        onChange({ links: newLinks })
    }

    const handleLinkRemove = (index: number) => {
        const newLinks = [...(profile.links || [])]
        newLinks.splice(index, 1)
        onChange({ links: newLinks })
    }

    const handlePhotoAdd = (url: string) => {
        const newPhotos = [...(profile.photo_library_urls || []), url]
        onChange({ photo_library_urls: newPhotos })
    }

    const handlePhotoRemove = (index: number) => {
        const newPhotos = [...(profile.photo_library_urls || [])]
        newPhotos.splice(index, 1)
        onChange({ photo_library_urls: newPhotos })
    }

    return (
        <div className="space-y-6">
            {/* Sticky Tab Navigation */}
            <div className="block sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60 pb-4 pt-2 -mx-2 px-2">
                <div className="flex space-x-2 overflow-x-auto custom-scrollbar pb-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                id={`tutorial-${tab.id}-tab`}
                                onClick={() => setTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${isActive
                                    ? 'bg-zinc-800 text-brand-amber shadow-sm'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-zinc-900/50'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-amber' : ''}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* General Settings */}
            {activeTab === 'general' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Card 1: Brand Identity */}
                    <div className="space-y-6 bg-zinc-900/20 p-6 rounded-3xl border border-zinc-800/40">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <div>
                                <h3 className="text-lg font-heading font-bold text-slate-100">Brand Identity</h3>
                                <p className="text-xs text-slate-400 mt-1">First impressions matter. Set your logo and core business details.</p>
                            </div>
                        </div>

                        {/* Profile Picture Upload */}
                        <div>
                            <ImageUploader
                                currentImageUrl={profile.profile_image_url}
                                onUploadComplete={(url) => {
                                    onChange({ profile_image_url: url });
                                    // Auto-save after image upload
                                    setTimeout(() => {
                                        const saveButton = document.querySelector('[data-save-button]');
                                        if (saveButton) {
                                            (saveButton as HTMLButtonElement).click();
                                        }
                                    }, 500);
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 pl-1">Business Name</label>
                                <input
                                    className="w-full rounded-xl px-4 py-3 bg-zinc-950/80 border border-zinc-800 text-slate-100 font-medium focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-all shadow-inner placeholder-slate-600"
                                    value={profile.business_name || ''}
                                    placeholder="e.g. Apex Plumbing"
                                    onChange={e => onChange({ business_name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 pl-1">Trade Category</label>
                                <input
                                    className="w-full rounded-xl px-4 py-3 bg-zinc-950/80 border border-zinc-800 text-slate-100 font-medium focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-all shadow-inner placeholder-slate-600"
                                    value={profile.trade_category || ''}
                                    placeholder="e.g. Master Plumber"
                                    onChange={e => onChange({ trade_category: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Contact & Bio */}
                    <div className="space-y-6 bg-zinc-900/20 p-6 rounded-3xl border border-zinc-800/40 mt-8">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <div>
                                <h3 className="text-lg font-heading font-bold text-slate-100">Contact & Details</h3>
                                <p className="text-xs text-slate-400 mt-1">How customers will reach out to you.</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 pl-1">Phone Number</label>
                            <input
                                className="w-full rounded-xl px-4 py-3 bg-zinc-950/80 border border-zinc-800 text-slate-100 font-medium focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-all shadow-inner placeholder-slate-600"
                                value={profile.phone_number || ''}
                                placeholder="(555) 123-4567"
                                onChange={e => onChange({ phone_number: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 pl-1">Bio / About Us</label>
                            <textarea
                                className="w-full rounded-xl px-4 py-3 bg-zinc-950/80 border border-zinc-800 text-slate-100 font-medium focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber min-h-[120px] resize-y transition-all shadow-inner placeholder-slate-600 leading-relaxed"
                                value={profile.bio || ''}
                                placeholder="Tell customers about your experience. Why should they hire you?"
                                onChange={e => onChange({ bio: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="space-y-4 bg-zinc-900/20 p-6 rounded-3xl border border-zinc-800/40">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <div>
                                <h3 className="text-lg font-heading font-bold text-slate-100 mb-0.5">Trust & Verification</h3>
                                <p className="text-xs text-slate-400">Build confidence with your customers instantly.</p>
                            </div>
                        </div>

                        <div className="space-y-5 pt-2">
                            <label className="flex items-center justify-between cursor-pointer group bg-zinc-950/50 hover:bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 transition-all">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-bold text-slate-200 group-hover:text-brand-amber transition-colors flex items-center gap-2">
                                        <ShieldCheck className={`w-4 h-4 ${profile.is_licensed_insured ? 'text-brand-amber' : 'text-slate-500'}`} />
                                        Licensed & Insured
                                    </span>
                                    <span className="text-xs text-slate-500">Enable this to display verified credentials on your profile.</span>
                                </div>
                                <div className="relative shrink-0">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={profile.is_licensed_insured || false}
                                        onChange={(e) => onChange({ is_licensed_insured: e.target.checked })}
                                    />
                                    <div className={`block w-12 h-7 rounded-full transition-colors duration-300 ${profile.is_licensed_insured ? 'bg-brand-amber' : 'bg-zinc-800 border border-zinc-700'}`}></div>
                                    <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300 ${profile.is_licensed_insured ? 'translate-x-5' : ''}`}></div>
                                </div>
                            </label>

                            {profile.is_licensed_insured && (
                                <div className="pt-4 border-t border-zinc-800/60 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">

                                    <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                                        <div className="mt-0.5"><AlertCircle className="w-5 h-5 text-amber-500 shrink-0" /></div>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-amber-500">Verification Status:</span>
                                                <span className="text-xs font-black uppercase tracking-wider bg-zinc-950 text-slate-300 px-2 py-0.5 rounded border border-zinc-700">{profile.verification_status || 'Unverified'}</span>
                                            </div>
                                            <p className="text-xs text-amber-500/80 leading-relaxed">This will show as "Self-Reported" on your profile until our team reviews your documents. Verified pros get 3x more leads.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-1.5">State License Number</label>
                                            <div className="flex sm:flex-row flex-col gap-2">
                                                <input
                                                    className="w-full rounded-md px-4 py-2 bg-zinc-950 border border-zinc-800 text-slate-100 focus:outline-none focus:border-brand-amber text-sm transition-colors"
                                                    value={profile.license_number || ''}
                                                    onChange={e => onChange({ license_number: e.target.value })}
                                                    placeholder="e.g. TX-1294812"
                                                />
                                                <a href="https://v2.boardmanagementsystem.com/search/" target="_blank" rel="noopener noreferrer" className="bg-zinc-800 hover:bg-zinc-700 text-slate-300 px-4 py-2 rounded-md font-medium text-sm transition-colors text-center shrink-0">
                                                    Verify
                                                </a>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-1.5 flex items-center gap-2">
                                                Certificate of Insurance
                                                {!profile.is_premium && <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-1.5 py-0.5 rounded border border-brand-amber/20"><Star className="w-2.5 h-2.5 fill-brand-amber" /> PRO</span>}
                                            </label>
                                            <div className="w-full overflow-hidden border border-zinc-800 rounded-xl bg-zinc-950 p-2">
                                                {!profile.is_premium ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsUpgradeModalOpen(true)}
                                                        className="w-full h-32 border-2 border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-brand-amber hover:bg-zinc-800/50 transition-all group"
                                                    >
                                                        <ShieldCheck className="w-8 h-8 text-slate-500 group-hover:text-brand-amber transition-colors" />
                                                        <span className="text-sm font-medium text-slate-400 group-hover:text-slate-300">Upgrade to Upload Documents</span>
                                                    </button>
                                                ) : (
                                                    <ImageUploader
                                                        currentImageUrl={profile.insurance_document_url}
                                                        onUploadComplete={(url) => onChange({ insurance_document_url: url })}
                                                        isGallery={true}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-zinc-800/60">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-1.5 flex items-center gap-2">
                                                BBB Rating (Optional)
                                                {!profile.is_premium && <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-1.5 py-0.5 rounded border border-brand-amber/20"><Star className="w-2.5 h-2.5 fill-brand-amber" /> PRO</span>}
                                            </label>
                                            <select
                                                className="w-full rounded-md px-4 py-2 bg-zinc-950 border border-zinc-800 text-slate-100 focus:outline-none focus:border-brand-amber text-sm transition-colors"
                                                value={profile.bbb_rating || ''}
                                                onChange={e => {
                                                    if (!profile.is_premium) {
                                                        setIsUpgradeModalOpen(true);
                                                        return;
                                                    }
                                                    onChange({ bbb_rating: e.target.value })
                                                }}
                                            >
                                                <option value="">None</option>
                                                <option value="A+">A+</option>
                                                <option value="A">A</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B">B</option>
                                                <option value="B-">B-</option>
                                                <option value="C+">C+</option>
                                                <option value="C">C</option>
                                                <option value="C-">C-</option>
                                                <option value="D+">D+</option>
                                                <option value="D">D</option>
                                                <option value="D-">D-</option>
                                                <option value="F">F</option>
                                            </select>

                                            {profile.bbb_rating && profile.bbb_rating !== '' && (
                                                <div className="mt-4 pt-4 border-t border-zinc-800/40 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 pl-1">BBB Profile Link</label>
                                                    <input
                                                        className="w-full rounded-md px-4 py-2 bg-zinc-950/80 border border-zinc-800 text-slate-100 font-medium focus:outline-none focus:border-brand-amber text-sm transition-colors placeholder-slate-600"
                                                        value={profile.bbb_profile_url || ''}
                                                        placeholder="https://www.bbb.org/..."
                                                        onChange={e => onChange({ bbb_profile_url: e.target.value })}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-1.5 flex items-center gap-2">
                                                OSHA Certification
                                                {!profile.is_premium && <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-1.5 py-0.5 rounded border border-brand-amber/20"><Star className="w-2.5 h-2.5 fill-brand-amber" /> PRO</span>}
                                            </label>
                                            <label className="flex items-center gap-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2 h-[38px] cursor-pointer transition-colors max-w-fit">
                                                <div className="relative shrink-0">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={profile.osha_certified || false}
                                                        onChange={(e) => {
                                                            if (!profile.is_premium) {
                                                                setIsUpgradeModalOpen(true);
                                                                return;
                                                            }
                                                            onChange({ osha_certified: e.target.checked })
                                                        }}
                                                    />
                                                    <div className={`block w-10 h-6 rounded-full transition-colors duration-300 ${profile.osha_certified ? 'bg-brand-amber' : 'bg-zinc-800 border border-zinc-700'}`}></div>
                                                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 ${profile.osha_certified ? 'translate-x-4' : ''}`}></div>
                                                </div>
                                                <span className="text-sm text-slate-300 font-medium">OSHA Certified</span>
                                            </label>

                                            {profile.osha_certified && (
                                                <div className="mt-4 pt-4 border-t border-zinc-800/40 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 pl-1">Upload OSHA Certificate</label>
                                                    <div className="w-full overflow-hidden border border-zinc-800 rounded-xl bg-zinc-950 p-2">
                                                        <ImageUploader
                                                            currentImageUrl={profile.osha_proof_url}
                                                            onUploadComplete={(url) => onChange({ osha_proof_url: url })}
                                                            isGallery={true}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Service Offerings */}
                    <div className="space-y-4 bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/60">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <div>
                                <h3 className="text-lg font-heading font-bold text-slate-100">Service Offerings</h3>
                                <p className="text-xs text-slate-400 mt-1">Select from common services or add your own.</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {/* Input for custom service */}
                            <div className="flex gap-2 relative">
                                <input
                                    id="newServiceInput"
                                    className="flex-1 bg-zinc-950 border border-zinc-800 text-slate-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-brand-amber placeholder-slate-500 shadow-inner transition-colors"
                                    placeholder="Search or type a custom service..."
                                    value={serviceInput}
                                    onChange={(e) => setServiceInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const val = serviceInput.trim();
                                            if (val && !(profile.service_options || []).includes(val)) {
                                                if (!profile.is_premium && (profile.service_options || []).length >= 4) {
                                                    setIsUpgradeModalOpen(true);
                                                    return;
                                                }
                                                const newServices = [...(profile.service_options || []), val];
                                                onChange({ service_options: newServices });
                                                setServiceInput('');
                                            }
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const val = serviceInput.trim();
                                        if (val && !(profile.service_options || []).includes(val)) {
                                            if (!profile.is_premium && (profile.service_options || []).length >= 4) {
                                                setIsUpgradeModalOpen(true);
                                                return;
                                            }
                                            const newServices = [...(profile.service_options || []), val];
                                            onChange({ service_options: newServices });
                                            setServiceInput('');
                                        }
                                    }}
                                    className="bg-brand-amber hover:bg-amber-400 text-zinc-950 px-5 py-3 rounded-xl flex items-center gap-1.5 transition-all font-black text-sm shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                                >
                                    <Plus className="w-4 h-4 stroke-[3]" /> Add
                                </button>
                            </div>

                            {/* Selected Services */}
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Your Services</h4>
                                <div className="flex flex-wrap gap-2 min-h-[40px]">
                                    {(profile.service_options || []).map((service: string, i: number) => (
                                        <div key={i} className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 text-slate-200 hover:border-brand-amber/50 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-colors group">
                                            <span>{service}</span>
                                            <button
                                                type="button"
                                                title="Remove Service"
                                                onClick={() => {
                                                    const newServices = [...(profile.service_options || [])];
                                                    newServices.splice(i, 1);
                                                    onChange({ service_options: newServices });
                                                }}
                                                className="text-slate-500 hover:text-red-400 p-0.5 transition-colors ml-1 opacity-60 group-hover:opacity-100"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}

                                    {(!profile.service_options || profile.service_options.length === 0) && (
                                        <p className="text-sm text-slate-500 w-full text-center py-4 border-2 border-dashed border-zinc-800 rounded-xl">No services added yet. Users will see a general quote form.</p>
                                    )}
                                </div>
                            </div>

                            {/* Smart Suggestions (Empty Search State) */}
                            {serviceInput.trim().length === 0 && (
                                <div className="space-y-3 pt-3 border-t border-zinc-800/60 transition-all duration-300">
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Suggested based on your trade</h4>
                                    <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar pb-2">
                                        {getSuggestedTags(profile.trade_category)
                                            .filter(s => !(profile.service_options || []).includes(s))
                                            .map((service, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => {
                                                        if (!profile.is_premium && (profile.service_options || []).length >= 4) {
                                                            setIsUpgradeModalOpen(true);
                                                            return;
                                                        }
                                                        const newServices = [...(profile.service_options || []), service];
                                                        onChange({ service_options: newServices });
                                                    }}
                                                    className="text-xs font-medium bg-zinc-950 border border-zinc-800 text-slate-400 hover:text-slate-200 hover:border-brand-amber px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 group"
                                                >
                                                    <Plus className="w-3 h-3 text-zinc-600 group-hover:text-brand-amber transition-colors" />
                                                    {service}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {/* Suggested Services (Fuzzy Search Results) */}
                            {serviceInput.trim().length > 0 && (
                                <div className="space-y-3 pt-3 border-t border-zinc-800/60 transition-all duration-300">
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Search Results</h4>
                                    <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar pb-2">
                                        {COMMON_SERVICES
                                            .filter(s => !(profile.service_options || []).includes(s))
                                            .filter(s => fuzzyMatch(s, serviceInput))
                                            .map((service, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => {
                                                        if (!profile.is_premium && (profile.service_options || []).length >= 4) {
                                                            setIsUpgradeModalOpen(true);
                                                            return;
                                                        }
                                                        const newServices = [...(profile.service_options || []), service];
                                                        onChange({ service_options: newServices });
                                                        setServiceInput('');
                                                    }}
                                                    className="text-xs font-medium bg-zinc-900 border border-zinc-800 text-slate-400 hover:text-slate-200 hover:border-brand-amber hover:bg-zinc-800 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 group"
                                                >
                                                    <Plus className="w-3 h-3 text-zinc-600 group-hover:text-brand-amber transition-colors" />
                                                    {service}
                                                </button>
                                            ))}
                                        {COMMON_SERVICES.filter(s => fuzzyMatch(s, serviceInput)).length === 0 && (
                                            <p className="text-xs text-slate-500 italic py-1 pl-1">Press 'Add' to map "{serviceInput}" as a custom service.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Display Tab */}
            {activeTab === 'display' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Page Appearance */}
                    <div className="space-y-4 bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/60">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <div>
                                <h3 className="text-lg font-heading font-bold text-slate-100 flex items-center gap-2">
                                    Page Appearance
                                    {!profile.is_premium && <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-2 py-0.5 rounded-full border border-brand-amber/20"><Star className="w-2.5 h-2.5 fill-brand-amber" /> PRO</span>}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">Customize the background of your public profile.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            {/* Theme Color */}
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 pl-1">Theme Color</label>
                                {!profile.is_premium ? (
                                    <div
                                        onClick={() => setIsUpgradeModalOpen(true)}
                                        className="w-full h-12 rounded-xl border border-dashed border-zinc-700 bg-zinc-950/50 flex items-center justify-center cursor-pointer hover:border-brand-amber hover:bg-zinc-800/50 transition-all group"
                                    >
                                        <span className="text-xs font-medium text-slate-400 group-hover:text-slate-300">Upgrade to unlock colors</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-zinc-700 shrink-0">
                                            <input
                                                type="color"
                                                className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                                                value={profile.theme_color || '#09090b'}
                                                onChange={(e) => onChange({ theme_color: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                className="w-full bg-zinc-950 border border-zinc-800 text-slate-100 px-3 py-2 rounded-lg text-sm font-mono focus:outline-none focus:border-brand-amber"
                                                value={profile.theme_color || '#09090b'}
                                                onChange={(e) => onChange({ theme_color: e.target.value })}
                                                placeholder="#09090b"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Background Image */}
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 pl-1">Background Image</label>
                                <div className="w-full overflow-hidden border border-zinc-800 rounded-xl bg-zinc-950 p-2">
                                    {!profile.is_premium ? (
                                        <button
                                            type="button"
                                            onClick={() => setIsUpgradeModalOpen(true)}
                                            className="w-full h-24 border-2 border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-brand-amber hover:bg-zinc-800/50 transition-all group"
                                        >
                                            <span className="text-xs font-medium text-slate-400 group-hover:text-slate-300 flex items-center gap-1.5">
                                                <Plus className="w-4 h-4" /> Upgrade to upload
                                            </span>
                                        </button>
                                    ) : profile.background_image_url ? (
                                        <div className="relative w-full h-24 rounded-lg overflow-hidden group">
                                            <Image src={profile.background_image_url} alt="Background" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => onChange({ background_image_url: null })}
                                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                                    title="Remove background"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-24">
                                            <ImageUploader
                                                onUploadComplete={(url) => onChange({ background_image_url: url })}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Card Color */}
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 pl-1">Card Color</label>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-zinc-700 shrink-0">
                                        <input
                                            type="color"
                                            className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                                            value={profile.card_color || '#09090b'}
                                            onChange={(e) => onChange({ card_color: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            className="w-full bg-zinc-950 border border-zinc-800 text-slate-100 px-3 py-2 rounded-lg text-sm font-mono focus:outline-none focus:border-brand-amber"
                                            value={profile.card_color || '#09090b'}
                                            onChange={(e) => onChange({ card_color: e.target.value })}
                                            placeholder="#09090b"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Liquid Glass Effect */}
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 pl-1">Liquid Glass Effect</label>
                                <label className="flex items-center justify-between cursor-pointer group bg-zinc-950/50 hover:bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 transition-all">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-bold text-slate-200 group-hover:text-brand-amber transition-colors">
                                            Glassmorphism
                                        </span>
                                        <span className="text-xs text-slate-500">Frosted glass look with blur and glow.</span>
                                    </div>
                                    <div className="relative shrink-0">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={profile.liquid_glass || false}
                                            onChange={(e) => onChange({ liquid_glass: e.target.checked })}
                                        />
                                        <div className={`block w-12 h-7 rounded-full transition-colors duration-300 ${profile.liquid_glass ? 'bg-brand-amber' : 'bg-zinc-800 border border-zinc-700'}`}></div>
                                        <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300 ${profile.liquid_glass ? 'translate-x-5' : ''}`}></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Photo Gallery */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                            <h3 className="text-lg font-heading font-bold text-slate-100 flex items-center gap-2">
                                Photo Gallery
                                {!profile.is_premium && <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-2 py-0.5 rounded-full border border-brand-amber/20"><Star className="w-2.5 h-2.5 fill-brand-amber" /> PRO</span>}
                            </h3>
                        </div>

                        {!profile.is_premium && (
                            <div className="bg-brand-amber/10 border border-brand-amber/20 p-4 rounded-xl flex flex-col gap-2">
                                <p className="text-sm text-brand-amber font-medium">Your photos are saved safely, but you need a Pro account to display them on your public profile.</p>
                                <a href="/checkout" className="text-xs font-bold text-zinc-950 bg-brand-amber hover:bg-amber-400 px-4 py-2 rounded-lg self-start transition-colors">
                                    Upgrade to Pro
                                </a>
                            </div>
                        )}

                        <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 ${!profile.is_premium ? 'opacity-70' : ''}`}>
                            {(profile.photo_library_urls || []).map((url: string, i: number) => (
                                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800 group bg-zinc-900">
                                    <Image src={url} alt={`Gallery Image ${i + 1}`} fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => handlePhotoRemove(i)}
                                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                            title="Remove photo"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add New Photo */}
                            <ImageUploader
                                isGallery
                                onUploadComplete={(url) => handlePhotoAdd(url)}
                            />
                        </div>
                    </div>

                    {/* Before/After Slider - Premium Feature */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                            <h3 className="text-lg font-heading font-bold text-slate-100 flex items-center gap-2">
                                Before & After Slider
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-2 py-0.5 rounded-full border border-brand-amber/20"><Star className="w-2.5 h-2.5 fill-brand-amber" /> PREMIUM</span>
                            </h3>
                            {profile.is_premium && (
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={profile.show_before_after || false}
                                        onChange={(e) => onChange({ show_before_after: e.target.checked })}
                                        className="w-4 h-4 text-brand-amber bg-zinc-900 border-zinc-700 rounded focus:ring-brand-amber focus:ring-2"
                                    />
                                    <span className="text-sm text-slate-400">Show on profile</span>
                                </label>
                            )}
                        </div>

                        {!profile.is_premium ? (
                            <div 
                                onClick={() => setIsUpgradeModalOpen(true)}
                                className="w-full h-32 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-950/50 flex flex-col items-center justify-center cursor-pointer hover:border-brand-amber hover:bg-zinc-800/50 transition-all group"
                            >
                                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-brand-amber/20 transition-colors">
                                    <ImageIcon className="w-6 h-6 text-zinc-400 group-hover:text-brand-amber transition-colors" />
                                </div>
                                <p className="text-sm font-medium text-zinc-400 group-hover:text-slate-300 transition-colors">Before & After Slider</p>
                                <p className="text-xs text-zinc-500 mt-1">Upgrade to Premium to add interactive comparisons</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                                    <input
                                        type="checkbox"
                                        checked={profile.show_before_after || false}
                                        onChange={(e) => onChange({ show_before_after: e.target.checked })}
                                        className="w-4 h-4 text-brand-amber bg-zinc-900 border-zinc-700 rounded focus:ring-brand-amber focus:ring-2"
                                    />
                                    <label className="text-sm text-slate-300 cursor-pointer">
                                        Enable before & after slider on your public profile
                                    </label>
                                </div>

                                {profile.show_before_after && (
                                    <>
                                        {/* Before Image Upload */}
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 pl-1">Before Photo</label>
                                            <div className="flex gap-4">
                                                <div className="flex-1">
                                                    {profile.before_after?.before ? (
                                                        <div className="relative group">
                                                            <img 
                                                                src={profile.before_after.before} 
                                                                alt="Before" 
                                                                className="w-full h-32 object-cover rounded-lg border border-zinc-700"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => onChange({ 
                                                                    before_after: { 
                                                                        ...profile.before_after, 
                                                                        before: null 
                                                                    } 
                                                                })}
                                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <ImageUploader
                                                            onUploadComplete={(url: string) => onChange({ 
                                                                before_after: { 
                                                                    ...profile.before_after, 
                                                                    before: url 
                                                                } 
                                                            })}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        placeholder="Before label (e.g., 'Overgrown Lawn')"
                                                        value={profile.before_after?.before_label || ''}
                                                        onChange={(e) => onChange({ 
                                                            before_after: { 
                                                                ...profile.before_after, 
                                                                before_label: e.target.value 
                                                            } 
                                                        })}
                                                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-slate-200 placeholder:text-zinc-600 focus:outline-none focus:border-brand-amber/50"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* After Image Upload */}
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 pl-1">After Photo</label>
                                            <div className="flex gap-4">
                                                <div className="flex-1">
                                                    {profile.before_after?.after ? (
                                                        <div className="relative group">
                                                            <img 
                                                                src={profile.before_after.after} 
                                                                alt="After" 
                                                                className="w-full h-32 object-cover rounded-lg border border-zinc-700"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => onChange({ 
                                                                    before_after: { 
                                                                        ...profile.before_after, 
                                                                        after: null 
                                                                    } 
                                                                })}
                                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <ImageUploader
                                                            onUploadComplete={(url: string) => onChange({ 
                                                                before_after: { 
                                                                    ...profile.before_after, 
                                                                    after: url 
                                                                } 
                                                            })}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        placeholder="After label (e.g., 'Perfectly Manicured')"
                                                        value={profile.before_after?.after_label || ''}
                                                        onChange={(e) => onChange({ 
                                                            before_after: { 
                                                                ...profile.before_after, 
                                                                after_label: e.target.value 
                                                            } 
                                                        })}
                                                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-slate-200 placeholder:text-zinc-600 focus:outline-none focus:border-brand-amber/50"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {profile.before_after?.before && profile.before_after?.after && (
                                            <div className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                                                <p className="text-xs text-slate-400 text-center">
                                                    ✓ Before & After comparison ready! Preview it in the Preview tab.
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}


            {/* Links Tab */}
            {activeTab === 'links' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                            <h3 className="text-lg font-heading font-bold text-slate-100">Custom Links</h3>
                            <button onClick={handleLinkAdd} className="text-xs bg-zinc-800 hover:bg-zinc-700 text-slate-300 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors font-medium">
                                <Plus className="w-3.5 h-3.5" /> Add Link
                            </button>
                        </div>

                        <div className="space-y-3">
                            {(profile.links || []).map((link: any, i: number) => (
                                <div key={i} className="flex gap-3 items-start bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 relative group transition-colors focus-within:border-brand-amber/50">
                                    <div className="flex-1 space-y-3">
                                        <input
                                            className="w-full bg-transparent border-b border-zinc-800 text-slate-100 px-1 py-1 text-sm focus:outline-none focus:border-brand-amber placeholder-slate-600 transition-colors"
                                            placeholder="Link Title (e.g., Get a Free Estimate)"
                                            value={link.title}
                                            onChange={e => handleLinkChange(i, 'title', e.target.value)}
                                        />
                                        <input
                                            className="w-full bg-transparent border-b border-zinc-800 text-slate-400 px-1 py-1 text-sm focus:outline-none focus:border-brand-amber placeholder-slate-600 transition-colors"
                                            placeholder="URL (e.g., https://calendly.com/...)"
                                            value={link.url}
                                            onChange={e => handleLinkChange(i, 'url', e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleLinkRemove(i)}
                                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                                        title="Remove link"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}

                            {(!profile.links || profile.links.length === 0) && (
                                <div className="p-8 border-2 border-dashed border-zinc-800 rounded-xl text-center">
                                    <p className="text-sm text-slate-500 font-medium">No custom links added yet.</p>
                                    <p className="text-xs text-slate-600 mt-1">Add links to scheduling tools, social media, or review sites.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
            />
        </div>
    )
}
