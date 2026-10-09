import React, { useState } from 'react';
import { Lock, Unlock, Heart, Download, ShieldCheck } from 'lucide-react';
import type { ProofingAlbum } from '../types';

interface ClientProofingPortalProps {
  albums: ProofingAlbum[];
  onUpdateAlbum: (album: ProofingAlbum) => void;
}

export const ClientProofingPortal: React.FC<ClientProofingPortalProps> = ({ albums, onUpdateAlbum }) => {
  const [passcode, setPasscode] = useState('');
  const [activeAlbum, setActiveAlbum] = useState<ProofingAlbum | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [commentInput, setCommentInput] = useState<{ [photoId: string]: string }>({});

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const found = albums.find((a) => a.passcode.trim().toUpperCase() === passcode.trim().toUpperCase());
    if (found) {
      setActiveAlbum(found);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid Access Passcode. Try demo code: SWAROOP2026');
    }
  };

  const handleQuickDemoUnlock = () => {
    if (albums.length > 0) {
      setActiveAlbum(albums[0]);
      setPasscode(albums[0].passcode);
      setErrorMessage('');
    }
  };

  const handleToggleSelectPhoto = (photoId: string) => {
    if (!activeAlbum) return;
    const updatedPhotos = activeAlbum.photos.map((p) => {
      if (p.id === photoId) {
        return { ...p, isSelected: !p.isSelected };
      }
      return p;
    });

    const selectedCount = updatedPhotos.filter((p) => p.isSelected).length;
    const updatedAlbum: ProofingAlbum = {
      ...activeAlbum,
      photos: updatedPhotos,
      selectedCount
    };

    setActiveAlbum(updatedAlbum);
    onUpdateAlbum(updatedAlbum);
  };

  const handleSaveComment = (photoId: string) => {
    if (!activeAlbum) return;
    const commentText = commentInput[photoId] || '';
    const updatedPhotos = activeAlbum.photos.map((p) => {
      if (p.id === photoId) {
        return { ...p, clientComment: commentText };
      }
      return p;
    });

    const updatedAlbum: ProofingAlbum = {
      ...activeAlbum,
      photos: updatedPhotos
    };

    setActiveAlbum(updatedAlbum);
    onUpdateAlbum(updatedAlbum);
    alert('Note saved for photographer review!');
  };

  return (
    <section id="proofing" className="py-24 bg-[#080303] relative z-10 border-t border-rose-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b0101]/20 text-[#e7d9d1] border border-[#8b0101]/40 text-xs font-semibold uppercase tracking-widest mb-3">
            <Lock className="w-3.5 h-3.5 text-[#e7d9d1]" />
            <span>Private Client Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-syne font-bold text-white tracking-tight mb-4">
            CLIENT PROOFING <span className="gold-gradient-text">PORTAL</span>
          </h2>
          <p className="text-[#e7d9d1]/70 text-sm sm:text-base">
            Private passcode-protected portal for clients to review high-res photos, pick favorites for print albums, and request retouching.
          </p>
        </div>

        {/* Lock / Unlock Interface */}
        {!activeAlbum ? (
          <div className="max-w-md mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-rose-950/40 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full crimson-gradient-bg p-[1px] mx-auto mb-6">
              <div className="w-full h-full bg-[#160a0a] rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#e7d9d1]" />
              </div>
            </div>

            <h3 className="font-syne font-bold text-xl text-white mb-2">Access Client Album</h3>
            <p className="text-[#e7d9d1]/70 text-xs mb-6">
              Enter the unique access passcode provided in your delivery email.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter Passcode (e.g. SWAROOP2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-[#160a0a] border border-rose-950/50 rounded-full px-5 py-3 text-sm text-center text-white placeholder-[#e7d9d1]/40 focus:outline-none focus:border-[#8b0101] font-mono tracking-widest"
                />
              </div>

              {errorMessage && (
                <p className="text-red-400 text-xs font-medium">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shadow-lg shadow-[#8b0101]/30"
              >
                Unlock Private Gallery
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-rose-950/40 text-center">
              <span className="text-[11px] text-[#e7d9d1]/50 block mb-2">Evaluating as client/client reviewer?</span>
              <button
                onClick={handleQuickDemoUnlock}
                className="text-xs text-[#e7d9d1] hover:underline font-semibold flex items-center justify-center gap-1 mx-auto"
              >
                <Unlock className="w-3.5 h-3.5 text-[#e7d9d1]" />
                Quick Demo Unlock (Passcode: SWAROOP2026)
              </button>
            </div>
          </div>
        ) : (
          /* Unlocked Active Album Gallery View */
          <div className="space-y-8 animate-fadeIn">
            
            {/* Album Header Bar */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-950/40 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={activeAlbum.coverUrl}
                  alt={activeAlbum.albumTitle}
                  className="w-16 h-16 rounded-2xl object-cover border border-rose-950/40"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Proofing Active
                    </span>
                    <span className="text-[#e7d9d1]/50 text-xs">{activeAlbum.eventDate}</span>
                  </div>
                  <h3 className="font-syne font-bold text-2xl text-white mt-1">{activeAlbum.albumTitle}</h3>
                  <p className="text-[#e7d9d1]/70 text-xs">Client: {activeAlbum.clientName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center px-4 py-2 bg-[#160a0a] rounded-2xl border border-rose-950/40">
                  <span className="block text-[10px] text-[#e7d9d1]/60 uppercase">Selected Favorites</span>
                  <span className="text-xl font-syne font-extrabold text-[#e7d9d1] font-mono">
                    {activeAlbum.selectedCount} / {activeAlbum.photosCount}
                  </span>
                </div>

                <button
                  onClick={() => setActiveAlbum(null)}
                  className="px-4 py-2 rounded-full bg-[#1e0c0c] text-[#e7d9d1] hover:text-white text-xs font-semibold border border-rose-950/40"
                >
                  Lock Album
                </button>
              </div>
            </div>

            {/* Proofing Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeAlbum.photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`glass-panel rounded-2xl overflow-hidden border transition-all ${
                    photo.isSelected ? 'border-[#8b0101] ring-2 ring-[#8b0101]/50' : 'border-rose-950/40'
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-black">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Top Select Toggle */}
                    <button
                      onClick={() => handleToggleSelectPhoto(photo.id)}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xl transition-all ${
                        photo.isSelected
                          ? 'crimson-gradient-bg text-white'
                          : 'bg-black/80 text-[#e7d9d1] hover:bg-[#250d0d] border border-white/20'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${photo.isSelected ? 'fill-current' : ''}`} />
                      {photo.isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-syne font-bold text-white">{photo.title}</h4>
                      <a
                        href={photo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#e7d9d1] hover:underline flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5 text-[#e7d9d1]" /> High-Res
                      </a>
                    </div>

                    {/* Client Retouching Notes Input */}
                    <div className="pt-2 border-t border-rose-950/40">
                      <label className="text-[10px] text-[#e7d9d1]/60 uppercase font-semibold block mb-1">
                        Retouching Notes / Request:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={photo.clientComment || "e.g. 'Smooth shadow', 'Make black & white'..."}
                          value={commentInput[photo.id] ?? (photo.clientComment || '')}
                          onChange={(e) =>
                            setCommentInput({ ...commentInput, [photo.id]: e.target.value })
                          }
                          className="flex-1 bg-[#160a0a] border border-rose-950/40 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#8b0101]"
                        />
                        <button
                          onClick={() => handleSaveComment(photo.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#1f0b0b] text-[#e7d9d1] hover:bg-[#2e0e0e] text-xs font-semibold border border-rose-950/40"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
