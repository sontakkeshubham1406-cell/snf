import React from 'react';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-24 bg-[#e7d9d1] relative z-10 border-t border-[#8b0101]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b0101]/10 text-[#8b0101] border border-[#8b0101]/25 text-xs font-bold uppercase tracking-widest mb-3">
            <Quote className="w-3.5 h-3.5 text-[#8b0101]" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-syne font-bold text-[#2b0808] tracking-tight mb-4">
            WORDS OF <span className="gold-gradient-text">APPRECIATION</span>
          </h2>
          <p className="text-[#4a2929] text-sm sm:text-base font-normal">
            Read stories and feedback from couples, fashion directors, and luxury brand leaders.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="glass-panel p-8 rounded-3xl border border-[#8b0101]/15 flex flex-col justify-between hover:border-[#8b0101]/50 transition-all duration-300 shadow-sm hover:shadow-xl bg-white/80"
            >
              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-[#8b0101] mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#8b0101]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-[#2b0808] text-sm leading-relaxed italic mb-8 font-medium">
                  "{t.quote}"
                </p>
              </div>

              {/* Client Profile */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#8b0101]/15">
                <img
                  src={t.avatarUrl}
                  alt={t.clientName}
                  className="w-12 h-12 rounded-full object-cover border border-[#8b0101]/30"
                />
                <div>
                  <h4 className="font-syne font-bold text-[#2b0808] text-sm">{t.clientName}</h4>
                  <span className="text-[#6b4b4b] text-xs block font-medium">{t.role}</span>
                  <span className="text-[#8b0101] text-[10px] uppercase font-mono tracking-wider font-extrabold">
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
