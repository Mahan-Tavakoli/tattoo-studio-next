import { AxiosResponse } from "axios";
import http from "./httpService";
import {
  BookingAppointmentProps,
  BookingResponse,
  BookingStatusProps,
  SingleBookingResponse,
  TattooScheduledProps,
  WalkInResponseProps,
} from "@/components/schema & types/booking/booking-appointment.types";

// public booking
export default function bookingAppointmentApi(
  newBookingIntake: FormData,
): Promise<BookingAppointmentProps> {
  return http
    .post(
      "/public/booking-intake",
      newBookingIntake /* , {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    } */,
    )
    .then(({ data }: AxiosResponse<BookingAppointmentProps>) => data);
}

// walk-in booking
export function walkInBookingAppointmentApi(
  newWalkInBooking: FormData,
): Promise<WalkInResponseProps> {
  return http
    .post("/admin/bookings/walk-in", newWalkInBooking, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }: AxiosResponse<WalkInResponseProps>) => data);
}

// get all bookings
export function getAllBookingsApi(): Promise<BookingResponse> {
  return http
    .get("/admin/bookings")
    .then(({ data }: AxiosResponse<BookingResponse>) => data);
}

// get single booking
export function getBookingByIdApi(
  bookingId: string,
): Promise<SingleBookingResponse> {
  return http
    .get(`/admin/bookings/${bookingId}`)
    .then(({ data }: AxiosResponse<SingleBookingResponse>) => data);
}

// update booking status
export function updateBookingStatusApi({
  bookingId,
  newBookingStatus,
}: {
  bookingId: string;
  newBookingStatus: BookingStatusProps;
}): Promise<BookingStatusProps> {
  return http
    .patch(`/admin/bookings/${bookingId}/status`, newBookingStatus)
    .then(({ data }: AxiosResponse<BookingStatusProps>) => data);
}

// tattoo scheduled
export function createTattooScheduleApi({
  bookingId,
  newTattooSchedule,
}: {
  bookingId: string;
  newTattooSchedule: TattooScheduledProps;
}): Promise<TattooScheduledProps> {
  return http
    .post(`/admin/bookings/${bookingId}/schedule-tattoo`, newTattooSchedule)
    .then(({ data }: AxiosResponse<TattooScheduledProps>) => data);
}
