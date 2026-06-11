"use client";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | string)[] = [];

    const siblingCount = 1;

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    if (currentPage <= 3) {
      for (let i = 1; i <= Math.min(4, totalPages); i++) {
        pages.push(i);
      }

      if (totalPages > 5) {
        pages.push("...");
      }

      if (totalPages > 4) {
        pages.push(totalPages);
      }

      return pages;
    }

    if (currentPage >= totalPages - 2) {
      pages.push(1);

      if (totalPages > 5) {
        pages.push("...");
      }

      for (let i = Math.max(totalPages - 3, 2); i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);
    pages.push("...");

    for (let i = leftSibling; i <= rightSibling; i++) {
      pages.push(i);
    }

    pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-snow/10 bg-onyx transition hover:border-snow/30 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <BsChevronLeft />
      </button>

      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-snow/40">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(Number(page))}
            className={`h-10 min-w-10 rounded-xl border px-3 transition
              ${
                currentPage === page
                  ? "border-snow bg-snow text-onyx"
                  : "border-snow/10 bg-onyx hover:border-snow/30"
              }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-snow/10 bg-onyx transition hover:border-snow/30 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <BsChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
