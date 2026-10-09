import type { MediaItem, ClientInquiry, ServicePackage, ProofingAlbum, Testimonial, SiteSettings } from '../types';

const INITIAL_SETTINGS: SiteSettings = {
  brandName: 'Swaroopnaikfilms',
  photographerName: 'Swaroop Naik',
  tagline: 'Fine Art Cinematic Films & Storytelling',
  heroHeading: 'SWAROOPNAIKFILMS',
  heroSubheading: 'Specializing in luxury wedding cinema, pre-wedding trailers, birthday milestone shoots, and commercial brand productions.',
  bioText: 'Swaroop Naik is a passionate visual storyteller specializing in cinematic direction, candid moments, and fine art color grading. Based in Shriwardhan, Mumbai & Kokan, available worldwide.',
  location: 'Shriwardhan • Mumbai • Kokan • Worldwide',
  email: 'swaroopnaikfilms@gmail.com',
  phone: '+91 7038606182',
  instagramUrl: 'https://instagram.com/swaroopnaikfilms',
  youtubeUrl: 'https://youtube.com',
  vimeoUrl: 'https://vimeo.com',
  behanceUrl: 'https://behance.net',
  gearList: {
    cameras: ['Sony M4 (Alpha 7 IV)', 'Sony M5 (Alpha 7 V)', 'Sony Siii (Alpha 7S III)'],
    lenses: ['Sigma DG-DN (16-28mm, 35mm, 85mm)', 'Samyang T1.9 Cine Lenses (24mm, 35mm, 75mm)'],
    lightingAndDrone: ['Ronin RS5 Gimbal', 'DJI Mavic 3 Pro & Mavic 2 Pro', 'Godox LC500 & Nanlite RGB Lights', 'Viltrox 5-inch Monitor']
  }
};

const INITIAL_MEDIA: MediaItem[] = [
  // --- WEDDING PHOTOS ---
  {
    id: 'w-1',
    title: 'Pratik & Shruti Wedding Ceremonies',
    type: 'photo',
    category: 'Weddings',
    url: '/media/Photos/Wedding/02.jpg',
    aspectRatio: 'portrait',
    description: 'High emotion candid ceremony capture by Swaroopnaikfilms.',
    clientName: 'Pratik & Shruti',
    gearUsed: 'Sony M4 • Sigma 85mm f/1.4',
    exif: {
      camera: 'Sony M4',
      lens: 'Sigma 85mm DG-DN',
      aperture: 'f/1.8',
      shutterSpeed: '1/500s',
      iso: '200',
      focalLength: '85mm',
      location: 'Mumbai, India',
      date: '2026-03-15'
    },
    featured: true,
    likesCount: 484,
    viewsCount: 2850,
    createdAt: '2026-03-15'
  },
  {
    id: 'w-2',
    title: 'Royal Bridal Elegance',
    type: 'photo',
    category: 'Weddings',
    url: '/media/Photos/Wedding/03.jpg',
    aspectRatio: 'portrait',
    description: 'Stunning fine art portrait of the bride in traditional attire.',
    clientName: 'Shruti',
    gearUsed: 'Sony Siii • Samyang 35mm T1.9 Cine',
    exif: {
      camera: 'Sony Siii',
      lens: 'Samyang 35mm T1.9',
      aperture: 'T1.9',
      shutterSpeed: '1/1000s',
      iso: '100',
      focalLength: '35mm',
      location: 'Shriwardhan, Kokan',
      date: '2026-03-15'
    },
    featured: true,
    likesCount: 592,
    viewsCount: 3820,
    createdAt: '2026-03-15'
  },
  {
    id: 'w-3',
    title: 'Traditional Garland Ritual',
    type: 'photo',
    category: 'Weddings',
    url: '/media/Photos/Wedding/04.jpg',
    aspectRatio: 'portrait',
    description: 'Vibrant wedding ceremony garland exchange ritual.',
    clientName: 'Pratik & Shruti',
    gearUsed: 'Sony M4 • Sigma 16-28mm',
    featured: true,
    likesCount: 410,
    viewsCount: 2480,
    createdAt: '2026-03-15'
  },
  {
    id: 'w-4',
    title: 'Sacred Mandap Moments',
    type: 'photo',
    category: 'Weddings',
    url: '/media/Photos/Wedding/08.jpg',
    aspectRatio: 'portrait',
    description: 'Capturing the sacred vows and heritage rituals.',
    clientName: 'Purvesh & Ritika',
    gearUsed: 'Sony M5 • 35mm Cine',
    featured: false,
    likesCount: 375,
    viewsCount: 1950,
    createdAt: '2026-02-10'
  },
  {
    id: 'w-5',
    title: 'Groom & Bride Joyous Celebration',
    type: 'photo',
    category: 'Weddings',
    url: '/media/Photos/Wedding/09y.jpg',
    aspectRatio: 'portrait',
    description: 'Pure joy and laughter shared after the wedding vows.',
    clientName: 'Aayushi & Aayush',
    gearUsed: 'Sony Siii • Sigma 85mm',
    featured: true,
    likesCount: 515,
    viewsCount: 3290,
    createdAt: '2026-01-20'
  },

  // --- BIRTHDAY SHOOTS ---
  {
    id: 'b-1',
    title: 'First Birthday Royal Portrait',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/001.JPG',
    aspectRatio: 'portrait',
    description: 'Adorable 1st birthday theme photo shoot.',
    clientName: 'Aarav 1st Birthday',
    gearUsed: 'Sony M4 • 35mm',
    featured: true,
    likesCount: 420,
    viewsCount: 2450,
    createdAt: '2026-04-01'
  },
  {
    id: 'b-2',
    title: 'Birthday Celebration Glow',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/001-2.JPG',
    aspectRatio: 'portrait',
    description: 'Vibrant festive birthday celebration candid portrait.',
    clientName: 'Ananya Birthday',
    gearUsed: 'Sony M4 • 85mm',
    featured: true,
    likesCount: 390,
    viewsCount: 2120,
    createdAt: '2026-04-01'
  },
  {
    id: 'b-4',
    title: 'Milestone Birthday Smile',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/005.JPG',
    aspectRatio: 'portrait',
    description: 'Heartwarming smile captured during birthday cake cutting.',
    clientName: 'Riya Birthday',
    featured: true,
    likesCount: 480,
    viewsCount: 2840,
    createdAt: '2026-03-20'
  }
];

