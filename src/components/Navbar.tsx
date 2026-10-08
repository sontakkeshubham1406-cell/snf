import React, { useState, useEffect } from 'react';
import { Lock, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import type { SiteSettings } from '../types';

interface NavbarProps {
  settings: SiteSettings;
  onOpenAdmin: () => void;
  isAdmin: boolean;
  onLogoutAdmin: () => void;
  unreadInquiriesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onOpenAdmin,
  isAdmin,
  onLogoutAdmin,
  unreadInquiriesCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Color Grading', href: '#color-grading' },
    { name: 'Showreel', href: '#showreel' },
    { name: 'Services & Rates', href: '#services' },
    { name: 'Client Proofing', href: '#proofing' },
    { name: 'Gear & Bio', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo - Icon Only */}
          <a href="#" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt={settings.brandName} 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_10px_rgba(251,191,36,0.2)]" 
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 whitespace-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] xl:text-xs uppercase tracking-wider xl:tracking-widest text-zinc-300 hover:text-amber-400 transition-colors py-1 font-semibold relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAdmin}
                  className="relative px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-2 hover:bg-amber-500/30 transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Admin Portal Active
                  {unreadInquiriesCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {unreadInquiriesCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={onLogoutAdmin}
                  className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Exit Admin
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 hover:text-white flex items-center gap-1.5 transition-all"
                title="Admin Dashboard Login"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Admin Dashboard
              </button>
            )}

            <a
              href="#contact"
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-black gold-gradient-bg hover:brightness-110 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
            >
              Book Shoot
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-amber-400 hover:text-amber-300 focus:outline-none"
              title="Admin Login"
            >
              <Lock className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#09090b]/98 border-b border-zinc-800 px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-wider text-zinc-200 hover:text-amber-400 py-2 border-b border-zinc-800/40"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black gold-gradient-bg"
            >
              Book A Shoot
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
