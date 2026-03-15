'use client'

import { useState } from 'react'
import { QrCode } from 'lucide-react'
import { QRCodePopup } from '@/components/QRCode'

interface ProfileQRButtonProps {
  slug: string
  businessName?: string
  className?: string
}

export function ProfileQRButton({ slug, businessName, className = '' }: ProfileQRButtonProps) {
  const [showQR, setShowQR] = useState(false)
  const profileUrl = `https://rovult.com/${slug}`

  return (
    <>
      <button
        onClick={() => setShowQR(true)}
        className={`flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 text-slate-300 hover:text-white rounded-xl transition-all text-sm font-medium ${className}`}
      >
        <QrCode className="w-4 h-4" />
        Share QR Code
      </button>

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
