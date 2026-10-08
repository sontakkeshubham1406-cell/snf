import type { MediaItem, ClientInquiry, ServicePackage, ProofingAlbum, Testimonial, SiteSettings } from '../types';

const INITIAL_SETTINGS: SiteSettings = {
  brandName: 'SWAROOP NAIK PHOTOGRAPHY',
  photographerName: 'Swaroop Naik',
  tagline: 'Capturing Authentic Stories & Fine Art Cinematic Visuals',
  heroHeading: 'SWAROOP NAIK PHOTOGRAPHY',
  heroSubheading: 'Specializing in fine-art wedding stories, milestone birthday celebrations, cinematic highlight edits, and commercial brand films.',
  bioText: 'Swaroop Naik is an acclaimed visual artist and storyteller with a passion for candid moments, vibrant colors, and cinematic direction. From grand wedding celebrations to joyful birthday milestone shoots, Swaroop Naik Photography crafts memories that last a lifetime.',
  location: 'Mumbai • Pune • Available Worldwide',
  email: 'swaroopnaikphotography@gmail.com',
  phone: '+91 98765 43210',
  instagramUrl: 'https://instagram.com/swaroopnaikphotography',
  youtubeUrl: 'https://youtube.com',
  vimeoUrl: 'https://vimeo.com',
  behanceUrl: 'https://behance.net',
  gearList: {
    cameras: ['Sony Alpha 7 IV (4K Cinema)', 'Sony FX3 Cinema Line', 'Sony Alpha 7S III'],
    lenses: ['Sony FE 50mm f/1.2 GM', 'Sony FE 85mm f/1.4 GM', 'Sony FE 24-70mm f/2.8 GM II', 'Sigma 35mm f/1.4 Art'],
    lightingAndDrone: ['Aputure 300d II Light', 'Godox AD600 Pro Strobe', 'DJI Mavic 3 Pro Drone', 'DJI Ronin RS 3 Pro Gimbal']
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
    description: 'High emotion candid ceremony capture by Swaroop Naik Photography.',
    clientName: 'Pratik & Shruti',
    gearUsed: 'Sony A7IV • 85mm f/1.4 GM',
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 85mm f/1.4 GM',
      aperture: 'f/1.8',
      shutterSpeed: '1/500s',
      iso: '200',
      focalLength: '85mm',
      location: 'Mumbai, India',
      date: '2026-03-15'
    },
    featured: true,
    likesCount: 384,
    viewsCount: 2150,
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
    gearUsed: 'Sony A7IV • 50mm f/1.2 GM',
    exif: {
      camera: 'Sony Alpha 7 IV',
      lens: 'FE 50mm f/1.2 GM',
      aperture: 'f/1.4',
      shutterSpeed: '1/1000s',
      iso: '100',
      focalLength: '50mm',
      location: 'Pune, India',
      date: '2026-03-15'
    },
    featured: true,
    likesCount: 492,
    viewsCount: 3120,
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
    gearUsed: 'Sony FX3 • 24-70mm f/2.8 GM II',
    featured: true,
    likesCount: 310,
    viewsCount: 1980,
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
    gearUsed: 'Sony A7IV • 35mm f/1.4',
    featured: false,
    likesCount: 275,
    viewsCount: 1450,
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
    gearUsed: 'Sony A7IV • 85mm f/1.4 GM',
    featured: true,
    likesCount: 415,
    viewsCount: 2890,
    createdAt: '2026-01-20'
  },

  // --- CINEMATIC SHOOTS ---
  {
    id: 'c-1',
    title: 'Pratik & Shruti Wedding Cinema Film',
    type: 'video',
    category: 'Cinematic Shoots',
    url: '/media/Cinematic Shoot/PRATIK & SHRUTI WEDDING.mp4',
    thumbnailUrl: '/media/Photos/Wedding/02.jpg',
    aspectRatio: 'landscape',
    description: 'Full feature 4K cinematic wedding film telling the love story of Pratik & Shruti.',
    clientName: 'Pratik & Shruti',
    gearUsed: 'Sony FX3 & Sony A7S III • 4K HDR',
    videoDuration: '12:45',
    featured: true,
    likesCount: 640,
    viewsCount: 4890,
    createdAt: '2026-03-16'
  },
  {
    id: 'c-2',
    title: 'Komal & Gannesh Teaser #02',
    type: 'video',
    category: 'Cinematic Shoots',
    url: '/media/Cinematic Shoot/KOMAL & GANNESH #TEASER02.mp4',
    thumbnailUrl: '/media/Photos/Wedding/03.jpg',
    aspectRatio: 'landscape',
    description: 'Atmospheric teaser film capturing love, laughter and emotion.',
    clientName: 'Komal & Gannesh',
    gearUsed: 'Sony FX3 • Anamorphic Look',
    videoDuration: '01:30',
    featured: true,
    likesCount: 512,
    viewsCount: 3670,
    createdAt: '2026-02-28'
  },
  {
    id: 'c-3',
    title: 'Akshay & Snehal Engagement Film',
    type: 'video',
    category: 'Cinematic Shoots',
    url: '/media/Cinematic Shoot/Engagement Akshay &  snehal.mp4',
    thumbnailUrl: '/media/Photos/Wedding/04.jpg',
    aspectRatio: 'landscape',
    description: 'Unforgettable engagement ceremony cinema film shot by Swaroop Naik.',
    clientName: 'Akshay & Snehal',
    gearUsed: 'Sony A7S III • Ronin RS3 Pro',
    videoDuration: '05:15',
    featured: true,
    likesCount: 488,
    viewsCount: 3100,
    createdAt: '2026-02-14'
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
    gearUsed: 'Sony A7IV • 50mm f/1.2 GM',
    featured: true,
    likesCount: 320,
    viewsCount: 1950,
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
    gearUsed: 'Sony A7IV • 85mm f/1.4 GM',
    featured: true,
    likesCount: 290,
    viewsCount: 1820,
    createdAt: '2026-04-01'
  },
  {
    id: 'b-3',
    title: 'Theme Birthday Party Highlights',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/001 copy.JPG',
    aspectRatio: 'portrait',
    description: 'Fun filled kids birthday event photography.',
    clientName: 'Kabir 5th Birthday',
    featured: false,
    likesCount: 210,
    viewsCount: 1340,
    createdAt: '2026-03-25'
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
    likesCount: 380,
    viewsCount: 2240,
    createdAt: '2026-03-20'
  },
  {
    id: 'b-5',
    title: 'Candid Birthday Moments',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/006.JPG',
    aspectRatio: 'portrait',
    description: 'Natural expressions and laughter with family.',
    clientName: 'Siddharth Birthday',
    featured: false,
    likesCount: 195,
    viewsCount: 1150,
    createdAt: '2026-03-18'
  },
  {
    id: 'b-6',
    title: 'Joyful Party Portrait',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/007.JPG',
    aspectRatio: 'portrait',
    description: 'Colorful decor and cheerful birthday portraits.',
    featured: false,
    likesCount: 180,
    viewsCount: 980,
    createdAt: '2026-03-10'
  },
  {
    id: 'b-7',
    title: 'Little Prince Cake Smash',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/008.JPG',
    aspectRatio: 'portrait',
    description: 'Cute cake smash celebration shoot.',
    featured: false,
    likesCount: 260,
    viewsCount: 1600,
    createdAt: '2026-03-05'
  },
  {
    id: 'b-8',
    title: 'Grand Birthday Reception',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/010.JPG',
    aspectRatio: 'portrait',
    description: 'Grand backdrop and family group portraits.',
    featured: true,
    likesCount: 340,
    viewsCount: 2100,
    createdAt: '2026-02-28'
  },
  {
    id: 'b-9',
    title: 'Baby Outdoor Portrait',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/DSC09076.JPG',
    aspectRatio: 'landscape',
    description: 'Soft sunlight natural outdoor portrait.',
    featured: false,
    likesCount: 230,
    viewsCount: 1400,
    createdAt: '2026-02-20'
  },
  {
    id: 'b-10',
    title: 'Little Princess Birthday Candid',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/DSC09283.JPG',
    aspectRatio: 'landscape',
    description: 'Fairytale theme setup for milestone birthday.',
    featured: false,
    likesCount: 280,
    viewsCount: 1750,
    createdAt: '2026-02-15'
  },
  {
    id: 'b-11',
    title: 'Birthday Stage Setup & Smiles',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/DSC09342.JPG',
    aspectRatio: 'landscape',
    description: 'Designer balloon arch and stage decoration.',
    featured: false,
    likesCount: 215,
    viewsCount: 1290,
    createdAt: '2026-02-10'
  },
  {
    id: 'b-12',
    title: 'Family Joy at Birthday Party',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/DSC09485.JPG',
    aspectRatio: 'portrait',
    description: 'Cherished memories with parents and grandparents.',
    featured: false,
    likesCount: 250,
    viewsCount: 1520,
    createdAt: '2026-02-05'
  },
  {
    id: 'b-13',
    title: 'Birthday Cake Cutting Magic',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/DSC09531.JPG',
    aspectRatio: 'portrait',
    description: 'Sparkling candles and cake cutting moment.',
    featured: false,
    likesCount: 310,
    viewsCount: 1880,
    createdAt: '2026-01-28'
  },
  {
    id: 'b-14',
    title: 'Charming Birthday Portrait',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/IMG_2234.JPG',
    aspectRatio: 'portrait',
    featured: false,
    likesCount: 175,
    viewsCount: 950,
    createdAt: '2026-01-20'
  },
  {
    id: 'b-15',
    title: 'Celebration Memories',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/IMG_2235.JPG',
    aspectRatio: 'portrait',
    featured: false,
    likesCount: 160,
    viewsCount: 890,
    createdAt: '2026-01-18'
  },
  {
    id: 'b-16',
    title: 'Festive Family Moments',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/IMG_2236.JPG',
    aspectRatio: 'portrait',
    featured: false,
    likesCount: 190,
    viewsCount: 1040,
    createdAt: '2026-01-15'
  },
  {
    id: 'b-17',
    title: 'Precious Birthday Smiles',
    type: 'photo',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/IMG_2238.JPG',
    aspectRatio: 'portrait',
    featured: false,
    likesCount: 205,
    viewsCount: 1120,
    createdAt: '2026-01-10'
  },
  {
    id: 'br-1',
    title: 'Birthday Highlight Reel',
    type: 'video',
    category: 'Birthday Shoots',
    url: '/media/Photos/Birthday Shoots/Reel 001.MP4',
    thumbnailUrl: '/media/Photos/Birthday Shoots/001.JPG',
    aspectRatio: 'portrait',
    description: 'Dynamic vertical Instagram reel capturing birthday highlights.',
    videoDuration: '00:45',
    featured: true,
    likesCount: 430,
    viewsCount: 2980,
    createdAt: '2026-03-22'
  },

  // --- EDITS & TRAILERS ---
  {
    id: 'e-1',
    title: 'Purvesh & Ritika Wedding Reel - Day 2',
    type: 'video',
    category: 'Edits & Trailers',
    url: '/media/Edits/DAY 2 PURVESH & RITIKA WEDDING REEL.mp4',
    thumbnailUrl: '/media/Photos/Wedding/08.jpg',
    aspectRatio: 'portrait',
    description: 'Day 2 wedding celebration vertical reel edited by Swaroop Naik.',
    clientName: 'Purvesh & Ritika',
    videoDuration: '01:15',
    featured: true,
    likesCount: 490,
    viewsCount: 3410,
    createdAt: '2026-03-12'
  },
  {
    id: 'e-2',
    title: 'Aayushi & Aayush Wedding Teaser #1',
    type: 'video',
    category: 'Edits & Trailers',
    url: '/media/Edits/AAYUSHI & AAYUSH #TEASER_1.mp4',
    thumbnailUrl: '/media/Photos/Wedding/09y.jpg',
    aspectRatio: 'landscape',
    description: 'Cinematic teaser highlighting romantic moments.',
    clientName: 'Aayushi & Aayush',
    videoDuration: '01:05',
    featured: true,
    likesCount: 375,
    viewsCount: 2540,
    createdAt: '2026-03-01'
  },
  {
    id: 'e-3',
    title: 'Veda Grand Wedding Highlight',
    type: 'video',
    category: 'Edits & Trailers',
    url: '/media/Edits/FINAL  VEDA HIGHLIGHT.mp4',
    thumbnailUrl: '/media/Photos/Wedding/02.jpg',
    aspectRatio: 'landscape',
    description: 'Master edited wedding highlight video.',
    videoDuration: '03:40',
    featured: true,
    likesCount: 520,
    viewsCount: 3900,
    createdAt: '2026-02-18'
  },
  {
    id: 'e-4',
    title: 'Prajakta & Prathamesh Highlight',
    type: 'video',
    category: 'Edits & Trailers',
    url: '/media/Edits/PRAJAKTA & PRATHAMESH HIGHLIGHT_002.mp4',
    thumbnailUrl: '/media/Photos/Wedding/03.jpg',
    aspectRatio: 'landscape',
    description: 'Rich color graded wedding highlights edit.',
    clientName: 'Prajakta & Prathamesh',
    videoDuration: '04:10',
    featured: true,
    likesCount: 460,
    viewsCount: 3120,
    createdAt: '2026-02-08'
  },
  {
    id: 'e-5',
    title: 'Mohan & Madhura Wedding Trailer #001',
    type: 'video',
    category: 'Edits & Trailers',
    url: '/media/Edits/Mohan - Madhura Wedding Trailer #001.mp4',
    thumbnailUrl: '/media/Photos/Wedding/04.jpg',
    aspectRatio: 'landscape',
    description: 'Official trailer cut for Mohan & Madhura wedding.',
    clientName: 'Mohan & Madhura',
    videoDuration: '03:15',
    featured: false,
    likesCount: 310,
    viewsCount: 2100,
    createdAt: '2026-01-25'
  },
  {
    id: 'e-6',
    title: 'Sarvesh & Gauri Trailer Version #2',
    type: 'video',
    category: 'Edits & Trailers',
    url: '/media/Edits/Sarvesh & Gauri Trailer Version #2.mp4',
    thumbnailUrl: '/media/Photos/Wedding/08.jpg',
    aspectRatio: 'landscape',
    description: 'Cinematic trailer version 2.',
    clientName: 'Sarvesh & Gauri',
    videoDuration: '03:30',
    featured: false,
    likesCount: 295,
    viewsCount: 1980,
    createdAt: '2026-01-15'
  },
  {
    id: 'e-7',
    title: 'Rohit & Prajakta Teaser V1',
    type: 'video',
    category: 'Edits & Trailers',
    url: '/media/Edits/Rohit & Prajakta_Teaser_V1.mp4',
    thumbnailUrl: '/media/Photos/Wedding/09y.jpg',
    aspectRatio: 'landscape',
    description: 'Pre-wedding teaser film.',
    clientName: 'Rohit & Prajakta',
    videoDuration: '01:45',
    featured: false,
    likesCount: 340,
    viewsCount: 2310,
    createdAt: '2026-01-05'
  },

  // --- COMMERCIAL ---
  {
    id: 'cm-1',
    title: 'SBV Commercial Brand Highlight',
    type: 'video',
    category: 'Commercial',
    url: '/media/Commercial/SBV Highlight_V1_1.mp4',
    thumbnailUrl: '/media/Photos/Birthday Shoots/010.JPG',
    aspectRatio: 'landscape',
    description: 'High energy commercial brand highlight production by Swaroop Naik Photography.',
    clientName: 'SBV Brand Campaign',
    gearUsed: 'Sony FX3 Cinema Line',
    videoDuration: '06:30',
    featured: true,
    likesCount: 580,
    viewsCount: 4200,
    createdAt: '2026-03-28'
  }
];

