'use client';

import { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import { MoveHorizontal, ImageIcon } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  isPremium?: boolean;
}

export function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "Before", 
  afterLabel = "After",
  className = "",
  isPremium = false
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current || !isPremium) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!isPremium) return;
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !isPremium) return;
    updateSliderPosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (!isPremium) return;
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !isPremium) return;
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: any) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalTouchMove = (e: any) => handleTouchMove(e);
    const handleGlobalTouchEnd = () => handleTouchEnd();

    if (isDragging && isPremium) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove);
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, isPremium]);

  // Mock view for non-premium users
  if (!isPremium) {
    return (
      <div className="w-full bg-zinc-950 px-8 py-8 border-b border-zinc-900">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Featured Work</h3>
          <span className="bg-brand-amber/20 text-brand-amber text-xs font-bold px-2 py-1 rounded-full">PREMIUM</span>
        </div>

        <div className="w-full aspect-video rounded-2xl overflow-hidden relative group cursor-ew-resize">
          {/* Background (After) */}
          <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center border border-zinc-700/50">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> After
            </span>
          </div>

          {/* Foreground (Before) - Static at 50% for mock */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-zinc-900 flex items-center justify-center border border-zinc-800/50 border-r-0 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center w-[200%] max-w-none">
              <span className="text-slate-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Before
              </span>
            </div>
          </div>

          {/* Slider Handle */}
          <div className="absolute inset-y-0 left-1/2 w-1 bg-brand-amber/50 -translate-x-1/2">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
              <MoveHorizontal className="w-4 h-4 text-zinc-400" />
            </div>
          </div>

          {/* Premium Overlay */}
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-center">
              <p className="text-white font-bold mb-2">Before & After Slider</p>
              <p className="text-slate-300 text-sm mb-4">Showcase your transformations with interactive before/after comparisons</p>
              <button className="bg-brand-amber text-zinc-950 px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-amber/90 transition-colors">
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 text-center mt-4">Before & After comparisons available with Premium</p>
      </div>
    );
  }

  // Premium interactive slider
  return (
    <div className={`w-full bg-zinc-950 px-8 py-8 border-b border-zinc-900 ${className}`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Featured Work</h3>
        <span className="bg-brand-amber/20 text-brand-amber text-xs font-bold px-2 py-1 rounded-full">PREMIUM</span>
      </div>

      <div 
        ref={containerRef}
        className="w-full aspect-video rounded-2xl overflow-hidden relative cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Before Image (Bottom Layer) */}
        <div className="absolute inset-0">
          {beforeImage ? (
            <img 
              src={beforeImage} 
              alt="Before" 
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center border border-zinc-700/50">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> {beforeLabel}
              </span>
            </div>
          )}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold">
            {beforeLabel}
          </div>
        </div>

        {/* After Image (Top Layer with Clip) */}
        <div 
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
          }}
        >
          {afterImage ? (
            <img 
              src={afterImage} 
              alt="After" 
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center border border-zinc-700/50">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> {afterLabel}
              </span>
            </div>
          )}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold">
            {afterLabel}
          </div>
        </div>

        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-zinc-900">
            <MoveHorizontal className="w-5 h-5 text-zinc-900" />
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-md text-xs font-medium opacity-75">
          Slide to compare
        </div>
      </div>

      <p className="text-xs text-slate-500 text-center mt-4">Drag slider to compare Before & After</p>
    </div>
  );
}
