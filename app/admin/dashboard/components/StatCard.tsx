"use client";

import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
};

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <article
      className="
        min-w-0
        w-full
        overflow-hidden
        rounded-[14px]
        border
        !border-white/80
        !bg-white
        p-4
        shadow-[0_2px_12px_rgba(15,23,42,0.04)]
        transition-shadow
        duration-200
        hover:shadow-[0_4px_18px_rgba(15,23,42,0.07)]
        sm:p-5
      "
    >
      <div
        className="
          flex
          min-w-0
          items-start
          justify-between
          gap-3
          sm:gap-4
        "
      >
        {/* Content */}
        <div className="min-w-0 flex-1">
          <p
            className="
              !mb-0
              truncate
              !text-[12px]
              !font-medium
              !leading-5
              !text-[#718096]
              sm:!text-[13px]
              lg:!text-[14px]
            "
          >
            {title}
          </p>

          <p
            className="
              !mb-0
              mt-1.5
              truncate
              !text-[26px]
              !font-semibold
              !leading-tight
              tracking-[-0.03em]
              !text-[#07152f]
              sm:mt-2
              sm:!text-[30px]
              lg:!text-[32px]
            "
          >
            {value}
          </p>

          <p
            className="
              !mb-0
              mt-1
              break-words
              !text-[10px]
              !font-normal
              !leading-4
              !text-[#98A2B3]
              sm:!text-[11px]
              sm:!leading-5
              lg:!text-[12px]
            "
          >
            {description}
          </p>
        </div>

        {/* Icon */}
        <div
          aria-hidden="true"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-[10px]
            !bg-[#edf4ff]
            !text-[#146cff]
            sm:h-10
            sm:w-10
            sm:rounded-[11px]
            lg:h-11
            lg:w-11
            lg:rounded-xl
          "
        >
          <Icon
            size={18}
            strokeWidth={1.8}
            className="sm:h-[19px] sm:w-[19px] lg:h-5 lg:w-5"
          />
        </div>
      </div>
    </article>
  );
}