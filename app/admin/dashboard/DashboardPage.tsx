"use client";

import { useMemo } from "react";

import DashboardError from "./components/DashboardError";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSkeleton from "./components/DashboardSkeleton";
import DashboardStats from "./components/DashboardStats";
import MostAskedQuestionsChart from "./components/MostAskedQuestionsChart";
import RecentSubmissions from "./components/RecentSubmissions";

import { useDashboard } from "./hooks/useDashboard";

export default function DashboardPage() {
  const {
    contacts,
    totalForms,
    last24HoursCount,
    questions,
    totalQuestions,
    loading,
    error,
    refresh,
  } = useDashboard();

  const emailCount = useMemo(() => {
    return contacts.filter(
      (contact) =>
        typeof contact.email === "string" &&
        contact.email.trim().length > 0
    ).length;
  }, [contacts]);

  return (
    <main className="min-h-full bg-[#f1f3f7]">
      <div className="mx-auto w-full max-w-[1500px]">
        <DashboardHeader
          loading={loading}
          onRefresh={refresh}
        />

        {error && (
          <DashboardError
            message={error}
            onRetry={refresh}
          />
        )}

        {loading && contacts.length === 0 ? (
          <DashboardSkeleton />
        ) : (
          <>
            <DashboardStats
              totalForms={totalForms}
              last24HoursCount={last24HoursCount}
              totalQuestions={totalQuestions}
              emailCount={emailCount}
            />

            <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:gap-6">
              <RecentSubmissions
                contacts={contacts}
                loading={loading}
              />

              <MostAskedQuestionsChart
                questions={questions}
                totalQuestions={totalQuestions}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}