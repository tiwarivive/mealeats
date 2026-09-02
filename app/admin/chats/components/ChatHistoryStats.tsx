"use client";

import {
  CalendarDays,
  MessageSquare,
  Users,
} from "lucide-react";

type ChatHistoryStatsProps = {
  total: number;
  visible: number;
  sessions: number;
};

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MessageSquare;
  label: string;
  value: number;
}) {
  return (
    <div
      className="
        min-w-0
        w-full
        rounded-[14px]
        border
        !border-white/80
        !bg-white
        p-4
        shadow-[0_2px_12px_rgba(15,23,42,0.04)]
        sm:p-5
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="
              !mb-0
              truncate
              !text-[12px]
              !font-medium
              !leading-5
              !text-[#718096]
              sm:!text-[13px]
            "
          >
            {label}
          </p>

          <p
            className="
              !mb-0
              mt-1.5
              !text-[26px]
              !font-semibold
              !leading-tight
              tracking-[-0.03em]
              !text-[#07152f]
              sm:!text-[30px]
            "
          >
            {value}
          </p>
        </div>

        <div
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
          "
        >
          <Icon
            size={18}
            strokeWidth={1.8}
          />
        </div>
      </div>
    </div>
  );
}

export default function ChatHistoryStats({
  total,
  visible,
  sessions,
}: ChatHistoryStatsProps) {
  return (
    <section
      aria-label="Chat statistics"
      className="
        grid
        w-full
        min-w-0
        grid-cols-1
        gap-3
        sm:grid-cols-2
        sm:gap-4
        lg:grid-cols-3
      "
    >
      <Stat
        icon={MessageSquare}
        label="Total messages"
        value={total}
      />

      <Stat
        icon={CalendarDays}
        label="Messages on this page"
        value={visible}
      />

      <Stat
        icon={Users}
        label="Guest sessions"
        value={sessions}
      />
    </section>
  );
}