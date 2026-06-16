import { BookingInfo } from "../booking/booking-appointment.types";

export interface AppointmentInfo {
  eventType: string;
  scheduledFor: Date;
  booking: BookingInfo;
}

export interface AppointmentResponse {
  period: string;
  date: string;
  startDate: string;
  endDate: string;
  timezone: string;
  total: number;
  items: AppointmentInfo[];
}
