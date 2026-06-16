import { AxiosResponse } from "axios";
import { AppointmentResponse } from "../schema & types/appointment/appointment.types";
import http from "./httpService";

interface AppointmentArgs {
  date: string;
  period: string;
  timezone: string
}

export default function getAppointmentApi({
  date,
  period,
  timezone
}: AppointmentArgs): Promise<AppointmentResponse> {
  return http
    .get("/admin/appointments", {
      params: {
        date,
        period,
        timezone
      },
    })
    .then(({ data }: AxiosResponse<AppointmentResponse>) => data);
}

// check-in
export function checkInBookingApi(bookingId: string) {
  return http
    .post(`/admin/booking-requests/${bookingId}/check-in`)
    .then(({ data }) => data);
}