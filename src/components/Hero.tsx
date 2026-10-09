import React from 'react';
import { Sparkles, Aperture, ArrowDown, Camera, CalendarCheck, Cpu, Award } from 'lucide-react';
import type { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
  onOpenShowreel: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern film-grain">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b0101]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8b0101]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Rotating Aperture Decorative Backdrop */}
      <div className="absolute right-[-10%] top-[15%] opacity-15 pointer-events-none hidden lg:block">
        <Aperture className="w-[500px] h-[500px] text-[#8b0101]/20 animate-aperture" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#8b0101]/30 text-[#8b0101] text-xs font-bold uppercase tracking-wider mb-6 shadow-md backdrop-blur-md max-w-full truncate">
          <Sparkles className="w-3.5 h-3.5 text-[#8b0101] shrink-0" />
          <span className="truncate">{settings.photographerName} • {settings.location}</span>
        </div>

        {/* Main Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-syne font-extrabold text-[#2b0808] tracking-tight leading-tight max-w-4xl mx-auto mb-6 uppercase">
          <span className="block sm:inline">SWAROOP NAIK</span>{' '}
          <span className="gold-gradient-text block sm:inline">FILMS</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-[#4a2929] max-w-2xl mx-auto font-medium leading-relaxed mb-10">
          {settings.heroSubheading}
        </p>

        {/* CTA Buttons - Explore Portfolio & Book Now Pop-up */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-syne font-bold text-sm uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 transition-all transform hover:-translate-y-1 shadow-xl shadow-[#8b0101]/25 flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4 text-white" />
            Explore Portfolio
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-syne font-bold text-sm uppercase tracking-wider text-[#2b0808] bg-white/90 hover:bg-white border border-[#8b0101]/30 hover:border-[#8b0101] transition-all flex items-center justify-center gap-3 shadow-md group"
          >
            <div className="w-7 h-7 rounded-full bg-[#8b0101]/10 flex items-center justify-center group-hover:bg-[#8b0101] transition-colors">
              <CalendarCheck className="w-3.5 h-3.5 text-[#8b0101] group-hover:text-white" />
            </div>
            Book Now Inquiry
          </a>
        </div>

        {/* Highlight Stats Banner - Client updated stats: 100+ Weddings, Gears We Have, 100% Client Proofed */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-[#8b0101]/15">
          <div className="glass-panel p-4 rounded-2xl text-center shadow-sm">
            <span className="block font-syne font-bold text-2xl sm:text-3xl text-[#8b0101]">100+</span>
            <span className="text-xs text-[#4a2929] tracking-wider uppercase font-semibold">Weddings Covered</span>
          </div>
          <a href="#about" className="glass-panel p-4 rounded-2xl text-center shadow-sm hover:border-[#8b0101]/50 transition-colors block group">
            <span className="block font-syne font-bold text-2xl sm:text-3xl text-[#2b0808] group-hover:text-[#8b0101] flex items-center justify-center gap-1">
              <Cpu className="w-6 h-6 text-[#8b0101]" />
              Pro Gears
            </span>
            <span className="text-xs text-[#4a2929] tracking-wider uppercase font-semibold">Gears We Have</span>
          </a>
          <div className="glass-panel p-4 rounded-2xl text-center shadow-sm col-span-2 md:col-span-1">
            <span className="block font-syne font-bold text-2xl sm:text-3xl text-[#8b0101] flex items-center justify-center gap-1">
              <Award className="w-6 h-6 text-[#8b0101]" />
              100%
            </span>
            <span className="text-xs text-[#4a2929] tracking-wider uppercase font-semibold">Client Proofed</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a href="#portfolio" className="inline-block mt-12 text-[#8b0101]/60 hover:text-[#8b0101] transition-colors animate-bounce">
          <ArrowDown className="w-6 h-6 mx-auto" />
        </a>

      </div>
    </section>
  );
};
