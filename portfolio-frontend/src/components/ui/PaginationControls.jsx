
function PaginationControls({
  page,
  totalPages,
  totalElements,
  size,
  onPageChange,
  onSizeChange,
  sort,
  onSortChange,
  sortOptions,
}) {
  const start = totalElements === 0 ? 0 : page * size + 1;
  const end = Math.min((page + 1) * size, totalElements);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-white border border-t-0 rounded-b-xl">

      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-800">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-800">
          {totalElements}
        </span>{" "}
        records
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">

        <select
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="border rounded-lg px-3 py-2 text-sm"
          aria-label="Records per page"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
          aria-label="Sort records"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          className="px-3 py-2 border rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Previous
        </button>

        <span className="text-sm font-medium whitespace-nowrap">
          Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={totalPages === 0 || page >= totalPages - 1}
          className="px-3 py-2 border rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Next
        </button>

      </div>
    </div>
  );
}

export default PaginationControls;
