"use client";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-5 lg:space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[132px] animate-pulse rounded-[14px] bg-[#e8ebf0]"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:gap-6">
        <div className="h-[430px] animate-pulse rounded-[14px] bg-[#e8ebf0]" />

        <div className="h-[430px] animate-pulse rounded-[14px] bg-[#e8ebf0]" />
      </div>
    </div>
  );
}