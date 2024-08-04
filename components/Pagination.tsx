interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  total: number;
  limit: number;
}

export default function Pagination({
  page,
  setPage,
  total,
  limit,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`join-item btn btn-outline max-lg:btn-sm ${
            page === i ? "btn-active" : ""
          }`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex mt-4 w-full">
      <div className="join mx-auto">
        <button
          className="join-item btn btn-outline max-lg:btn-sm"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          className="join-item btn btn-outline max-lg:btn-sm"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          «
        </button>
        {renderPageNumbers()}
        {totalPages > 3 && (
          <div className="join-item dropdown dropdown-top">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-outline max-lg:btn-sm"
            >
              ...
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-fit max-h-64 border overflow-y-auto flex-nowrap"
            >
              {[...Array(Math.max(0, totalPages - 3))].map((_, i) => (
                <li key={i + 4}>
                  <a
                    onClick={() => setPage(i + 4)}
                    className="py-1 text-center"
                  >
                    {i + 4}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="join-item btn btn-outline max-lg:btn-sm"
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
