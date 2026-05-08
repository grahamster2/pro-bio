'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const scrollAmount = index * scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const itemWidth = scrollContainerRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : testimonials.length - 1;
    scrollToIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex < testimonials.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative">
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="w-full flex-shrink-0 snap-center px-4"
            >
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col items-start text-left shadow-xl">
                <Quote className="w-8 h-8 text-brand-amber/20 mb-4" />
                <p className="text-base text-slate-300 font-medium leading-relaxed mb-6 flex-1">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3 w-full pt-4 border-t border-zinc-800/60">
                  <Image
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border-2 border-zinc-800 object-cover" 
                  />
                  <div>
                    <h4 className="text-slate-100 font-bold font-heading text-base">{testimonial.name}</h4>
                    <p className="text-brand-amber font-semibold text-[10px] tracking-wider uppercase">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-brand-amber w-6' 
                  : 'bg-zinc-600 hover:bg-zinc-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-zinc-800/80 text-white p-2 rounded-full hover:bg-zinc-700 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-800/80 text-white p-2 rounded-full hover:bg-zinc-700 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Desktop Grid (unchanged) */}
      <div className="hidden md:grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-start text-left shadow-xl hover:border-zinc-700 transition-colors">
            <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-brand-amber/20 mb-4 sm:mb-6" />
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed mb-6 sm:mb-8 flex-1">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-3 sm:gap-4 w-full pt-4 sm:pt-6 border-t border-zinc-800/60">
              <Image
                src={testimonial.image} 
                alt={testimonial.name} 
                width={56}
                height={56}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-zinc-800 object-cover" 
              />
              <div>
                <h4 className="text-slate-100 font-bold font-heading text-base sm:text-lg">{testimonial.name}</h4>
                <p className="text-brand-amber font-semibold text-[10px] sm:text-xs tracking-wider uppercase">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
