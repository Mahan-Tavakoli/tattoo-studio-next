import bookingAppointmentApi, {
  checkInBookingApi,
  createTattooScheduleApi,
  getAllBookingsApi,
  getBookingByIdApi,
  updateBookingStatusApi,
  walkInBookingAppointmentApi,
  walkInBookingUploads,
} from "@/components/services/bookingService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function useBooking() {
  const queryClient = useQueryClient();
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
      toast.success(
        "Booking request submitted! We'll contact you within 72 hours.",
      );
    },
    onError: () => {
      toast.error("Failed to submit booking. Please try again.");
    },
  });

  

  // get all bookings
  const {
    data: allBookings,
    isLoading: bookingIsLoading,
    isError: bookingIsError,
  } = useQuery({
    queryKey: ["booking"],
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
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      queryClient.invalidateQueries({ queryKey: ["single-booking"] });
      toast.success("Status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update status. Please try again");
    },
  });

  // create tattoo schedule
  const { isPending: scheduleTattooIsPending, mutate: scheduleTattoo } =
    useMutation({
      mutationFn: createTattooScheduleApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["booking"] });
        queryClient.invalidateQueries({ queryKey: ["single-booking"] });
        toast.success("Tattoo scheduled successfully");
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
        queryKey: ["booking"],
      });
      toast.success("Walk-In booking recorded successfully!");
    },
    onError: () => {
      toast.error("Failed to submit walk-in record. Please try again.");
    },
  });

  
    const {isPending: WalkInAppointmentImagesIsPending, mutateAsync: walkInAppointmentImages} = useMutation({
      mutationFn: walkInBookingUploads,

      onSuccess: () => {
        queryClient.invalidateQueries({
        queryKey: ["booking"],
      });

        toast.success("Images uploaded successfully!")
      },

      onError: () => {
        toast.error(
          "Failed to finalize references transmission.",
      );
      }
    })

    // check in booking
  const { isPending: checkInBookingIsPending, mutate: checkInBooking } =
    useMutation({
      mutationFn: checkInBookingApi,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["single-booking", bookingId],
        });
        queryClient.invalidateQueries({ queryKey: ["booking"] });
        toast.success("Client checked in");
      },

      onError: () => {
        toast.error(
          "There is problem for checking in the client, try again later",
        );
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
