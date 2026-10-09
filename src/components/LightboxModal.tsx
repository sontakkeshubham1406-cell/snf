import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Info, MapPin, Share2, Maximize2, Minimize2, Heart } from 'lucide-react';
import type { MediaItem } from '../types';

interface LightboxModalProps {
  item: MediaItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onToggleLike?: (id: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
  onToggleLike
}) => {
  const [showInfo, setShowInfo] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
      
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[#8b0101]/20 text-[#e7d9d1] border border-[#8b0101]/40 text-xs font-semibold uppercase tracking-wider">
            {item.category}
          </span>
          <span className="text-[#e7d9d1]/70 text-xs hidden sm:inline-block">
            {item.clientName ? `Client: ${item.clientName}` : 'Fine Art Photography'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2.5 rounded-full transition-colors ${
              showInfo ? 'crimson-gradient-bg text-white' : 'bg-[#160a0a] text-[#e7d9d1] hover:text-white border border-rose-950/40'
            }`}
            title="Toggle EXIF Info"
          >
            <Info className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2.5 rounded-full bg-[#160a0a] text-[#e7d9d1] hover:text-white border border-rose-950/40 transition-colors"
            title="Toggle Zoom"
          >
            {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-[#160a0a] text-[#e7d9d1] hover:text-white border border-rose-950/40 transition-colors relative"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
            {copied && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] crimson-gradient-bg text-white px-2 py-0.5 rounded font-bold whitespace-nowrap">
                Link Copied!
              </span>
            )}
          </button>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#1c0c0c] text-white hover:bg-[#8b0101] border border-rose-950/40 transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full h-full flex items-center justify-center pt-16 pb-12 px-4">
        {onPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 z-20 p-3 rounded-full bg-[#160a0a]/80 text-white hover:bg-[#8b0101] transition-all shadow-xl border border-rose-950/40"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className={`relative max-w-full max-h-full transition-all duration-300 ${isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'}`}>
          <img
            src={item.url}
            alt={item.title}
            onClick={() => setIsZoomed(!isZoomed)}
            className="max-h-[82vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-rose-950/50"
          />
        </div>

        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 z-20 p-3 rounded-full bg-[#160a0a]/80 text-white hover:bg-[#8b0101] transition-all shadow-xl border border-rose-950/40"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* EXIF Information Sidebar / Bottom Panel */}
      {showInfo && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-96 glass-panel p-5 rounded-2xl border border-rose-950/40 shadow-2xl z-20 animate-slideUp">
          <div className="flex items-start justify-between mb-3 border-b border-rose-950/40 pb-2">
            <div>
              <h3 className="font-syne font-bold text-lg text-white">{item.title}</h3>
              <p className="text-[#e7d9d1]/70 text-xs">{item.description || 'Master Photography Stills'}</p>
            </div>
            {onToggleLike && (
              <button
                onClick={() => onToggleLike(item.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e0c0c] text-[#e7d9d1] hover:text-red-400 text-xs font-mono border border-rose-950/40"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-red-500" />
                <span>{item.likesCount || 0}</span>
              </button>
            )}
          </div>

          {/* EXIF Camera Details Grid */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#e7d9d1]/80">
              <span className="text-[#e7d9d1]/60 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#e7d9d1]" />
                Camera Body
              </span>
              <span className="font-mono font-medium text-white">{item.exif?.camera || 'Sony Alpha 1'}</span>
            </div>

            <div className="flex items-center justify-between text-[#e7d9d1]/80">
              <span className="text-[#e7d9d1]/60">Optics Lens</span>
              <span className="font-mono text-white">{item.exif?.lens || 'FE 85mm f/1.4 GM'}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-rose-950/40 text-center font-mono">
              <div className="bg-[#160a0a] p-2 rounded-lg border border-rose-950/40">
                <span className="block text-[10px] text-[#e7d9d1]/60 uppercase">Aperture</span>
                <span className="text-[#e7d9d1] font-bold">{item.exif?.aperture || 'f/1.4'}</span>
              </div>
              <div className="bg-[#160a0a] p-2 rounded-lg border border-rose-950/40">
                <span className="block text-[10px] text-[#e7d9d1]/60 uppercase">Shutter</span>
                <span className="text-white font-bold">{item.exif?.shutterSpeed || '1/2000s'}</span>
              </div>
              <div className="bg-[#160a0a] p-2 rounded-lg border border-rose-950/40">
                <span className="block text-[10px] text-[#e7d9d1]/60 uppercase">ISO</span>
                <span className="text-white font-bold">{item.exif?.iso || '100'}</span>
              </div>
            </div>

            {item.exif?.location && (
              <div className="flex items-center gap-1.5 text-[#e7d9d1]/70 text-[11px] pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#e7d9d1]" />
                <span>{item.exif.location}</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
