import ArtistsList from "@/components/features/artist/ArtistsList";
import { getArtistsLookbookApi } from "@/components/services/artistService";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

async function TattooArtists() {
  const t = await getTranslations("artists");
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ["artists-lookbook"],
    queryFn: getArtistsLookbookApi,
  });

  if (!data.items) {
    notFound();
  }

  return (
    <section className="py-16 px-[5%]">
      <div className="container mx-auto py-15">
        <h1 className="text-3xl font-bold mb-10 md:text-4xl tracking-tight">
          {t("title")}
        </h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ArtistsList />
        </HydrationBoundary>
      </div>
    </section>
  );
}

export default TattooArtists;
