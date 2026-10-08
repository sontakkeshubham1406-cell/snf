import React from 'react';
import { Camera, Lock, Video, ArrowUp } from 'lucide-react';
import type { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-zinc-900 pt-16 pb-12 relative z-10 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-900">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gold-gradient-bg p-[1px]">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-syne font-extrabold text-xl text-white tracking-wider">
                {settings.brandName}
              </span>
            </div>
            
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              {settings.tagline}. Fine art photography and 4K cinema films for luxury weddings, high fashion editorials, and commercial brands.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={settings.youtubeUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href={settings.vimeoUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-colors">
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-syne font-bold text-white uppercase text-xs tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Fine Art Portfolio</a></li>
              <li><a href="#color-grading" className="hover:text-amber-400 transition-colors">RAW vs Color Grading</a></li>
              <li><a href="#showreel" className="hover:text-amber-400 transition-colors">4K Cinema Showreel</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Services & Pricing</a></li>
              <li><a href="#proofing" className="hover:text-amber-400 transition-colors">Client Proofing Portal</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">Bio & Gear Setup</a></li>
            </ul>
          </div>

          {/* Admin & Support */}
          <div>
            <h4 className="font-syne font-bold text-white uppercase text-xs tracking-widest mb-4">Studio Administration</h4>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              Photographer studio manager dashboard for uploading photos, videos, updating prices, and managing client bookings.
            </p>
            <button
              onClick={onOpenAdmin}
              className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-amber-500 hover:text-black text-amber-300 border border-zinc-800 transition-all font-semibold flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              Open Admin Dashboard
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <span>
            © 2026 {settings.brandName} by {settings.photographerName}. All rights reserved.
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-amber-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
