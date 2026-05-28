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
  client: ClientInfoProps;
}

export interface BookingResponse {
  total: number;
  page: number;
  limit: number;
  items: BookingInfo[];
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
  reviewedByAdmin: null;
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
}

export interface WalkInResponseProps {
  bookingId: string;
  uploadToken: string;
  clientId: string;
  tattooDate: Date;
}
export interface UploadFormInputs {
  images: File[];
}
