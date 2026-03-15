'use client'

import { useState } from 'react'
import { ExternalLink, QrCode } from 'lucide-react'
import { QRCodePopup } from '@/components/QRCode'

interface DashboardHeaderProps {
  slug: string
  businessName?: string
}

export function DashboardHeader({ slug, businessName }: DashboardHeaderProps) {
  const [showQR, setShowQR] = useState(false)
  const profileUrl = `https://rovult.com/${slug}`

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-heading font-black text-slate-100 tracking-tight">
            Profile Builder
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Edit your profile and see changes live in the preview.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQR(true)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-4 py-2 rounded-xl transition-all"
          >
            <QrCode className="w-3.5 h-3.5" />
            QR Code
          </button>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-950 bg-brand-amber hover:bg-amber-400 px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:-translate-y-px active:translate-y-0 w-fit"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Live
          </a>
        </div>
      </div>

      {showQR && (
        <QRCodePopup
          url={profileUrl}
          businessName={businessName}
          onClose={() => setShowQR(false)}
        />
      )}
    </>
  )
}
