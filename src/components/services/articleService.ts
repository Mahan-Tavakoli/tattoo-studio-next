import { AxiosResponse } from "axios";
import {
  ArticleFormDataProps,
  ArticleInfo,
  ArticlesResponse,
} from "../schema & types/article/article.types";
import http from "./httpService";

interface EditArticleArgs {
  articleId: string;
  newArticle: FormData | object;
}

// get public (published) articles
export default function getArticlesApi(): Promise<ArticlesResponse> {
  return http
    .get("/public/articles")
    .then(({ data }: AxiosResponse<ArticlesResponse>) => data);
}

// get article by slug
export function getArticleBySlugApi(slug: string): Promise<ArticleInfo> {
  return http
    .get(`/public/articles/${slug}`)
    .then(({ data }: AxiosResponse<ArticleInfo>) => data);
}

// get all articles (published & draft)
export function getAllArticlesApi(): Promise<ArticlesResponse> {
  return http
    .get("/admin/articles")
    .then(({ data }: AxiosResponse<ArticlesResponse>) => data);
}

// create new article
export function createNewArticleApi(
  newArticle: FormData,
): Promise<ArticleFormDataProps> {
  return http
    .post("/admin/articles", newArticle, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }: AxiosResponse<ArticleFormDataProps>) => data);
}

// get article by id
export function getArticleByIdApi(articleId: string): Promise<ArticleInfo> {
  return http
    .get(`/admin/articles/${articleId}`)
    .then(({ data }: AxiosResponse<ArticleInfo>) => data);
}

// delete article
export function deleteArticleApi(articelId: string): Promise<ArticleInfo> {
  return http
    .delete(`/admin/articles/${articelId}`)
    .then(({ data }: AxiosResponse<ArticleInfo>) => data);
}

// edit article
export function editArticleApi({
  articleId,
  newArticle,
}: EditArticleArgs): Promise<ArticleFormDataProps> {
  const isFormData =
    typeof FormData !== "undefined" && newArticle instanceof FormData;

  return http
    .patch(`/admin/articles/${articleId}`, newArticle, {
      headers:
        isFormData && newArticle.has("cover")
          ? {
              "Content-Type": "multipart/form-data",
            }
          : undefined,
    })
    .then(({ data }: AxiosResponse<ArticleFormDataProps>) => data);
}
