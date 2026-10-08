import React, { useState } from 'react';
import { Lock, KeyRound, X, ShieldCheck } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full gold-gradient-bg p-[1px] mx-auto mb-4">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <Lock className="w-7 h-7 text-amber-400" />
            </div>
          </div>
          <h3 className="font-syne font-bold text-2xl text-white">Photographer Admin Portal</h3>
          <p className="text-zinc-400 text-xs mt-1">
            Enter PIN code to manage portfolio media, client inquiries & site settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 font-semibold uppercase block mb-1">
              Admin Password / PIN
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                required
                placeholder="Enter PIN (Default: admin123)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 font-mono tracking-widest"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-black gold-gradient-bg hover:brightness-110 shadow-lg shadow-amber-500/20"
          >
            Unlock Admin Dashboard
          </button>
        </form>

        {/* Demo Quick Button */}
        <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
          <span className="text-[11px] text-zinc-500 block mb-2">Testing client-ready admin features?</span>
          <button
            onClick={handleQuickDemoLogin}
            className="text-xs text-amber-400 hover:underline font-bold flex items-center justify-center gap-1.5 mx-auto"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Auto-Login as Admin (PIN: admin123)
          </button>
        </div>

      </div>
    </div>
  );
};
