'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'
import { Download, Share2, X, Copy, Check } from 'lucide-react'

interface QRCodeProps {
  url: string
  businessName?: string
  onClose?: () => void
  showDownload?: boolean
  size?: number
}

export function QRCodePopup({ url, businessName, onClose, showDownload = true, size = 256 }: QRCodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = size
      canvas.height = size
      ctx?.drawImage(img, 0, 0)
      
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = `${businessName || 'rovult'}-qrcode.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${businessName} on Rovult`,
          text: `Check out ${businessName} on Rovult`,
          url: url,
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div 
          className="bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden max-w-sm w-full animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <h3 className="text-lg font-semibold text-white">Share Your Profile</h3>
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <QRCode
                  id="qr-code-svg"
                  value={url}
                  size={size}
                  level="H"
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>
            </div>

            {/* Business Name */}
            {businessName && (
              <h4 className="text-xl font-bold text-white mb-2">{businessName}</h4>
            )}
            
            <p className="text-sm text-slate-400 mb-6">
              Scan this QR code to view the profile
            </p>

            {/* URL Display */}
            <div className="bg-zinc-800/50 border border-zinc-700/60 rounded-lg p-3 mb-6">
              <p className="text-xs text-slate-400 truncate font-mono">{url}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-amber hover:bg-amber-500 text-zinc-900 rounded-lg transition-colors text-sm font-semibold"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Download Button */}
            {showDownload && (
              <button
                onClick={handleDownload}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download QR Code
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// Small inline QR code component for dashboard
export function QRCodeInline({ url, size = 80 }: { url: string; size?: number }) {
  return (
    <div className="bg-white p-2 rounded-lg shadow-sm">
      <QRCode
        value={url}
        size={size}
        level="H"
        bgColor="#ffffff"
        fgColor="#000000"
      />
    </div>
  )
}
