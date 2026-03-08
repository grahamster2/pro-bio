import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'
import { PhoneCall, ShieldCheck, Mail, MessageSquare, Award, HardHat, Wrench, Hammer, Zap, Droplet } from 'lucide-react'
import Link from 'next/link'
import { QuoteForm } from '@/components/QuoteForm'
import ViewTracker from '@/components/ViewTracker'
import TrackedLink from '@/components/TrackedLink'
import LiquidGlassOverlay from '@/components/LiquidGlassOverlay'

function getContrastColor(hexColor: string | null): string {
    if (!hexColor) return 'text-zinc-500';
    const hex = hexColor.replace('#', '');
    if (hex.length !== 6 && hex.length !== 3) return 'text-zinc-500';
    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16);
    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16);
    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? 'text-zinc-900 font-semibold' : 'text-slate-200';
}

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug
    const supabase = await createClient()

    const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('slug', slug)
        .single()

    const profile = data as any;

    if (!profile) {
        return {
            title: 'Profile Not Found',
        }
    }

    const title = profile.business_name || 'Professional Services'
    const description = profile.bio
        ? profile.bio.substring(0, 155) + (profile.bio.length > 155 ? '...' : '')
        : `Check out ${title} on Rovult.`

    const previousImages = (await parent).openGraph?.images || []

    // Use their profile picture if they have one, otherwise fallback to the global OG image
    const ogImage = profile.profile_image_url ? profile.profile_image_url : '/og-image.png'

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: `https://rovult.com/${slug}`,
            images: [
                {
                    url: ogImage,
                    width: profile.profile_image_url ? 800 : 1200,
                    height: profile.profile_image_url ? 800 : 630,
                    alt: title,
                },
                ...previousImages,
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [ogImage],
        },
    }
}

