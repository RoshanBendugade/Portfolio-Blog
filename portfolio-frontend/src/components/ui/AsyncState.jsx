
import { AlertCircle, FolderOpen, RefreshCw } from "lucide-react";

function AsyncState({
  loading,
  error,
  isEmpty,
  onRetry,
  emptyTitle = "Nothing here yet",
  emptyDescription = "Content will appear here once it becomes available.",
  children,
}) {
  if (loading) {
    return (
      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        aria-label="Loading content"
        aria-busy="true"
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm border border-gray-200 dark:border-slate-800 animate-pulse"
          >
            <div className="h-48 bg-gray-200 dark:bg-slate-800" />

            <div className="p-6 space-y-4">
              <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-slate-800" />
              <div className="h-6 w-4/5 rounded bg-gray-200 dark:bg-slate-800" />
              <div className="h-3 w-full rounded bg-gray-200 dark:bg-slate-800" />
              <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-slate-800" />
              <div className="h-9 w-1/3 rounded bg-gray-200 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center text-center py-12 px-6 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20"
      >
        <AlertCircle
          size={42}
          className="text-red-500 mb-4"
        />

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Something went wrong
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
          {error}
        </p>

        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
        >
          <RefreshCw size={17} />
          Try Again
        </button>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center text-center py-14 px-6 rounded-2xl border border-dashed border-gray-300 dark:border-slate-700">
        <div className="p-4 rounded-full bg-gray-100 dark:bg-slate-800 mb-4">
          <FolderOpen
            size={36}
            className="text-gray-500 dark:text-gray-400"
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {emptyTitle}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return children;
}

export default AsyncState;
