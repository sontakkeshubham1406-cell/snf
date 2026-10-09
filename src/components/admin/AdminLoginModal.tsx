import React, { useState } from 'react';
import { KeyRound, X, ShieldCheck } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin password is "admin123"
    if (pin.trim() === 'admin123' || pin.trim() === '1234') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Incorrect Admin PIN/Password. Default PIN: admin123');
    }
  };

  const handleQuickDemoLogin = () => {
    setPin('admin123');
    setError('');
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2b0808]/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#2b0808] border border-[#8b0101]/40 rounded-3xl p-8 shadow-2xl text-[#e7d9d1]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#e7d9d1]/70 hover:text-white rounded-full bg-[#180404] border border-[#8b0101]/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <img src="/logo.png" alt="Swaroopnaikfilms" className="h-12 w-auto object-contain brightness-0 invert opacity-95" />
          </div>
          <h3 className="font-syne font-bold text-xl text-white tracking-wide">STUDIO ADMIN PORTAL</h3>
          <p className="text-[#e7d9d1]/70 text-xs mt-1">
            Enter PIN code to manage portfolio media, client inquiries & site settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">
              Admin Password / PIN
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#e7d9d1]/50" />
              <input
                type="password"
                required
                placeholder="Enter PIN (Default: admin123)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#e7d9d1]/40 focus:outline-none focus:border-[#8b0101] font-mono tracking-widest"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shadow-lg shadow-[#8b0101]/30 transition-transform active:scale-98"
          >
            Unlock Admin Dashboard
          </button>
        </form>

        {/* Demo Quick Button */}
        <div className="mt-6 pt-6 border-t border-[#8b0101]/30 text-center">
          <span className="text-[11px] text-[#e7d9d1]/60 block mb-2">Testing client-ready admin features?</span>
          <button
            onClick={handleQuickDemoLogin}
            className="text-xs text-[#e7d9d1] hover:text-white hover:underline font-bold flex items-center justify-center gap-1.5 mx-auto transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-[#8b0101]" />
            Auto-Login as Admin (PIN: admin123)
          </button>
        </div>

      </div>
    </div>
  );
};
