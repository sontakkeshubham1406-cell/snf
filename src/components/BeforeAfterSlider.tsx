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
    <section id="color-grading" className="py-24 bg-[#e7d9d1] relative z-10 border-t border-[#8b0101]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b0101]/10 text-[#8b0101] border border-[#8b0101]/25 text-xs font-bold uppercase tracking-widest mb-3">
            <Wand2 className="w-3.5 h-3.5 text-[#8b0101]" />
            <span>Post-Production Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-syne font-bold text-[#2b0808] tracking-tight mb-4">
            RAW CAMERA VS <span className="gold-gradient-text">COLOR GRADED</span>
          </h2>
          <p className="text-[#4a2929] text-sm sm:text-base font-normal">
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
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-[#8b0101]/20 select-none cursor-ew-resize"
          >
            {/* Master Color Graded Image (Background) */}
            <img
              src="/media/Photos/Wedding/03.jpg"
              alt="Color Graded Master Stills"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full crimson-gradient-bg text-white text-xs font-bold uppercase tracking-wider shadow-lg">
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
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#2b0808]/90 text-[#e7d9d1] border border-white/20 text-xs font-bold uppercase tracking-wider shadow-lg">
                RAW Flat S-Log Profile
              </div>
            </div>

            {/* Slider Handle Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#8b0101] cursor-ew-resize shadow-[0_0_15px_rgba(139,1,1,0.8)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full crimson-gradient-bg p-[2px] shadow-2xl flex items-center justify-center">
                <div className="w-full h-full bg-[#8b0101] rounded-full flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#6b4b4b] mt-4 px-2 font-mono font-bold">
            <span>◄ Drag Left for RAW S-Log</span>
            <span>Drag Right for Color Graded LUT ►</span>
          </div>
        </div>

      </div>
    </section>
  );
};
