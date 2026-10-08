import React from 'react';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-24 bg-[#09090b] relative z-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-widest mb-3">
            <Quote className="w-3.5 h-3.5" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-syne font-bold text-white tracking-tight mb-4">
            WORDS OF <span className="gold-gradient-text">APPRECIATION</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Read stories and feedback from couples, fashion directors, and luxury brand leaders.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="glass-panel p-8 rounded-3xl border border-zinc-800 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-zinc-300 text-sm leading-relaxed italic mb-8">
                  "{t.quote}"
                </p>
              </div>

              {/* Client Profile */}
              <div className="flex items-center gap-4 pt-6 border-t border-zinc-800">
                <img
                  src={t.avatarUrl}
                  alt={t.clientName}
                  className="w-12 h-12 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <h4 className="font-syne font-bold text-white text-sm">{t.clientName}</h4>
                  <span className="text-zinc-400 text-xs block">{t.role}</span>
                  <span className="text-amber-400 text-[10px] uppercase font-mono tracking-wider">
                    {t.projectTag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
