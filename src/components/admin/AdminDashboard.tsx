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
  RotateCcw,
  Edit3,
  Upload,
  Check
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
  onUpdateServices,
  onUpdateProofing,
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

  // Proofing Albums Modals & Form State
  const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);
  const [newAlbum, setNewAlbum] = useState<Partial<ProofingAlbum>>({
    albumTitle: '',
    clientName: '',
    eventDate: new Date().toISOString().split('T')[0],
    passcode: `SWAROOP${Math.floor(1000 + Math.random() * 9000)}`,
    coverUrl: '',
    status: 'active'
  });
  const [activeAlbumPhotosModal, setActiveAlbumPhotosModal] = useState<ProofingAlbum | null>(null);
  const [newAlbumPhotoUrl, setNewAlbumPhotoUrl] = useState('');
  const [newAlbumPhotoTitle, setNewAlbumPhotoTitle] = useState('');

  // Services Modals & Form State
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<ServicePackage | null>(null);
  const [serviceForm, setServiceForm] = useState<{
    title: string;
    subtitle: string;
    category: 'photography' | 'videography' | 'hybrid';
    price: string;
    duration: string;
    deliverablesText: string;
    popular: boolean;
  }>({
    title: '',
    subtitle: '',
    category: 'photography',
    price: '',
    duration: 'Full Day',
    deliverablesText: '',
    popular: false
  });

  // Proofing Album Handlers
  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbum.albumTitle || !newAlbum.clientName) {
      alert('Please fill in Album Title and Client Name.');
      return;
    }
    const created: ProofingAlbum = {
      id: `album-${Date.now()}`,
      albumTitle: newAlbum.albumTitle || 'Client Gallery',
      clientName: newAlbum.clientName || 'Client',
      eventDate: newAlbum.eventDate || new Date().toISOString().split('T')[0],
      passcode: newAlbum.passcode || `SWAROOP${Math.floor(1000 + Math.random() * 9000)}`,
      coverUrl: newAlbum.coverUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
      photosCount: 0,
      selectedCount: 0,
      status: (newAlbum.status as 'active' | 'archived') || 'active',
      photos: []
    };
    const updated = [created, ...proofingAlbums];
    onUpdateProofing(updated);
    setShowAddAlbumModal(false);
    setNewAlbum({
      albumTitle: '',
      clientName: '',
      eventDate: new Date().toISOString().split('T')[0],
      passcode: `SWAROOP${Math.floor(1000 + Math.random() * 9000)}`,
      coverUrl: '',
      status: 'active'
    });
    alert('Client proofing album created successfully!');
  };

  const handleDeleteAlbum = (id: string) => {
    if (confirm('Are you sure you want to delete this client proofing album?')) {
      const updated = proofingAlbums.filter((a) => a.id !== id);
      onUpdateProofing(updated);
    }
  };

  const handleAddPhotoToAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAlbumPhotosModal || !newAlbumPhotoUrl) {
      alert('Please upload a photo or provide photo URL.');
      return;
    }
    const targetId = activeAlbumPhotosModal.id;
    const updated = proofingAlbums.map((album) => {
      if (album.id === targetId) {
        const newPhotoItem = {
          id: `p-${Date.now()}`,
          url: newAlbumPhotoUrl,
          title: newAlbumPhotoTitle || `Photo ${album.photos.length + 1}`,
          isSelected: false
        };
        const updatedPhotos = [newPhotoItem, ...album.photos];
        return {
          ...album,
          photos: updatedPhotos,
          photosCount: updatedPhotos.length
        };
      }
      return album;
    });
    onUpdateProofing(updated);
    setNewAlbumPhotoUrl('');
    setNewAlbumPhotoTitle('');
    const updatedActive = updated.find((a) => a.id === targetId);
    if (updatedActive) setActiveAlbumPhotosModal(updatedActive);
  };

  const handleDeletePhotoFromAlbum = (albumId: string, photoId: string) => {
    const updated = proofingAlbums.map((album) => {
      if (album.id === albumId) {
        const updatedPhotos = album.photos.filter((p) => p.id !== photoId);
        return {
          ...album,
          photos: updatedPhotos,
          photosCount: updatedPhotos.length,
          selectedCount: updatedPhotos.filter((p) => p.isSelected).length
        };
      }
      return album;
    });
    onUpdateProofing(updated);
    const updatedActive = updated.find((a) => a.id === albumId);
    if (updatedActive) setActiveAlbumPhotosModal(updatedActive);
  };

  const handleAlbumCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAlbum((prev) => ({ ...prev, coverUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAlbumPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAlbumPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Service Handlers
  const handleOpenAddServiceModal = () => {
    setEditingService(null);
    setServiceForm({
      title: '',
      subtitle: '',
      category: 'photography',
      price: '',
      duration: 'Full Day',
      deliverablesText: '',
      popular: false
    });
    setShowServiceModal(true);
  };

  const handleOpenEditServiceModal = (srv: ServicePackage) => {
    setEditingService(srv);
    setServiceForm({
      title: srv.title,
      subtitle: srv.subtitle || '',
      category: srv.category || 'photography',
      price: srv.price,
      duration: srv.duration || 'Full Day',
      deliverablesText: srv.deliverables ? srv.deliverables.join('\n') : '',
      popular: srv.popular || false
    });
    setShowServiceModal(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.price) {
      alert('Please fill in Package Title and Price.');
      return;
    }

    const deliverablesList = serviceForm.deliverablesText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (editingService) {
      const updated = services.map((s) =>
        s.id === editingService.id
          ? {
              ...s,
              title: serviceForm.title,
              subtitle: serviceForm.subtitle,
              category: serviceForm.category,
              price: serviceForm.price,
              duration: serviceForm.duration,
              deliverables: deliverablesList.length > 0 ? deliverablesList : s.deliverables,
              popular: serviceForm.popular
            }
          : s
      );
      onUpdateServices(updated);
      alert('Service package updated successfully!');
    } else {
      const newService: ServicePackage = {
        id: `srv-${Date.now()}`,
        title: serviceForm.title,
        subtitle: serviceForm.subtitle || 'Custom Service Package',
        category: serviceForm.category,
        price: serviceForm.price,
        duration: serviceForm.duration,
        deliverables: deliverablesList.length > 0 ? deliverablesList : ['High-Res Edited Photos', 'Cinematic Teaser Film'],
        popular: serviceForm.popular
      };
      onUpdateServices([...services, newService]);
      alert('New service package created successfully!');
    }
    setShowServiceModal(false);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service package?')) {
      const updated = services.filter((s) => s.id !== id);
      onUpdateServices(updated);
    }
  };

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
    <div className="fixed inset-0 z-50 bg-[#e7d9d1] flex flex-col overflow-hidden text-[#2b0808] font-sans">
      
      {/* Admin Top Header Bar */}
      <header className="bg-[#2b0808] border-b border-[#8b0101]/40 px-6 py-4 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt={settings.brandName} className="h-9 w-auto object-contain brightness-0 invert opacity-95" />
          <div>
            <h1 className="font-syne font-bold text-lg text-white flex items-center gap-2">
              STUDIO ADMIN DASHBOARD
              <span className="px-2.5 py-0.5 rounded-full bg-[#8b0101] text-white text-[10px] uppercase font-mono tracking-wider border border-[#8b0101]/50">
                Live Admin Mode
              </span>
            </h1>
            <p className="text-[#e7d9d1]/70 text-xs">{settings.brandName} • Photographer Content Suite</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetDefaults}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#180404] hover:bg-[#8b0101] text-[#e7d9d1] border border-[#8b0101]/40 flex items-center gap-1.5 transition-colors"
            title="Reset All Data to Initial Demo State"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8b0101]" />
            Reset Seed Data
          </button>

          <button
            onClick={onExitAdmin}
            className="px-4 py-2 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shadow-lg shadow-[#8b0101]/30 transition-transform active:scale-98"
          >
            Exit Admin Portal
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="w-64 bg-[#2b0808] border-r border-[#8b0101]/30 p-4 space-y-1.5 shrink-0 hidden md:block">
          <div className="text-[10px] text-[#e7d9d1]/60 font-bold uppercase tracking-widest px-3 py-2">
            Navigation Menu
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'crimson-gradient-bg text-white shadow-md shadow-[#8b0101]/30'
                : 'text-[#e7d9d1]/80 hover:text-white hover:bg-[#8b0101]/25'
            }`}
          >
            <Layers className="w-4 h-4" />
            Overview & Stats
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'media'
                ? 'crimson-gradient-bg text-white shadow-md shadow-[#8b0101]/30'
                : 'text-[#e7d9d1]/80 hover:text-white hover:bg-[#8b0101]/25'
            }`}
          >
            <div className="flex items-center gap-3">
              <Camera className="w-4 h-4" />
              Media Gallery
            </div>
            <span className="font-mono text-[10px] bg-[#180404] px-2 py-0.5 rounded-full text-[#e7d9d1]">
              {mediaItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'inquiries'
                ? 'crimson-gradient-bg text-white shadow-md shadow-[#8b0101]/30'
                : 'text-[#e7d9d1]/80 hover:text-white hover:bg-[#8b0101]/25'
            }`}
          >
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              Client Inquiries
            </div>
            {newInquiriesCount > 0 && (
              <span className="bg-[#8b0101] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {newInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('proofing')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'proofing'
                ? 'crimson-gradient-bg text-white shadow-md shadow-[#8b0101]/30'
                : 'text-[#e7d9d1]/80 hover:text-white hover:bg-[#8b0101]/25'
            }`}
          >
            <Lock className="w-4 h-4" />
            Proofing Albums
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'services'
                ? 'crimson-gradient-bg text-white shadow-md shadow-[#8b0101]/30'
                : 'text-[#e7d9d1]/80 hover:text-white hover:bg-[#8b0101]/25'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Services & Rates
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'settings'
                ? 'crimson-gradient-bg text-white shadow-md shadow-[#8b0101]/30'
                : 'text-[#e7d9d1]/80 hover:text-white hover:bg-[#8b0101]/25'
            }`}
          >
            <Settings className="w-4 h-4" />
            Website Settings
          </button>
        </aside>

        {/* Tab Content Body */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#e7d9d1]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl mx-auto">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-[#dfcece]/60 backdrop-blur-md p-5 rounded-2xl border border-[#8b0101]/20 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#664444] text-xs uppercase font-semibold">Total Media Items</span>
                    <Camera className="w-4 h-4 text-[#8b0101]" />
                  </div>
                  <span className="text-3xl font-syne font-extrabold text-[#2b0808]">{mediaItems.length}</span>
                  <span className="block text-[11px] text-[#664444] mt-1 font-mono">{photoCount} Photos • {videoCount} Videos</span>
                </div>

                <div className="bg-[#dfcece]/60 backdrop-blur-md p-5 rounded-2xl border border-[#8b0101]/20 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#664444] text-xs uppercase font-semibold">New Inquiries</span>
                    <Mail className="w-4 h-4 text-[#8b0101]" />
                  </div>
                  <span className="text-3xl font-syne font-extrabold text-[#8b0101]">{newInquiriesCount}</span>
                  <span className="block text-[11px] text-[#664444] mt-1">{inquiries.length} Total Client Leads</span>
                </div>

                <div className="bg-[#dfcece]/60 backdrop-blur-md p-5 rounded-2xl border border-[#8b0101]/20 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#664444] text-xs uppercase font-semibold">Active Proofing Galleries</span>
                    <Lock className="w-4 h-4 text-[#8b0101]" />
                  </div>
                  <span className="text-3xl font-syne font-extrabold text-[#2b0808]">{proofingAlbums.length}</span>
                  <span className="block text-[11px] text-[#664444] mt-1">Client Password Protected</span>
                </div>

                <div className="bg-[#dfcece]/60 backdrop-blur-md p-5 rounded-2xl border border-[#8b0101]/20 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#664444] text-xs uppercase font-semibold">System Health</span>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-xl font-syne font-extrabold text-emerald-700">IndexedDB Ready</span>
                  <span className="block text-[11px] text-[#664444] mt-1">Instant Persistent Storage</span>
                </div>
              </div>

              {/* Quick Action Box & Recent Inquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-[#dfcece]/60 backdrop-blur-md p-6 rounded-3xl border border-[#8b0101]/20 shadow-sm">
                  <div className="flex items-center justify-between mb-6 border-b border-[#8b0101]/20 pb-4">
                    <h3 className="font-syne font-bold text-lg text-[#2b0808]">Recent Client Inquiries</h3>
                    <button onClick={() => setActiveTab('inquiries')} className="text-xs text-[#8b0101] hover:underline font-semibold">
                      View All ({inquiries.length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div key={inq.id} className="p-4 bg-[#e7d9d1] rounded-2xl border border-[#8b0101]/15 flex items-center justify-between shadow-xs">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-syne font-bold text-[#2b0808] text-sm">{inq.name}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              inq.status === 'new' ? 'bg-[#8b0101] text-white' : 'bg-[#2b0808]/10 text-[#2b0808]'
                            }`}>
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-[#664444] text-xs">{inq.serviceType} • {inq.budgetRange}</p>
                        </div>
                        <span className="text-[10px] text-[#664444] font-mono">{inq.createdAt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#dfcece]/60 backdrop-blur-md p-6 rounded-3xl border border-[#8b0101]/20 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-syne font-bold text-lg text-[#2b0808] mb-2">Quick Actions</h3>
                    <p className="text-[#664444] text-xs mb-6">Instantly upload photos, add video reels, or edit rates.</p>

                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setActiveTab('media');
                          setShowAddMediaModal(true);
                        }}
                        className="w-full py-3 px-4 rounded-2xl crimson-gradient-bg text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-colors shadow-md shadow-[#8b0101]/25"
                      >
                        <Plus className="w-4 h-4" />
                        Upload Photo / Video
                      </button>

                      <button
                        onClick={() => setActiveTab('settings')}
                        className="w-full py-3 px-4 rounded-2xl bg-[#2b0808] hover:bg-[#8b0101] text-white font-syne font-bold text-xs uppercase tracking-wider border border-[#8b0101]/30 flex items-center justify-center gap-2 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-[#e7d9d1]" />
                        Edit Site Settings
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#8b0101]/20 mt-6 text-xs text-[#664444]">
                    Client Demo PIN: <strong className="text-[#8b0101] font-mono font-bold">admin123</strong>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MEDIA MANAGER */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8b0101]/20 pb-4">
                <div>
                  <h2 className="font-syne font-bold text-2xl text-[#2b0808]">Media Manager</h2>
                  <p className="text-[#664444] text-xs">Upload photos & videos, manage tags, EXIF gear info, and featured state.</p>
                </div>

                <button
                  onClick={() => setShowAddMediaModal(true)}
                  className="px-5 py-2.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shadow-md shadow-[#8b0101]/25 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Upload New Media
                </button>
              </div>

              {/* Media Items Table / Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaItems.map((item) => (
                  <div key={item.id} className="bg-[#dfcece]/70 backdrop-blur-md rounded-2xl overflow-hidden border border-[#8b0101]/20 shadow-sm flex flex-col justify-between">
                    <div className="relative aspect-video bg-[#2b0808]">
                      <img src={item.type === 'video' ? (item.thumbnailUrl || item.url) : item.url} alt={item.title} className="w-full h-full object-cover" />
                      
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#8b0101] text-[10px] uppercase font-bold text-white">
                          {item.type}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#2b0808]/90 text-[10px] font-semibold text-[#e7d9d1]">
                          {item.category}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleFeatured(item.id)}
                        className={`absolute top-3 right-3 p-1.5 rounded-full text-xs transition-colors ${
                          item.featured ? 'bg-[#8b0101] text-white font-bold' : 'bg-[#2b0808]/80 text-[#e7d9d1]'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-3.5 h-3.5 ${item.featured ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-syne font-bold text-[#2b0808] text-base line-clamp-1">{item.title}</h4>
                        <p className="text-[#664444] text-xs line-clamp-1">{item.gearUsed || 'Sony Cinema'}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#8b0101]/20">
                        <span className="text-[11px] text-[#664444] font-mono">{item.createdAt}</span>
                        <button
                          onClick={() => handleDeleteMedia(item.id)}
                          className="p-2 rounded-lg text-[#8b0101] hover:bg-[#8b0101]/10 transition-colors"
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
              <div className="border-b border-[#8b0101]/20 pb-4">
                <h2 className="font-syne font-bold text-2xl text-[#2b0808]">Client Booking Inquiries</h2>
                <p className="text-[#664444] text-xs">Manage booking requests submitted through the portfolio contact form.</p>
              </div>

              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-[#dfcece]/70 backdrop-blur-md p-6 rounded-2xl border border-[#8b0101]/20 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#8b0101]/20 pb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-syne font-bold text-lg text-[#2b0808]">{inq.name}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            inq.status === 'new' ? 'bg-[#8b0101] text-white' : 'bg-[#2b0808]/10 text-[#2b0808]'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-[#664444] text-xs mt-1">
                          {inq.email} • {inq.phone} • Submitted: {inq.createdAt}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={inq.status}
                          onChange={(e) => handleChangeInquiryStatus(inq.id, e.target.value as any)}
                          className="bg-[#e7d9d1] border border-[#8b0101]/30 text-xs text-[#2b0808] rounded-lg px-3 py-1.5 font-medium"
                        >
                          <option value="new">Status: New</option>
                          <option value="read">Status: Read</option>
                          <option value="replied">Status: Replied</option>
                          <option value="archived">Status: Archived</option>
                        </select>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 rounded-lg bg-[#e7d9d1] hover:bg-[#8b0101]/10 text-[#8b0101]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#2b0808]">
                      <div>
                        <span className="text-[#664444] uppercase text-[10px] block font-bold">Service Required</span>
                        <span className="font-semibold text-[#2b0808]">{inq.serviceType}</span>
                      </div>
                      <div>
                        <span className="text-[#664444] uppercase text-[10px] block font-bold">Target Date & Budget</span>
                        <span className="font-bold text-[#8b0101]">{inq.eventDate || 'TBD'} ({inq.budgetRange})</span>
                      </div>
                      <div>
                        <span className="text-[#664444] uppercase text-[10px] block font-bold">Location</span>
                        <span className="font-semibold text-[#2b0808]">{inq.location || 'Not specified'}</span>
                      </div>
                    </div>

                    <div className="bg-[#e7d9d1] p-4 rounded-xl text-xs text-[#2b0808] border border-[#8b0101]/15 leading-relaxed">
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8b0101]/20 pb-4">
                <div>
                  <h2 className="font-syne font-bold text-2xl text-[#2b0808]">Client Proofing Galleries</h2>
                  <p className="text-[#664444] text-xs">Create passcode-protected albums and upload client delivery photos.</p>
                </div>

                <button
                  onClick={() => setShowAddAlbumModal(true)}
                  className="px-5 py-2.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shadow-md shadow-[#8b0101]/25 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create New Album
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {proofingAlbums.map((album) => (
                  <div key={album.id} className="bg-[#dfcece]/70 backdrop-blur-md p-6 rounded-2xl border border-[#8b0101]/20 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-syne font-bold text-lg text-[#2b0808]">{album.albumTitle}</h3>
                          <p className="text-[#664444] text-xs">Client: <strong className="text-[#2b0808]">{album.clientName}</strong> • Event: {album.eventDate}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#8b0101] text-white text-[10px] font-bold uppercase">
                          {album.status}
                        </span>
                      </div>

                      <div className="p-3 bg-[#e7d9d1] rounded-xl border border-[#8b0101]/15 flex items-center justify-between text-xs">
                        <span className="text-[#664444]">Client PIN:</span>
                        <strong className="text-[#8b0101] font-mono tracking-widest text-sm">{album.passcode}</strong>
                      </div>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-[#8b0101]/20">
                      <div className="flex items-center justify-between text-xs text-[#664444]">
                        <span>Total Photos: <strong className="text-[#2b0808]">{album.photosCount}</strong></span>
                        <span>Client Selected: <strong className="text-[#8b0101] font-bold">{album.selectedCount}</strong></span>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => setActiveAlbumPhotosModal(album)}
                          className="flex-1 py-2 px-3 rounded-xl bg-[#2b0808] hover:bg-[#8b0101] text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#e7d9d1]" />
                          Upload & Manage Photos ({album.photosCount})
                        </button>

                        <button
                          onClick={() => handleDeleteAlbum(album.id)}
                          className="p-2 rounded-xl bg-[#e7d9d1] hover:bg-[#8b0101]/10 text-[#8b0101]"
                          title="Delete Album"
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

          {/* TAB 5: SERVICES MANAGER */}
          {activeTab === 'services' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8b0101]/20 pb-4">
                <div>
                  <h2 className="font-syne font-bold text-2xl text-[#2b0808]">Services & Package Rates</h2>
                  <p className="text-[#664444] text-xs">Add new pricing tiers, edit rates, and customize package deliverables anytime.</p>
                </div>

                <button
                  onClick={handleOpenAddServiceModal}
                  className="px-5 py-2.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shadow-md shadow-[#8b0101]/25 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Package
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((srv) => (
                  <div key={srv.id} className="bg-[#dfcece]/70 backdrop-blur-md p-6 rounded-2xl border border-[#8b0101]/20 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#8b0101]/10 text-[#8b0101] text-[10px] uppercase font-bold border border-[#8b0101]/20">
                          {srv.category}
                        </span>
                        {srv.popular && (
                          <span className="px-2 py-0.5 rounded-full bg-[#8b0101] text-white text-[9px] font-extrabold uppercase tracking-wider">
                            Popular
                          </span>
                        )}
                      </div>

                      <h3 className="font-syne font-bold text-xl text-[#2b0808]">{srv.title}</h3>
                      <p className="text-[#4a2929] text-xs font-medium">{srv.subtitle}</p>

                      <div className="pt-2 border-t border-[#8b0101]/15">
                        <span className="text-[#8b0101] font-syne font-extrabold text-2xl block">{srv.price}</span>
                        <span className="text-[11px] text-[#664444] font-mono">{srv.duration}</span>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <span className="text-[10px] font-bold uppercase text-[#664444] tracking-wider block">Deliverables:</span>
                        <ul className="text-xs text-[#2b0808] space-y-1">
                          {srv.deliverables.map((d, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#8b0101] font-bold">•</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-[#8b0101]/20">
                      <button
                        onClick={() => handleOpenEditServiceModal(srv)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#2b0808] hover:bg-[#8b0101] text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#e7d9d1]" />
                        Edit Package
                      </button>

                      <button
                        onClick={() => handleDeleteService(srv.id)}
                        className="p-2 rounded-xl bg-[#e7d9d1] hover:bg-[#8b0101]/10 text-[#8b0101]"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: WEBSITE SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl mx-auto bg-[#dfcece]/70 backdrop-blur-md p-8 rounded-3xl border border-[#8b0101]/20 shadow-sm">
              <div className="border-b border-[#8b0101]/20 pb-4">
                <h2 className="font-syne font-bold text-2xl text-[#2b0808]">Website & Photographer Settings</h2>
                <p className="text-[#664444] text-xs">Update studio branding, photographer bio, email, and social profiles.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#664444] uppercase font-semibold block mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={localSettings.brandName}
                    onChange={(e) => setLocalSettings({ ...localSettings, brandName: e.target.value })}
                    className="w-full bg-[#e7d9d1] border border-[#8b0101]/30 rounded-xl px-4 py-2.5 text-xs text-[#2b0808]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#664444] uppercase font-semibold block mb-1">Photographer Name</label>
                  <input
                    type="text"
                    value={localSettings.photographerName}
                    onChange={(e) => setLocalSettings({ ...localSettings, photographerName: e.target.value })}
                    className="w-full bg-[#e7d9d1] border border-[#8b0101]/30 rounded-xl px-4 py-2.5 text-xs text-[#2b0808]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#664444] uppercase font-semibold block mb-1">Hero Heading Statement</label>
                <input
                  type="text"
                  value={localSettings.heroHeading}
                  onChange={(e) => setLocalSettings({ ...localSettings, heroHeading: e.target.value })}
                  className="w-full bg-[#e7d9d1] border border-[#8b0101]/30 rounded-xl px-4 py-2.5 text-xs text-[#2b0808] font-syne font-bold"
                />
              </div>

              <div>
                <label className="text-xs text-[#664444] uppercase font-semibold block mb-1">Photographer Bio</label>
                <textarea
                  rows={3}
                  value={localSettings.bioText}
                  onChange={(e) => setLocalSettings({ ...localSettings, bioText: e.target.value })}
                  className="w-full bg-[#e7d9d1] border border-[#8b0101]/30 rounded-xl px-4 py-2.5 text-xs text-[#2b0808]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#664444] uppercase font-semibold block mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={localSettings.email}
                    onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                    className="w-full bg-[#e7d9d1] border border-[#8b0101]/30 rounded-xl px-4 py-2.5 text-xs text-[#2b0808]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#664444] uppercase font-semibold block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={localSettings.phone}
                    onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                    className="w-full bg-[#e7d9d1] border border-[#8b0101]/30 rounded-xl px-4 py-2.5 text-xs text-[#2b0808]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-8 py-3 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shadow-md shadow-[#8b0101]/25 flex items-center gap-2"
              >
                Save Website Settings
              </button>
            </form>
          )}

        </main>

      </div>

      {/* UPLOAD MEDIA MODAL */}
      {showAddMediaModal && (
        <div className="fixed inset-0 z-50 bg-[#2b0808]/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#2b0808] border border-[#8b0101]/40 rounded-3xl p-8 shadow-2xl my-8 text-[#e7d9d1]">
            <button onClick={() => setShowAddMediaModal(false)} className="absolute top-4 right-4 p-2 text-[#e7d9d1]/70 hover:text-white rounded-full bg-[#180404] border border-[#8b0101]/40">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-syne font-bold text-2xl text-white mb-1">Upload New Media Work</h3>
            <p className="text-[#e7d9d1]/70 text-xs mb-6">Select a local photo file or enter media URL to publish to your portfolio.</p>

            <form onSubmit={handleCreateMedia} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Media Type</label>
                  <select
                    value={newMedia.type}
                    onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value as MediaType })}
                    className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2 text-xs text-white"
                  >
                    <option value="photo">Photo Stills</option>
                    <option value="video">Cinema Video MP4 / Embed</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Category</label>
                  <select
                    value={newMedia.category}
                    onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value as Category })}
                    className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2 text-xs text-white"
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
                <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Venice Golden Hour Romance"
                  value={newMedia.title}
                  onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                  className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#e7d9d1]/40"
                />
              </div>

              {/* Upload Local File or URL Input */}
              <div className="space-y-2">
                <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block">Upload File or Image URL *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e)}
                    className="text-xs text-[#e7d9d1]/80 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#8b0101] file:text-white hover:file:brightness-110"
                  />
                  <span className="text-xs text-[#e7d9d1]/50 uppercase font-mono">OR</span>
                  <input
                    type="text"
                    placeholder="Paste Direct Image/Video URL"
                    value={newMedia.url}
                    onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                    className="flex-1 bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2 text-xs text-white placeholder-[#e7d9d1]/40"
                  />
                </div>
                {newMedia.url && (
                  <div className="mt-2 h-32 rounded-xl overflow-hidden bg-[#180404] border border-[#8b0101]/40">
                    <img src={newMedia.url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Client Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Vogue Italia"
                    value={newMedia.clientName}
                    onChange={(e) => setNewMedia({ ...newMedia, clientName: e.target.value })}
                    className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2 text-xs text-white placeholder-[#e7d9d1]/40"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Camera Gear Used</label>
                  <input
                    type="text"
                    placeholder="e.g. Sony A1 • FE 85mm f/1.4"
                    value={newMedia.gearUsed}
                    onChange={(e) => setNewMedia({ ...newMedia, gearUsed: e.target.value })}
                    className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2 text-xs text-white placeholder-[#e7d9d1]/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shadow-lg shadow-[#8b0101]/30 transition-transform active:scale-98"
              >
                Publish to Portfolio Website
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW PROOFING ALBUM MODAL */}
      {showAddAlbumModal && (
        <div className="fixed inset-0 z-50 bg-[#2b0808]/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#2b0808] border border-[#8b0101]/40 rounded-3xl p-8 shadow-2xl my-8 text-[#e7d9d1]">
            <button onClick={() => setShowAddAlbumModal(false)} className="absolute top-4 right-4 p-2 text-[#e7d9d1]/70 hover:text-white rounded-full bg-[#180404] border border-[#8b0101]/40">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-syne font-bold text-2xl text-white mb-1">Create Client Proofing Album</h3>
            <p className="text-[#e7d9d1]/70 text-xs mb-6">Create a private, passcode-protected album for client photo selection.</p>

            <form onSubmit={handleCreateAlbum} className="space-y-4">
              <div>
                <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Album Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohit & Neha Royal Wedding"
                  value={newAlbum.albumTitle || ''}
                  onChange={(e) => setNewAlbum({ ...newAlbum, albumTitle: e.target.value })}
                  className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#e7d9d1]/40 font-syne font-bold"
                />
              </div>

              <div>
                <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohit & Neha"
                  value={newAlbum.clientName || ''}
                  onChange={(e) => setNewAlbum({ ...newAlbum, clientName: e.target.value })}
                  className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#e7d9d1]/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Passcode / PIN *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SWAROOP2026"
                    value={newAlbum.passcode || ''}
                    onChange={(e) => setNewAlbum({ ...newAlbum, passcode: e.target.value })}
                    className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2 text-xs text-white font-mono tracking-widest"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Event Date</label>
                  <input
                    type="date"
                    value={newAlbum.eventDate || ''}
                    onChange={(e) => setNewAlbum({ ...newAlbum, eventDate: e.target.value })}
                    className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Cover Image (Upload file or URL)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAlbumCoverUpload}
                    className="text-xs text-[#e7d9d1]/80 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#8b0101] file:text-white"
                  />
                  <input
                    type="text"
                    placeholder="OR paste Image Cover URL"
                    value={newAlbum.coverUrl || ''}
                    onChange={(e) => setNewAlbum({ ...newAlbum, coverUrl: e.target.value })}
                    className="flex-1 bg-[#180404] border border-[#8b0101]/40 rounded-xl px-3 py-2 text-xs text-white placeholder-[#e7d9d1]/40"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shadow-lg shadow-[#8b0101]/30 transition-transform active:scale-98"
              >
                Create Proofing Album
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MANAGE & UPLOAD ALBUM PHOTOS MODAL */}
      {activeAlbumPhotosModal && (
        <div className="fixed inset-0 z-50 bg-[#2b0808]/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#2b0808] border border-[#8b0101]/40 rounded-3xl p-8 shadow-2xl my-8 text-[#e7d9d1] space-y-6 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setActiveAlbumPhotosModal(null)} className="absolute top-4 right-4 p-2 text-[#e7d9d1]/70 hover:text-white rounded-full bg-[#180404] border border-[#8b0101]/40">
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#8b0101] text-white text-[10px] font-bold uppercase tracking-wider">
                Album Photos Manager
              </span>
              <h3 className="font-syne font-bold text-2xl text-white mt-1">{activeAlbumPhotosModal.albumTitle}</h3>
              <p className="text-[#e7d9d1]/70 text-xs">Client: {activeAlbumPhotosModal.clientName} • Passcode: <strong className="text-[#8b0101] font-mono">{activeAlbumPhotosModal.passcode}</strong></p>
            </div>

            {/* Add Photo Form inside Album */}
            <form onSubmit={handleAddPhotoToAlbum} className="p-4 bg-[#180404] rounded-2xl border border-[#8b0101]/40 space-y-3">
              <h4 className="font-syne font-bold text-sm text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#8b0101]" />
                Upload New Photo to Album
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Upload Photo File or Image URL *</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAlbumPhotoUpload}
                      className="text-xs text-[#e7d9d1]/80 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:bg-[#8b0101] file:text-white"
                    />
                    <input
                      type="text"
                      placeholder="OR paste Image URL"
                      value={newAlbumPhotoUrl}
                      onChange={(e) => setNewAlbumPhotoUrl(e.target.value)}
                      className="flex-1 bg-[#2b0808] border border-[#8b0101]/40 rounded-xl px-3 py-1.5 text-xs text-white placeholder-[#e7d9d1]/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Photo Title / Label (Optional)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Ceremony Exchange #1"
                      value={newAlbumPhotoTitle}
                      onChange={(e) => setNewAlbumPhotoTitle(e.target.value)}
                      className="flex-1 bg-[#2b0808] border border-[#8b0101]/40 rounded-xl px-3 py-1.5 text-xs text-white placeholder-[#e7d9d1]/40"
                    />
                    <button
                      type="submit"
                      className="py-1.5 px-4 rounded-xl font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shrink-0"
                    >
                      + Add Photo
                    </button>
                  </div>
                </div>
              </div>

              {newAlbumPhotoUrl && (
                <div className="h-24 rounded-xl overflow-hidden bg-[#2b0808] border border-[#8b0101]/40 max-w-xs">
                  <img src={newAlbumPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </form>

            {/* Photos List Grid */}
            <div className="space-y-3">
              <h4 className="font-syne font-bold text-sm text-white">Album Photos ({activeAlbumPhotosModal.photos.length})</h4>
              
              {activeAlbumPhotosModal.photos.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#e7d9d1]/60 bg-[#180404] rounded-2xl border border-[#8b0101]/20">
                  No photos uploaded to this album yet. Use the form above to add photos for your client!
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {activeAlbumPhotosModal.photos.map((photo) => (
                    <div key={photo.id} className="relative group bg-[#180404] rounded-xl overflow-hidden border border-[#8b0101]/30">
                      <div className="aspect-square bg-black">
                        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                      </div>
                      
                      {photo.isSelected && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#8b0101] text-white text-[9px] font-bold uppercase flex items-center gap-1 shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                          Selected
                        </div>
                      )}

                      <button
                        onClick={() => handleDeletePhotoFromAlbum(activeAlbumPhotosModal.id, photo.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="p-2 text-center text-[10px] text-[#e7d9d1] font-medium truncate">
                        {photo.title}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ADD / EDIT SERVICE PACKAGE MODAL */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 bg-[#2b0808]/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#2b0808] border border-[#8b0101]/40 rounded-3xl p-8 shadow-2xl my-8 text-[#e7d9d1]">
            <button onClick={() => setShowServiceModal(false)} className="absolute top-4 right-4 p-2 text-[#e7d9d1]/70 hover:text-white rounded-full bg-[#180404] border border-[#8b0101]/40">
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-syne font-bold text-2xl text-white mb-1">
              {editingService ? 'Edit Service Package' : 'Add New Service Package'}
            </h3>
            <p className="text-[#e7d9d1]/70 text-xs mb-6">Customize pricing, deliverables, and package details shown on your portfolio.</p>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wedding One Day Service"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#e7d9d1]/40 font-syne font-bold"
                />
              </div>

              <div>
                <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Package Subtitle / Short Description</label>
                <input
                  type="text"
                  placeholder="e.g. Complete single-day coverage for traditional wedding & reception"
                  value={serviceForm.subtitle}
                  onChange={(e) => setServiceForm({ ...serviceForm, subtitle: e.target.value })}
                  className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2 text-xs text-white placeholder-[#e7d9d1]/40"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Category</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as any })}
                    className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="photography">Photography</option>
                    <option value="videography">Videography</option>
                    <option value="hybrid">Hybrid / Both</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Price *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹64,999/-"
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                    className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-3 py-2 text-xs text-white font-syne font-bold placeholder-[#e7d9d1]/40"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. Full Day"
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                    className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-3 py-2 text-xs text-white placeholder-[#e7d9d1]/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#e7d9d1]/80 font-semibold uppercase block mb-1">
                  Deliverables (Enter 1 item per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="200 Photos Printed Album&#10;100 Edited High-Res Photos&#10;6 to 8 Min Cinematic Feature Film & Teaser&#10;1 Hr+ Traditional Ceremony Video"
                  value={serviceForm.deliverablesText}
                  onChange={(e) => setServiceForm({ ...serviceForm, deliverablesText: e.target.value })}
                  className="w-full bg-[#180404] border border-[#8b0101]/40 rounded-xl px-4 py-2 text-xs text-white font-mono placeholder-[#e7d9d1]/40"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={serviceForm.popular}
                  onChange={(e) => setServiceForm({ ...serviceForm, popular: e.target.checked })}
                  className="w-4 h-4 accent-[#8b0101] rounded"
                />
                <label htmlFor="popularCheck" className="text-xs text-[#e7d9d1] font-medium cursor-pointer">
                  Highlight as "Most Popular Package"
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-white crimson-gradient-bg hover:brightness-110 shadow-lg shadow-[#8b0101]/30 transition-transform active:scale-98 mt-4"
              >
                {editingService ? 'Save Package Changes' : 'Create Pricing Package'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
