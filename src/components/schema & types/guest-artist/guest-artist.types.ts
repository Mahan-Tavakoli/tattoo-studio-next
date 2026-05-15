export interface GuestsArtistDateProps {
  startDate: string;
  endDate: string;
}

// Available Days and Tables

export interface GuestArtistDaysAvailability {
  date: string;
  totalTables: number;
  bookedTables: number;
  availableTables: number;
}

export interface GuestArtistTableAvailability {
  startDate: string;
  endDate: string;
  pricePerDay: number;
  monthlyDiscountPercent: number;
  days: GuestArtistDaysAvailability[];
}

// Guest Artist Booking

export interface GuestArtistBooking {
  name: string;
  phone: string;
  email: string;
  startDate: string;
  endDate: string;
  numberOfTables: number;
  acknowledgment: boolean;
}

export interface GuestArtistBookingResponse {
  booking: GuestArtistBooking;
  stripePaymentUrl: string;
}

// Admin

export interface GuestArtistInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  startDate: Date;
  endDate: Date;
  numberOfTables: number;
  totalPrice: number;
  discountApplied: number;
  acknowledgment: boolean;
  stripeSessionId: null;
  stripePaymentUrl: null;
  status: GuestArtistStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface GuestArtistResponse {
  total: number;
  items: GuestArtistInfo[];
}

export const GUEST_ARTIST_STATUS = [
  "PENDING_PAYMENT",
  "CONFIRMED",
  "NO_SHOW",
  "EXPIRED",
  "COMPLETED",
] as const;

export type GuestArtistStatus = (typeof GUEST_ARTIST_STATUS)[number];