export default async function PublicProfilePage(props: Props) {
    const params = await props.params;
    const supabase = await createClient()

    const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('slug', params.slug)
        .single()

    const profile = data as any;

    if (!profile) {
        notFound()
    }

    const links = Array.isArray(profile.links) ? profile.links : []

    const hasCustomBgColor = profile.is_premium && profile.theme_color;
    const hasCustomBgImage = profile.is_premium && profile.background_image_url;
    const textColorClass = hasCustomBgImage ? 'text-slate-200 drop-shadow-sm' : getContrastColor(profile.theme_color);

    return (
        <div
            className={`min-h-screen flex flex-col items-center py-12 px-4 selection:bg-brand-amber selection:text-zinc-950 font-sans relative ${!hasCustomBgColor && !hasCustomBgImage ? 'bg-zinc-950' : ''}`}
            style={(hasCustomBgColor && !hasCustomBgImage) ? { backgroundColor: profile.theme_color } : undefined}
        >
            {hasCustomBgImage && (
                <div className="fixed inset-0 z-[-1]">
                    <img
                        src={profile.background_image_url}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
                </div>
            )}

            <ViewTracker profileId={profile.id} />
            <div
                className="w-full max-w-[420px] rounded-[2.5rem] overflow-hidden relative shadow-2xl flex flex-col ring-1 ring-zinc-800 pb-24 mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500"
                style={{
                    backgroundColor: profile.liquid_glass ? undefined : (profile.card_color || '#09090b'),
                    ['--card-bg' as string]: profile.card_color || '#09090b',
                } as React.CSSProperties}
            >
                {profile.liquid_glass && (
                    <LiquidGlassOverlay bgColor={profile.theme_color || '#09090b'} />
                )}

                {/* Cover Area */}
                <div className="px-8 pt-10 pb-10 flex flex-col items-center text-center border-b border-white/5 relative" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), var(--card-bg, #09090b))' }}>

                    {profile.is_premium && profile.is_emergency_available && (
                        <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm z-20">
                            <div className="relative flex items-center justify-center w-2.5 h-2.5">
                                <span className="absolute w-full h-full rounded-full bg-red-500 animate-ping opacity-75"></span>
                                <span className="relative w-2 h-2 rounded-full bg-red-500"></span>
                            </div>
                            <span className="text-[11px] font-black text-red-500 tracking-widest uppercase">24/7 Service</span>
                        </div>
                    )}

                    <div className="w-28 h-28 mt-8 rounded-3xl bg-zinc-800 border-2 border-brand-amber flex items-center justify-center text-5xl font-heading font-black text-slate-300 mb-6 shadow-lg shadow-brand-amber/5 overflow-hidden">
                        {profile.profile_image_url ? (
                            <img src={profile.profile_image_url || undefined} alt={profile.business_name || 'Profile'} className="w-full h-full object-cover" />
                        ) : (
                            profile.business_name ? profile.business_name.charAt(0).toUpperCase() : '?'
                        )}
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

                </div>

                {/* Trust Badges */}
                <div className="px-8 py-6 flex justify-center gap-4 border-b border-white/5" style={{ backgroundColor: 'var(--card-bg, #09090b)' }}>
                    <div className={`flex flex-col items-center gap-2 max-w-[100px] ${!profile.is_licensed_insured ? 'opacity-40 grayscale' : ''}`}>
                        <div className={`w-12 h-12 rounded-full border flex items-center justify-center shadow-inner ${(profile.is_premium && profile.is_licensed_insured && profile.verification_status === 'Verified') ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-zinc-900 border-zinc-800'}`}>
                            <ShieldCheck className={`w-6 h-6 ${(profile.is_premium && profile.is_licensed_insured && profile.verification_status === 'Verified') ? 'text-emerald-400' : 'text-brand-amber'}`} />
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">
                            {(profile.is_premium && profile.is_licensed_insured && profile.verification_status === 'Verified') ? 'Verified' : 'Licensed'}
                            <br />
                            <span className="text-[8px] opacity-70 mt-0.5 block">
                                {(profile.is_premium && profile.is_licensed_insured && profile.verification_status === 'Verified') ? '(Verified by Rovult)' : '(Self-Reported)'}
                            </span>
                        </span>
                    </div>
                    {profile.bbb_rating && (
                        profile.bbb_profile_url ? (
                            <a href={profile.bbb_profile_url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group hover:opacity-90 transition-opacity cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                    <Award className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">
                                    {profile.bbb_rating} BBB<br />Rating
                                    <span className="block text-[8px] text-blue-400/80 mt-0.5 group-hover:text-blue-300">Verify ↗</span>
                                </span>
                            </a>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center shadow-inner">
                                    <Award className="w-6 h-6 text-blue-400" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">{profile.bbb_rating} BBB<br />Rating</span>
                            </div>
                        )
                    )}
                    {profile.osha_certified && (
                        profile.osha_proof_url ? (
                            <a href={profile.osha_proof_url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group hover:opacity-90 transition-opacity cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-yellow-500/30 bg-yellow-500/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                    <HardHat className="w-6 h-6 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">
                                    OSHA<br />Certified
                                    <span className="block text-[8px] text-yellow-500/80 mt-0.5 group-hover:text-yellow-400">View ↗</span>
                                </span>
                            </a>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full border border-yellow-500/30 bg-yellow-500/10 flex items-center justify-center shadow-inner">
                                    <HardHat className="w-6 h-6 text-yellow-500" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">OSHA<br />Certified</span>
                            </div>
                        )
                    )}
                </div>

                {/* Bio */}
                {profile.bio && (
                    <div className="px-8 py-8 border-b border-white/5" style={{ backgroundColor: 'color-mix(in srgb, var(--card-bg, #09090b) 80%, transparent)' }}>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">About</h3>
                        <p className="text-base text-slate-300 leading-relaxed font-sans opacity-95">
                            {profile.bio}
                        </p>
                    </div>
                )}

                {/* Conversion Badges */}
                {profile.is_premium && (profile.accepts_credit_cards || profile.offers_financing || profile.free_consultations) && (
                    <div className="px-8 py-6 border-b border-white/5 flex flex-wrap gap-2" style={{ backgroundColor: 'var(--card-bg, #09090b)' }}>
                        {profile.accepts_credit_cards && (
                            <span className="text-xs font-bold text-brand-amber bg-brand-amber/10 border border-brand-amber/20 px-3 py-1.5 rounded-md flex items-center gap-1.5 uppercase tracking-wide">
                                <Zap className="w-3 h-3" /> Accepts Credit Cards
                            </span>
                        )}
                        {profile.offers_financing && (
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-md flex items-center gap-1.5 uppercase tracking-wide">
                                <Zap className="w-3 h-3" /> Financing Available
                            </span>
                        )}
                        {profile.free_consultations && (
                            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-md flex items-center gap-1.5 uppercase tracking-wide">
                                <Zap className="w-3 h-3" /> Free Estimates
                            </span>
                        )}
                    </div>
                )}

                {/* Photo Gallery */}
                {profile.is_premium && profile.photo_library_urls && profile.photo_library_urls.length > 0 && (
                    <div className="px-8 py-8 border-b border-white/5" style={{ backgroundColor: 'var(--card-bg, #09090b)' }}>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-5">Job Gallery</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {profile.photo_library_urls.map((url: string, i: number) => (
                                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-sm relative group">
                                    <img src={url} alt={`Job Photo ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Services */}
                {profile.is_premium && profile.service_options && profile.service_options.length > 0 && (
                    <div className="px-8 py-8 border-b border-white/5" style={{ backgroundColor: 'color-mix(in srgb, var(--card-bg, #09090b) 80%, transparent)' }}>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-5">Our Services</h3>
                        <div className="flex flex-col gap-3">
                            {profile.service_options.map((service: string, i: number) => (
                                <div key={i} className="bg-zinc-900 border border-zinc-800 text-sm px-4 py-3 rounded-xl text-slate-300 font-bold flex items-center gap-3 relative overflow-hidden shadow-sm">
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-amber rounded-l-xl"></div>
                                    {service}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Links */}
                {links.length > 0 && (
                    <div className="px-8 py-8 space-y-4" style={{ backgroundColor: 'var(--card-bg, #09090b)' }}>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-5">Verified Links</h3>
                        {links.map((link: any, i: number) => {
                            let domain = link.url;
                            try { domain = new URL(link.url).hostname; } catch { }

                            return (
                                <TrackedLink
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center w-full py-4 px-6 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-sm font-bold text-slate-100 border border-zinc-800 transition-all hover:border-zinc-700 shadow-sm relative overflow-hidden group"
                                    profileId={profile.id}
                                    linkType="custom"
                                >
                                    <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="" className="w-5 h-5 mr-3 rounded-sm" />
                                    <span className="relative z-10 flex-1 text-center pr-8">{link.title}</span>
                                </TrackedLink>
                            );
                        })}
                    </div>
                )}

                <QuoteForm
                    profileId={profile.id}
                    contractorName={profile.business_name || 'Professional'}
                    contractorPhone={profile.phone_number}
                    serviceOptions={profile.service_options || []}
                />
            </div>

            {/* Floating Action Button */}
            {profile.phone_number && (
                <div className="fixed bottom-0 left-0 w-full p-4 pb-6 z-50 flex justify-center pointer-events-none">
                    <div className="w-full max-w-[420px] grid grid-cols-2 gap-3 px-4 pointer-events-auto">
                        <TrackedLink
                            href={`tel:${profile.phone_number}`}
                            className="h-16 flex items-center justify-center gap-2 bg-brand-amber text-zinc-950 rounded-2xl font-black text-[17px] shadow-[0_4px_30px_rgba(245,158,11,0.3)] hover:scale-[1.02] hover:bg-amber-400 transition-all"
                            profileId={profile.id}
                            linkType="call"
                        >
                            <PhoneCall className="w-5 h-5 fill-zinc-950" />
                            CALL
                        </TrackedLink>
                        <TrackedLink
                            href={`sms:${profile.phone_number}`}
                            className="h-16 flex items-center justify-center gap-2 bg-zinc-800 text-slate-100 border border-zinc-700 rounded-2xl font-black text-[17px] shadow-lg hover:scale-[1.02] hover:bg-zinc-700 transition-all"
                            profileId={profile.id}
                            linkType="text"
                        >
                            <MessageSquare className="w-5 h-5 fill-slate-100/20" />
                            TEXT
                        </TrackedLink>
                    </div>
                </div>
            )}

            <div className="mt-12 text-center pb-8 px-8 max-w-sm mx-auto relative z-10">
                <p className={`text-[10px] mb-6 leading-relaxed ${textColorClass}`}>
                    Rovult provides a platform for pros to display their credentials. We recommend all users verify licenses and insurance directly with the provider before starting work.
                </p>
            </div>

            {/* "Powered by Rovult" Viral Loop - Only shown to Free Users */}
            {!profile.is_premium && (
                <div className="text-center pb-24 px-8 mx-auto w-full max-w-[420px] -mt-4">
                    <Link href="/" className="inline-flex items-center gap-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 px-5 py-2.5 rounded-full transition-all group shadow-sm">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
                            Powered by <span className="text-xs font-black font-heading text-brand-amber tracking-wider">ROVULT</span>
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                        <span className="text-[11px] font-bold text-slate-300 underline underline-offset-2 decoration-zinc-600 group-hover:decoration-slate-400">Create yours for free</span>
                    </Link>
                </div>
            )}
        </div>
    )
}
