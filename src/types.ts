export interface PricingTier {
  hourly: number;
  hourlyHours: number;
  overnight: number;
}

export type AmenityKey = 'solar' | 'wifi' | 'hot_water' | 'tv' | 'kitchen' | 'parking' | 'hot_tub';

export type LocationHub = 'The Avenues' | 'Harare CBD';

export interface SuiteImage {
  src: string;
  orientation: 'portrait' | 'landscape';
}

export interface Suite {
  id: number;
  title: string;
  location: LocationHub;
  description: string;
  images: SuiteImage[];
  pricing: PricingTier;
  amenities: AmenityKey[];
  tags: string[];
  capacity: number;
}

export type FilterMode = 'all' | 'avenues' | 'cbd';

export type StayType = 'hourly' | 'overnight';

export interface BookingForm {
  suite: Suite | null;
  stayType: StayType;
  checkInDate: string;
  guestCount: number;
  guestName: string;
  contactNumber: string;
}

export interface ValidationErrors {
  guestName?: string;
  contactNumber?: string;
  checkInDate?: string;
  suite?: string;
}
