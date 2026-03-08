'use client'

import { useMemo } from 'react'

/**
 * LiquidGlassOverlay — Renders glass background layers inside a parent container.
 * 
 * Uses SVG feDisplacementMap for real refraction + canvas-generated specular highlights.
 * Uses regular `filter: url(#id)` which works cross-browser (Firefox, Safari, Chrome).
 * 
 * Place this as the FIRST child of the card container. The parent must have
 * `position: relative` and `overflow: hidden`.
 *
 * Inspired by https://kube.io/blog/liquid-glass-css-svg/
 */

interface LiquidGlassOverlayProps {
    width?: number
    height?: number
    bezelWidth?: number
    thickness?: number
    borderRadius?: number
    bgColor?: string
    filterId?: string
}

function surfaceHeight(t: number): number {
    return Math.sin(Math.max(0, Math.min(1, t)) * Math.PI * 0.5)
}

function surfaceDerivative(t: number, delta = 0.001): number {
    return (surfaceHeight(t + delta) - surfaceHeight(t - delta)) / (2 * delta)
}

function computeDisplacement(t: number, thickness: number, ior = 1.5): number {
    const slope = surfaceDerivative(t)
    const angleIn = Math.atan(slope)
    const sinOut = Math.sin(angleIn) / ior
    const angleOut = Math.asin(Math.max(-1, Math.min(1, sinOut)))
    return thickness * Math.tan(angleIn - angleOut)
}

function generateDisplacementMap(
    width: number, height: number, bezelWidth: number, thickness: number, borderRadius: number
): { dataUrl: string; maxDisplacement: number } {
    if (typeof document === 'undefined') return { dataUrl: '', maxDisplacement: 0 }

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return { dataUrl: '', maxDisplacement: 0 }

    const samples = 128
    const displacements: number[] = []
    let maxDisp = 0
    for (let i = 0; i < samples; i++) {
        const t = i / (samples - 1)
        const d = computeDisplacement(t, thickness)
        displacements.push(d)
        maxDisp = Math.max(maxDisp, Math.abs(d))
    }
    if (maxDisp === 0) maxDisp = 1

    const imageData = ctx.createImageData(width, height)
    const data = imageData.data

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cx = Math.min(x, width - 1 - x)
            const cy = Math.min(y, height - 1 - y)
            let minDist: number

            if (cx < borderRadius && cy < borderRadius) {
                const dx = borderRadius - cx
                const dy = borderRadius - cy
                minDist = Math.max(0, borderRadius - Math.sqrt(dx * dx + dy * dy))
            } else {
                minDist = Math.min(cx, cy)
            }

            const t = Math.min(1, minDist / bezelWidth)
            const sampleIdx = Math.min(samples - 1, Math.floor(t * (samples - 1)))
            const dispMag = displacements[sampleIdx] / maxDisp

            const centerX = width / 2
            const centerY = height / 2
            const ddx = centerX - x
            const ddy = centerY - y
            const len = Math.sqrt(ddx * ddx + ddy * ddy) || 1

            const dispX = (ddx / len) * dispMag
            const dispY = (ddy / len) * dispMag

            const idx = (y * width + x) * 4
            data[idx]     = Math.max(0, Math.min(255, Math.round(128 + dispX * 127)))
            data[idx + 1] = Math.max(0, Math.min(255, Math.round(128 + dispY * 127)))
            data[idx + 2] = 128
            data[idx + 3] = 255
        }
    }

    ctx.putImageData(imageData, 0, 0)
    return { dataUrl: canvas.toDataURL('image/png'), maxDisplacement: maxDisp * thickness * 40 }
}

function generateSpecularMap(
    width: number, height: number, bezelWidth: number, borderRadius: number
): string {
    if (typeof document === 'undefined') return ''

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''

    const imageData = ctx.createImageData(width, height)
    const data = imageData.data

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cx = Math.min(x, width - 1 - x)
            const cy = Math.min(y, height - 1 - y)
            let minDist: number

            if (cx < borderRadius && cy < borderRadius) {
                const dx = borderRadius - cx
                const dy = borderRadius - cy
                minDist = Math.max(0, borderRadius - Math.sqrt(dx * dx + dy * dy))
            } else {
                minDist = Math.min(cx, cy)
            }

            const t = Math.min(1, minDist / bezelWidth)
            const intensity = Math.pow(1 - t, 2.5) * 0.6
            const lightBias = (1 - x / width) * 0.3 + (1 - y / height) * 0.2
            const finalIntensity = Math.min(1, intensity + intensity * lightBias)
            const val = Math.round(finalIntensity * 255)

            const idx = (y * width + x) * 4
            data[idx] = val
            data[idx + 1] = val
            data[idx + 2] = val
            data[idx + 3] = Math.round(finalIntensity * 180)
        }
    }

    ctx.putImageData(imageData, 0, 0)
    return canvas.toDataURL('image/png')
}

export default function LiquidGlassOverlay({
    width = 420,
    height = 900,
    bezelWidth = 40,
    thickness = 0.6,
    borderRadius = 40,
    bgColor = '#09090b',
    filterId = 'lgFilter',
}: LiquidGlassOverlayProps) {
    const { dataUrl, maxDisplacement } = useMemo(
        () => generateDisplacementMap(width, height, bezelWidth, thickness, borderRadius),
        [width, height, bezelWidth, thickness, borderRadius]
    )

    const specularUrl = useMemo(
        () => generateSpecularMap(width, height, bezelWidth, borderRadius),
        [width, height, bezelWidth, borderRadius]
    )

    if (!dataUrl) return null

    return (
        <>
            {/* SVG Filter — using regular filter, works on Firefox/Safari/Chrome */}
            <svg
                width="0" height="0"
                style={{ position: 'absolute', pointerEvents: 'none' }}
                colorInterpolationFilters="sRGB"
                aria-hidden="true"
            >
                <defs>
                    <filter id={filterId} x="0" y="0" width="100%" height="100%">
                        <feImage
                            href={dataUrl}
                            x="0" y="0"
                            width={width} height={height}
                            result="dispMap"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="dispMap"
                            scale={maxDisplacement}
                            xChannelSelector="R"
                            yChannelSelector="G"
                            result="refracted"
                        />
                        <feGaussianBlur in="refracted" stdDeviation="1" result="blurred" />
                    </filter>
                </defs>
            </svg>

            {/* Background layer with SVG refraction filter */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: bgColor,
                    filter: `url(#${filterId}) blur(8px) saturate(1.4)`,
                    zIndex: 0,
                    borderRadius: 'inherit',
                }}
            />

            {/* Glass tint */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(255, 255, 255, 0.04)',
                    zIndex: 1,
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                }}
            />

            {/* Specular rim highlight */}
            {specularUrl && (
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${specularUrl})`,
                        backgroundSize: '100% 100%',
                        opacity: 0.5,
                        mixBlendMode: 'screen' as const,
                        zIndex: 2,
                        borderRadius: 'inherit',
                        pointerEvents: 'none',
                    }}
                />
            )}
        </>
    )
}
