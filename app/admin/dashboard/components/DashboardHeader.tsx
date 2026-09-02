"use client";

import { RefreshCw } from "lucide-react";

type DashboardHeaderProps = {
  loading: boolean;
  onRefresh: () => void;
};

export default function DashboardHeader({
  loading,
  onRefresh,
}: DashboardHeaderProps) {
  return (
    <header
      className="
        mb-5
        flex
        min-w-0
        flex-col
        gap-4
        sm:mb-6
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* Header Content */}
      <div className="min-w-0 flex-1">
        <h1
          className="
            !mb-0
            !text-[26px]
            !font-medium
            !leading-tight
            tracking-[-0.02em]
            !text-[#07152f]
            sm:!text-[27px]
            lg:!text-[28px]
          "
        >
          Dashboard
        </h1>

        <p
          className="
            !mb-0
            mt-1
            break-words
            !text-[12px]
            !font-normal
            !leading-5
            !text-[#718096]
            sm:!text-[13px]
            lg:!text-[14px]
          "
        >
          Overview of your form submissions and AI activity.
        </p>
      </div>

      {/* Refresh Button */}
      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        aria-label={loading ? "Refreshing dashboard" : "Refresh dashboard"}
        className="
          inline-flex
          h-[38px]
          w-full
          shrink-0
          items-center
          justify-center
          gap-2
          rounded-full
          border
          !border-[#d7e3fa]
          !bg-white
          px-4
          !text-[12px]
          !font-medium
          !text-[#146cff]
          transition
          duration-200
          hover:!border-[#146cff]
          hover:!bg-[#f7faff]
          disabled:cursor-not-allowed
          disabled:opacity-60
          sm:w-auto
          sm:!text-[13px]
          lg:!text-[14px]
        "
      >
        <RefreshCw
          size={15}
          strokeWidth={1.8}
          className={loading ? "animate-spin" : ""}
        />

        <span>{loading ? "Refreshing..." : "Refresh"}</span>
      </button>
    </header>
  );
}