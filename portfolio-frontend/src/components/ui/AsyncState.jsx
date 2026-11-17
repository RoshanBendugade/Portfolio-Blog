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
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Loading content"
        aria-busy="true"
      >
        {[1, 2, 3].map((item) => (
          <div key={item} className="bento animate-pulse overflow-hidden">
            <div className="h-44 bg-[var(--soft)]" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-3/5 rounded bg-[var(--soft)]" />
              <div className="h-3 w-full rounded bg-[var(--soft)]" />
              <div className="h-3 w-4/5 rounded bg-[var(--soft)]" />
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
        className="bento flex flex-col items-center px-6 py-12 text-center"
      >
        <AlertCircle size={36} className="text-red-500" />

        <h3 className="mt-4 text-lg font-semibold">Something went wrong</h3>

        <p className="mt-2 max-w-md text-muted">{error}</p>

        <button onClick={onRetry} className="btn btn-primary mt-6">
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="bento flex flex-col items-center border-dashed px-6 py-12 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--soft)] text-accent">
          <FolderOpen size={26} />
        </div>

        <h3 className="mt-4 text-lg font-semibold">{emptyTitle}</h3>

        <p className="mt-2 max-w-md text-muted">{emptyDescription}</p>
      </div>
    );
  }

  return children;
}

export default AsyncState;