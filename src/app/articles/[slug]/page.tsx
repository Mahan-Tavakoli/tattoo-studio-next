import ArticleDetails from "@/components/features/article/ArticleDetails";
import { getArticleBySlugApi } from "@/components/services/articleService";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const queryClient = new QueryClient();
  const { slug } = await params;

  const data = await queryClient.fetchQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlugApi(slug),
  });

  if (!data) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticleDetails />
    </HydrationBoundary>
  );
}

export default Article;
