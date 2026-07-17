import {
  BookingType,
  IntakeSources,
} from "../booking/booking-appointment.types";

export interface AnalyticsFilterForm {
  from: Date;
  to: Date;
  includeWalkIn: boolean;
}

export type OverviewAnalyticsStatus =
  | "approved"
  | "completed"
  | "cancelled"
  | "noShow";

export interface OverviewAnalyticsInfo {
  timezone: string;
  range: {
    startUtc: Date;
    endUtc: Date;
  };
  total: number;
  status: Record<OverviewAnalyticsStatus, number>;
  bySource: Partial<Record<IntakeSources, number>>;
  byBookingType: Partial<Record<BookingType, number>>;
}
