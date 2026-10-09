import React from 'react';
import { X, Video, Film, MapPin, Share2 } from 'lucide-react';
import type { MediaItem } from '../types';

interface VideoPlayerModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#0d0505] border border-rose-950/40 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-rose-950/40 bg-[#140808]/80">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full crimson-gradient-bg p-[1px]">
              <div className="w-full h-full bg-[#160a0a] rounded-full flex items-center justify-center">
                <Video className="w-4 h-4 text-[#e7d9d1]" />
              </div>
            </span>
            <div>
              <h3 className="font-syne font-bold text-lg text-white leading-tight">{item.title}</h3>
              <p className="text-[#e7d9d1]/70 text-xs">
                {item.clientName ? `Client: ${item.clientName}` : item.category}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#1e0c0c] text-zinc-300 hover:text-white hover:bg-[#8b0101] border border-rose-950/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          {item.url.includes('youtube.com') || item.url.includes('vimeo.com') ? (
            <iframe
              src={item.url}
              title={item.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={item.url}
              controls
              autoPlay
              className="w-full h-full object-contain"
              poster={item.thumbnailUrl}
            >
              Your browser does not support HTML5 video playback.
            </video>
          )}
        </div>

        {/* Video Details Bottom Footer */}
        <div className="p-6 bg-[#140808]/90 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-2">
            <span className="text-[#e7d9d1] text-[10px] uppercase font-bold tracking-widest block mb-1">
              Production Details
            </span>
            <p className="text-[#e7d9d1]/80 leading-relaxed mb-3">
              {item.description || 'Master cinematic film edited with Davinci Resolve Studio and color graded with custom film emulation profiles.'}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[#e7d9d1]/70">
              <span className="flex items-center gap-1 text-white font-mono">
                <Film className="w-3.5 h-3.5 text-[#e7d9d1]" />
                {item.gearUsed || 'RED Komodo 6K'}
              </span>
              {item.exif?.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#e7d9d1]" />
                  {item.exif.location}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between p-4 bg-[#180a0a]/90 rounded-2xl border border-rose-950/40">
            <div>
              <span className="text-[#e7d9d1]/60 text-[10px] uppercase font-bold tracking-wider block mb-1">Format</span>
              <span className="text-[#e7d9d1] font-syne font-bold text-sm">4K DCI Cinema ProRes</span>
            </div>
            <div className="pt-2 border-t border-rose-950/40 flex items-center justify-between text-[#e7d9d1]/70">
              <span>Duration: <strong className="text-white font-mono">{item.videoDuration || '03:30'}</strong></span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Video share link copied!');
                }}
                className="text-[#e7d9d1] hover:underline flex items-center gap-1"
              >
                <Share2 className="w-3 h-3" /> Share
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
