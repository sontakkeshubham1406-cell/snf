import React from 'react';
import { Camera, Cpu, Award, MapPin, Sparkles, ShieldCheck, Disc, Video } from 'lucide-react';
import type { SiteSettings } from '../types';

interface AboutGearSectionProps {
  settings: SiteSettings;
}

export const AboutGearSection: React.FC<AboutGearSectionProps> = ({ settings }) => {
  return (
    <section id="about" className="py-24 bg-[#e7d9d1] relative z-10 border-t border-[#8b0101]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Photographer Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-[#8b0101]/20">
              <img
                src="/media/Photos/Wedding/03.jpg"
                alt={settings.photographerName}
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b0808]/90 via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[#e7d9d1] text-xs font-bold uppercase tracking-widest block mb-1">
                  Lead Director & Photographer
                </span>
                <h3 className="font-syne font-extrabold text-2xl text-white">
                  Swaroopnaikfilms
                </h3>
                <p className="text-[#e7d9d1]/90 text-xs mt-1 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#e7d9d1]" />
                  Shriwardhan • Mumbai • Kokan • Worldwide
                </p>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-4 glass-panel p-4 rounded-2xl border border-[#8b0101]/30 shadow-xl flex items-center gap-3 bg-white/90">
              <div className="w-10 h-10 rounded-full crimson-gradient-bg p-[1px]">
                <div className="w-full h-full bg-[#8b0101] rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="font-syne font-bold text-[#2b0808] text-sm block">100+ Weddings</span>
                <span className="text-[#6b4b4b] text-[10px] uppercase font-mono font-bold">Shriwardhan • Mumbai • Kokan</span>
              </div>
            </div>
          </div>

          {/* Bio & Cinema Gear Specs */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b0101]/10 text-[#8b0101] border border-[#8b0101]/25 text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#8b0101]" />
                <span>The Vision Behind The Lens</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-syne font-bold text-[#2b0808] tracking-tight mb-4">
                SWAROOPNAIKFILMS <span className="gold-gradient-text">GEARS & VISION</span>
              </h2>
              <p className="text-[#4a2929] text-base leading-relaxed font-normal">
                Specializing in luxury wedding cinema, pre-wedding trailers, candid wedding stories, and birthday milestone films. Equipped with high-end Sony cinema cameras, prime glass, and professional lighting setup.
              </p>
            </div>

            {/* Gear Arsenal Breakdown */}
            <div className="space-y-4">
              <h3 className="font-syne font-bold text-lg text-[#2b0808] flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#8b0101]" />
                Gears We Have
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Cameras */}
                <div className="glass-panel p-4 rounded-2xl border border-[#8b0101]/15 bg-white/80 shadow-sm">
                  <span className="text-[#8b0101] text-xs font-bold uppercase tracking-wider block mb-2 font-mono flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" /> Cameras
                  </span>
                  <ul className="space-y-1 text-xs text-[#2b0808] font-semibold">
                    <li>• Sony M4 (Alpha 7 IV)</li>
                    <li>• Sony M5 (Alpha 7 V)</li>
                    <li>• Sony Siii (Alpha 7S III)</li>
                  </ul>
                </div>

                {/* Lenses */}
                <div className="glass-panel p-4 rounded-2xl border border-[#8b0101]/15 bg-white/80 shadow-sm">
                  <span className="text-[#8b0101] text-xs font-bold uppercase tracking-wider block mb-2 font-mono flex items-center gap-1">
                    <Disc className="w-3.5 h-3.5" /> Lenses & Optics
                  </span>
                  <ul className="space-y-1 text-xs text-[#2b0808] font-semibold">
                    <li>• Sigma DG-DN (16-28mm, 35mm, 85mm)</li>
                    <li>• Samyang T1.9 Cine Lens (24mm, 35mm, 75mm)</li>
                  </ul>
                </div>

                {/* Drones */}
                <div className="glass-panel p-4 rounded-2xl border border-[#8b0101]/15 bg-white/80 shadow-sm">
                  <span className="text-[#8b0101] text-xs font-bold uppercase tracking-wider block mb-2 font-mono flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" /> Aerial Drones
                  </span>
                  <ul className="space-y-1 text-xs text-[#2b0808] font-semibold">
                    <li>• DJI Mavic 3 Pro</li>
                    <li>• DJI Mavic 2 Pro</li>
                  </ul>
                </div>

                {/* Lighting & Accessories */}
                <div className="glass-panel p-4 rounded-2xl border border-[#8b0101]/15 bg-white/80 shadow-sm">
                  <span className="text-[#8b0101] text-xs font-bold uppercase tracking-wider block mb-2 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Accessories & Lighting
                  </span>
                  <ul className="space-y-1 text-xs text-[#2b0808] font-semibold">
                    <li>• Ronin RS5 Gimbal</li>
                    <li>• Godox LC500 & Nanlite RGB Lights</li>
                    <li>• Viltrox 5-inch Monitor</li>
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
