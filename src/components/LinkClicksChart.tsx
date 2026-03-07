'use client';

import { Lock, MousePointerClick } from 'lucide-react';
import Link from 'next/link';

export function LinkClicksChart({ stats, isPremium }: { stats: Record<string, number>, isPremium: boolean }) {
    const total = Object.values(stats).reduce((a, b) => a + b, 0);
    const sortedStats = Object.entries(stats).sort((a, b) => b[1] - a[1]);

    if (total === 0) return null;

    return (
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
            <div className="flex items-center gap-3 text-emerald-400 mb-6">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <MousePointerClick className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wider">Link Click Breakdown</h3>
            </div>

            <div className="relative">
                <div className={`space-y-4 ${!isPremium ? 'blur-sm select-none pointer-events-none opacity-50' : ''}`}>
                    {sortedStats.map(([type, count]) => {
                        const percentage = Math.round((count / total) * 100);
                        return (
                            <div key={type} className="flex items-center gap-4">
                                <div className="w-24 text-sm font-bold text-slate-400 capitalize truncate" title={type}>
                                    {type}
                                </div>
                                <div className="flex-1 h-3 bg-zinc-950 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500/50 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <div className="w-12 text-right text-sm font-black text-slate-200">
                                    {count}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {!isPremium && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-zinc-900/40 backdrop-blur-[2px] rounded-xl p-4 text-center">
                        <div className="w-12 h-12 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mb-3">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h4 className="text-white font-bold mb-1">Detailed Analytics Locked</h4>
                        <p className="text-xs text-slate-400 mb-4 max-w-[200px]">Upgrade to see exactly which links are converting the most visitors.</p>
                        <Link href="/dashboard/settings" className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-black rounded-xl text-xs shadow-lg hover:scale-105 transition-transform">
                            Upgrade to Pro
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