const INITIAL_INQUIRIES: ClientInquiry[] = [
  {
    id: 'inq-1',
    name: 'Rohit & Neha',
    email: 'rohit.neha@example.com',
    phone: '+91 70386 06182',
    serviceType: 'Wedding One day service',
    eventDate: '2026-11-25',
    budgetRange: '₹64,999/-',
    location: 'Mumbai',
    message: 'Hello Swaroop! We love your Swaroopnaikfilms wedding films and candid reels. Looking to book Wedding One day service for November.',
    status: 'new',
    createdAt: '2026-10-07'
  }
];

const INITIAL_SERVICES: ServicePackage[] = [
  {
    id: 'srv-1',
    title: 'Wedding One Day Service',
    subtitle: 'Full crew coverage: 1 Traditional Photographer, 1 Cinematographer, 1 Candid Photographer, 1 Traditional Videographer, 1 Reel Maker & 1 Assistant.',
    category: 'hybrid',
    price: '₹64,999/-',
    duration: 'Full Day Event Coverage',
    deliverables: [
      '200 Photos Printed Album',
      '100 Edited High-Res Photos',
      '6 to 8 Min Cinematic Feature Film & Teaser',
      '1 Hr+ Traditional Ceremony Video',
      '3 High Energy Instagram Reels',
      'All Raw Data Deliverable'
    ],
    popular: true
  },
  {
    id: 'srv-2',
    title: 'Birthday Shoot',
    subtitle: '3 to 4 hours complete event photography and Instagram reel coverage.',
    category: 'photography',
    price: '₹12,999/-',
    duration: '3 to 4 Hours Event',
    deliverables: [
      'Photos + Reels Event Coverage',
      '20+ Retouched High-Resolution Photos',
      '2 High Energy Instagram Reels',
      'All Raw Data Deliverable'
    ],
    popular: false
  },
  {
    id: 'srv-3',
    title: 'Pre Wedding One Day Service',
    subtitle: '2 to 3 Outfits shoot. Crew: 1 Photographer, 1 Cinematographer, 1 Drone Pilot & 1 Assistant.',
    category: 'videography',
    price: '₹29,999/-',
    duration: 'Full Day Shoot (2/3 Outfits)',
    deliverables: [
      '35+ Master Edited High-Res Photos',
      '3 Min Cinematic Highlight & Teaser Film',
      '2 Vertical Instagram Reels',
      'Drone Aerial Shots Included',
      'All Raw Data Deliverable'
    ],
    popular: false
  }
];

