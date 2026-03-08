'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, Layout, Settings, Share2, X, ChevronRight, ChevronLeft, Hand } from 'lucide-react'
import { updateProfile } from '@/app/dashboard/actions'

interface TutorialStep {
    targetId?: string;
    title: string;
    description: string;
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const steps: TutorialStep[] = [
    {
        title: 'Welcome to Rovult Builder',
        description: 'Ready to attract more leads? Let’s take a quick 4-step tour to see how to build your perfect profile.',
        placement: 'center'
    },
    {
        targetId: 'tutorial-general-tab',
        title: 'Brand Identity',
        description: 'Start here to upload your logo and set your business name and bio. This is the first thing customers will see.',
        placement: 'bottom'
    },
    {
        targetId: 'tutorial-services-tab',
        title: 'Trust & Services',
        description: 'Add your services and upload your licenses or insurance proofs here. Verified pros get 3x more leads!',
        placement: 'bottom'
    },
    {
        targetId: 'tutorial-preview',
        title: 'Live Preview',
        description: 'See exactly what your customers see in real-time right here as you build your profile.',
        placement: 'left'
    },
    {
        targetId: 'tutorial-save-button',
        title: 'Save & Publish',
        description: 'Don\'t forget to hit Save Changes! Once saved, your probio.app link is live and ready to be shared on your social media.',
        placement: 'bottom'
    }
]

export default function DashboardTutorial({ onComplete }: { onComplete: () => void }) {
    const [isOpen, setIsOpen] = useState(true)
    const [step, setStep] = useState(0)
    const [saving, setSaving] = useState(false)
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null)

    const updateTargetRect = () => {
        const currentStep = steps[step];
        if (currentStep.targetId) {
            const el = document.getElementById(currentStep.targetId);
            if (el) {
                // Ensure the element is scrolled into view (smoothly)
                el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                
                // Slight delay to allow scrolling to finish
                setTimeout(() => {
                    setTargetRect(el.getBoundingClientRect());
                }, 300);
            } else {
                setTargetRect(null);
            }
        } else {
            setTargetRect(null);
        }
    };

    useEffect(() => {
        if (!isOpen) return;
        updateTargetRect();
        
        // Handle window resize
        window.addEventListener('resize', updateTargetRect);
        
        // Use a mutation observer to catch layout shifts if needed, but resize is usually enough for static views
        
        return () => {
            window.removeEventListener('resize', updateTargetRect);
        };
    }, [step, isOpen]);


    const handleDismiss = async () => {
        setSaving(true)
        try {
            await updateProfile({ has_seen_tutorial: true })
        } catch (e) {
            console.error("Failed to dismiss tutorial:", e)
        } finally {
            setSaving(false)
            setIsOpen(false)
            onComplete()
        }
    }

    if (!isOpen) return null

    const currentStep = steps[step];
    
    // Calculate popover positioning
    let popoverStyle: React.CSSProperties = {};
    if (currentStep.placement === 'center' || !targetRect) {
        popoverStyle = {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };
    } else {
        const padding = 16; // Gap between highlight and popover
        
        switch (currentStep.placement) {
            case 'bottom':
                popoverStyle = {
                    top: `${targetRect.bottom + padding}px`,
                    left: `${Math.max(10, targetRect.left + (targetRect.width / 2) - 160)}px`, // Center horizontally relative to target, but keep on screen
                };
                break;
            case 'top':
                popoverStyle = {
                    top: `${targetRect.top - padding}px`,
                    left: `${Math.max(10, targetRect.left + (targetRect.width / 2) - 160)}px`,
                    transform: 'translateY(-100%)',
                };
                break;
            case 'left':
                popoverStyle = {
                    top: `${Math.max(10, targetRect.top + (targetRect.height / 2))}px`,
                    left: `${targetRect.left - padding}px`,
                    transform: 'translate(-100%, -50%)',
                };
                break;
            case 'right':
                popoverStyle = {
                    top: `${Math.max(10, targetRect.top + (targetRect.height / 2))}px`,
                    left: `${targetRect.right + padding}px`,
                    transform: 'translateY(-50%)',
                };
                break;
        }
        
        // Basic boundary clamping for smaller screens (prevent overflow)
        // A more advanced solution would check window.innerWidth/innerHeight
    }

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            {/* SVG Overlay Mask for highlighting */}
            <svg 
                className="absolute inset-0 w-full h-full animate-in fade-in duration-500 pointer-events-auto"
                style={{ zIndex: 1 }}
                onClick={(e) => {
                    // Prevent clicks on the mask from doing anything
                    e.stopPropagation();
                }}
            >
                <defs>
                    <mask id="tutorial-mask">
                        {/* White background means fully opaque mask (show overlay color) */}
                        <rect width="100%" height="100%" fill="white" />
                        {/* Cut out the target area (black means transparent mask) */}
                        {targetRect && (
                            <rect 
                                x={targetRect.left - 6} 
                                y={targetRect.top - 6} 
                                width={targetRect.width + 12} 
                                height={targetRect.height + 12} 
                                rx={12} 
                                fill="black" 
                            />
                        )}
                    </mask>
                </defs>
                <rect 
                    width="100%" 
                    height="100%" 
                    fill="rgba(0, 0, 0, 0.75)" 
                    mask="url(#tutorial-mask)" 
                />
                
                {/* Optional floating ring around target */}
                {targetRect && (
                    <rect 
                        x={targetRect.left - 6} 
                        y={targetRect.top - 6} 
                        width={targetRect.width + 12} 
                        height={targetRect.height + 12} 
                        rx={12} 
                        fill="none"
                        stroke="#f59e0b" // brand-amber
                        strokeWidth="2"
                        className="animate-pulse"
                    />
                )}
            </svg>

            {/* Popover Dialog */}
            <div 
                className="absolute w-[320px] bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl p-6 pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10"
                style={popoverStyle}
            >
                {/* Skip Tour Button */}
                <button
                    onClick={handleDismiss}
                    disabled={saving}
                    className="absolute top-3 right-3 p-1.5 text-zinc-500 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-3 mb-4">
                    <div className="bg-brand-amber/10 p-2 rounded-xl mt-1 shrink-0">
                        {currentStep.targetId ? <Hand className="w-5 h-5 text-brand-amber" /> : <Layout className="w-5 h-5 text-brand-amber" />}
                    </div>
                    <div>
                        <h3 className="text-base font-heading font-bold text-slate-100">{currentStep.title}</h3>
                        <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{currentStep.description}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-1.5">
                        {steps.map((_, i) => (
                            <div 
                                key={i} 
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-4 bg-brand-amber' : 'w-1.5 bg-zinc-700'}`} 
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        {step > 0 && (
                            <button
                                onClick={() => setStep(s => s - 1)}
                                className="p-2 bg-zinc-800 hover:bg-zinc-700 text-slate-300 rounded-lg transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                        )}
                        
                        {step < steps.length - 1 ? (
                            <button
                                onClick={() => setStep(s => s + 1)}
                                className="flex items-center gap-1 px-4 py-2 bg-brand-amber hover:bg-amber-400 text-zinc-950 font-bold text-sm rounded-lg transition-colors"
                            >
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleDismiss}
                                disabled={saving}
                                className="flex items-center gap-1 px-4 py-2 bg-brand-amber hover:bg-amber-400 text-zinc-950 font-bold text-sm rounded-lg transition-colors"
                            >
                                {saving ? "Finishing..." : "Got it!"} <CheckCircle2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
