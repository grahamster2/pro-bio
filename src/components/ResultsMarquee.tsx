'use client';

import { Wrench, ShieldCheck, Zap, Scissors } from 'lucide-react';

const mockProfiles = [
    { name: 'Apex Plumbing', category: 'REPAIR', icon: Wrench, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { name: 'Volt Electrical', category: 'INSTALL', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { name: 'Oasis Landscaping', category: 'MAINTENANCE', icon: Scissors, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { name: 'Titan HVAC', category: 'REPLACE', icon: ShieldCheck, color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { name: 'Summit Roofing', category: 'INSTALL', icon: Wrench, color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' },
];

export function ResultsMarquee() {
    // Duplicate for seamless infinite scrolling
    const cards = [...mockProfiles, ...mockProfiles, ...mockProfiles];

    return (
        <div className="w-full overflow-hidden bg-zinc-950 py-12 relative border-t border-b border-zinc-900 shadow-inner">
            {/* Gradient Fades for edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>

            <div className="flex w-max animate-loop-scroll hover:[animation-play-state:paused] gap-6 px-6">
                {cards.map((profile, i) => {
                    const Icon = profile.icon;
                    return (
                        <div key={i} className="flex-shrink-0 w-64 h-32 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between shadow-md relative overflow-hidden group hover:border-zinc-700 transition-colors">
                            <div className="flex items-start justify-between">
                                <h4 className="font-heading font-bold text-slate-100 text-lg truncate pr-2 group-hover:text-brand-amber transition-colors">
                                    {profile.name}
                                </h4>
                                <div className={`w-8 h-8 rounded-lg ${profile.bg} ${profile.border} border flex items-center justify-center`}>
                                    <Icon className={`w-4 h-4 ${profile.color}`} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 bg-zinc-950 px-2 py-1 rounded-md">
                                    {profile.category}
                                </span>
                                <span className="text-xs font-mono text-emerald-400 opacity-80 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Live
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
