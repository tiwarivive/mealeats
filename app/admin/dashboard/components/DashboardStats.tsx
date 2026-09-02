"use client";

import {
  ClipboardList,
  Clock3,
  MessageCircleQuestion,
} from "lucide-react";

import StatCard from "./StatCard";

type DashboardStatsProps = {
  totalForms: number;
  last24HoursCount: number;
  totalQuestions: number;
};

export default function DashboardStats({
  totalForms,
  last24HoursCount,
  totalQuestions,
}: DashboardStatsProps) {
  return (
    <section
      aria-label="Dashboard statistics"
      className="
        grid
        w-full
        min-w-0
        grid-cols-1
        gap-3
        sm:grid-cols-2
        sm:gap-4
        lg:grid-cols-3
        lg:gap-4
      "
    >
      <StatCard
        title="Total submissions"
        value={totalForms}
        description="All contact form submissions"
        icon={ClipboardList}
      />

      <StatCard
        title="Last 24 hours"
        value={last24HoursCount}
        description="Submissions received recently"
        icon={Clock3}
      />

      <StatCard
        title="AI questions"
        value={totalQuestions}
        description="Questions asked through AI"
        icon={MessageCircleQuestion}
      />
    </section>
  );
}