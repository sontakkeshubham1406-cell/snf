import React from 'react';
import { Play, Film, Sparkles, Volume2, ShieldCheck } from 'lucide-react';

interface ShowreelSectionProps {
  onOpenShowreel: () => void;
}

export const ShowreelSection: React.FC<ShowreelSectionProps> = ({ onOpenShowreel }) => {
  return (
    <section id="showreel" className="py-20 bg-[#e7d9d1] relative overflow-hidden">
      {/* Background Image Banner */}
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-multiply">
        <img
          src="/media/Photos/Wedding/02.jpg"
          alt="Cinema Set Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e7d9d1] via-[#e7d9d1]/90 to-[#e7d9d1]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-[#8b0101]/20 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b0101]/10 text-[#8b0101] border border-[#8b0101]/25 text-xs font-bold uppercase tracking-widest mb-4">
              <Film className="w-3.5 h-3.5 text-[#8b0101]" />
              <span>2026 Master Videography Reel</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-syne font-bold text-[#2b0808] tracking-tight mb-4">
              CINEMATIC <span className="gold-gradient-text">SHOWREEL</span>
            </h2>
            <p className="text-[#4a2929] text-sm sm:text-base leading-relaxed mb-6 font-medium">
              Shot on Sony FX3 Cinema Line & Sony Alpha Cameras with GM Master optics. Featuring grand wedding celebrations, birthday milestone highlights, romantic pre-wedding film trailers, and commercial brand productions.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-[#2b0808]">
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-[#8b0101]/20 shadow-sm font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8b0101]" />
                DCI 4K 60FPS
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-[#8b0101]/20 shadow-sm font-semibold">
                <Volume2 className="w-3.5 h-3.5 text-[#8b0101]" />
                Licensed Film Audio
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-[#8b0101]/20 shadow-sm font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#8b0101]" />
                Anamorphic Lenses
              </span>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#a80d0d] to-[#8b0101] rounded-full blur opacity-50 group-hover:opacity-90 transition duration-500" />
            <button
              onClick={onOpenShowreel}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full crimson-gradient-bg flex items-center justify-center border-2 border-white group-hover:scale-105 transition-transform duration-300 shadow-2xl"
            >
              <Play className="w-10 h-10 text-white fill-current ml-1 transition-colors" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
