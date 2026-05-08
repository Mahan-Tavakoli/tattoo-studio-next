import getArticlesApi, {
  getArticleBySlugApi,
} from "@/components/services/articleService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useArticle() {
  const params = useParams();
  const slug = params?.slug as string;

  // get all articles
  const {
    isLoading: articlesIsLoading,
    isError: articlesIsError,
    data: articlesData,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticlesApi,
  });

  const articles = articlesData?.items || [];

  // get single article by slug
  const {
    isLoading: singleArticleIsLoading,
    isError: singleArticleIsError,
    data: singleArticleData,
  } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlugApi(slug),
    enabled: !!slug,
  });

  return {
    // All artists
    articlesIsLoading,
    articlesIsError,
    articles,
    singleArticleIsLoading,
    singleArticleIsError,
    singleArticleData,
  };
}
