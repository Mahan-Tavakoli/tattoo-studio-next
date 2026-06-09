"use client";

import {
  editStationConfigApi,
  getStationConfigApi,
} from "@/components/services/guestArtistService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export default function useStationConfig() {
  const t = useTranslations("admin.guestArtists.stationConfigForm.toast");
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
        toast.success(t("updated"));
      },

      onError: () => {
        toast.error(t("updateFailed"));
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