const INITIAL_INQUIRIES: ClientInquiry[] = [
  {
    id: 'inq-1',
    name: 'Rohit Sharma',
    email: 'rohit.sharma@example.com',
    phone: '+91 98201 54321',
    serviceType: 'Wedding Photography & Cinema Package',
    eventDate: '2026-11-25',
    budgetRange: '₹1,50,000 - ₹2,50,000',
    location: 'Grand Hyatt, Mumbai',
    message: 'Hello Swaroop! We love your wedding photography style and cinematic reels. We have a 2-day destination wedding in November and would love to check your availability.',
    status: 'new',
    createdAt: '2026-10-07'
  },
  {
    id: 'inq-2',
    name: 'Priyanka Kulkarni',
    email: 'priyanka.k@example.com',
    phone: '+91 99700 12345',
    serviceType: '1st Birthday Milestone Shoot',
    eventDate: '2026-12-10',
    budgetRange: '₹35,000 - ₹50,000',
    location: 'Baner, Pune',
    message: 'Hi Swaroop! Planning our son’s 1st birthday party and theme photoshoot. Looking for candid photos and a vertical reel edit.',
    status: 'read',
    createdAt: '2026-10-05'
  }
];

const INITIAL_SERVICES: ServicePackage[] = [
  {
    id: 'srv-1',
    title: 'Royal Wedding Photography & Cinema',
    subtitle: 'Complete candid photography, traditional portraits, and 4K cinematic film team.',
    category: 'hybrid',
    price: '₹1,85,000',
    duration: 'Full Day Event Coverage',
    deliverables: [
      'Lead Photographer (Swaroop Naik) + Cinema Crew',
      '400+ Master Edited High-Res Photos',
      '5-7 Minute 4K Cinematic Wedding Highlight',
      'Vertical Instagram Teaser Reel (Reel Edit)',
      'Full Ceremony Documentary Film Edit',
      'Private Password-Protected Client Online Gallery',
      'Premium Printed Flush Mount Leather Photo Album'
    ],
    popular: true
  },
  {
    id: 'srv-2',
    title: 'Milestone Birthday & Party Shoot',
    subtitle: 'Vibrant party photography, theme photo setups, and Instagram reel edits.',
    category: 'photography',
    price: '₹35,000',
    duration: '4-5 Hours Event',
    deliverables: [
      'Candid & Portrait Event Photography',
      '150+ Retouched High-Resolution Images',
      'Theme Cake Cutting & Stage Setup Photos',
      '1x Vertical Instagram Reel (High Energy Edit)',
      'High-Speed Digital Gallery Download'
    ],
    popular: false
  },
  {
    id: 'srv-3',
    title: 'Cinematic Pre-Wedding & Teaser Shoot',
    subtitle: 'Romantic pre-wedding story film shot at breathtaking scenic locations.',
    category: 'videography',
    price: '₹65,000',
    duration: 'Full Day Shoot',
    deliverables: [
      '2-3 Min Cinematic Concept Teaser Film',
      '50 Retouched High-Res Pre-Wedding Stills',
      'Drone Aerial Videography Included',
      'Professional Color Grading (Cinema LUTs)',
      'Licenced Cinematic Music Track'
    ]
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
  },
  {
    id: 'prf-2',
    clientName: 'Aarav Family',
    albumTitle: 'First Birthday Celebration',
    eventDate: '2026-04-01',
    passcode: 'AARAV2026',
    coverUrl: '/media/Photos/Birthday Shoots/001.JPG',
    photosCount: 4,
    selectedCount: 2,
    status: 'active',
    photos: [
      { id: 'bp1', url: '/media/Photos/Birthday Shoots/001.JPG', title: 'Royal Portrait', isSelected: true },
      { id: 'bp2', url: '/media/Photos/Birthday Shoots/005.JPG', title: 'Cake Cutting Smile', isSelected: true, clientComment: 'So cute!' },
      { id: 'bp3', url: '/media/Photos/Birthday Shoots/008.JPG', title: 'Cake Smash Fun', isSelected: false },
      { id: 'bp4', url: '/media/Photos/Birthday Shoots/010.JPG', title: 'Family Photo', isSelected: false }
    ]
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Pratik & Shruti Deshmukh',
    role: 'Bride & Groom (Mumbai Wedding)',
    quote: 'Swaroop Naik is truly a magician with the camera! Our wedding photos and cinema teaser look like a big budget Bollywood film. He captured every real emotion so naturally.',
    rating: 5,
    avatarUrl: '/media/Photos/Wedding/03.jpg',
    projectTag: 'Wedding Photography & Film'
  },
  {
    id: 't2',
    clientName: 'Sneha & Amit Patil',
    role: 'Parents (Aarav 1st Birthday)',
    quote: 'Swaroop took such wonderful photos of our son’s 1st birthday! He was incredibly patient with kids and delivered our photos and reel super fast. Highly recommended!',
    rating: 5,
    avatarUrl: '/media/Photos/Birthday Shoots/001.JPG',
    projectTag: 'Birthday Milestone Shoot'
  },
  {
    id: 't3',
    clientName: 'Komal & Gannesh',
    role: 'Pre-Wedding & Engagement',
    quote: 'The cinematic teaser video Swaroop created blew our mind! All our friends and family were amazed by the color grading and angles. Best photographer in town!',
    rating: 5,
    avatarUrl: '/media/Photos/Wedding/02.jpg',
    projectTag: 'Cinematic Teaser'
  }
];

// Helper functions for LocalStorage persistence with brand-new key version
const STORAGE_KEYS = {
  MEDIA: 'swaroop_media_items_v3',
  INQUIRIES: 'swaroop_inquiries_v3',
  SERVICES: 'swaroop_services_v3',
  PROOFING: 'swaroop_proofing_v3',
  TESTIMONIALS: 'swaroop_testimonials_v3',
  SETTINGS: 'swaroop_settings_v3',
  ADMIN_AUTH: 'swaroop_admin_logged_in_v3'
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

export const resetToDefaults = () => {
  localStorage.clear();
  window.location.reload();
};
