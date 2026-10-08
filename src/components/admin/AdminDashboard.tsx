import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Camera,
  Lock,
  Mail,
  SlidersHorizontal,
  Settings,
  X,
  CheckCircle,
  Star,
  Layers,
  RotateCcw
} from 'lucide-react';

import type {
  MediaItem,
  ClientInquiry,
  ServicePackage,
  ProofingAlbum,
  SiteSettings,
  Category,
  MediaType
} from '../../types';

interface AdminDashboardProps {
  mediaItems: MediaItem[];
  inquiries: ClientInquiry[];
  services: ServicePackage[];
  proofingAlbums: ProofingAlbum[];
  settings: SiteSettings;
  onUpdateMedia: (items: MediaItem[]) => void;
  onUpdateInquiries: (inquiries: ClientInquiry[]) => void;
  onUpdateServices: (services: ServicePackage[]) => void;
  onUpdateProofing: (albums: ProofingAlbum[]) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
  onExitAdmin: () => void;
  onResetDefaults: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  mediaItems,
  inquiries,
  services,
  proofingAlbums,
  settings,
  onUpdateMedia,
  onUpdateInquiries,
  onUpdateSettings,
  onExitAdmin,
  onResetDefaults
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'media' | 'inquiries' | 'proofing' | 'services' | 'settings'>('overview');
  
