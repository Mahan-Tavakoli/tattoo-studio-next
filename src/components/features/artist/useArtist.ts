import {
  createNewArtistApi,
  editArtistApi,
  getAllArtistsApi,
  getArtistByIdApi,
  getArtistBySlugApi,
  getArtistsLookbookApi,
} from "@/components/services/artistService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function useArtist() {
  const t = useTranslations("artists.toast");
  const queryClient = useQueryClient();
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const artistId = typeof params?.id === "string" ? params.id : "";

  // get single public artist by slug
  const {
    isLoading: getArtistBySlugIsLoading,
    isError: getArtistBySlugIsError,
    data: singleArtistData,
  } = useQuery({
    queryKey: ["artist", slug],
    queryFn: () => getArtistBySlugApi(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5 /* 5min */,
  });

  const artistBySlug = singleArtistData?.artist || null;
  const artistWorks = singleArtistData?.works?.items || [];

  // Lookbook data

  const {
    isLoading: artistsLookbookIsLoading,
    isError: artistsLookbookIsError,
    data: lookbookData,
  } = useQuery({
    queryKey: ["artists-lookbook"],
    queryFn: getArtistsLookbookApi,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5 /* 5min */,
  });

  const artistsLookbookItems = lookbookData?.items || [];

  // get all artists
  const {
    data,
    isLoading: allArtistsIsLoading,
    isError: allArtistsIsError,
  } = useQuery({
    queryKey: ["artists"],
    queryFn: getAllArtistsApi,
    staleTime: 1000 * 60 * 5 /* 5min */,
  });

  const allArtists = data?.items || [];

  //create new artist
  const { isPending: createNewArtistIsPending, mutateAsync: createNewArtist } =
    useMutation({
      mutationFn: createNewArtistApi,

      onSuccess: (data) => {
        console.log("createNewArtistOnSuccessData =>", data);
        queryClient.invalidateQueries({ queryKey: ["artists"] });
        queryClient.invalidateQueries({ queryKey: ["artists-lookbook"] });
        toast.success(
          t("createSuccess", {
            name: data.displayName,
          }),
        );
      },
      onError: () => {
        toast.error(t("createFailed"));
      },
    });

  // edit artist
  const { isPending: editArtistIsPending, mutateAsync: editArtist } =
    useMutation({
      mutationFn: editArtistApi,

      onSuccess: (data) => {
        console.log("editArtistOnSuccessData =>", data);
        toast.success(
          t("editSuccess", {
            name: data.displayName,
          }),
        );
        queryClient.invalidateQueries({ queryKey: ["artists"] });
        queryClient.invalidateQueries({ queryKey: ["single-artist"] });
        queryClient.invalidateQueries({ queryKey: ["artists-lookbook"] });
      },

      onError: () => {
        toast.error(t("editFailed"));
      },
    });

  // edit artist status
  const { isPending: editArtistStatusIsPending, mutate: editArtistStatus } =
    useMutation({
      mutationFn: ({
        artistId,
        status,
      }: {
        artistId: string;
        status: string;
      }) => editArtistApi({ artistId, newArtist: { status } }),

      onSuccess: (data) => {
        console.log("editArtistStatusOnSuccessData =>", data);

        toast.success(
          data.status === "ACTIVE"
            ? t("statusActive", {
                name: data.displayName,
              })
            : t("statusInactive", {
                name: data.displayName,
              }),
        );
      },

      onError: () => {
        toast.error(t("statusFailed"));
      },
    });

  // artist by id
  const {
    data: singleArtistById,
    isLoading: singleArtistIsLoading,
    isError: singleArtistIsError,
  } = useQuery({
    queryKey: ["single-artist", artistId],
    queryFn: () => getArtistByIdApi(artistId),
    enabled: !!artistId,
  });

  const artistData = singleArtistById || null;
  const artistLookbookWorks = singleArtistById?.works || [];

  return {
    // Single public artist
    artistBySlug,
    artistWorks,
    getArtistBySlugIsError,
    getArtistBySlugIsLoading,

    // lookbook
    artistsLookbookIsLoading,
    artistsLookbookIsError,
    artistsLookbookItems,

    // get all artists
    allArtists,
    allArtistsIsLoading,
    allArtistsIsError,

    // create new artist
    createNewArtist,
    createNewArtistIsPending,

    // edit artist
    editArtist,
    editArtistIsPending,

    // edit artist status
    editArtistStatus,
    editArtistStatusIsPending,

    // single artist
    artistData,
    singleArtistIsLoading,
    singleArtistIsError,
    artistLookbookWorks,
  };
}
