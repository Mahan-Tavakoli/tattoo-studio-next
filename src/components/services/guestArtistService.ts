import {
  GuestArtistBooking,
  GuestArtistBookingResponse,
  GuestArtistInfo,
  GuestArtistResponse,
  GuestArtistTableAvailability,
  GuestsArtistDateProps,
} from "../schema & types/guest-artist/guest-artist.types";
import { StationConfigResponse } from "../schema & types/station-config/station-config.types";
import http from "./httpService";
import { AxiosResponse } from "axios";

export default function getGuestArtistTableAvailabilityApi({
  startDate,
  endDate,
}: GuestsArtistDateProps): Promise<GuestArtistTableAvailability> {
  return http
    .get("/guest-bookings/availability", {
      params: {
        startDate,
        endDate,
      },
    })
    .then(({ data }: AxiosResponse<GuestArtistTableAvailability>) => data);
}

export function guestArtistBookingTableApi(
  newBookingTable: GuestArtistBooking,
): Promise<GuestArtistBookingResponse> {
  return http
    .post("/guest-bookings", newBookingTable)
    .then(({ data }: AxiosResponse<GuestArtistBookingResponse>) => data);
}

export function getStationConfigApi(): Promise<StationConfigResponse> {
  return http
    .get("/admin/station-config")
    .then(({ data }: AxiosResponse<StationConfigResponse>) => data);
}

export function editStationConfigApi(
  newStationConfig: StationConfigResponse,
): Promise<StationConfigResponse> {
  return http
    .patch(`/admin/station-config`, newStationConfig)
    .then(({ data }: AxiosResponse<StationConfigResponse>) => data);
}

export function getGuestArtistsApi(): Promise<GuestArtistResponse> {
  return http
    .get("/admin/guest-bookings")
    .then(({ data }: AxiosResponse<GuestArtistResponse>) => data);
}

export function getGuestArtistByIdApi(
  guestArtistId: string,
): Promise<GuestArtistInfo> {
  return http
    .get(`/admin/guest-bookings/${guestArtistId}`)
    .then(({ data }: AxiosResponse<GuestArtistInfo>) => data);
}

export function deleteGuestArtistApi(
  guestArtistId: string,
): Promise<GuestArtistInfo> {
  return http
    .delete(`/admin/guest-bookings/${guestArtistId}`)
    .then(({ data }: AxiosResponse<GuestArtistInfo>) => data);
}
