"use client";

import { useEffect, useState } from "react";
import useArticle from "../../article/useArticle";
import { ArticleInfo } from "@/components/schema & types/article/article.types";
import { toast } from "react-toastify";
import Table from "@/components/ui/Table";
import ArticlesRow from "./ArticlesRow";
import { useTranslations } from "next-intl";

function ArticlesTable() {
  const t = useTranslations("admin.article.table");
  const { allArticles, allArticlesIsError, allArticlesIsLoading } =
    useArticle();
  console.log("allArticles =>", allArticles);
  const [articleToEdit, setArticleToEdit] = useState<ArticleInfo | null>(null);


  useEffect(() => {
  if (allArticlesIsError) {
    toast.error(t("loadingError"));
  }
}, [allArticlesIsError, t]);


  if (allArticlesIsError) {
    return (
      <div className="text-red-500 text-sm">
         {t("loadingErrorDescription")}
      </div>
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
            allArticles.map((article, index) => (
              <ArticlesRow
                key={article.id}
                article={article}
                //   index={(currentPage - 1) * 6 + index}
                index={index}
                onEdit={() => setArticleToEdit(article)}
              />
            ))
          )}
        </Table.Body>
      </Table>
      {/* <div className="flex justify-center mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              </div> */}
      {/* Edit Course */}
      {/* {articleToEdit && (
        <Modal
          title={`Edit ${articleToEdit.displayName}`}
          onClose={() => setArticleToEdit(null)}
        >
          <TattooArtistsForm
            articleToEdit={articleToEdit}
            onClose={() => setArticleToEdit(null)}
          />
        </Modal>
      )} */}
    </>
  );
}

export default ArticlesTable;
