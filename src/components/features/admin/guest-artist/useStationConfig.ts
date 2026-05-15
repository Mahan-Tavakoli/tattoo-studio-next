import {
  editStationConfigApi,
  getStationConfigApi,
} from "@/components/services/guestArtistService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useStationConfig() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: stationConfigIsLoading,
    isError: stationConfigIsError,
  } = useQuery({
    queryFn: getStationConfigApi,
    queryKey: ["station-config"],
  });

  const stationConfig = data || [];

  const { isPending: editStationConfigIsPending, mutate: editStationConfig } =
    useMutation({
      mutationFn: editStationConfigApi,

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["station-config"] });
        toast.success("Station Config set successfully");
      },

      onError: () => {
        toast.error("Setting Station Config is failed, try again later!");
      },
    });

  return {
    stationConfig,
    stationConfigIsError,
    stationConfigIsLoading,

    editStationConfig,
    editStationConfigIsPending,
  };
}
