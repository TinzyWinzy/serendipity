import type { Suite, AmenityKey } from './types';

const img = (dir: string, file: string, w: number, h: number) => ({
  src: `/images/${dir}/${file}`,
  orientation: (w > h ? 'landscape' : 'portrait') as 'portrait' | 'landscape',
});

export const SUITES: Suite[] = [
  {
    id: 1,
    title: 'Platinum Suite',
    location: 'The Avenues',
    description:
      'Our flagship suite — a luminous open-plan residence with curated furnishings, a private hot tub, and panoramic views across the Avenues district.',
    images: [
      img('platinum', '1.jpg', 810, 1014),
      img('platinum', '8.jpg', 960, 1200),
      img('platinum', '15.jpg', 960, 1200),
      img('platinum', '22.jpg', 714, 1080),
      img('platinum', '28.jpg', 1080, 714),
    ],
    pricing: { hourly: 25, hourlyHours: 3, overnight: 75 },
    amenities: ['solar', 'wifi', 'hot_water', 'tv', 'kitchen', 'parking', 'hot_tub'],
    tags: ['Signature', 'Private Hot Tub', 'Panoramic View'],
    capacity: 2,
  },
  {
    id: 2,
    title: 'Executive Suite',
    location: 'The Avenues',
    description:
      'Curated for the corporate traveller — a dedicated work station, biophilic interiors, and garden outlooks define this serene productivity-focused suite.',
    images: [
      img('executive', '2.jpg', 810, 1014),
      img('executive', '9.jpg', 648, 810),
      img('executive', '16.jpg', 960, 1200),
      img('executive', '23.jpg', 1080, 714),
      img('executive', '27.jpg', 714, 1080),
    ],
    pricing: { hourly: 25, hourlyHours: 3, overnight: 65 },
    amenities: ['solar', 'wifi', 'hot_water', 'tv', 'kitchen', 'parking'],
    tags: ['Corporate', 'Dedicated Workspace', 'Garden View'],
    capacity: 2,
  },
  {
    id: 3,
    title: 'Penthouse Suite',
    location: 'The Avenues',
    description:
      'Crowning the residence — this top-floor aerie features vaulted ceilings, a private terrace, and an uncompromising standard of fit and finish.',
    images: [
      img('penthouse', '3.jpg', 810, 1014),
      img('penthouse', '10.jpg', 756, 946),
      img('penthouse', '17.jpg', 960, 1200),
      img('penthouse', '24.jpg', 810, 1080),
      img('penthouse', '30.jpg', 1080, 714),
    ],
    pricing: { hourly: 25, hourlyHours: 3, overnight: 70 },
    amenities: ['solar', 'wifi', 'hot_water', 'tv', 'kitchen', 'parking'],
    tags: ['Top Floor', 'Private Terrace', 'Vaulted Ceilings'],
    capacity: 2,
  },
  {
    id: 4,
    title: 'Gold Suite',
    location: 'Harare CBD',
    description:
      'Central premium living with effortless access to Eastgate Market, fine dining, and the city pulse — finished in warm gold and bronze tones.',
    images: [
      img('gold', '4.jpg', 810, 1014),
      img('gold', '11.jpg', 960, 1200),
      img('gold', '19.jpg', 810, 1080),
      img('gold', '25.jpg', 1080, 714),
      img('gold', '31.jpg', 1080, 676),
    ],
    pricing: { hourly: 25, hourlyHours: 3, overnight: 70 },
    amenities: ['solar', 'wifi', 'hot_water', 'tv', 'kitchen', 'parking'],
    tags: ['Central', 'Premium', 'City Living'],
    capacity: 2,
  },
  {
    id: 5,
    title: 'Urban Loft',
    location: 'Harare CBD',
    description:
      'A chic industrial-contemporary loft with exposed finishes, mood lighting, and an intimate layout — engineered for short getaways and creative day rests.',
    images: [
      img('urban-loft', '5.jpg', 810, 1014),
      img('urban-loft', '13.jpg', 960, 1200),
      img('urban-loft', '21.jpg', 810, 1080),
      img('urban-loft', '20.jpg', 1080, 714),
      img('urban-loft', '32.jpg', 1080, 661),
    ],
    pricing: { hourly: 20, hourlyHours: 3, overnight: 55 },
    amenities: ['solar', 'wifi', 'hot_water', 'tv', 'kitchen', 'parking'],
    tags: ['Modern', 'Industrial', 'Budget-Friendly'],
    capacity: 2,
  },
  {
    id: 6,
    title: 'Signature Studio',
    location: 'Harare CBD',
    description:
      'An efficient, beautifully composed studio — maximising every square metre with thoughtful storage, a kitchenette, and a restful palette.',
    images: [
      img('signature-studio', '6.jpg', 810, 1014),
      img('signature-studio', '7.jpg', 810, 1014),
      img('signature-studio', '14.jpg', 960, 1200),
      img('signature-studio', '26.jpg', 810, 1080),
      img('signature-studio', '29.jpg', 1080, 714),
    ],
    pricing: { hourly: 20, hourlyHours: 3, overnight: 50 },
    amenities: ['solar', 'wifi', 'hot_water', 'tv', 'kitchen', 'parking'],
    tags: ['Studio', 'Compact', 'Kitchenette'],
    capacity: 2,
  },
];

export const AMENITY_LABELS: Record<AmenityKey, string> = {
  solar: '24/7 Solar Backup',
  wifi: 'Free High-Speed Wi-Fi',
  hot_water: 'Hot Water Showers',
  tv: 'Smart TV with DSTV',
  kitchen: 'Fully Equipped Kitchen',
  parking: 'Secure Gated Parking',
  hot_tub: 'Hot Tub Access',
};

export const LOCATION_HUBS = [
  { key: 'all' as const, label: 'All Suites' },
  { key: 'avenues' as const, label: 'The Avenues' },
  { key: 'cbd' as const, label: 'Harare CBD' },
];
