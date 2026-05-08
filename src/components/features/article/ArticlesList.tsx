"use client";

import Link from "next/link";
import useArticle from "./useArticle";
import Image from "next/image";
import BlurImage from "@/components/templates/skeleton/BlurImage";

function ArticlesList() {
  const { articles, articlesIsError, articlesIsLoading } = useArticle();
  console.log("articles =>", articles);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link
          href={`/articles/${article.slug}`}
          key={article.id}
          className="relative overflow-hidden rounded-2xl w-full aspect-3/4 bg-onyx transition-all duration-500 ease-in-out hover:z-10 group/card cursor-pointer hover:opacity-100! border border-snow/20 shadow shadow-alabaster/20 hover:shadow-md"
        >
          <BlurImage
            src={article.coverUrl}
            alt={article.title}
            fill
            preload
            blurDataURL="/images/placeholder.png"
            className="object-cover grayscale"
          />

          <div className="absolute bottom-0 px-3 py-2 backdrop-blur-lg w-full flex flex-col">
            <span className="font-bold text-lg">{article.title}</span>
            <span className="text-sm line-clamp-2">{article.excerpt}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ArticlesList;
