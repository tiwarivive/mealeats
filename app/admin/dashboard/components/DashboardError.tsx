"use client";

type DashboardErrorProps = {
  message: string;
  onRetry: () => void;
};

export default function DashboardError({
  message,
  onRetry,
}: DashboardErrorProps) {
  return (
    <div className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-red-700">
            Unable to load dashboard
          </p>

          <p className="mt-1 break-words text-sm text-red-600">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onRetry}
          className="w-fit shrink-0 rounded-full bg-white px-4 py-2 text-sm text-red-600 shadow-sm transition hover:bg-red-100"
        >
          Try again
        </button>
      </div>
    </div>
  );
}