const INITIAL_PROOFING: ProofingAlbum[] = [
  {
    id: 'prf-1',
    clientName: 'Pratik & Shruti',
    albumTitle: 'Royal Wedding Gallery',
    eventDate: '2026-03-15',
    passcode: 'SWAROOP2026',
    coverUrl: '/media/Photos/Wedding/02.jpg',
    photosCount: 5,
    selectedCount: 3,
    status: 'active',
    photos: [
      { id: 'p1', url: '/media/Photos/Wedding/02.jpg', title: 'Ceremony Rituals', isSelected: true, clientComment: 'Gorgeous lighting! Main print album choice.' },
      { id: 'p2', url: '/media/Photos/Wedding/03.jpg', title: 'Bridal Portrait', isSelected: true, clientComment: 'Framing this for living room!' },
      { id: 'p3', url: '/media/Photos/Wedding/04.jpg', title: 'Garland Exchange', isSelected: true },
      { id: 'p4', url: '/media/Photos/Wedding/08.jpg', title: 'Mandap Vows', isSelected: false },
      { id: 'p5', url: '/media/Photos/Wedding/09y.jpg', title: 'Joyous Couple Exit', isSelected: false }
    ]
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Pratik & Shruti Deshmukh',
    role: 'Bride & Groom (Mumbai Wedding)',
    quote: 'Swaroopnaikfilms created pure magic for our wedding! The cinematic teaser and candid album photos look straight out of a Bollywood movie. 100% recommended!',
    rating: 5,
    avatarUrl: '/media/Photos/Wedding/03.jpg',
    projectTag: 'Google Verified Review ⭐⭐⭐⭐⭐'
  },
  {
    id: 't2',
    clientName: 'Sneha & Amit Patil',
    role: 'Parents (Aarav 1st Birthday)',
    quote: 'Swaroop took such wonderful photos for our son’s birthday! The reels were super high energy and raw data was delivered promptly.',
    rating: 5,
    avatarUrl: '/media/Photos/Birthday Shoots/001.JPG',
    projectTag: 'Google Verified Review ⭐⭐⭐⭐⭐'
  },
  {
    id: 't3',
    clientName: 'Komal & Gannesh',
    role: 'Pre-Wedding & Engagement',
    quote: 'The 3 min pre-wedding cinematic teaser blown everyone away. Drone shots and color grading were top notch!',
    rating: 5,
    avatarUrl: '/media/Photos/Wedding/02.jpg',
    projectTag: 'Google Verified Review ⭐⭐⭐⭐⭐'
  }
];

// Helper functions for LocalStorage persistence with version v5
const STORAGE_KEYS = {
  MEDIA: 'swaroopnaikfilms_media_v5',
  INQUIRIES: 'swaroopnaikfilms_inquiries_v5',
  SERVICES: 'swaroopnaikfilms_services_v5',
  PROOFING: 'swaroopnaikfilms_proofing_v5',
  TESTIMONIALS: 'swaroopnaikfilms_testimonials_v5',
  SETTINGS: 'swaroopnaikfilms_settings_v5',
  ADMIN_AUTH: 'swaroopnaikfilms_admin_logged_in_v5'
};

export const resetToDefaults = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  } catch (e) {
    console.error('Error resetting defaults:', e);
  }
};

export const getStoredMedia = (): MediaItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MEDIA);
    return data ? JSON.parse(data) : INITIAL_MEDIA;
  } catch {
    return INITIAL_MEDIA;
  }
};

export const saveStoredMedia = (media: MediaItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
  } catch (e) {
    console.error('Failed saving media to localStorage:', e);
  }
};

export const getStoredInquiries = (): ClientInquiry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return data ? JSON.parse(data) : INITIAL_INQUIRIES;
  } catch {
    return INITIAL_INQUIRIES;
  }
};

export const saveStoredInquiries = (inquiries: ClientInquiry[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  } catch (e) {
    console.error('Failed saving inquiries:', e);
  }
};

export const getStoredServices = (): ServicePackage[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return data ? JSON.parse(data) : INITIAL_SERVICES;
  } catch {
    return INITIAL_SERVICES;
  }
};

export const saveStoredServices = (services: ServicePackage[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  } catch (e) {
    console.error('Failed saving services:', e);
  }
};

export const getStoredProofingAlbums = (): ProofingAlbum[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROOFING);
    return data ? JSON.parse(data) : INITIAL_PROOFING;
  } catch {
    return INITIAL_PROOFING;
  }
};

export const saveStoredProofingAlbums = (albums: ProofingAlbum[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROOFING, JSON.stringify(albums));
  } catch (e) {
    console.error('Failed saving proofing albums:', e);
  }
};

export const getStoredTestimonials = (): Testimonial[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return data ? JSON.parse(data) : INITIAL_TESTIMONIALS;
  } catch {
    return INITIAL_TESTIMONIALS;
  }
};

export const getStoredSettings = (): SiteSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : INITIAL_SETTINGS;
  } catch {
    return INITIAL_SETTINGS;
  }
};

export const saveStoredSettings = (settings: SiteSettings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed saving settings:', e);
  }
};
