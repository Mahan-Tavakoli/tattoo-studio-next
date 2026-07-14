export interface ClientInfoProps {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface BookingRequestProps {
  bookingType: string;
  consultDate: string;
  description: string;
  budgetRange: string;
  placement?: string;
  file: string[];
}

// export interface MedicalDeclarationProps {
//   hasAllergies: boolean;
//   hasSkinCondition: boolean;
//   isPregnantOrNursing: boolean;
//   hasHeartCondition: boolean;
//   hasDiabetes: boolean;
//   takesBloodThinners: boolean;
//   takesMedication: boolean;
//   otherNotes?: string;
// }

// export interface ConsentProps {
//   isAdultConfirmed: boolean;
//   termsAccepted: boolean;
//   privacyAccepted: boolean;
// }

export interface BookingAppointmentProps {
  client: ClientInfoProps;
  bookingRequest: BookingRequestProps;
  // medicalDeclaration: MedicalDeclarationProps;
  // consent: ConsentProps;
}

export interface BookingInfo {
  id: string;
  status: BookingStatus;
  clientId: string;
  placement: string;
  description: string;
  budgetRange: string;
  referrer: string;
  bookingType: string;
  consultDate: Date;
  consultSlotId: string;
  checkedInAt: Date | null;
  client: ClientInfoProps;
  approvedAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
}

export interface BookingResponse {
  total: number;
  page: number;
  limit: number;
  items: BookingInfo[];
}

export interface TattooSessions {
  id: string;
  bookingRequestId: string;
  artistId: string;
  stationId: null;
  scheduledDate: Date;
  durationNote: string;
  completedAt: Date | null;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  artist: {
    id: string;
    displayName: string;
  };
}

export interface BookingPayments {
  id: string;
  grossCents: number;
  currency: string;
  method: string;
  source: string;
  status: string;
  paidAt: Date;
  note: string;
}

export interface SingleBookingResponse extends BookingInfo {
  medicalDeclaration: null;
  consent: null;
  uploads: {
    bookingRequestId: string;
    id: string;
    secureUrl: string;
  }[];
  assignments: [];
  reviewedByAdmin: {
    id: string;
    email: string;
    displayName: string;
  };
  tattooSessions: TattooSessions[];
  agreedPriceCents: number | null;
  paidCents: number;
  remainingCents: number | null;
  fullyPaid: boolean;
  payments: BookingPayments[];
}

export const BOOKING_STATUS = [
  "PENDING_CONSULT",
  "CONSULT_APPROVED",
  "CONSULT_NO_SHOW",
  "TATTOO_SCHEDULED",
  "COMPLETED",
  "CANCELLED",
] as const;

export const BOOKING_STATUS_CANCEL_REASON = [
  "CLIENT_CANCELLED",
  "NO_SHOW",
  "STUDIO_CANCELLED",
  "OTHER",
] as const;

export type BookingStatusCancelReason =
  (typeof BOOKING_STATUS_CANCEL_REASON)[number];

export type BookingStatus = (typeof BOOKING_STATUS)[number];

export interface BookingStatusProps {
  status: BookingStatus;
  adminNotes?: string;
  internalStatusNote?: string;
  cancelReason?: BookingStatusCancelReason;
}

export interface TattooScheduledProps {
  scheduledDate: Date;
  artistId?: string;
  stationId?: string;
  durationNote: string;
  notes?: string;
  agreedPriceCents?: number;
}

export interface WalkInResponseProps {
  bookingId: string;
  uploadToken: string;
  clientId: string;
  tattooDate: Date;
  startsAt: string;
  endsAt: string;
  budgetRange: string;
}
export interface UploadFormInputs {
  images: File[];
}

export const INTAKE_SOURCES = [
  "DIRECT",
  "INSTAGRAM",
  "FACEBOOK",
  "GOOGLE",
  "TIKTOK",
  "OTHER",
] as const;

export type IntakeSources = (typeof INTAKE_SOURCES)[number];
