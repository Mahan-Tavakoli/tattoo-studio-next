import { useMemo, useState } from "react";

function usePagination<T>(data: T[], itemsPerPage = 6) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
  };
}

export default usePagination;
