import React from 'react';
import { Play, Film, Sparkles, Volume2, ShieldCheck } from 'lucide-react';

interface ShowreelSectionProps {
  onOpenShowreel: () => void;
}

export const ShowreelSection: React.FC<ShowreelSectionProps> = ({ onOpenShowreel }) => {
  return (
    <section id="showreel" className="py-20 bg-zinc-950 relative overflow-hidden">
      {/* Background Image Banner */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
        <img
          src="/media/Photos/Wedding/02.jpg"
          alt="Cinema Set Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-zinc-800/80 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-widest mb-4">
              <Film className="w-3.5 h-3.5" />
              <span>2026 Master Videography Reel</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-syne font-bold text-white tracking-tight mb-4">
              CINEMATIC <span className="gold-gradient-text">SHOWREEL</span>
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
              Shot on Sony FX3 Cinema Line & Sony Alpha Cameras with GM Master optics. Featuring grand wedding celebrations, birthday milestone highlights, romantic pre-wedding film trailers, and commercial brand productions.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                DCI 4K 60FPS
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                Licensed Film Audio
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Anamorphic Lenses
              </span>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500" />
            <button
              onClick={onOpenShowreel}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-black flex items-center justify-center border-2 border-amber-400 group-hover:scale-105 transition-transform duration-300 shadow-2xl"
            >
              <Play className="w-10 h-10 text-amber-400 fill-current ml-1 group-hover:text-white transition-colors" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
