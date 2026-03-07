import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { PhoneCall, ShieldCheck, Mail, MessageSquare, Award, HardHat, Wrench, Hammer, Zap, Droplet } from 'lucide-react'
import Link from 'next/link'
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider'

export default async function PublicProfilePage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const supabase = await createClient()

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (!profile) {
        notFound()
    }

    const links = Array.isArray(profile.links) ? profile.links : []

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center py-12 px-4 selection:bg-brand-amber selection:text-zinc-950 font-sans">
            <div className="w-full max-w-[420px] bg-zinc-950 rounded-[2.5rem] overflow-hidden relative shadow-2xl flex flex-col ring-1 ring-zinc-800 pb-24 mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">

                {/* Cover Area */}
                <div className="px-8 pt-10 pb-10 flex flex-col items-center text-center border-b border-zinc-900 bg-gradient-to-b from-zinc-900/50 to-zinc-950 relative">

                    {profile.is_emergency_available && (
                        <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm z-20">
                            <div className="relative flex items-center justify-center w-2.5 h-2.5">
                                <span className="absolute w-full h-full rounded-full bg-red-500 animate-ping opacity-75"></span>
                                <span className="relative w-2 h-2 rounded-full bg-red-500"></span>
                            </div>
                            <span className="text-[11px] font-black text-red-500 tracking-widest uppercase">24/7 Service</span>
                        </div>
                    )}

                    <div className="w-28 h-28 mt-8 rounded-3xl bg-zinc-800 border-2 border-brand-amber flex items-center justify-center text-5xl font-heading font-black text-slate-300 mb-6 shadow-lg shadow-brand-amber/5">
                        {profile.business_name ? profile.business_name.charAt(0).toUpperCase() : '?'}
                    </div>

                    <h1 className="text-3xl font-heading font-black text-slate-100 flex items-center justify-center gap-2 leading-tight">
                        {profile.business_name}
                    </h1>

                    <p className="text-brand-amber font-bold text-sm mt-4 mb-5 bg-brand-amber/10 px-5 py-2 rounded-full border border-brand-amber/20 tracking-wide uppercase">
                        {profile.trade_category || 'Trade Professional'}
                    </p>

                    {profile.license_number && (
                        <div className="flex items-center gap-2 text-sm text-slate-400 bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800 shadow-sm mt-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            License: <span className="font-mono text-slate-300 font-medium">{profile.license_number}</span>
                        </div>
                    )}

                    {/* Job Site Stamp Placeholder */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-4 py-2.5 rounded-full shadow-inner">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Recent job completed in Arlington • 2h ago
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="px-8 py-6 bg-zinc-950 flex justify-center gap-6 border-b border-zinc-900">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                            <ShieldCheck className="w-6 h-6 text-brand-amber" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">Licensed<br />& Insured</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                            <Award className="w-6 h-6 text-blue-400" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">A+ BBB<br />Rating</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                            <HardHat className="w-6 h-6 text-yellow-500" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">OSHA<br />Certified</span>
                    </div>
                </div>

                {/* Bio */}
                {profile.bio && (
                    <div className="px-8 py-8 border-b border-zinc-900 bg-zinc-950/50">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">About</h3>
                        <p className="text-base text-slate-300 leading-relaxed font-sans opacity-95">
                            {profile.bio}
                        </p>
                    </div>
                )}

                <BeforeAfterSlider />

                {/* Links */}
                {links.length > 0 && (
                    <div className="px-8 py-8 space-y-4 bg-zinc-950">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-5">Verified Links</h3>
                        {links.map((link: any, i: number) => (
                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-4 px-6 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-sm font-bold text-slate-100 border border-zinc-800 transition-all hover:border-zinc-700 shadow-sm relative overflow-hidden group">
                                <span className="relative z-10">{link.title}</span>
                            </a>
                        ))}
                    </div>
                )}

                {/* Email Form / Request Quote Area */}
                <div className="px-8 py-8 bg-zinc-950 border-t border-zinc-900">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Request a Quote
                    </h3>
                    <form className="space-y-4" action={async () => { 'use server'; /* Edge function integration here later */ }}>

                        {/* Visual Selectors */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">1. What do you need?</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button type="button" className="flex flex-col items-center justify-center gap-2 bg-brand-amber/10 border-2 border-brand-amber text-brand-amber h-24 rounded-xl transition-all shadow-inner">
                                    <Wrench className="w-7 h-7" />
                                    <span className="text-xs font-black tracking-wide">REPAIR</span>
                                </button>
                                <button type="button" className="flex flex-col items-center justify-center gap-2 bg-zinc-900 border-2 border-zinc-800 text-slate-400 h-24 rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-all">
                                    <Hammer className="w-7 h-7" />
                                    <span className="text-xs font-bold tracking-wide">INSTALL</span>
                                </button>
                                <button type="button" className="flex flex-col items-center justify-center gap-2 bg-zinc-900 border-2 border-zinc-800 text-slate-400 h-24 rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-all">
                                    <Zap className="w-7 h-7" />
                                    <span className="text-xs font-bold tracking-wide">REPLACE</span>
                                </button>
                                <button type="button" className="flex flex-col items-center justify-center gap-2 bg-zinc-900 border-2 border-zinc-800 text-slate-400 h-24 rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-all">
                                    <Droplet className="w-7 h-7" />
                                    <span className="text-xs font-bold tracking-wide">MAINTENANCE</span>
                                </button>
                            </div>
                        </div>

                        {/* Text Inputs */}
                        <div className="space-y-3 pt-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">2. Your Details</label>
                            <input placeholder="Full Name" required className="w-full bg-zinc-900 border border-zinc-800 px-4 py-4 rounded-xl text-base font-medium text-slate-200 focus:outline-none focus:border-brand-amber transition-colors" />
                            <div className="grid grid-cols-2 gap-3">
                                <input placeholder="Phone" required className="w-full bg-zinc-900 border border-zinc-800 px-4 py-4 rounded-xl text-base font-medium text-slate-200 focus:outline-none focus:border-brand-amber transition-colors" />
                                <input placeholder="Zip Code" required className="w-full bg-zinc-900 border border-zinc-800 px-4 py-4 rounded-xl text-base font-medium text-slate-200 focus:outline-none focus:border-brand-amber transition-colors" />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="relative w-full h-16 bg-brand-amber text-zinc-950 rounded-xl font-black text-xl shadow-[0_4px_20px_rgba(245,158,11,0.2)] hover:scale-[1.02] transition-transform overflow-hidden group">
                                <span className="absolute inset-0 bg-white/20 animate-pulse"></span>
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Get My Quote
                                </span>
                            </button>
                            <p className="text-[10px] text-slate-600 text-center mt-3 font-medium">Quotes are sent securely to the professional.</p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Floating Action Button */}
            {profile.phone_number && (
                <div className="fixed bottom-0 left-0 w-full p-4 pb-6 md:p-6 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent pt-12 z-50 flex justify-center pointer-events-none">
                    <div className="pointer-events-auto w-full max-w-[400px] grid grid-cols-2 gap-3">
                        <a href={`tel:${profile.phone_number}`} className="h-16 flex items-center justify-center gap-2 bg-brand-amber text-zinc-950 rounded-2xl font-black text-[17px] shadow-[0_4px_30px_rgba(245,158,11,0.3)] hover:scale-[1.02] hover:bg-amber-400 transition-all">
                            <PhoneCall className="w-5 h-5 fill-zinc-950" />
                            CALL
                        </a>
                        <a href={`sms:${profile.phone_number}`} className="h-16 flex items-center justify-center gap-2 bg-zinc-800 text-slate-100 border border-zinc-700 rounded-2xl font-black text-[17px] shadow-lg hover:scale-[1.02] hover:bg-zinc-700 transition-all">
                            <MessageSquare className="w-5 h-5 fill-slate-100/20" />
                            TEXT
                        </a>
                    </div>
                </div>
            )}

            <div className="mt-12 text-center pb-24">
                <Link href="/" className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1.5 opacity-60 hover:opacity-100">
                    Powered by <span className="text-brand-amber font-heading text-sm">PROBIO</span>
                </Link>
            </div>
        </div>
    )
}
