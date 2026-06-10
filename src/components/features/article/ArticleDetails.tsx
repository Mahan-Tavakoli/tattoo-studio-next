"use client";

import BlurImage from "@/components/templates/skeleton/BlurImage";
import formattedDate from "@/components/utils/formatter";
import useArticle from "./useArticle";
import ReactMarkdown from "react-markdown";
import { FaFacebook } from "react-icons/fa";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { Link2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "@/i18n/navigation";
import useLocalizedField from "@/components/hook/useLocalizedField";
import { useTranslations } from "next-intl";
import ArticleDetailsSkeleton from "@/components/templates/skeleton/skeletons/article/ArticleDetailsSkeleton";

function ArticleDetails() {
  const t = useTranslations("articles.details");
  const localizedField = useLocalizedField();
  const {
    singleArticleData,
    singleArticleIsLoading,
    singleArticleIsError,
    articles,
    articlesIsError,
    articlesIsLoading,
  } = useArticle();

  useEffect(() => {
    if (articlesIsError || singleArticleIsError) {
      toast.error(t("errorLoading"));
    }
  }, [articlesIsError, singleArticleIsError, t]);

  if (singleArticleIsLoading || articlesIsLoading) {
    return <ArticleDetailsSkeleton />;
  }

  if (singleArticleIsError || articlesIsError) {
    return (
      <div className="container">
        <p className="text-red-500">{t("errorLoading")}</p>
      </div>
    );
  }

  if (!singleArticleData) return null;

  const title = String(localizedField(singleArticleData, "title")) || "";

  const excerpt = String(localizedField(singleArticleData, "excerpt")) || "";

  const content = String(localizedField(singleArticleData, "content")) || "";

  const readingTime = Math.ceil(content.split(" ").length / 200);

  const shareTitle = title;

  const relatedArticles = articles
    .filter((article) => article.slug !== singleArticleData.slug)
    .slice(0, 4);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <article className="">
      {/* HERO */}
      <section className="relative h-[75vh] min-h-lvh md:h-[80vh] overflow-hidden">
        <BlurImage
          src={singleArticleData.coverUrl}
          alt={title}
          fill
          preload
          className="object-cover grayscale"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/20" />

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="container mx-auto px-[5%] pb-16">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full text-sm">
                  {singleArticleData.author?.displayName || t("admin")}
                </span>

                <span className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full text-sm">
                  {formattedDate(singleArticleData.publishedAt)}
                </span>

                <span className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full text-sm">
                  {readingTime} {t("minutesRead")}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                {title}
              </h1>

              <p className="text-lg md:text-xl text-white/75 max-w-3xl leading-relaxed">
                {excerpt}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="container mx-auto px-[5%] mt-20">
        <div className="relative max-w-7xl mx-auto flex gap-8 lg:gap-12">
          {/* SHARE RAIL */}
          {/* <div className="p-5 rounded-2xl bg-onyx/40 border border-snow/10 backdrop-blur-sm h-77">
            <span className="text-[10px] text-center text-snow/40 uppercase tracking-widest block mb-4 font-bold">
              Share
            </span>
            <aside className="flex">
              <div className="sticky top-32 left-0 flex flex-col gap-4 h-fit">
                <button
                  className="p-3 rounded-full bg-onyx border border-snow/10 hover:bg-snow hover:text-onyx transition"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                      "_blank",
                    )
                  }
                >
                  <FaFacebook size={18} />
                </button>

                <button
                  className="p-3 rounded-full bg-onyx border border-snow/10 hover:bg-snow hover:text-onyx transition"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl,
                      )}&text=${encodeURIComponent(shareTitle)}`,
                      "_blank",
                    )
                  }
                >
                  <BsTwitterX size={18} />
                </button>

                <button
                  className="p-3 rounded-full bg-onyx border border-snow/10 hover:bg-snow hover:text-onyx transition"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        shareUrl,
                      )}`,
                      "_blank",
                    )
                  }
                >
                  <BsLinkedin size={18} />
                </button>

                <button className="p-3 rounded-full bg-onyx border border-snow/10 hover:bg-snow hover:text-onyx transition">
                  <Link2
                    size={18}
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                    }}
                  />
                </button>
              </div>
            </aside>
          </div> */}
          {/* SHARE RAIL */}
          <aside className="hidden lg:flex w-24 justify-center shrink-0">
            <div className="sticky top-32 h-fit">
              <div className="p-5 rounded-2xl bg-onyx/40 border border-snow/10 backdrop-blur-sm">
                <span className="text-[10px] text-center text-snow/40 uppercase tracking-widest block mb-4 font-bold">
                  {t("share")}
                </span>

                <div className="flex flex-col gap-4">
                  <button
                    className="p-3 rounded-full bg-onyx border border-snow/10 hover:bg-snow hover:text-onyx transition"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          shareUrl,
                        )}`,
                        "_blank",
                      )
                    }
                  >
                    <FaFacebook size={18} />
                  </button>

                  <button
                    className="p-3 rounded-full bg-onyx border border-snow/10 hover:bg-snow hover:text-onyx transition"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          shareUrl,
                        )}&text=${encodeURIComponent(shareTitle)}`,
                        "_blank",
                      )
                    }
                  >
                    <BsTwitterX size={18} />
                  </button>

                  <button
                    className="p-3 rounded-full bg-onyx border border-snow/10 hover:bg-snow hover:text-onyx transition"
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          shareUrl,
                        )}`,
                        "_blank",
                      )
                    }
                  >
                    <BsLinkedin size={18} />
                  </button>

                  <button
                    className="p-3 rounded-full bg-onyx border border-snow/10 hover:bg-snow hover:text-onyx transition"
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                    }}
                  >
                    <Link2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* ARTICLE COLUMN */}
          <main className="flex-1 min-w-0">
            {/* CONTENT */}
            <div className="rounded-2xl border border-snow/10 bg-white/2 backdrop-blur-sm p-6 sm:p-8 lg:p-12">
              <div className="prose prose-invert prose-lg max-w-none prose-headings:text-snow prose-headings:font-bold prose-p:text-snow/80 prose-p:leading-8 prose-a:text-dried-mustard prose-blockquote:border-l-dried-mustard prose-blockquote:text-snow/60 prose-strong:text-snow prose-li:text-snow/80">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </div>

            {/* TAGS */}
            <div className="mt-8 p-5 rounded-2xl bg-onyx/40 border border-snow/10 backdrop-blur-sm">
              <span className="text-[10px] text-snow/40 uppercase tracking-widest block mb-4 font-bold">
                {t("tags")}
              </span>

              <div className="flex flex-wrap gap-3">
                {singleArticleData.tags.map((tag, index) => (
                  <button
                    key={`${tag}-${index}`}
                    type="button"
                    className="px-4 py-2 rounded-xl transition-all duration-200 bg-onyx text-snow hover:bg-snow hover:text-onyx font-light capitalize"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* CONTINUE READING */}
      <section className="container mx-auto px-[5%] mt-32 mb-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t("continueReading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {relatedArticles.map((article) => (
            <Link
              href={`/articles/${article.slug}`}
              key={article.id}
              className="group relative overflow-hidden rounded-2xl aspect-3/4 border border-snow/20 bg-onyx transition-all duration-500 shadow shadow-alabaster/20 hover:shadow-md"
            >
              {/* IMAGE */}
              <BlurImage
                src={article.coverUrl}
                alt={article.title}
                fill
                preload
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
                    {article.title}
                  </h2>

                  {/* EXCERPT */}
                  <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                    <p className="text-sm text-snow/70 leading-relaxed line-clamp-4">
                      {article.excerpt}
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
      </section>
      {/* MOBILE SHARE BAR */}
      <div className="lg:hidden fixed bottom-24 right-5 z-50">
        <button
          onClick={async () => {
            await navigator.share({
              title: shareTitle,
              url: shareUrl,
            });
          }}
          className="text-onyx shadow-2xl active:scale-95 transition-all group relative h-14 w-14 flex items-center justify-center rounded-full bg-dried-mustard border border-onyx/20 duration-300"
        >
          <Link2 size={22} />
        </button>
      </div>
    </article>
  );
}

export default ArticleDetails;
