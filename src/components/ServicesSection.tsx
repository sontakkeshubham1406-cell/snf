import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import type { ServicePackage } from '../types';

interface ServicesSectionProps {
  services: ServicePackage[];
  onSelectService: (title: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectService }) => {
  return (
    <section id="services" className="py-24 bg-[#09090b] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Investment & Deliverables</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-syne font-bold text-white tracking-tight mb-4">
            SERVICES & <span className="gold-gradient-text">RATES</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Transparent pricing packages tailored for luxury destination weddings, commercial campaigns, and editorial portrait sessions.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((pkg) => (
            <div
              key={pkg.id}
              className={`glass-panel p-8 rounded-3xl relative flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'border-amber-500/60 shadow-2xl shadow-amber-500/15 bg-zinc-900/90 -translate-y-2'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gold-gradient-bg text-black text-[10px] font-extrabold uppercase tracking-widest shadow-lg">
                  Most Requested Collection
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-[10px] uppercase font-bold tracking-wider">
                    {pkg.category}
                  </span>
                  <span className="text-zinc-500 text-xs font-mono">{pkg.duration}</span>
                </div>

                <h3 className="text-2xl font-syne font-bold text-white mb-2">{pkg.title}</h3>
                <p className="text-zinc-400 text-xs mb-6 leading-relaxed">{pkg.subtitle}</p>

                <div className="mb-8 pb-6 border-b border-zinc-800">
                  <span className="text-zinc-400 text-xs block uppercase tracking-wider mb-1">Starting From</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-syne font-extrabold text-white">{pkg.price}</span>
                    <span className="text-zinc-500 text-xs font-mono">USD</span>
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-3 mb-8 text-xs text-zinc-300">
                  {pkg.deliverables.map((item, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectService(pkg.title)}
                className={`w-full py-3.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? 'gold-gradient-bg text-black hover:brightness-110 shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                }`}
              >
                <span>Inquire Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
