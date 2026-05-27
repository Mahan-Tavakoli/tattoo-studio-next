import getArticlesApi, {
  createNewArticleApi,
  deleteArticleApi,
  getAllArticlesApi,
  getArticleByIdApi,
  getArticleBySlugApi,
} from "@/components/services/articleService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useArticle() {
  const queryClient = useQueryClient();
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const articleId = typeof params?.id === "string" ? params.id : "";

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

  // get all articles (published and draft)
  const {
    data: allArticlesData,
    isLoading: allArticlesIsLoading,
    isError: allArticlesIsError,
  } = useQuery({
    queryFn: getAllArticlesApi,
    queryKey: ["all-articles"],
  });

  const allArticles = allArticlesData?.items || [];

  // single article by id
  const {
    data: articleData,
    isLoading: singleArticleDataIsLoading,
    isError: singleArticleDataIsError,
  } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticleByIdApi(articleId),
    enabled: !!articleId,
  });

  // delete article
  const { isPending: deleteArticleIsPending, mutate: deleteArticle } =
    useMutation({
      mutationFn: deleteArticleApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["articles"] });

        queryClient.invalidateQueries({
          queryKey: ["article", articleId],
        });
        toast.success(`Article ${data.title} deleted successfully!`);

        router.push("/admin/articles");
      },

      onError: () => {
        toast.error("Deleting article failed, try again later");
      },
    });

  // create article
  const { mutateAsync: createArticle, isPending: createArticleIsPending } =
    useMutation({
      mutationFn: createNewArticleApi,

      onSuccess: () => {
        toast.success("Article created successfully");

        queryClient.invalidateQueries({
          queryKey: ["articles"],
        });

        queryClient.invalidateQueries({
          queryKey: ["all-articles"],
        });
      },

      onError: () => {
        toast.error("Creating article failed");
      },
    });

  return {
    // All artists
    articlesIsLoading,
    articlesIsError,
    articles,
    // single article by slug
    singleArticleIsLoading,
    singleArticleIsError,
    singleArticleData,
    // all articles (published and draft)
    allArticles,
    allArticlesIsLoading,
    allArticlesIsError,
    // single article by id
    articleData,
    singleArticleDataIsError,
    singleArticleDataIsLoading,
    // delete article
    deleteArticle,
    deleteArticleIsPending,
    // create article
    createArticle,
    createArticleIsPending,
  };
}
