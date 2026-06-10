import getArticlesApi, {
  createNewArticleApi,
  deleteArticleApi,
  editArticleApi,
  getAllArticlesApi,
  getArticleByIdApi,
  getArticleBySlugApi,
} from "@/components/services/articleService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useArticle() {
  const t = useTranslations("articles.toast");
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
        toast.success(
          t("deleted", {
            title: data.title,
          }),
        );

        router.push("/admin/articles");
      },

      onError: () => {
        toast.error(t("deleteFailed"));
      },
    });

  // create article
  const { mutateAsync: createArticle, isPending: createArticleIsPending } =
    useMutation({
      mutationFn: createNewArticleApi,

      onSuccess: () => {
        toast.success(t("created"));

        queryClient.invalidateQueries({
          queryKey: ["articles"],
        });

        queryClient.invalidateQueries({
          queryKey: ["all-articles"],
        });
      },

      onError: () => {
        toast.error(t("createFailed"));
      },
    });

      // edit article
      const { isPending: editArticleIsPending, mutateAsync: editArticle } =
        useMutation({
          mutationFn: editArticleApi,
    
          onSuccess: (data) => {
            console.log("editArtistOnSuccessData =>", data);
            toast.success(
              t("editSuccess", {
                name: data.title,
              }),
            );
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.invalidateQueries({ queryKey: ["all-articles"] });
          },
    
          onError: () => {
            toast.error(t("editFailed"));
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
    // edit article
    editArticle,
    editArticleIsPending
  };
}
