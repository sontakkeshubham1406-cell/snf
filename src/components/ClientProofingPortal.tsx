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
    <section id="proofing" className="py-24 bg-[#e7d9d1] relative z-10 border-t border-[#8b0101]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b0101]/10 text-[#8b0101] border border-[#8b0101]/25 text-xs font-bold uppercase tracking-widest mb-3">
            <Lock className="w-3.5 h-3.5 text-[#8b0101]" />
            <span>Private Client Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-syne font-bold text-[#2b0808] tracking-tight mb-4">
            CLIENT PROOFING <span className="gold-gradient-text">PORTAL</span>
          </h2>
          <p className="text-[#4a2929] text-sm sm:text-base font-normal">
            Private passcode-protected portal for clients to review high-res photos, pick favorites for print albums, and request retouching.
          </p>
        </div>

        {/* Lock / Unlock Interface */}
        {!activeAlbum ? (
          <div className="max-w-md mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-[#8b0101]/20 shadow-xl text-center bg-white/90">
            <div className="w-16 h-16 rounded-full crimson-gradient-bg p-[1px] mx-auto mb-6">
              <div className="w-full h-full bg-[#8b0101] rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            <h3 className="font-syne font-bold text-xl text-[#2b0808] mb-2">Access Client Album</h3>
            <p className="text-[#4a2929] text-xs mb-6 font-medium">
              Enter the unique access passcode provided in your delivery email.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter Passcode (e.g. SWAROOP2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-white border border-[#8b0101]/30 rounded-full px-5 py-3 text-sm text-center text-[#2b0808] placeholder-[#805959] focus:outline-none focus:border-[#8b0101] font-mono tracking-widest shadow-sm font-bold"
                />
              </div>

              {errorMessage && (
                <p className="text-[#8b0101] text-xs font-bold">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shadow-lg shadow-[#8b0101]/25"
              >
                Unlock Private Gallery
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#8b0101]/15 text-center">
              <span className="text-[11px] text-[#6b4b4b] block mb-2 font-medium">Evaluating as client/client reviewer?</span>
              <button
                onClick={handleQuickDemoUnlock}
                className="text-xs text-[#8b0101] hover:underline font-bold flex items-center justify-center gap-1 mx-auto"
              >
                <Unlock className="w-3.5 h-3.5 text-[#8b0101]" />
                Quick Demo Unlock (Passcode: SWAROOP2026)
              </button>
            </div>
          </div>
        ) : (
          /* Unlocked Active Album Gallery View */
          <div className="space-y-8 animate-fadeIn">
            
            {/* Album Header Bar */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#8b0101]/20 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/90 shadow-md">
              <div className="flex items-center gap-4">
                <img
                  src={activeAlbum.coverUrl}
                  alt={activeAlbum.albumTitle}
                  className="w-16 h-16 rounded-2xl object-cover border border-[#8b0101]/30"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-500/40 text-emerald-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" /> Proofing Active
                    </span>
                    <span className="text-[#6b4b4b] text-xs font-mono font-semibold">{activeAlbum.eventDate}</span>
                  </div>
                  <h3 className="font-syne font-bold text-2xl text-[#2b0808] mt-1">{activeAlbum.albumTitle}</h3>
                  <p className="text-[#4a2929] text-xs font-semibold">Client: {activeAlbum.clientName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center px-4 py-2 bg-white rounded-2xl border border-[#8b0101]/20 shadow-sm">
                  <span className="block text-[10px] text-[#6b4b4b] uppercase font-bold">Selected Favorites</span>
                  <span className="text-xl font-syne font-extrabold text-[#8b0101] font-mono">
                    {activeAlbum.selectedCount} / {activeAlbum.photosCount}
                  </span>
                </div>

                <button
                  onClick={() => setActiveAlbum(null)}
                  className="px-4 py-2 rounded-full bg-white text-[#2b0808] hover:text-[#8b0101] text-xs font-bold border border-[#8b0101]/30 shadow-sm"
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
                  className={`glass-panel rounded-2xl overflow-hidden border transition-all bg-white/90 shadow-sm ${
                    photo.isSelected ? 'border-[#8b0101] ring-2 ring-[#8b0101]/40' : 'border-[#8b0101]/15'
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-[#2b0808]">
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
                          : 'bg-white/90 text-[#2b0808] hover:bg-white border border-[#8b0101]/30'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${photo.isSelected ? 'fill-current' : ''}`} />
                      {photo.isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-syne font-bold text-[#2b0808]">{photo.title}</h4>
                      <a
                        href={photo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#8b0101] hover:underline font-bold flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5 text-[#8b0101]" /> High-Res
                      </a>
                    </div>

                    {/* Client Retouching Notes Input */}
                    <div className="pt-2 border-t border-[#8b0101]/15">
                      <label className="text-[10px] text-[#6b4b4b] uppercase font-bold block mb-1">
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
                          className="flex-1 bg-white border border-[#8b0101]/20 rounded-lg px-2.5 py-1.5 text-xs text-[#2b0808] placeholder-[#805959] focus:outline-none focus:border-[#8b0101]"
                        />
                        <button
                          onClick={() => handleSaveComment(photo.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#8b0101]/10 text-[#8b0101] hover:bg-[#8b0101] hover:text-white text-xs font-bold border border-[#8b0101]/30 transition-colors"
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
