interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const showFirst = currentPage > 2;
  const showLast = currentPage < totalPages - 1;
  const showLeftDots = currentPage > 3;
  const showRightDots = currentPage < totalPages - 2;

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  if (currentPage === 1) {
    endPage = Math.min(totalPages, 3);
  } else if (currentPage === totalPages) {
    startPage = Math.max(1, totalPages - 2);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return (
    <div className="flex justify-center my-4 gap-2 items-center">
      {showFirst && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 border rounded cursor-pointer"
          >
            1
          </button>
          {showLeftDots && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded cursor-pointer ${
            page === currentPage ? "bg-blue-500 text-white" : ""
          }`}
        >
          {page}
        </button>
      ))}

      {showLast && (
        <>
          {showRightDots && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 border rounded cursor-pointer"
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
};
