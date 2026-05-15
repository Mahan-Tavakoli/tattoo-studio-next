import getGuestArtistTableAvailabilityApi, {
  guestArtistBookingTableApi,
} from "@/components/services/guestArtistService";
import { formatDate } from "@/components/utils/formatter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useGuestArtistBooking({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  const queryClient = useQueryClient();

  // Available Tables
  const {
    data,
    isLoading: tableAvailabilityIsLoading,
    isError: tableAvailabilityIsError,
  } = useQuery({
    queryKey: ["table-availability", startDate, endDate],
    queryFn: () =>
      getGuestArtistTableAvailabilityApi({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      }),
    enabled: !!startDate && !!endDate,
  });

  const tableAvailability = data?.days || [];
  const tablePricePerDay = data?.pricePerDay || Number(80);
  const monthlyDiscountPercent = data?.monthlyDiscountPercent || Number(10);

  // Guest Artist Booking
  const { isPending: guestArtistBookingIsPending, mutate: guestArtistBooking } =
    useMutation({
      mutationFn: guestArtistBookingTableApi,

      onSuccess: (data) => {
        console.log("guestArtistHookSuccessData =>", data);
        queryClient.invalidateQueries({
          queryKey: ["table-availability", "guest-artist-booking"],
        });
        if (data.stripePaymentUrl) {
          window.location.href = data.stripePaymentUrl;
        } else {
          toast.success("Booking submitted — awaiting payment.");
        }
      },

      onError: () => {
        toast.error("Something went wrong");
      },
    });

  return {
    tableAvailability,
    tablePricePerDay,
    monthlyDiscountPercent,
    tableAvailabilityIsLoading,
    tableAvailabilityIsError,
    guestArtistBooking,
    guestArtistBookingIsPending,
  };
}
