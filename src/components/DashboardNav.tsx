'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings, BarChart2, Search } from 'lucide-react'

const navItems = [
    { href: '/dashboard', label: 'Builder', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/leads', label: 'Leads & Analytics', icon: BarChart2, exact: false },
    { href: '/dashboard/local-seo', label: 'Local SEO', icon: Search, exact: false },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings, exact: false },
] as const

export function DashboardNav() {
    const pathname = usePathname()

    return (
        <nav className="flex-1 flex flex-col gap-1">
            {navItems.map(({ href, label, icon: Icon, exact }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href)
                return (
                    <Link
                        key={href}
                        href={href}
                        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 border ${isActive
                            ? 'bg-brand-amber/10 text-brand-amber border-brand-amber/20 shadow-[inset_0_1px_0_rgba(245,158,11,0.1)]'
                            : 'text-slate-400 border-transparent hover:text-slate-100 hover:bg-zinc-800/70 hover:border-zinc-700/50'
                            }`}
                    >
                        {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-brand-amber rounded-r-full" />
                        )}
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-amber' : ''}`} />
                        <span>{label}</span>
                    </Link>
                )
            })}
        </nav>
    )
}

export function MobileNav() {
    const pathname = usePathname()
    return (
        <div className="flex items-center gap-1">
            {navItems.map(({ href, label, exact }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href)
                return (
                    <Link
                        key={href}
                        href={href}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive
                            ? 'text-brand-amber bg-brand-amber/10 border border-brand-amber/20'
                            : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        {label}
                    </Link>
                )
            })}
        </div>
    )
}
