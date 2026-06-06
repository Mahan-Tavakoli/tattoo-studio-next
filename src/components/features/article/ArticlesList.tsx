"use client";

import Link from "next/link";
import useArticle from "./useArticle";
import BlurImage from "@/components/templates/skeleton/BlurImage";
import formattedDate from "@/components/utils/formatter";
import { useTranslations } from "next-intl";
import useLocalizedField from "@/components/hook/useLocalizedField";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ArticleListSkeleton from "@/components/templates/skeleton/skeletons/article/ArticleListSkeleton";

function ArticlesList() {
  const t = useTranslations("articles.articlesList");
  const localizedField = useLocalizedField();
  const { articles, articlesIsLoading, articlesIsError } = useArticle();

  useEffect(() => {
    if (articlesIsError) {
      toast.error(t("error"));
    }
  }, [articlesIsError, t]);

  if (articlesIsError)
    return (
      <div className="container">
        <p className="text-red-500">{t("error")}</p>
      </div>
    );

  const skeletons = Array.from({ length: 8 });

  if (articlesIsLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {skeletons.map((_, index) => (
          <ArticleListSkeleton key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
      {articles.map((article) => (
        <Link
          href={`/articles/${article.slug}`}
          key={article.id}
          className="group relative overflow-hidden rounded-2xl aspect-3/4 border border-snow/20 bg-onyx transition-all duration-500 shadow shadow-alabaster/20 hover:shadow-md"
        >
          {/* IMAGE */}
          <BlurImage
            src={article.coverUrl}
            alt={String(localizedField(article, "title"))}
            fill
            preload
            blurDataURL="/images/placeholder.png"
            className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-sm grayscale"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20 opacity-80 group-hover:opacity-95 transition duration-500" />

          {/* TOP META */}
          <div className="absolute top-0 left-0 w-full p-4 z-20 text-right">
            <span className="bg-onyx backdrop-blur-md border border-snow/20 text-xs px-3 py-1 rounded-lg">
              {article.publishedAt
                ? formattedDate(article.publishedAt)
                : t("noDate")}
            </span>
          </div>

          {/* CONTENT */}
          {/* CONTENT */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
            <div className="transform transition-all duration-500 group-hover:-translate-y-10">
              {/* TITLE */}
              <h2 className="text-2xl font-bold leading-tight line-clamp-2 mb-0 group-hover:mb-4 transition-all duration-500">
                {String(localizedField(article, "title"))}
              </h2>

              {/* EXCERPT */}
              <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                <p className="text-sm text-snow/70 leading-relaxed line-clamp-4">
                  {String(localizedField(article, "excerpt"))}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                  <span className="underline underline-offset-6">
                    {t("readArticle")}
                  </span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ArticlesList;
