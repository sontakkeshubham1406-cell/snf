import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, Wand2 } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let position = (x / rect.width) * 100;
      if (position < 0) position = 0;
      if (position > 100) position = 100;
      setSliderPosition(position);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="color-grading" className="py-24 bg-[#09090b] relative z-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-widest mb-3">
            <Wand2 className="w-3.5 h-3.5" />
            <span>Post-Production Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-syne font-bold text-white tracking-tight mb-4">
            RAW CAMERA VS <span className="gold-gradient-text">COLOR GRADED</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Slide horizontally to experience our proprietary DaVinci Resolve color transformation & fine-art skin retouching process.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 select-none cursor-ew-resize"
          >
            {/* Master Color Graded Image (Background) */}
            <img
              src="/media/Photos/Wedding/03.jpg"
              alt="Color Graded Master Stills"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-bold uppercase tracking-wider shadow-lg">
              Master Edited & Graded
            </div>

            {/* RAW Unedited Image (Clipped Foreground) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="/media/Photos/Wedding/03.jpg"
                alt="RAW Unedited Flat Profile"
                className="absolute inset-0 w-full h-full object-cover max-w-none filter contrast-75 brightness-90 grayscale-[50%]"
                style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-900/90 text-zinc-300 border border-zinc-700 text-xs font-bold uppercase tracking-wider shadow-lg">
                RAW Flat S-Log Profile
              </div>
            </div>

            {/* Slider Handle Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-amber-400 cursor-ew-resize shadow-[0_0_15px_rgba(245,158,11,0.8)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full gold-gradient-bg p-[2px] shadow-2xl flex items-center justify-center">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 mt-4 px-2 font-mono">
            <span>◄ Drag Left for RAW S-Log</span>
            <span>Drag Right for Color Graded LUT ►</span>
          </div>
        </div>

      </div>
    </section>
  );
};
