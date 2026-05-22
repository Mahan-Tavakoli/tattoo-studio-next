import { AxiosResponse } from "axios";
import {
  ArticleFormDataProps,
  ArticleInfo,
  ArticlesResponse,
} from "../schema & types/article/article.types";
import http from "./httpService";

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
