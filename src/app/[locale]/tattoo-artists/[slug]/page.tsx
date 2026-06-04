import ArtistDetailsView from "@/components/features/artist/ArtistDetailsView";
import { getArtistBySlugApi } from "@/components/services/artistService";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

async function Artist({ params }: { params: Promise<{ slug: string }> }) {
  const queryClient = new QueryClient();
  const { slug } = await params;

  const data = await queryClient.fetchQuery({
    queryKey: ["artist", slug],
    queryFn: () => getArtistBySlugApi(slug),
  });

  if (!data.artist) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtistDetailsView />
    </HydrationBoundary>
  );
}

export default Artist;
