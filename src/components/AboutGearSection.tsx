import React from 'react';
import { Camera, Cpu, Award, MapPin, Sparkles, ShieldCheck, Disc } from 'lucide-react';
import type { SiteSettings } from '../types';

interface AboutGearSectionProps {
  settings: SiteSettings;
}

export const AboutGearSection: React.FC<AboutGearSectionProps> = ({ settings }) => {
  return (
    <section id="about" className="py-24 bg-[#080303] relative z-10 border-t border-rose-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Photographer Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-rose-950/40">
              <img
                src="/media/Photos/Wedding/03.jpg"
                alt={settings.photographerName}
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[#e7d9d1] text-xs font-semibold uppercase tracking-widest block mb-1">
                  Lead Photographer & Director
                </span>
                <h3 className="font-syne font-extrabold text-2xl text-white">
                  {settings.photographerName}
                </h3>
                <p className="text-[#e7d9d1]/70 text-xs mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#e7d9d1]" />
                  {settings.location}
                </p>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-4 glass-panel p-4 rounded-2xl border border-[#8b0101]/40 shadow-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full crimson-gradient-bg p-[1px]">
                <div className="w-full h-full bg-[#160a0a] rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#e7d9d1]" />
                </div>
              </div>
              <div>
                <span className="font-syne font-bold text-white text-sm block">12+ Years</span>
                <span className="text-[#e7d9d1]/70 text-[10px] uppercase font-mono">International Master</span>
              </div>
            </div>
          </div>

          {/* Bio & Cinema Gear Specs */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b0101]/20 text-[#e7d9d1] border border-[#8b0101]/40 text-xs font-semibold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#e7d9d1]" />
                <span>The Vision Behind The Lens</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-syne font-bold text-white tracking-tight mb-4">
                CRAFTING FINE ART <span className="gold-gradient-text">LEGACY</span>
              </h2>
              <p className="text-[#e7d9d1]/80 text-base leading-relaxed">
                {settings.bioText}
              </p>
            </div>

            {/* Gear Arsenal Breakdown */}
            <div className="space-y-4">
              <h3 className="font-syne font-bold text-lg text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#e7d9d1]" />
                Cinema & Photography Arsenal
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Cameras */}
                <div className="glass-panel p-4 rounded-2xl border border-rose-950/40">
                  <span className="text-[#e7d9d1] text-xs font-bold uppercase tracking-wider block mb-2 font-mono flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" /> Camera Bodies
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#e7d9d1]/80">
                    {settings.gearList.cameras.map((c, i) => (
                      <li key={i} className="line-clamp-1">• {c}</li>
                    ))}
                  </ul>
                </div>

                {/* Lenses */}
                <div className="glass-panel p-4 rounded-2xl border border-rose-950/40">
                  <span className="text-[#e7d9d1] text-xs font-bold uppercase tracking-wider block mb-2 font-mono flex items-center gap-1">
                    <Disc className="w-3.5 h-3.5" /> Glass & Optics
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#e7d9d1]/80">
                    {settings.gearList.lenses.map((l, i) => (
                      <li key={i} className="line-clamp-1">• {l}</li>
                    ))}
                  </ul>
                </div>

                {/* Drone & Lighting */}
                <div className="glass-panel p-4 rounded-2xl border border-rose-950/40">
                  <span className="text-[#e7d9d1] text-xs font-bold uppercase tracking-wider block mb-2 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Drone & Lighting
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#e7d9d1]/80">
                    {settings.gearList.lightingAndDrone.map((g, i) => (
                      <li key={i} className="line-clamp-1">• {g}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
