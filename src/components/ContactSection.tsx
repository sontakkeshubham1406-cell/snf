import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ClientInquiry, SiteSettings } from '../types';

interface ContactSectionProps {
  settings: SiteSettings;
  selectedServicePreset?: string;
  onAddInquiry: (inquiry: ClientInquiry) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  selectedServicePreset,
  onAddInquiry
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: selectedServicePreset || 'Luxury Destination Wedding',
    eventDate: '',
    budgetRange: '₹1,50,000 - ₹2,50,000',
    location: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please provide your name and email address.');
      return;
    }

    const newInquiry: ClientInquiry = {
      id: `inq-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceType: formData.serviceType,
      eventDate: formData.eventDate,
      budgetRange: formData.budgetRange,
      location: formData.location,
      message: formData.message,
      status: 'new',
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddInquiry(newInquiry);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#080303] relative z-10 border-t border-rose-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b0101]/20 text-[#e7d9d1] border border-[#8b0101]/40 text-xs font-semibold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#e7d9d1]" />
                <span>Reserve Your Date</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-syne font-bold text-white tracking-tight mb-4">
                LET'S CREATE <span className="gold-gradient-text">TOGETHER</span>
              </h2>
              <p className="text-[#e7d9d1]/80 text-sm leading-relaxed">
                Currently accepting luxury wedding, commercial cinema, and fashion editorial commissions worldwide. Fill out the booking form to receive custom pricing proposal within 24 hours.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="glass-panel p-4 rounded-2xl border border-rose-950/40 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8b0101]/30 text-[#e7d9d1] flex items-center justify-center shrink-0 border border-[#8b0101]/40">
                  <Mail className="w-5 h-5 text-[#e7d9d1]" />
                </div>
                <div>
                  <span className="text-[10px] text-[#e7d9d1]/60 uppercase font-bold tracking-wider">Direct Email</span>
                  <a href={`mailto:${settings.email}`} className="text-white text-sm font-semibold hover:text-[#e7d9d1] block">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-rose-950/40 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8b0101]/30 text-[#e7d9d1] flex items-center justify-center shrink-0 border border-[#8b0101]/40">
                  <Phone className="w-5 h-5 text-[#e7d9d1]" />
                </div>
                <div>
                  <span className="text-[10px] text-[#e7d9d1]/60 uppercase font-bold tracking-wider">Studio Phone</span>
                  <a href={`tel:${settings.phone}`} className="text-white text-sm font-semibold hover:text-[#e7d9d1] block">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-rose-950/40 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8b0101]/30 text-[#e7d9d1] flex items-center justify-center shrink-0 border border-[#8b0101]/40">
                  <MapPin className="w-5 h-5 text-[#e7d9d1]" />
                </div>
                <div>
                  <span className="text-[10px] text-[#e7d9d1]/60 uppercase font-bold tracking-wider">Studios & Locations</span>
                  <span className="text-white text-sm font-semibold block">{settings.location}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Booking Inquiry Form Right Column */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-rose-950/40 shadow-2xl">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-syne font-bold text-2xl text-white">Inquiry Received!</h3>
                  <p className="text-[#e7d9d1]/80 text-sm max-w-md mx-auto">
                    Thank you for reaching out. Swaroop Naik and our studio team will review your project details and respond via email within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        serviceType: 'Luxury Destination Wedding',
                        eventDate: '',
                        budgetRange: '₹1,50,000 - ₹2,50,000',
                        location: '',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#1c0c0c] hover:bg-[#2c0f0f] text-[#e7d9d1] text-xs font-bold uppercase tracking-wider border border-rose-950/40"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-syne font-bold text-xl text-white mb-2">Commission Inquiry</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#e7d9d1]/70 uppercase font-semibold block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul & Neha"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#160a0a] border border-rose-950/40 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#8b0101]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#e7d9d1]/70 uppercase font-semibold block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#160a0a] border border-rose-950/40 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#8b0101]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#e7d9d1]/70 uppercase font-semibold block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#160a0a] border border-rose-950/40 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#8b0101]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#e7d9d1]/70 uppercase font-semibold block mb-1">Service Required</label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full bg-[#160a0a] border border-rose-950/40 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#8b0101]"
                      >
                        <option value="Luxury Destination Wedding">Destination Wedding Photography & Cinema</option>
                        <option value="1st Birthday Milestone Shoot">1st Birthday Milestone & Party Shoot</option>
                        <option value="Commercial Brand Film">Commercial & Brand Film</option>
                        <option value="Pre-Wedding Cinematic Teaser">Pre-Wedding Cinematic Teaser</option>
                        <option value="Custom Project">Custom Project Commission</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#e7d9d1]/70 uppercase font-semibold block mb-1">Target Event Date</label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-[#160a0a] border border-rose-950/40 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#8b0101]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[#e7d9d1]/70 uppercase font-semibold block mb-1">Estimated Budget</label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full bg-[#160a0a] border border-rose-950/40 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#8b0101]"
                      >
                        <option value="₹35,000 - ₹50,000">₹35,000 - ₹50,000</option>
                        <option value="₹65,000 - ₹1,000,00">₹65,000 - ₹1,00,000</option>
                        <option value="₹1,50,000 - ₹2,50,000">₹1,50,000 - ₹2,50,000</option>
                        <option value="₹2,50,000+">₹2,50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#e7d9d1]/70 uppercase font-semibold block mb-1">Event Location / City</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, Pune, Goa, Udaipur, Dubai..."
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-[#160a0a] border border-rose-950/40 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#8b0101]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#e7d9d1]/70 uppercase font-semibold block mb-1">Project Details & Vision</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your story, timeline, preferred aesthetic, or specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#160a0a] border border-rose-950/40 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#8b0101]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shadow-xl shadow-[#8b0101]/30 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Booking Inquiry
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
