import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { LightboxModal } from './components/LightboxModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ShowreelSection } from './components/ShowreelSection';
import { ServicesSection } from './components/ServicesSection';
import { ClientProofingPortal } from './components/ClientProofingPortal';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutGearSection } from './components/AboutGearSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Admin Components
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Types & Storage
import type { MediaItem, ClientInquiry, ServicePackage, ProofingAlbum, Testimonial, SiteSettings } from './types';
import {
  getStoredMedia,
  saveStoredMedia,
  getStoredInquiries,
  saveStoredInquiries,
  getStoredServices,
  saveStoredServices,
  getStoredProofingAlbums,
  saveStoredProofingAlbums,
  getStoredTestimonials,
  getStoredSettings,
  saveStoredSettings,
  resetToDefaults
} from './services/storage';

export function App() {
  // Master State loaded from localStorage/defaults
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(getStoredMedia);
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(getStoredInquiries);
  const [services, setServices] = useState<ServicePackage[]>(getStoredServices);
  const [proofingAlbums, setProofingAlbums] = useState<ProofingAlbum[]>(getStoredProofingAlbums);
  const [testimonials] = useState<Testimonial[]>(getStoredTestimonials);
  const [settings, setSettings] = useState<SiteSettings>(getStoredSettings);

  // Modals & Active Selections
  const [selectedPhoto, setSelectedPhoto] = useState<MediaItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const [selectedPresetService, setSelectedPresetService] = useState<string>('');

  // Admin State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminActive, setIsAdminActive] = useState(false);

  // Handle media updates & save to storage
  const handleUpdateMedia = (newMedia: MediaItem[]) => {
    setMediaItems(newMedia);
    saveStoredMedia(newMedia);
  };

  // Handle inquiry additions
  const handleAddInquiry = (newInquiry: ClientInquiry) => {
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    saveStoredInquiries(updated);
  };

  // Handle inquiry updates from Admin
  const handleUpdateInquiries = (newInquiries: ClientInquiry[]) => {
    setInquiries(newInquiries);
    saveStoredInquiries(newInquiries);
  };

  // Handle service updates from Admin
  const handleUpdateServices = (newServices: ServicePackage[]) => {
    setServices(newServices);
    saveStoredServices(newServices);
  };

  // Handle proofing album updates
  const handleUpdateProofing = (newAlbums: ProofingAlbum[]) => {
    setProofingAlbums(newAlbums);
    saveStoredProofingAlbums(newAlbums);
  };

  const handleUpdateSingleProofing = (updatedAlbum: ProofingAlbum) => {
    const updated = proofingAlbums.map((a) => (a.id === updatedAlbum.id ? updatedAlbum : a));
    setProofingAlbums(updated);
    saveStoredProofingAlbums(updated);
  };

  // Handle settings updates from Admin
  const handleUpdateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
  };

  // Toggle Like on media item
  const handleToggleLike = (id: string) => {
    const updated = mediaItems.map((item) => {
      if (item.id === id) {
        return { ...item, likesCount: (item.likesCount || 0) + 1 };
      }
      return item;
    });
    handleUpdateMedia(updated);

    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto((prev) => (prev ? { ...prev, likesCount: (prev.likesCount || 0) + 1 } : null));
    }
  };

  // Lightbox prev/next handlers
  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const photosOnly = mediaItems.filter((m) => m.type === 'photo');
    const currentIndex = photosOnly.findIndex((m) => m.id === selectedPhoto.id);
    if (currentIndex > 0) {
      setSelectedPhoto(photosOnly[currentIndex - 1]);
    } else {
      setSelectedPhoto(photosOnly[photosOnly.length - 1]);
    }
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const photosOnly = mediaItems.filter((m) => m.type === 'photo');
    const currentIndex = photosOnly.findIndex((m) => m.id === selectedPhoto.id);
    if (currentIndex < photosOnly.length - 1) {
      setSelectedPhoto(photosOnly[currentIndex + 1]);
    } else {
      setSelectedPhoto(photosOnly[0]);
    }
  };

  const unreadInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  // Showreel video object
  const showreelVideoItem: MediaItem = {
    id: 'showreel-hero',
    title: `${settings.brandName} • 2026 Cinema Reel`,
    type: 'video',
    category: 'Cinematic Shoots',
    url: '/media/Cinematic Shoot/PRATIK & SHRUTI WEDDING.mp4',
    thumbnailUrl: '/media/Photos/Wedding/02.jpg',
    description: 'Master cinematography showreel shot by Swaroop Naik Photography. Sony FX3 & A7S III.',
    videoDuration: '12:45',
    gearUsed: 'Sony FX3 Cinema • GM Master Lenses',
    createdAt: '2026-10-01'
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Navigation Header */}
      <Navbar
        settings={settings}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        isAdmin={isAdminActive}
        onLogoutAdmin={() => setIsAdminActive(false)}
        unreadInquiriesCount={unreadInquiriesCount}
      />

      {/* Main Website Content */}
      <main>
        {/* Hero Banner */}
        <Hero
          settings={settings}
          onOpenShowreel={() => setSelectedVideo(showreelVideoItem)}
        />

        {/* Master Portfolio Gallery */}
        <PortfolioGrid
          mediaItems={mediaItems}
          onSelectPhoto={(item) => setSelectedPhoto(item)}
          onSelectVideo={(item) => setSelectedVideo(item)}
          onToggleLike={handleToggleLike}
        />

        {/* Before / After Color Grading Slider */}
        <BeforeAfterSlider />

        {/* Videographer 4K Cinema Showreel */}
        <ShowreelSection
          onOpenShowreel={() => setSelectedVideo(showreelVideoItem)}
        />

        {/* Services & Pricing */}
        <ServicesSection
          services={services}
          onSelectService={(serviceTitle) => {
            setSelectedPresetService(serviceTitle);
            const contactElem = document.getElementById('contact');
            if (contactElem) {
              contactElem.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Client Proofing Portal */}
        <ClientProofingPortal
          albums={proofingAlbums}
          onUpdateAlbum={handleUpdateSingleProofing}
        />

        {/* Client Testimonials */}
        <TestimonialsSection testimonials={testimonials} />

        {/* Photographer Bio & Gear Setup */}
        <AboutGearSection settings={settings} />

        {/* Booking Inquiry Form */}
        <ContactSection
          settings={settings}
          selectedServicePreset={selectedPresetService}
          onAddInquiry={handleAddInquiry}
        />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* MODALS */}

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <LightboxModal
          item={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onPrev={handlePrevPhoto}
          onNext={handleNextPhoto}
          onToggleLike={handleToggleLike}
        />
      )}

      {/* Video Cinema Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          item={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* Admin Login PIN Modal */}
      {isAdminModalOpen && !isAdminActive && (
        <AdminLoginModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          onLoginSuccess={() => {
            setIsAdminModalOpen(false);
            setIsAdminActive(true);
          }}
        />
      )}

      {/* Full Photographer Admin Dashboard Screen */}
      {isAdminActive && (
        <AdminDashboard
          mediaItems={mediaItems}
          inquiries={inquiries}
          services={services}
          proofingAlbums={proofingAlbums}
          settings={settings}
          onUpdateMedia={handleUpdateMedia}
          onUpdateInquiries={handleUpdateInquiries}
          onUpdateServices={handleUpdateServices}
          onUpdateProofing={handleUpdateProofing}
          onUpdateSettings={handleUpdateSettings}
          onExitAdmin={() => setIsAdminActive(false)}
          onResetDefaults={resetToDefaults}
        />
      )}

    </div>
  );
}

export default App;
