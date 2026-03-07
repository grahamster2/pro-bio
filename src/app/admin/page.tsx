import { getAllVerifications, updateVerificationStatus } from "./actions";
import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import { CheckCircle, XCircle, ExternalLink, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
    const { userId } = await auth();

    if (!userId || userId !== process.env.ADMIN_USER_ID) {
        redirect('/'); // Or to a 'not authorized' page
    }

    const allProfiles = await getAllVerifications();
    const pendingProfiles = allProfiles.filter(p => p.verification_status === 'Unverified');
    const verifiedProfiles = allProfiles.filter(p => p.verification_status === 'Verified');
    const rejectedProfiles = allProfiles.filter(p => p.verification_status === 'Rejected');

    const ProfileCard = ({ profile, type }: { profile: any, type: 'pending' | 'verified' | 'rejected' }) => (
        <div key={profile.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-4">
            <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-100">{profile.business_name}</h2>
                    <span className="bg-zinc-800 text-slate-300 text-xs px-2.5 py-1 rounded border border-zinc-700 font-medium">
                        {profile.trade_category}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50">
                    <div>
                        <span className="text-slate-500 block mb-1 uppercase tracking-wider text-[10px] font-bold">State License:</span>
                        <span className="font-mono text-slate-300">{profile.license_number || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block mb-1 uppercase tracking-wider text-[10px] font-bold">Insurance COI:</span>
                        {profile.insurance_document_url ? (
                            <a href={profile.insurance_document_url} target="_blank" rel="noopener noreferrer" className="text-brand-amber hover:text-amber-400 flex items-center gap-1.5 transition-colors font-medium">
                                View Document <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        ) : (
                            <span className="text-slate-600 italic">Not provided</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-zinc-800 pt-4 md:pt-0 md:pl-6">
                {type !== 'verified' && (
                    <form action={async () => {
                        'use server'
                        await updateVerificationStatus(profile.user_id, 'Verified')
                    }}>
                        <button className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-zinc-950 px-6 py-2.5 rounded-lg font-bold transition-all text-sm">
                            <CheckCircle className="w-4 h-4" /> Approve
                        </button>
                    </form>
                )}

                {type !== 'rejected' && (
                    <form action={async () => {
                        'use server'
                        await updateVerificationStatus(profile.user_id, 'Rejected')
                    }}>
                        <button className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white px-6 py-2.5 rounded-lg font-bold transition-all text-sm">
                            <XCircle className="w-4 h-4" /> Reject
                        </button>
                    </form>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-950 text-slate-100 p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-heading font-black text-white flex items-center gap-3">
                            <ShieldAlert className="w-8 h-8 text-brand-amber" />
                            Admin Verification Center
                        </h1>
                        <p className="text-slate-400 mt-2">Review contractor licenses and insurance credentials.</p>
                    </div>
                    <Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                        ← Back to My Dashboard
                    </Link>
                </div>

                {/* Pending Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-brand-amber flex items-center gap-2">
                        Pending Actions <span className="text-xs bg-brand-amber/20 text-brand-amber px-2 py-0.5 rounded-full">{pendingProfiles.length}</span>
                    </h2>
                    {pendingProfiles.length === 0 ? (
                        <div className="text-slate-500 italic p-6 border border-dashed border-zinc-800 rounded-xl">No pending verifications.</div>
                    ) : (
                        pendingProfiles.map(p => <ProfileCard key={p.id} profile={p} type="pending" />)
                    )}
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Verified Section */}
                    <section>
                        <h2 className="text-xl font-bold mb-6 text-emerald-500 flex items-center gap-2">
                            Verified <span className="text-xs bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full">{verifiedProfiles.length}</span>
                        </h2>
                        {verifiedProfiles.length === 0 ? (
                            <div className="text-slate-500 italic p-6 border border-dashed border-zinc-800 rounded-xl">No verified profiles.</div>
                        ) : (
                            verifiedProfiles.map(p => <ProfileCard key={p.id} profile={p} type="verified" />)
                        )}
                    </section>

                    {/* Rejected Section */}
                    <section>
                        <h2 className="text-xl font-bold mb-6 text-red-500 flex items-center gap-2">
                            Rejected <span className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full">{rejectedProfiles.length}</span>
                        </h2>
                        {rejectedProfiles.length === 0 ? (
                            <div className="text-slate-500 italic p-6 border border-dashed border-zinc-800 rounded-xl">No rejected profiles.</div>
                        ) : (
                            rejectedProfiles.map(p => <ProfileCard key={p.id} profile={p} type="rejected" />)
                        )}
                    </section>
                </div>

            </div>
        </div>
    )
}