  // Modals state
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);

  // New Media Form state
  const [newMedia, setNewMedia] = useState<Partial<MediaItem>>({
    title: '',
    type: 'photo',
    category: 'Weddings',
    url: '',
    thumbnailUrl: '',
    description: '',
    clientName: '',
    gearUsed: 'Sony A1 • 85mm f/1.4',
    featured: true,
    videoDuration: '03:15',
    exif: {
      camera: 'Sony Alpha 1',
      lens: 'FE 85mm f/1.4 GM',
      aperture: 'f/1.4',
      shutterSpeed: '1/2000s',
      iso: '100',
      location: 'Paris, France'
    }
  });

  // Settings local state
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);

  // Handle local image file upload preview
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isThumbnail = false, isRaw = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultUrl = reader.result as string;
        if (isRaw) {
          setNewMedia((prev) => ({ ...prev, rawBeforeUrl: resultUrl }));
        } else if (isThumbnail) {
          setNewMedia((prev) => ({ ...prev, thumbnailUrl: resultUrl }));
        } else {
          setNewMedia((prev) => ({ ...prev, url: resultUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit New Media item
  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedia.title || !newMedia.url) {
      alert('Please fill in media title and upload/paste media URL.');
      return;
    }

    const createdItem: MediaItem = {
      id: `m-${Date.now()}`,
      title: newMedia.title || 'Untitled Work',
      type: newMedia.type || 'photo',
      category: (newMedia.category as Category) || 'Weddings',
      url: newMedia.url || '',
      thumbnailUrl: newMedia.thumbnailUrl,
      aspectRatio: 'landscape',
      description: newMedia.description || 'Fine art media item',
      clientName: newMedia.clientName,
      gearUsed: newMedia.gearUsed || 'Sony Cinema',
      featured: newMedia.featured ?? true,
      rawBeforeUrl: newMedia.rawBeforeUrl,
      videoDuration: newMedia.type === 'video' ? (newMedia.videoDuration || '02:45') : undefined,
      exif: newMedia.exif || {
        camera: 'Sony Alpha 1',
        lens: 'FE 85mm f/1.4 GM',
        location: 'New York'
      },
      likesCount: Math.floor(Math.random() * 100) + 20,
      viewsCount: Math.floor(Math.random() * 500) + 100,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [createdItem, ...mediaItems];
    onUpdateMedia(updated);
    setShowAddMediaModal(false);
    alert('Media successfully uploaded and published to portfolio!');
  };

  // Delete media item
  const handleDeleteMedia = (id: string) => {
    if (confirm('Are you sure you want to delete this media item?')) {
      const updated = mediaItems.filter((m) => m.id !== id);
      onUpdateMedia(updated);
    }
  };

  // Toggle Featured status
  const handleToggleFeatured = (id: string) => {
    const updated = mediaItems.map((m) => (m.id === id ? { ...m, featured: !m.featured } : m));
    onUpdateMedia(updated);
  };

  // Change Inquiry Status
  const handleChangeInquiryStatus = (id: string, status: ClientInquiry['status']) => {
    const updated = inquiries.map((i) => (i.id === id ? { ...i, status } : i));
    onUpdateInquiries(updated);
  };

  // Delete Inquiry
  const handleDeleteInquiry = (id: string) => {
    if (confirm('Delete this inquiry?')) {
      const updated = inquiries.filter((i) => i.id !== id);
      onUpdateInquiries(updated);
    }
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(localSettings);
    alert('Website Settings successfully updated!');
  };

  const photoCount = mediaItems.filter((m) => m.type === 'photo').length;
  const videoCount = mediaItems.filter((m) => m.type === 'video').length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="fixed inset-0 z-50 bg-[#09090b] flex flex-col overflow-hidden text-zinc-100 font-sans">
      
      {/* Admin Top Header Bar */}
      <header className="bg-zinc-955 border-b border-zinc-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gold-gradient-bg p-[1px]">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <Camera className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h1 className="font-syne font-bold text-lg text-white flex items-center gap-2">
              STUDIO ADMIN DASHBOARD
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] uppercase font-mono tracking-wider">
                Live Admin Mode
              </span>
            </h1>
            <p className="text-zinc-400 text-xs">{settings.brandName} • Photographer Content Suite</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetDefaults}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 flex items-center gap-1.5"
            title="Reset All Data to Initial Demo State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Seed Data
          </button>

          <button
            onClick={onExitAdmin}
            className="px-4 py-2 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-black gold-gradient-bg hover:brightness-110 shadow-lg shadow-amber-500/20"
          >
            Exit Admin Portal
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-4 space-y-1 shrink-0 hidden md:block">
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest px-3 py-2">
            Navigation Menu
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            Overview & Stats
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'media'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Camera className="w-4 h-4" />
              Media Gallery
            </div>
            <span className="font-mono text-[10px] bg-black/30 px-2 py-0.5 rounded-full">
              {mediaItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'inquiries'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              Client Inquiries
            </div>
            {newInquiriesCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {newInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('proofing')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'proofing'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            Proofing Albums
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'services'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Services & Rates
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            Website Settings
          </button>
        </aside>

        {/* Tab Content Body */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#09090b]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl mx-auto">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-400 text-xs uppercase font-semibold">Total Media Items</span>
                    <Camera className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-3xl font-syne font-extrabold text-white">{mediaItems.length}</span>
                  <span className="block text-[11px] text-zinc-500 mt-1 font-mono">{photoCount} Photos • {videoCount} Videos</span>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-400 text-xs uppercase font-semibold">New Inquiries</span>
                    <Mail className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-3xl font-syne font-extrabold text-amber-400">{newInquiriesCount}</span>
                  <span className="block text-[11px] text-zinc-500 mt-1">{inquiries.length} Total Client Leads</span>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-400 text-xs uppercase font-semibold">Active Proofing Galleries</span>
                    <Lock className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-3xl font-syne font-extrabold text-white">{proofingAlbums.length}</span>
                  <span className="block text-[11px] text-zinc-500 mt-1">Client Password Protected</span>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-400 text-xs uppercase font-semibold">System Health</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-2xl font-syne font-extrabold text-green-400">IndexedDB Ready</span>
                  <span className="block text-[11px] text-zinc-500 mt-1">Instant Persistent Storage</span>
                </div>
              </div>

              {/* Quick Action Box & Recent Inquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-zinc-800">
                  <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
                    <h3 className="font-syne font-bold text-lg text-white">Recent Client Inquiries</h3>
                    <button onClick={() => setActiveTab('inquiries')} className="text-xs text-amber-400 hover:underline font-semibold">
                      View All ({inquiries.length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div key={inq.id} className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-syne font-bold text-white text-sm">{inq.name}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              inq.status === 'new' ? 'bg-red-500/20 text-red-400' : 'bg-zinc-800 text-zinc-400'
                            }`}>
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-zinc-400 text-xs">{inq.serviceType} • {inq.budgetRange}</p>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono">{inq.createdAt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <h3 className="font-syne font-bold text-lg text-white mb-2">Quick Actions</h3>
                    <p className="text-zinc-400 text-xs mb-6">Instantly upload photos, add video reels, or edit rates.</p>

                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setActiveTab('media');
                          setShowAddMediaModal(true);
                        }}
                        className="w-full py-3 px-4 rounded-2xl bg-amber-500 text-black font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                      >
                        <Plus className="w-4 h-4" />
                        Upload Photo / Video
                      </button>

                      <button
                        onClick={() => setActiveTab('settings')}
                        className="w-full py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-syne font-bold text-xs uppercase tracking-wider border border-zinc-800 flex items-center justify-center gap-2"
                      >
                        <Settings className="w-4 h-4 text-amber-400" />
                        Edit Site Settings
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-800 mt-6 text-xs text-zinc-500">
                    Client Demo PIN: <strong className="text-white font-mono">admin123</strong>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MEDIA MANAGER */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="font-syne font-bold text-2xl text-white">Media Manager</h2>
                  <p className="text-zinc-400 text-xs">Upload photos & videos, manage tags, EXIF gear info, and featured state.</p>
                </div>

                <button
                  onClick={() => setShowAddMediaModal(true)}
                  className="px-5 py-2.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-black gold-gradient-bg hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Upload New Media
                </button>
              </div>

              {/* Media Items Table / Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaItems.map((item) => (
                  <div key={item.id} className="glass-panel rounded-2xl overflow-hidden border border-zinc-800 flex flex-col justify-between">
                    <div className="relative aspect-video bg-black">
                      <img src={item.type === 'video' ? (item.thumbnailUrl || item.url) : item.url} alt={item.title} className="w-full h-full object-cover" />
                      
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] uppercase font-bold text-amber-300">
                          {item.type}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] font-semibold text-zinc-300">
                          {item.category}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleFeatured(item.id)}
                        className={`absolute top-3 right-3 p-1.5 rounded-full text-xs transition-colors ${
                          item.featured ? 'bg-amber-500 text-black font-bold' : 'bg-black/80 text-zinc-400'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-3.5 h-3.5 ${item.featured ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-syne font-bold text-white text-base line-clamp-1">{item.title}</h4>
                        <p className="text-zinc-400 text-xs line-clamp-1">{item.gearUsed || 'Sony Cinema'}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                        <span className="text-[11px] text-zinc-500 font-mono">{item.createdAt}</span>
                        <button
                          onClick={() => handleDeleteMedia(item.id)}
                          className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                          title="Delete Media"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: CLIENT INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="border-b border-zinc-800 pb-4">
                <h2 className="font-syne font-bold text-2xl text-white">Client Booking Inquiries</h2>
                <p className="text-zinc-400 text-xs">Manage booking requests submitted through the portfolio contact form.</p>
              </div>

              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-syne font-bold text-lg text-white">{inq.name}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            inq.status === 'new' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-zinc-400 text-xs mt-1">
                          {inq.email} • {inq.phone} • Submitted: {inq.createdAt}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={inq.status}
                          onChange={(e) => handleChangeInquiryStatus(inq.id, e.target.value as any)}
                          className="bg-zinc-900 border border-zinc-700 text-xs text-white rounded-lg px-3 py-1.5"
                        >
                          <option value="new">Status: New</option>
                          <option value="read">Status: Read</option>
                          <option value="replied">Status: Replied</option>
                          <option value="archived">Status: Archived</option>
                        </select>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 rounded-lg bg-zinc-900 hover:bg-red-500/20 text-zinc-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-300">
                      <div>
                        <span className="text-zinc-500 uppercase text-[10px] block font-bold">Service Required</span>
                        <span className="font-semibold text-white">{inq.serviceType}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 uppercase text-[10px] block font-bold">Target Date & Budget</span>
                        <span className="font-semibold text-amber-400">{inq.eventDate || 'TBD'} ({inq.budgetRange})</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 uppercase text-[10px] block font-bold">Location</span>
                        <span className="font-semibold text-white">{inq.location || 'Not specified'}</span>
                      </div>
                    </div>

                    <div className="bg-zinc-950 p-4 rounded-xl text-xs text-zinc-300 border border-zinc-900 leading-relaxed">
                      "{inq.message}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CLIENT PROOFING MANAGER */}
          {activeTab === 'proofing' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="font-syne font-bold text-2xl text-white">Client Proofing Galleries</h2>
                  <p className="text-zinc-400 text-xs">Create passcode-protected albums for private client delivery.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {proofingAlbums.map((album) => (
                  <div key={album.id} className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-syne font-bold text-lg text-white">{album.albumTitle}</h3>
                        <p className="text-zinc-400 text-xs">Client: {album.clientName} • Passcode: <strong className="text-amber-400 font-mono">{album.passcode}</strong></p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase">
                        {album.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                      <span>Total Photos: <strong className="text-white">{album.photosCount}</strong></span>
                      <span>Client Selected: <strong className="text-amber-400 font-bold">{album.selectedCount}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES MANAGER */}
          {activeTab === 'services' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="border-b border-zinc-800 pb-4">
                <h2 className="font-syne font-bold text-2xl text-white">Services & Package Rates</h2>
                <p className="text-zinc-400 text-xs">Manage public pricing tiers and package deliverables.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((srv) => (
                  <div key={srv.id} className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-4">
                    <h3 className="font-syne font-bold text-lg text-white">{srv.title}</h3>
                    <p className="text-amber-400 font-syne font-extrabold text-2xl">{srv.price} <span className="text-xs text-zinc-400">USD</span></p>
                    <ul className="text-xs text-zinc-400 space-y-1">
                      {srv.deliverables.slice(0, 4).map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: WEBSITE SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl mx-auto glass-panel p-8 rounded-3xl border border-zinc-800">
              <div className="border-b border-zinc-800 pb-4">
                <h2 className="font-syne font-bold text-2xl text-white">Website & Photographer Settings</h2>
                <p className="text-zinc-400 text-xs">Update studio branding, photographer bio, email, and social profiles.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 uppercase font-semibold block mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={localSettings.brandName}
                    onChange={(e) => setLocalSettings({ ...localSettings, brandName: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase font-semibold block mb-1">Photographer Name</label>
                  <input
                    type="text"
                    value={localSettings.photographerName}
                    onChange={(e) => setLocalSettings({ ...localSettings, photographerName: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 uppercase font-semibold block mb-1">Hero Heading Statement</label>
                <input
                  type="text"
                  value={localSettings.heroHeading}
                  onChange={(e) => setLocalSettings({ ...localSettings, heroHeading: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white font-syne font-bold"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 uppercase font-semibold block mb-1">Photographer Bio</label>
                <textarea
                  rows={3}
                  value={localSettings.bioText}
                  onChange={(e) => setLocalSettings({ ...localSettings, bioText: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 uppercase font-semibold block mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={localSettings.email}
                    onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase font-semibold block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={localSettings.phone}
                    onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-8 py-3 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-black gold-gradient-bg hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                Save Website Settings
              </button>
            </form>
          )}

        </main>

      </div>

      {/* UPLOAD MEDIA MODAL */}
      {showAddMediaModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-zinc-955 border border-zinc-800 rounded-3xl p-8 shadow-2xl my-8">
            <button onClick={() => setShowAddMediaModal(false)} className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-syne font-bold text-2xl text-white mb-1">Upload New Media Work</h3>
            <p className="text-zinc-400 text-xs mb-6">Select a local photo file or enter media URL to publish to your portfolio.</p>

            <form onSubmit={handleCreateMedia} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold uppercase block mb-1">Media Type</label>
                  <select
                    value={newMedia.type}
                    onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value as MediaType })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white"
                  >
                    <option value="photo">Photo Stills</option>
                    <option value="video">Cinema Video MP4 / Embed</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold uppercase block mb-1">Category</label>
                  <select
                    value={newMedia.category}
                    onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value as Category })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white"
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Birthday Shoots">Birthday Shoots</option>
                    <option value="Cinematic Shoots">Cinematic Shoots</option>
                    <option value="Edits & Trailers">Edits & Trailers</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold uppercase block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Venice Golden Hour Romance"
                  value={newMedia.title}
                  onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              {/* Upload Local File or URL Input */}
              <div className="space-y-2">
                <label className="text-xs text-zinc-400 font-semibold uppercase block">Upload File or Image URL *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e)}
                    className="text-xs text-zinc-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-black hover:file:bg-amber-400"
                  />
                  <span className="text-xs text-zinc-500 uppercase font-mono">OR</span>
                  <input
                    type="text"
                    placeholder="Paste Direct Image/Video URL"
                    value={newMedia.url}
                    onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>
                {newMedia.url && (
                  <div className="mt-2 h-32 rounded-xl overflow-hidden bg-black border border-zinc-800">
                    <img src={newMedia.url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold uppercase block mb-1">Client Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Vogue Italia"
                    value={newMedia.clientName}
                    onChange={(e) => setNewMedia({ ...newMedia, clientName: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold uppercase block mb-1">Camera Gear Used</label>
                  <input
                    type="text"
                    placeholder="e.g. Sony A1 • FE 85mm f/1.4"
                    value={newMedia.gearUsed}
                    onChange={(e) => setNewMedia({ ...newMedia, gearUsed: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-black gold-gradient-bg hover:brightness-110 shadow-lg shadow-amber-500/20"
              >
                Publish to Portfolio Website
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
