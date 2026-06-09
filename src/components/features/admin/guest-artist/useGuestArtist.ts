"use client";

import {
  deleteGuestArtistApi,
  editGuestArtistApi,
  getGuestArtistByIdApi,
  getGuestArtistsApi,
} from "@/components/services/guestArtistService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useGuestArtist() {
  const t = useTranslations("admin.guestArtists.toast");
  const queryClient = useQueryClient();
  const params = useParams();
  const router = useRouter();

  const guestArtistId = typeof params?.id === "string" ? params.id : "";

  const {
    data: guestArtistsData,
    isLoading: guestArtistsIsLoading,
    isError: guestArtistsIsError,
  } = useQuery({
    queryFn: getGuestArtistsApi,
    queryKey: ["guest-artists"],
  });

  const guestArtists = guestArtistsData?.items || [];

  const {
    data: singleGuestArtist,
    isLoading: singleGuestArtistIsLoading,
    isError: singleGuestArtistIsError,
  } = useQuery({
    queryKey: ["guest-artist", guestArtistId],
    queryFn: () => getGuestArtistByIdApi(guestArtistId),
    enabled: !!guestArtistId,
  });

  const { isPending: deleteGuestArtistIsPending, mutate: deleteGuestArtist } =
    useMutation({
      mutationFn: deleteGuestArtistApi,

      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["guest-artists"] });

        queryClient.invalidateQueries({
          queryKey: ["guest-artist", guestArtistId],
        });
        toast.success(
          t("deleted", {
            name: data.name,
          }),
        );

        router.push("/admin/guest-artist");
      },

      onError: () => {
        toast.error(t("deleteFailed"));
      },
    });

  const { isPending: editGuestArtistIsPending, mutate: editGuestArtist } =
    useMutation({
      mutationFn: editGuestArtistApi,

      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["guest-artists"] });

        queryClient.invalidateQueries({
          queryKey: ["guest-artist", guestArtistId],
        });
        toast.success(
          t("updated", {
            name: data.booking.name,
          }),
        );
      },

      onError: () => {
        toast.error(t("updateFailed"));
      },
    });

  return {
    guestArtists,
    guestArtistsIsLoading,
    guestArtistsIsError,

    singleGuestArtist,
    singleGuestArtistIsLoading,
    singleGuestArtistIsError,

    deleteGuestArtist,
    deleteGuestArtistIsPending,

    editGuestArtist,
    editGuestArtistIsPending,
  };
}
