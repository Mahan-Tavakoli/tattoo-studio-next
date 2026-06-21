import bookingAppointmentApi, {
  createTattooScheduleApi,
  getAllBookingsApi,
  getBookingByIdApi,
  updateBookingStatusApi,
  walkInBookingAppointmentApi,
  walkInBookingUploads,
} from "@/components/services/bookingService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function useBooking() {
  const queryClient = useQueryClient();
  const t = useTranslations("booking");
  const params = useParams();

  const bookingId = typeof params?.id === "string" ? params.id : "";

  // public booking
  const {
    isPending: bookingAppointmentIsPending,
    mutateAsync: bookingAppointment,
  } = useMutation({
    mutationFn: bookingAppointmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
      toast.success(t("toast.bookingSubmitted"));
    },
    onError: () => {
      toast.error(t("toast.bookingFailed"));
    },
  });

  // get all bookings
  const {
    data: allBookings,
    isLoading: bookingIsLoading,
    isError: bookingIsError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookingsApi,
  });

  const bookings = allBookings?.items || [];

  // get single booking by id
  const {
    data: singleBooking,
    isLoading: singleBookingIsLoading,
    isError: singleBookingIsError,
  } = useQuery({
    queryKey: ["single-booking", bookingId],
    queryFn: () => getBookingByIdApi(bookingId),
    enabled: !!bookingId,
  });

  // update booking status
  const {
    isPending: updateBookingStatusIsPending,
    mutate: updateBookingStatus,
  } = useMutation({
    mutationFn: updateBookingStatusApi,
    onSuccess: (data) => {
      console.log("onSuccessData =>", data);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({
        queryKey: ["single-booking", bookingId],
      });
      toast.success(t("toast.statusUpdated"));
    },
    onError: () => {
      toast.error(t("toast.statusUpdateFailed"));
    },
  });

  // create tattoo schedule
  const { isPending: scheduleTattooIsPending, mutate: scheduleTattoo } =
    useMutation({
      mutationFn: createTattooScheduleApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
        queryClient.invalidateQueries({
          queryKey: ["single-booking", bookingId],
        });
        toast.success(t("toast.tattooScheduled"));
      },
    });

  // walk-in booking
  const {
    isPending: WalkInAppointmentIsPending,
    mutateAsync: walkInAppointment,
  } = useMutation({
    mutationFn: walkInBookingAppointmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["single-booking", bookingId],
      });
      toast.success(t("toast.walkInRecorded"));
    },
    onError: () => {
      toast.error(t("toast.walkInFailed"));
    },
  });

  const {
    isPending: WalkInAppointmentImagesIsPending,
    mutateAsync: walkInAppointmentImages,
  } = useMutation({
    mutationFn: walkInBookingUploads,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["single-booking", bookingId],
      });
      toast.success(t("toast.imagesUploaded"));
    },

    onError: () => {
      toast.error(t("toast.imagesUploadFailed"));
    },
  });

  return {
    // public booking
    bookingAppointmentIsPending,
    bookingAppointment,

    // walk in booking
    walkInAppointment,
    WalkInAppointmentIsPending,
    walkInAppointmentImages,
    WalkInAppointmentImagesIsPending,

    // bookings
    bookings,
    bookingIsLoading,
    bookingIsError,

    // single booking
    singleBooking,
    singleBookingIsLoading,
    singleBookingIsError,

    // update booking status
    updateBookingStatus,
    updateBookingStatusIsPending,

    //  schedule tattoo
    scheduleTattoo,
    scheduleTattooIsPending,
  };
}
