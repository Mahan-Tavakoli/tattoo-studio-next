import LookBookContent from "@/components/features/lookbook/LookbookContent";
import { getArtistsLookbookApi } from "@/components/services/artistService";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

async function LookBook() {
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
      <div className="container mx-auto">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <LookBookContent />
        </HydrationBoundary>
      </div>
    </section>
  );
}

export default LookBook;
