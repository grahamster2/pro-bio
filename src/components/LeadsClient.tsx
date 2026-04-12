'use client';

import { BarChart, MousePointerClick, Users, Calendar, Phone, MapPin, Mail, Navigation2, CheckCircle2, Lock } from 'lucide-react';
import { useState, useTransition } from 'react';
import { markLeadAsContacted } from '@/app/bio/dashboard/leads/actions';
import { LinkClicksChart } from '@/components/LinkClicksChart';
import Link from 'next/link';

export default function LeadsClient({ totalViews, totalClicks, leads, profile, clickStats, isPremium }: any) {
    const [activeTab, setActiveTab] = useState<'all' | 'new'>('all');

    const [isPending, startTransition] = useTransition();

    const newLeads = leads.filter((l: any) => l.status === 'new');
    let displayedLeads = activeTab === 'all' ? leads : newLeads;

    // Only show top 3 leads for free tier
    if (!isPremium) {
        displayedLeads = displayedLeads.slice(0, 3);
    }

    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    };

    const handleMarkContacted = (leadId: string) => {
        startTransition(async () => {
            try {
                await markLeadAsContacted(leadId);
            } catch (err) {
                console.error(err);
            }
        });
    };

    return (
        <div className="flex flex-col gap-8 max-w-5xl">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users className="w-24 h-24 text-blue-500 transform translate-x-6 -translate-y-6" />
                    </div>
                    <div className="flex items-center gap-3 text-blue-400 mb-2 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <BarChart className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">Profile Views</h3>
                    </div>
                    <div className="text-4xl font-black text-slate-100 mt-4 relative z-10">
                        {totalViews}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 relative z-10 font-medium">All time visits</p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <MousePointerClick className="w-24 h-24 text-emerald-500 transform translate-x-6 -translate-y-6" />
                    </div>
                    <div className="flex items-center justify-between mb-2 relative z-10">
                        <div className="flex items-center gap-3 text-emerald-400">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <Navigation2 className="w-4 h-4" />
                            </div>
                            <h3 className="font-bold text-sm uppercase tracking-wider">Link Clicks</h3>
                        </div>
                        {!isPremium && <Lock className="w-4 h-4 text-emerald-500/50" />}
                    </div>

                    {isPremium ? (
                        <>
                            <div className="text-4xl font-black text-slate-100 mt-4 relative z-10">{totalClicks}</div>
                            <p className="text-xs text-slate-500 mt-2 relative z-10 font-medium">Any link interacted with</p>
                        </>
                    ) : (
                        <div className="mt-4 relative z-10 filter blur-[4px] select-none pointer-events-none opacity-50">
                            <div className="text-4xl font-black text-slate-100">84</div>
                            <p className="text-xs text-slate-500 mt-2 font-medium">Any link interacted with</p>
                        </div>
                    )}
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Mail className="w-24 h-24 text-brand-amber transform translate-x-6 -translate-y-6" />
                    </div>
                    <div className="flex items-center justify-between mb-2 relative z-10">
                        <div className="flex items-center gap-3 text-brand-amber">
                            <div className="w-8 h-8 rounded-full bg-brand-amber/10 flex items-center justify-center">
                                <Users className="w-4 h-4" />
                            </div>
                            <h3 className="font-bold text-sm uppercase tracking-wider">Total Leads</h3>
                        </div>
                        {!isPremium && <Lock className="w-4 h-4 text-brand-amber/50" />}
                    </div>

                    {isPremium ? (
                        <>
                            <div className="text-4xl font-black text-slate-100 mt-4 relative z-10">{leads.length}</div>
                            <p className="text-xs text-slate-500 mt-2 relative z-10 font-medium">Quote requests</p>
                        </>
                    ) : (
                        <div className="mt-4 relative z-10 filter blur-[4px] select-none pointer-events-none opacity-50">
                            <div className="text-4xl font-black text-slate-100">12</div>
                            <p className="text-xs text-slate-500 mt-2 font-medium">Quote requests</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Premium Analytics Chart */}
            <LinkClicksChart stats={clickStats} isPremium={isPremium} />

            {/* Leads Manager */}
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[500px]">
                <div className="p-6 border-b border-zinc-800/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-950/60">
                    <div>
                        <h2 className="text-xl font-heading font-bold text-slate-100 flex items-center gap-2">
                            Inbox
                            {newLeads.length > 0 && (
                                <span className="bg-brand-amber text-zinc-950 text-xs font-black px-2 py-0.5 rounded-full">
                                    {newLeads.length} NEW
                                </span>
                            )}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">Manage quote requests from your profile.</p>
                    </div>
                    <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-zinc-800 text-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            All ({leads.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('new')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'new' ? 'bg-zinc-800 text-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Unread ({newLeads.length})
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                    {displayedLeads.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50 py-12">
                            <Mail className="w-16 h-16 text-slate-600 mb-4" />
                            <h3 className="text-lg font-bold text-slate-300 mb-2">No leads to show.</h3>
                            <p className="text-sm text-slate-500 max-w-sm">
                                {activeTab === 'new' ? "You're all caught up! No new leads at the moment." : "When someone requests a quote on your profile, it will appear here."}
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {displayedLeads.map((lead: any) => (
                                <div key={lead.id} className="bg-zinc-950/50 border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 transition-colors group relative">
                                    {lead.status === 'new' && (
                                        <div className="absolute top-5 right-5 w-2.5 h-2.5 bg-brand-amber rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                                    )}
                                    <div className="flex flex-col md:flex-row gap-6 md:items-center">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-black text-slate-100">{lead.name}</h3>
                                                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {formatDate(lead.created_at)}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-4 mt-3">
                                                {isPremium ? (
                                                    <div className="text-sm text-slate-300 flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 shadow-sm">
                                                        <Phone className="w-4 h-4 text-emerald-400" />
                                                        {lead.phone}
                                                    </div>
                                                ) : (
                                                    <div className="text-sm text-slate-500 flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-900 shadow-sm font-mono tracking-widest relative overflow-hidden">
                                                        <Phone className="w-4 h-4 text-slate-600" />
                                                        <span className="opacity-40 blur-[2px]">(212) 555-****</span>
                                                        <Lock className="w-3.5 h-3.5 absolute right-3 text-amber-500" />
                                                    </div>
                                                )}

                                                <div className="text-sm text-slate-300 flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 shadow-sm">
                                                    <MapPin className="w-4 h-4 text-rose-400" />
                                                    Zip: {lead.zip}
                                                </div>
                                                {lead.service_requested && (
                                                    <div className="text-sm text-slate-300 flex items-center gap-2 bg-brand-amber/10 text-brand-amber px-3 py-1.5 rounded-lg border border-brand-amber/20 shadow-sm font-bold">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        {lead.service_requested}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {isPremium ? (
                                                <>
                                                    {lead.status === 'new' && (
                                                        <button
                                                            onClick={() => handleMarkContacted(lead.id)}
                                                            disabled={isPending}
                                                            className="px-4 py-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center gap-1 disabled:opacity-50"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            Mark Done
                                                        </button>
                                                    )}
                                                    <a
                                                        href={`tel:${lead.phone}`}
                                                        className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-slate-300 rounded-xl text-sm font-bold transition-all active:scale-95"
                                                    >
                                                        Call
                                                    </a>
                                                    <a
                                                        href={`sms:${lead.phone}`}
                                                        className="px-4 py-2.5 bg-brand-amber text-zinc-950 rounded-xl text-sm font-black transition-all active:scale-95 shadow-[0_4px_15px_rgba(245,158,11,0.15)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.25)] flex items-center gap-2"
                                                    >
                                                        Message
                                                    </a>
                                                </>
                                            ) : (
                                                <Link
                                                    href="/dashboard/settings"
                                                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 rounded-xl text-sm font-black transition-all active:scale-95 shadow-[0_4px_15px_rgba(245,158,11,0.2)] hover:scale-105 flex items-center gap-2"
                                                >
                                                    <Lock className="w-4 h-4" />
                                                    Unlock Contact
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!isPremium && leads.length > 3 && (
                        <div className="mt-4 p-8 border border-dashed border-zinc-800/80 bg-zinc-950/30 rounded-2xl flex flex-col items-center justify-center text-center">
                            <Lock className="w-10 h-10 text-amber-500/50 mb-3" />
                            <h3 className="text-lg font-bold text-slate-200 mb-1">Plus {leads.length - 3} older leads hidden</h3>
                            <p className="text-sm text-slate-500 max-w-sm mb-4">You have more quote requests waiting. Upgrade to Pro to view your entire lead history.</p>
                            <Link href="/dashboard/settings" className="text-sm font-bold text-brand-amber hover:underline">
                                Upgrade to Pro →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
