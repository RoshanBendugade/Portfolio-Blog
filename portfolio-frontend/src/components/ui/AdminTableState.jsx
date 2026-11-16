
import {
  AlertCircle,
  RefreshCw,
  Inbox,
} from "lucide-react";

function AdminTableState({
  loading,
  error,
  isEmpty,
  onRetry,
  columns = 5,
  emptyTitle = "No records found",
  emptyDescription = "There is nothing to display yet.",
  EmptyIcon = Inbox,
}) {
  // Loading state
  if (loading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <tr
            key={index}
            className="animate-pulse border-b"
          >
            {Array.from({ length: columns }).map(
              (_, colIndex) => (
                <td key={colIndex} className="p-4">
                  <div className="h-4 w-full max-w-[150px] rounded bg-gray-200" />
                </td>
              )
            )}
          </tr>
        ))}
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <tr>
        <td colSpan={columns} className="p-10">
          <div
            role="alert"
            className="flex flex-col items-center text-center"
          >
            <AlertCircle
              size={38}
              className="text-red-500 mb-3"
            />

            <h3 className="font-semibold text-gray-800 text-lg">
              Unable to load data
            </h3>

            <p className="text-gray-500 mt-2 max-w-md">
              {error}
            </p>

            <button
              type="button"
              onClick={onRetry}
              className="mt-4 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </td>
      </tr>
    );
  }

  // Empty state
  if (isEmpty) {
    return (
      <tr>
        <td colSpan={columns} className="p-12">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-orange-50 mb-4">
              <EmptyIcon
                size={36}
                className="text-orange-500"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              {emptyTitle}
            </h3>

            <p className="text-gray-500 mt-2 max-w-sm">
              {emptyDescription}
            </p>
          </div>
        </td>
      </tr>
    );
  }

  return null;
}

export default AdminTableState;
