"use client";

import { useEffect, useMemo, useState } from "react";
import useArticle from "../../article/useArticle";
import { toast } from "react-toastify";
import StatusBadge from "@/components/templates/admin/StatusBadge";
import { articleStatusStyles } from "@/components/templates/admin/article/articleStatusStules";
import formattedDate from "@/components/utils/formatter";
import Link from "next/link";
import { CiCalendar, CiClock2, CiEdit, CiTrash } from "react-icons/ci";
import { HiOutlineDocumentText, HiOutlineTag } from "react-icons/hi";
import Image from "next/image";
import { BsArrowLeft } from "react-icons/bs";
import Modal from "@/components/ui/Modal";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import { useTranslations } from "next-intl";

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

function ArticleDetails() {
  const t = useTranslations("admin.article.details");
  const {
    articleData,
    singleArticleDataIsLoading,
    singleArticleDataIsError,
    deleteArticle,
    deleteArticleIsPending,
  } = useArticle();

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const article = articleData;

  /* -------------------------------------------------------------------------- */
  /*                                  METRICS                                   */
  /* -------------------------------------------------------------------------- */

  const wordCount = useMemo(() => {
    if (!article?.content) return 0;

    return article.content.trim().split(/\s+/).length;
  }, [article]);

  const readingTime = useMemo(() => {
    return Math.ceil(wordCount / 200);
  }, [wordCount]);

  /* -------------------------------------------------------------------------- */
  /*                               LOADING STATE                                */
  /* -------------------------------------------------------------------------- */

  if (singleArticleDataIsLoading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-8 w-80 rounded bg-onyx" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-onyx" />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 h-175 rounded-2xl bg-onyx" />

          <div className="h-175 rounded-2xl bg-onyx" />
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                ERROR STATE                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (singleArticleDataIsError) {
      toast.error(t("loadError"));
    }
  }, [singleArticleDataIsError, t]);

  if (singleArticleDataIsError || !article) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p>{t("loadErrorDescription")}</p>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        {/* ------------------------------------------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------------------------------------------ */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-semibold">
                {article.title}
              </h1>

              <StatusBadge
                status={article.status}
                styles={articleStatusStyles}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-snow/60">
              <span>/{article.slug}</span>

              <span>•</span>

              <span>
                {t("published")}
                {article.publishedAt ? formattedDate(article.publishedAt) : "-"}
              </span>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-3">
            <Link
              href={`/admin/article/edit/${article.id}`}
              className="btn flex items-center gap-x-2 text-sm"
            >
              <span>{t("edit")}</span>

              <CiEdit className="size-5" />
            </Link>

            <button
              className="btn bg-red-950 hover:bg-red-900 text-sm flex items-center gap-x-2"
              onClick={() => setIsDeleteOpen(true)}
            >
              <span>{t("edit")}</span>

              <CiTrash className="size-5" />
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* METRICS */}
        {/* ------------------------------------------------------------------ */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard
            icon={<CiClock2 className="size-6" />}
            label={t("readingTime")}
            value={`${readingTime} ${t("minutes")}`}
          />

          <MetricCard
            icon={<HiOutlineDocumentText className="size-6" />}
            label={t("words")}
            value={`${wordCount}`}
          />

          <MetricCard
            icon={<HiOutlineTag className="size-6" />}
            label={t("tags")}
            value={`${article.tags?.length || 0}`}
          />

          <MetricCard
            icon={<CiCalendar className="size-6" />}
            label={t("published")}
            value={
              article.publishedAt ? formattedDate(article.publishedAt) : "-"
            }
          />
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* CONTENT */}
        {/* ------------------------------------------------------------------ */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT SIDE */}

          <div className="xl:col-span-2 space-y-6">
            {/* COVER IMAGE */}

            <Card title={t("coverImage")}>
              <div className="relative w-full h-100 overflow-hidden rounded-2xl">
                <Image
                  src={article.coverUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>

            {/* EXCERPT */}

            <Card title={t("coverImage")}>
              <p className="leading-8 text-snow/70">{article.excerpt}</p>
            </Card>

            {/* CONTENT */}

            <Card title={t("articleContent")}>
              <div className="space-y-5 text-snow/80 leading-8 whitespace-pre-line">
                {article.content}
              </div>
            </Card>
          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-6">
            {/* ARTICLE INFO */}

            <Card title={t("articleInformation")}>
              <Info
                label={t("author")}
                value={article.author?.displayName || t("admin")}
              />

              {/* <Info label="Slug" value={article.slug} /> */}

              <Info
                label={t("status")}
                value={
                  <StatusBadge
                    status={article.status}
                    styles={articleStatusStyles}
                  />
                }
              />

              <Info
                label={t("publishedAt")}
                value={
                  article.publishedAt ? formattedDate(article.publishedAt) : "-"
                }
              />

              {/* <Info label="Article ID" value={article.id} /> */}
            </Card>

            {/* TAGS */}

            <Card title={t("tags")}>
              <div className="flex flex-wrap gap-2">
                {article.tags?.length > 0 ? (
                  article.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-carbon-black border border-snow/10 text-sm"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <p className="text-snow/50 text-sm">{t("noTags")}</p>
                )}
              </div>
            </Card>

            {/* TIMELINE */}

            <Card title={t("timeline")}>
              <div className="space-y-5">
                <TimelineItem
                  label={t("createdAt")}
                  value={formattedDate(article.createdAt)}
                />

                <TimelineItem
                  label={t("updatedAt")}
                  value={formattedDate(article.updatedAt)}
                />

                <TimelineItem
                  label={t("publishedAt")}
                  value={
                    article.publishedAt
                      ? formattedDate(article.publishedAt)
                      : "-"
                  }
                />
              </div>
            </Card>

            {/* QUICK SUMMARY */}

            <Card title={t("summary")}>
              <div className="rounded-2xl bg-carbon-black p-5 space-y-5">
                <div>
                  <p className="text-sm text-snow/50 mb-1">
                    {t("readingTime")}
                  </p>

                  <p className="text-3xl font-semibold">
                    {readingTime} {t("minutes")}
                  </p>
                </div>

                <div className="border-t border-snow/10 pt-4 flex items-center justify-between">
                  <span className="text-snow/50 text-sm">{t("words")}</span>

                  <span className="font-medium">{wordCount}</span>
                </div>

                <div className="border-t border-snow/10 pt-4 flex items-center justify-between">
                  <span className="text-snow/50 text-sm">{t("tags")}</span>

                  <span className="font-medium">
                    {article.tags?.length || 0}
                  </span>
                </div>

                <div className="border-t border-snow/10 pt-4 flex items-center justify-between">
                  <span className="text-snow/50 text-sm">{t("status")}</span>

                  <StatusBadge
                    status={article.status}
                    styles={articleStatusStyles}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BACK BUTTON */}
        {/* ------------------------------------------------------------------ */}

        <div>
          <Link href="/admin/article" className="btn text-sm">
            <BsArrowLeft className="size-5" />
            {t("backToArticles")}
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* DELETE MODAL */}
      {/* ------------------------------------------------------------------ */}

      {isDeleteOpen && (
        <Modal
          onClose={() => setIsDeleteOpen(false)}
          title={t("deleteArticle")}
        >
          <ConfirmDelete
            resourceName={`Article ${article.title}`}
            disabled={deleteArticleIsPending}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={() => {
              deleteArticle(article.id, {
                onSuccess: () => {
                  setIsDeleteOpen(false);
                },
              });
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default ArticleDetails;

/* -------------------------------------------------------------------------- */
/*                               HELPER COMPONENTS                            */
/* -------------------------------------------------------------------------- */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-onyx rounded-2xl p-5 shadow-sm border border-snow/5">
      <h2 className="text-lg font-semibold mb-5">{title}</h2>

      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-snow/10 pb-3">
      <span className="text-sm text-snow/50">{label}</span>

      <span className="text-sm font-medium text-right break-all">
        {value || "-"}
      </span>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-onyx rounded-2xl p-5 border border-snow/5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-snow/50 text-sm">{label}</span>

        <div className="text-snow/60">{icon}</div>
      </div>

      <h3 className="text-2xl font-semibold mt-4">{value}</h3>
    </div>
  );
}

function TimelineItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="border-l border-snow/10 pl-4">
      <p className="text-xs uppercase tracking-wide text-snow/40 mb-1">
        {label}
      </p>

      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
