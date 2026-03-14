'use client'

import { PhoneCall, ShieldCheck, MessageSquare, Award, HardHat } from 'lucide-react'
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider'
import LiquidGlassOverlay from '@/components/LiquidGlassOverlay'

export default function MobilePreview({ profile, isPremium = false }: { profile: any; isPremium?: boolean }) {
    const links = Array.isArray(profile.links) ? profile.links : []

    return (
        <div
            className="w-[320px] h-[650px] rounded-[2.5rem] border-[10px] border-zinc-900 overflow-hidden relative shadow-2xl flex flex-col ring-1 ring-zinc-800"
            style={{
                backgroundColor: profile.liquid_glass ? undefined : (profile.card_color || '#09090b'),
                ['--card-bg' as string]: profile.card_color || '#09090b',
            } as React.CSSProperties}
        >
            {profile.liquid_glass && (
                <LiquidGlassOverlay width={320} height={650} bezelWidth={30} filterId="lgFilterPreview" />
            )}
            {/* Mobile Status Bar area */}
            <div className="h-6 w-full absolute top-0 z-10 flex justify-center pt-2" style={{ backgroundColor: 'var(--card-bg, #09090b)' }}>
                <div className="w-20 h-5 bg-zinc-900 rounded-full"></div>
            </div>

            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-12 pb-24 relative" style={{ backgroundColor: 'var(--card-bg, #09090b)' }}>
                {/* Cover Area */}
                <div className="px-6 pt-4 pb-8 flex flex-col items-center text-center border-b border-white/5" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08), transparent)' }}>
                    <div className="w-24 h-24 rounded-2xl bg-zinc-800 border-2 border-brand-amber flex items-center justify-center text-4xl font-heading font-black text-slate-300 mb-5 shadow-lg shadow-brand-amber/5">
                        {profile.business_name ? profile.business_name.charAt(0).toUpperCase() : '?'}
                    </div>

                    <h1 className="text-2xl font-heading font-black text-slate-100 flex items-center justify-center gap-2 leading-tight">
                        {profile.business_name || 'Your Business Name'}
                    </h1>

                    <p className="text-brand-amber font-bold text-sm mt-3 mb-4 bg-brand-amber/10 px-4 py-1.5 rounded-full border border-brand-amber/20 tracking-wide uppercase">
                        {profile.trade_category || 'Trade Category'}
                    </p>

                    {profile.license_number && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800 shadow-sm mt-1">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            Lic: <span className="font-mono text-slate-300">{profile.license_number}</span>
                        </div>
                    )}

                    {/* Job Site Stamp Placeholder */}
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full shadow-inner">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        Job in Arlington • 2h ago
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="px-6 py-5 flex justify-between gap-2 border-b border-white/5" style={{ backgroundColor: 'var(--card-bg, #09090b)' }}>
                    <div className={`flex flex-col items-center gap-1.5 flex-1 ${!profile.is_licensed_insured ? 'opacity-40 grayscale' : ''}`}>
                        <div className={`w-9 h-9 rounded-full border flex items-center justify-center shadow-inner ${profile.is_licensed_insured && profile.verification_status === 'Verified' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-zinc-900 border-zinc-800'}`}>
                            <ShieldCheck className={`w-4 h-4 ${profile.is_licensed_insured && profile.verification_status === 'Verified' ? 'text-emerald-400' : 'text-brand-amber'}`} />
                        </div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">
                            {profile.is_licensed_insured && profile.verification_status !== 'Verified' ? 'Self-Reported\nLicensed' : 'Licensed\nInsured'}
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 flex-1 opacity-40 grayscale">
                        <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                            <Award className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">A+ BBB<br />Rating</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 flex-1">
                        <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                            <HardHat className="w-4 h-4 text-yellow-500" />
                        </div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">OSHA<br />Certified</span>
                    </div>
                </div>

                {/* Bio */}
                <div className="px-6 py-8 border-b border-white/5" style={{ backgroundColor: 'color-mix(in srgb, var(--card-bg, #09090b) 80%, transparent)' }}>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">About Us</h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans opacity-90">
                        {profile.bio || 'Tell your customers why they should hire you. What makes your service the best?'}
                    </p>
                </div>

                {/* Before/After Slider - Only show if enabled */}
                {profile.show_before_after && (
                    <BeforeAfterSlider 
                        isPremium={isPremium}
                        beforeImage={profile.before_after?.before}
                        afterImage={profile.before_after?.after}
                        beforeLabel={profile.before_after?.before_label || "Before"}
                        afterLabel={profile.before_after?.after_label || "After"}
                    />
                )}

                {/* Links */}
                {links.length > 0 && (
                    <div className="px-6 py-8 space-y-3" style={{ backgroundColor: 'var(--card-bg, #09090b)' }}>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Links</h3>
                        {links.map((link: any, i: number) => {
                            let domain = link.url;
                            try { domain = new URL(link.url).hostname; } catch { }

                            return (
                                <a key={i} href={link.url || '#'} onClick={e => e.preventDefault()} className="flex items-center w-full py-4 px-4 bg-zinc-900 rounded-xl text-sm font-bold text-slate-100 border border-zinc-800 shadow-sm relative overflow-hidden group hover:border-zinc-700 transition-colors">
                                    <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="" className="w-5 h-5 mr-3 rounded-sm" />
                                    <span className="relative z-10 flex-1 text-center pr-8">{link.title || 'Link Title'}</span>
                                </a>
                            );
                        })}
                    </div>
                )}

                {/* Disclaimer */}
                <div className="px-6 py-8 text-center mt-auto" style={{ backgroundColor: 'color-mix(in srgb, var(--card-bg, #09090b) 80%, transparent)' }}>
                    <p className="text-[9px] leading-relaxed text-slate-500 opacity-80">
                        Rovult is a platform for pros to display credentials. We do not guarantee the accuracy or validity of any badges, licenses, insurance, BBB ratings, or OSHA certifications. It is entirely up to the consumer to verify all credentials directly with the provider before starting work.
                    </p>
                </div>
            </div>

            {/* Fixed Bottom Action */}
            <div className="absolute bottom-0 left-0 w-full p-4 pt-12 pb-6 border-t border-white/5 z-20" style={{ background: 'linear-gradient(to top, var(--card-bg, #09090b), var(--card-bg, #09090b), transparent)' }}>
                <div className="grid grid-cols-2 gap-2">
                    <button className="h-12 flex items-center justify-center gap-1.5 bg-brand-amber text-zinc-950 rounded-xl font-black text-sm shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:scale-[1.02] transition-transform">
                        <PhoneCall className="w-4 h-4 fill-zinc-950" />
                        CALL
                    </button>
                    <button className="h-12 flex items-center justify-center gap-1.5 bg-zinc-800 text-slate-100 border border-zinc-700 rounded-xl font-black text-sm shadow-lg hover:scale-[1.02] transition-transform">
                        <MessageSquare className="w-4 h-4 fill-slate-100/20" />
                        TEXT
                    </button>
                </div>
            </div>

            {profile.is_emergency_available && (
                <div className="absolute top-12 left-4 flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-2.5 py-1.5 rounded-full backdrop-blur-sm shadow-sm z-20">
                    <div className="relative flex items-center justify-center w-2 h-2">
                        <span className="absolute w-full h-full rounded-full bg-red-500 animate-ping opacity-75"></span>
                        <span className="relative w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    </div>
                    <span className="text-[10px] font-black text-red-500 tracking-widest uppercase">24/7 Service</span>
                </div>
            )}
        </div>
    )
}
