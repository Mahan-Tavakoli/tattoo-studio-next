import ArticlesList from "@/components/features/article/ArticlesList";
import getArticlesApi from "@/components/services/articleService";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

async function ArticlesPage() {
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ["articles"],
    queryFn: getArticlesApi,
  });

  if (!data.items) {
    notFound();
  }

  return (
    <section className="py-16 px-[5%]">
      <div className="container mx-auto py-15">
        <h1 className="text-3xl font-bold mb-10 md:text-4xl tracking-tight">
          Articles
        </h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ArticlesList />
        </HydrationBoundary>
      </div>
    </section>
  );
}

export default ArticlesPage;
