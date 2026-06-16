import getAppointmentApi, {
  checkInBookingApi,
} from "@/components/services/appointmentService";
import { formatDate } from "@/components/utils/formatter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { useParams } from "next/navigation";

interface UseAppointmentProps {
  date?: Date;
  period?: string;
  timezone?: string;
}

export default function useAppointment({
  date = new Date(),
  period = "day",
  timezone = "Europe/Berlin",
}: UseAppointmentProps = {}) {
  const queryClient = useQueryClient();
  const params = useParams();
  const formattedDate = useMemo(() => formatDate(date), [date]);

  const bookingId = typeof params?.id === "string" ? params.id : "";

  const {
    data: appointments,
    isLoading: appointmentsIsLoading,
    isError: appointmentsIsError,
  } = useQuery({
    queryKey: ["appointments", formattedDate, period, timezone],
    queryFn: () => getAppointmentApi({ date: formattedDate, period, timezone }),
  });

  // check in booking
  const { isPending: checkInBookingIsPending, mutate: checkInBooking } =
    useMutation({
      mutationFn: checkInBookingApi,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["single-booking", bookingId],
        });
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
        queryClient.invalidateQueries({ queryKey: ["appointments"] });

        //toast.success(t("toast.clientCheckedIn"));
        toast.success("success");
      },

      onError: () => {
        //toast.error(t("toast.clientCheckInFailed"));
        toast.error("error");
      },
    });

  return {
    // get appointments
    appointments,
    appointmentsIsLoading,
    appointmentsIsError,

    // check in
    checkInBooking,
    checkInBookingIsPending,
  };
}
