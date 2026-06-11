"use client";

import { useEffect, useState } from "react";
import useArticle from "../../article/useArticle";
import { ArticleInfo } from "@/components/schema & types/article/article.types";
import { toast } from "react-toastify";
import Table from "@/components/ui/Table";
import ArticlesRow from "./ArticlesRow";
import { useTranslations } from "next-intl";
import Modal from "@/components/ui/Modal";
import ArticleForm from "./ArticleForm";
import useLocalizedField from "@/components/hook/useLocalizedField";
import usePagination from "@/components/hook/usePagination";
import Pagination from "@/components/templates/admin/Pagination";

function ArticlesTable() {
  const t = useTranslations("admin.article.table");
  const localizedField = useLocalizedField();
  const { allArticles, allArticlesIsError, allArticlesIsLoading } =
    useArticle();

  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(allArticles || []);

  const [articleToEdit, setArticleToEdit] = useState<ArticleInfo | null>(null);

  const title = String(localizedField(articleToEdit ?? {}, "title")) || "";

  useEffect(() => {
    if (allArticlesIsError) {
      toast.error(t("loadingError"));
    }
  }, [allArticlesIsError, t]);

  if (allArticlesIsError) {
    return (
      <div className="text-red-500 text-sm">{t("loadingErrorDescription")}</div>
    );
  }

  return (
    <>
      <Table>
        <Table.Header>
          <th className="py-2">{t("index")}</th>
          <th>{t("author")}</th>
          <th>{t("title")}</th>
          <th>{t("status")}</th>
          <th>{t("details")}</th>
          <th>{t("operation")}</th>
        </Table.Header>
        <Table.Body>
          {allArticlesIsLoading ? (
            [...Array(6)].map((_, i) => (
              <Table.Row key={i}>
                <td colSpan={9}>
                  <div className="h-10 bg-snow/10 animate-pulse rounded" />
                </td>
              </Table.Row>
            ))
          ) : allArticles?.length === 0 ? (
            <Table.Row>
              <td colSpan={4} className="py-4">
                {t("empty")}
              </td>
            </Table.Row>
          ) : (
            paginatedData.map((article, index) => (
              <ArticlesRow
                key={article.id}
                article={article}
                index={(currentPage - 1) * 6 + index + 1}
                onEdit={() => setArticleToEdit(article)}
              />
            ))
          )}
        </Table.Body>
      </Table>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
      />

      {/* Edit Course */}
      {articleToEdit && (
        <Modal
          title={`Edit ${title}`}
          onClose={() => setArticleToEdit(null)}
          large
        >
          <ArticleForm
            articleToEdit={articleToEdit}
            onClose={() => setArticleToEdit(null)}
          />
        </Modal>
      )}
    </>
  );
}

export default ArticlesTable;
