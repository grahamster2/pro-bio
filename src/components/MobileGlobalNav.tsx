'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { LayoutDashboard, BarChart2, Settings, Eye, PenLine, Search, HelpCircle } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

export function MobileGlobalNav() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const activeTab = searchParams.get('tab') || 'general'

    // We want 5 main items in the bottom bar
    // Builder, Preview, Leads, Settings

    const tabs = [
        { id: 'builder', label: 'Builder', icon: PenLine, href: '/dashboard' },
        { id: 'preview', label: 'Preview', icon: Eye, href: '/dashboard?tab=preview' },
        { id: 'leads', label: 'Leads', icon: BarChart2, href: '/dashboard/leads' },
        { id: 'seo', label: 'SEO', icon: Search, href: '/dashboard/local-seo' },
    ]

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] md:hidden w-[95%] max-w-[400px] safe-area-pb">
            <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/80 rounded-full px-2 py-2 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                {tabs.map((tab) => {
                    // Determine if active
                    let isActive = false;
                    if (tab.id === 'builder') {
                        isActive = pathname === '/dashboard' && activeTab !== 'preview';
                    } else if (tab.id === 'preview') {
                        isActive = pathname === '/dashboard' && activeTab === 'preview';
                    } else {
                        isActive = pathname === tab.href;
                    }

                    return (
                        <Link
                            key={tab.id}
                            href={tab.href}
                            className={`flex flex-col items-center justify-center gap-1 w-[4.5rem] py-1.5 rounded-full transition-all ${isActive
                                ? 'bg-zinc-800/80 text-brand-amber'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            <tab.icon className={`w-5 h-5 ${isActive ? 'text-brand-amber' : ''}`} />
                            <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
                <div className="flex flex-col items-center justify-center gap-1 w-[4.5rem] py-1.5 shrink-0 relative mt-1">
                    <div className="scale-90">
                        <UserButton appearance={{
                            elements: {
                                userButtonAvatarBox: "w-7 h-7 ring-2 ring-zinc-700 ring-offset-1 ring-offset-zinc-950"
                            }
                        }} />
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 opacity-80">Profile</span>
                </div>
            </div>
            
            {/* Floating Help Button for Mobile */}
            <a 
                href="mailto:help@rovult.com" 
                className="fixed -top-16 -right-16 w-12 h-12 bg-brand-amber/90 backdrop-blur-sm border border-brand-amber/20 rounded-full flex items-center justify-center text-zinc-950 shadow-lg hover:bg-brand-amber transition-all"
                title="Get Help"
            >
                <HelpCircle className="w-5 h-5" />
            </a>
        </div>
    )
}
