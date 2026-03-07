'use client'

import { ArrowLeftRight, ImageIcon } from 'lucide-react'

export function BeforeAfterSlider() {
    return (
        <div className="w-full bg-zinc-950 px-8 py-8 border-b border-zinc-900">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-5">Featured Work</h3>

            <div className="w-full aspect-video rounded-2xl overflow-hidden relative group cursor-ew-resize">
                {/* Background (After) */}
                <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center border border-zinc-700/50">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> After
                    </span>
                </div>

                {/* Foreground (Before) - Currently static at 50% for mock */}
                <div className="absolute inset-y-0 left-0 w-1/2 bg-zinc-900 flex items-center justify-center border border-zinc-800/50 border-r-0 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center w-[200%] max-w-none">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" /> Before
                        </span>
                    </div>
                </div>

                {/* Slider Handle */}
                <div className="absolute inset-y-0 left-1/2 w-1 bg-brand-amber -translate-x-1/2 shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-amber rounded-full flex items-center justify-center shadow-lg">
                        <ArrowLeftRight className="w-4 h-4 text-zinc-950" />
                    </div>
                </div>
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">Drag to compare Before & After</p>
        </div>
    )
}
