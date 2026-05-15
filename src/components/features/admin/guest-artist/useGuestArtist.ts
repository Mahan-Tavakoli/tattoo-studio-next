import {
  deleteGuestArtistApi,
  getGuestArtistByIdApi,
  getGuestArtistsApi,
} from "@/components/services/guestArtistService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useGuestArtist() {
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
        toast.success(`Guest artist ${data.name} deleted successfully!`);

        router.push("/admin/guest-artist");
      },

      onError: () => {
        toast.error("Deleting guest artist failed, try again later");
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
  };
}
