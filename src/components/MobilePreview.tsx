'use client'

import { PhoneCall, ShieldCheck, MessageSquare, Award, HardHat } from 'lucide-react'
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider'

export default function MobilePreview({ profile }: { profile: any }) {
    const links = Array.isArray(profile.links) ? profile.links : []

    return (
        <div className="w-[320px] h-[650px] bg-zinc-950 rounded-[2.5rem] border-[10px] border-zinc-900 overflow-hidden relative shadow-2xl flex flex-col ring-1 ring-zinc-800">
            {/* Mobile Status Bar area */}
            <div className="h-6 w-full bg-zinc-950 absolute top-0 z-10 flex justify-center pt-2">
                <div className="w-20 h-5 bg-zinc-900 rounded-full"></div>
            </div>

            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-12 pb-24 bg-zinc-950 relative">
                {/* Cover Area */}
                <div className="px-6 pt-4 pb-8 flex flex-col items-center text-center border-b border-zinc-900 bg-gradient-to-b from-zinc-900/50 to-zinc-950">
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
                <div className="px-6 py-5 bg-zinc-950 flex justify-between gap-2 border-b border-zinc-900">
                    <div className="flex flex-col items-center gap-1.5 flex-1">
                        <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                            <ShieldCheck className="w-4 h-4 text-brand-amber" />
                        </div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">Licensed<br />Insured</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 flex-1">
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
                <div className="px-6 py-8 border-b border-zinc-900 bg-zinc-950/50">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">About Us</h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans opacity-90">
                        {profile.bio || 'Tell your customers why they should hire you. What makes your service the best?'}
                    </p>
                </div>

                <BeforeAfterSlider />

                {/* Links */}
                {links.length > 0 && (
                    <div className="px-6 py-8 space-y-3 bg-zinc-950">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Links</h3>
                        {links.map((link: any, i: number) => (
                            <a key={i} href={link.url || '#'} onClick={e => e.preventDefault()} className="flex justify-center w-full py-4 px-4 bg-zinc-900 rounded-xl text-sm font-bold text-slate-100 border border-zinc-800 shadow-sm relative overflow-hidden group">
                                <span className="relative z-10">{link.title || 'Link Title'}</span>
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {/* Fixed Bottom Action */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pt-12 pb-6 border-t border-zinc-900/50 z-20">
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
