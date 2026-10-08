export type MediaType = 'photo' | 'video';

export type Category = 
  | 'All'
  | 'Weddings'
  | 'Birthday Shoots'
  | 'Cinematic Shoots'
  | 'Edits & Trailers'
  | 'Commercial';

export interface ExifData {
  camera?: string;
  lens?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: string;
  focalLength?: string;
  location?: string;
  date?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  category: Category;
  url: string; // Image URL or Video MP4 URL / YouTube Embed URL
  thumbnailUrl?: string; // For videos
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'panoramic';
  description?: string;
  clientName?: string;
  gearUsed?: string;
  exif?: ExifData;
  featured?: boolean;
  rawBeforeUrl?: string; // For before/after slider comparison
  videoDuration?: string; // e.g. "03:45"
  likesCount?: number;
  viewsCount?: number;
  createdAt: string;
}

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  eventDate?: string;
  budgetRange: string;
  location?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  subtitle: string;
  category: 'photography' | 'videography' | 'hybrid';
  price: string;
  duration: string;
  deliverables: string[];
  popular?: boolean;
}

export interface ProofingAlbum {
  id: string;
  clientName: string;
  albumTitle: string;
  eventDate: string;
  passcode: string;
  coverUrl: string;
  photosCount: number;
  selectedCount: number;
  status: 'active' | 'archived';
  photos: {
    id: string;
    url: string;
    title: string;
    isSelected?: boolean;
    clientComment?: string;
  }[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string; // e.g. "Bride & Groom", "Fashion Director"
  quote: string;
  rating: number;
  avatarUrl: string;
  projectTag: string;
}

export interface SiteSettings {
  brandName: string;
  photographerName: string;
  tagline: string;
  bioText: string;
  location: string;
  email: string;
  phone: string;
  instagramUrl: string;
  youtubeUrl: string;
  vimeoUrl: string;
  behanceUrl: string;
  heroHeading: string;
  heroSubheading: string;
  gearList: {
    cameras: string[];
    lenses: string[];
    lightingAndDrone: string[];
  };
}
