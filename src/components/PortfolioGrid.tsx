import React, { useState, useMemo } from 'react';
import { Camera, Video, Play, Eye, Heart, Search, Sparkles, MapPin } from 'lucide-react';
import type { MediaItem, Category } from '../types';

interface PortfolioGridProps {
  mediaItems: MediaItem[];
  onSelectPhoto: (item: MediaItem) => void;
  onSelectVideo: (item: MediaItem) => void;
  onToggleLike: (id: string) => void;
}

const CATEGORIES: Category[] = [
  'All',
  'Weddings',
  'Birthday Shoots',
  'Cinematic Shoots',
  'Edits & Trailers',
  'Commercial'
];

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  mediaItems,
  onSelectPhoto,
  onSelectVideo,
  onToggleLike
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return mediaItems.filter((item) => {
      // Category match
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
      // Type match
      const typeMatch = mediaTypeFilter === 'all' || item.type === mediaTypeFilter;
      // Search match
      const searchLower = searchQuery.toLowerCase();
      const searchMatch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.clientName?.toLowerCase().includes(searchLower) ||
        item.gearUsed?.toLowerCase().includes(searchLower) ||
        item.exif?.location?.toLowerCase().includes(searchLower);

      return categoryMatch && typeMatch && searchMatch;
    });
  }, [mediaItems, selectedCategory, mediaTypeFilter, searchQuery]);

  return (
    <section id="portfolio" className="py-24 bg-[#09090b] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Portfolio Works</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-syne font-bold text-white tracking-tight">
              PORTFOLIO & <span className="gold-gradient-text">CINEMA</span>
            </h2>
          </div>

          <p className="text-zinc-400 text-sm max-w-md mt-4 md:mt-0 font-normal">
            Explore curated high-resolution photography and 4K cinema films across weddings, editorial fashion, and commercial commissions.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Controls Right: Search + Type Filter */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search camera, gear, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Photo vs Video Filter Buttons */}
            <div className="flex items-center bg-zinc-900 p-1 rounded-full border border-zinc-800">
              <button
                onClick={() => setMediaTypeFilter('all')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  mediaTypeFilter === 'all' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setMediaTypeFilter('photo')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 transition-colors ${
                  mediaTypeFilter === 'photo' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Camera className="w-3 h-3" />
                Photos
              </button>
              <button
                onClick={() => setMediaTypeFilter('video')}
                className={`px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 transition-colors ${
                  mediaTypeFilter === 'video' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Video className="w-3 h-3" />
                Videos
              </button>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        {filteredItems.length === 0 ? (
          <div className="glass-panel rounded-3xl p-16 text-center max-w-lg mx-auto my-12">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-syne font-bold text-white mb-2">No Matching Works Found</h3>
            <p className="text-zinc-400 text-sm mb-6">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setMediaTypeFilter('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-amber-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-zinc-900/60 rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-amber-500/40 transition-all duration-500 shadow-xl cursor-pointer"
                onClick={() => (item.type === 'video' ? onSelectVideo(item) : onSelectPhoto(item))}
              >
                {/* Image / Thumbnail Container */}
                <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-black">
                  <img
                    src={item.type === 'video' ? (item.thumbnailUrl || item.url) : item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-90"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1.5">
                      {item.type === 'video' ? (
                        <>
                          <Video className="w-3 h-3 text-amber-400" />
                          <span>4K Film</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-3 h-3 text-amber-400" />
                          <span>Fine Art Stills</span>
                        </>
                      )}
                    </span>

                    {item.videoDuration && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-black text-[10px] font-extrabold font-mono">
                        {item.videoDuration}
                      </span>
                    )}
                  </div>

                  {/* Play Button Overlay for Videos */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <div className="w-14 h-14 rounded-full gold-gradient-bg p-[2px] transition-transform duration-300 group-hover:scale-110 shadow-2xl">
                        <div className="w-full h-full bg-black/80 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-amber-400 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay Details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <span className="text-amber-400 text-[11px] font-semibold uppercase tracking-widest mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-syne font-bold text-white mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    
                    {item.clientName && (
                      <p className="text-zinc-300 text-xs mb-3 font-medium flex items-center gap-1">
                        <span>Client:</span> {item.clientName}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-zinc-400">
                      {item.exif?.location ? (
                        <span className="flex items-center gap-1 text-[11px]">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          {item.exif.location}
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono">{item.gearUsed || 'Sony Cinema'}</span>
                      )}

                      <span className="text-amber-300 font-semibold text-[11px] flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        View Project
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Meta */}
                <div className="p-4 bg-zinc-900/90 border-t border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-syne font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">
                      {item.gearUsed || item.category}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLike(item.id);
                    }}
                    className="p-2 rounded-full text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors flex items-center gap-1 text-xs"
                    title="Like photo"
                  >
                    <Heart className="w-4 h-4 fill-amber-500/10 text-zinc-400 hover:text-red-500 hover:fill-red-500 transition-colors" />
                    <span className="text-[11px] font-mono">{item.likesCount || 0}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
