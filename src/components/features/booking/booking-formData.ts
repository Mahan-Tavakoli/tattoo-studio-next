import {
  BookingAppointmentFormData,
  WalkInBookingFormData,
} from "@/components/schema & types/booking/booking-appointement.schema";
import { formatDate } from "@/components/utils/formatter";

export function walkInBookingFormData(data: WalkInBookingFormData): FormData {
  const formData = new FormData();
  formData.append("firstName", data.client.firstName);
  formData.append("lastName", data.client.lastName);
  formData.append("email", data.client.email || "");
  formData.append("phone", data.client.phone || "");
  formData.append("tattooDate", data.bookingRequest.tattooDate.toISOString());
  formData.append("artistId", data.bookingRequest.artistId);
  formData.append("budgetRange", data.bookingRequest.budgetRange);
  formData.append("description", data.bookingRequest.description);
  formData.append("placement", data.bookingRequest.placement || "");

  return formData;

  // const newBooking = {
  //   firstName: data.client.firstName,
  //   lastName: data.client.lastName,
  //   email: data.client.email,
  //   phone: data.client.phone,
  //   tattooDate: data.bookingRequest.tattooDate,
  //   artistId: data.bookingRequest.artistId,
  //   budgetRange: data.bookingRequest.budgetRange,
  //   description: data.bookingRequest.description,
  //   placement: data.bookingRequest.placement,
  // };
}

export function publicBookingFormData(
  data: BookingAppointmentFormData,
): FormData {
  const formData = new FormData();

  formData.append("firstName", data.client.firstName);
  formData.append("lastName", data.client.lastName);
  formData.append("email", data.client.email || "");
  formData.append("phone", data.client.phone || "");

  formData.append("description", data.bookingRequest.description);
  formData.append("placement", data.bookingRequest.placement || "");
  formData.append("consultDate", formatDate(data.bookingRequest.consultDate));

  formData.append("budgetRange", data.bookingRequest.budgetRange);

  formData.append("bookingType", data.bookingRequest.bookingType);

  data.bookingRequest.file.forEach((file) => {
    formData.append("images", file);
  });

  return formData;
}
