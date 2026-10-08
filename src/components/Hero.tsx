import React from 'react';
import { Play, Sparkles, Aperture, ArrowDown, Camera } from 'lucide-react';
import type { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
  onOpenShowreel: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onOpenShowreel }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern film-grain">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Rotating Aperture Decorative Backdrop */}
      <div className="absolute right-[-10%] top-[15%] opacity-15 pointer-events-none hidden lg:block">
        <Aperture className="w-[500px] h-[500px] text-amber-300 animate-aperture" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xl backdrop-blur-md max-w-full truncate">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">{settings.photographerName} • {settings.location}</span>
        </div>

        {/* Main Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-syne font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6 uppercase">
          <span className="block sm:inline">SWAROOP NAIK</span>{' '}
          <span className="gold-gradient-text block sm:inline">PHOTOGRAPHY</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          {settings.heroSubheading}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-syne font-bold text-sm uppercase tracking-wider text-black gold-gradient-bg hover:brightness-110 transition-all transform hover:-translate-y-1 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            Explore Portfolio
          </a>

          <button
            onClick={onOpenShowreel}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-syne font-bold text-sm uppercase tracking-wider text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-amber-500/50 transition-all flex items-center justify-center gap-3 group"
          >
            <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
              <Play className="w-3.5 h-3.5 text-amber-400 group-hover:text-black fill-current" />
            </div>
            Watch 2026 Cinema Reel
          </button>
        </div>

        {/* Highlight Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-zinc-800/80">
          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="block font-syne font-bold text-2xl sm:text-3xl text-amber-400">150+</span>
            <span className="text-xs text-zinc-400 tracking-wider uppercase">Luxury Weddings</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="block font-syne font-bold text-2xl sm:text-3xl text-white">24+</span>
            <span className="text-xs text-zinc-400 tracking-wider uppercase">International Awards</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="block font-syne font-bold text-2xl sm:text-3xl text-amber-400">8K Cinema</span>
            <span className="text-xs text-zinc-400 tracking-wider uppercase">RED & Sony Setup</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="block font-syne font-bold text-2xl sm:text-3xl text-white">100%</span>
            <span className="text-xs text-zinc-400 tracking-wider uppercase">Client Proofed</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a href="#portfolio" className="inline-block mt-12 text-zinc-500 hover:text-amber-400 transition-colors animate-bounce">
          <ArrowDown className="w-6 h-6 mx-auto" />
        </a>

      </div>
    </section>
  );
};
