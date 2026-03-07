'use client'

import { useState } from 'react'

export function PortalButton() {
    const [loading, setLoading] = useState(false)

    const handlePortal = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/stripe/create-portal-session', { method: 'POST' })
            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handlePortal}
            disabled={loading}
            className="bg-zinc-800 hover:bg-zinc-700 text-slate-200 font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
            {loading ? 'Loading...' : 'Manage Subscription'}
        </button>
    )
}
