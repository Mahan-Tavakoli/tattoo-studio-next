import getConsultAvailabilityApi, {
  createNewConsultSlotApi,
  getConsultSlotsApi,
} from "@/components/services/consultSlotService";
import { formatMonth } from "@/components/utils/formatter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export default function useConsultSlot(month?: Date) {
  const t = useTranslations("admin.bookings.consultSlot.toast");
  const queryClient = useQueryClient();

  // public availability
  const {
    data: publicConsultAvailabilityData,
    isLoading: publicConsultAvailabilityIsLoading,
    isError: publicConsultAvailabilityIsError,
  } = useQuery({
    queryKey: ["public-consult", month],
    queryFn: () => getConsultAvailabilityApi(month ? formatMonth(month) : ""),
    enabled: !!month,
  });

  const publicConsultAvailability = publicConsultAvailabilityData;

  // create new consult slot
  const { isPending: createConsultSlotIsPending, mutate: createConsultSlot } =
    useMutation({
      mutationFn: createNewConsultSlotApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["consult-slots"],
        });
        queryClient.invalidateQueries({ queryKey: ["public-consult"] });

        toast.success(t("created"));
      },

      onError: () => {
        toast.error(t("createFailed"));
      },
    });

  // get consult slots
  const {
    data: consultSlotsData,
    isLoading: consultSlotsIsLoading,
    isError: consultSlotsIsError,
  } = useQuery({
    queryKey: ["consult-slots"],
    queryFn: getConsultSlotsApi,
  });

  const consultSlots = consultSlotsData || [];

  return {
    // public availability
    publicConsultAvailability,
    publicConsultAvailabilityIsLoading,
    publicConsultAvailabilityIsError,

    // create new consult slot
    createConsultSlot,
    createConsultSlotIsPending,

    // get consult slots
    consultSlots,
    consultSlotsIsLoading,
    consultSlotsIsError,
  };
}
