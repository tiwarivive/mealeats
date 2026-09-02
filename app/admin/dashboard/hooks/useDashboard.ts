"use client";

import { useCallback, useEffect, useState } from "react";
import { apiClient } from "@/app/api/client";

import type {
  AskedQuestion,
  AskedQuestionsResponse,
  Contact,
  ContactDashboardResponse,
} from "../types";

export function useDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [totalForms, setTotalForms] = useState(0);
  const [last24HoursCount, setLast24HoursCount] = useState(0);

  const [questions, setQuestions] = useState<AskedQuestion[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [dashboardResponse, questionsResponse] =
        await Promise.all([
          apiClient<ContactDashboardResponse>(
            "/contact/admin/dashboard",
            {
              method: "GET",
              requireAuth: true,
              cache: "no-store",
            }
          ),

          apiClient<AskedQuestionsResponse>(
            "/ai/admin/most-asked-questions",
            {
              method: "GET",
              requireAuth: true,
              cache: "no-store",
            }
          ),
        ]);

      if (
        !dashboardResponse.success ||
        !dashboardResponse.data
      ) {
        throw new Error(
          dashboardResponse.message ||
            "Failed to load contact dashboard."
        );
      }

      if (
        !questionsResponse.success ||
        !questionsResponse.data
      ) {
        throw new Error(
          questionsResponse.message ||
            "Failed to load most asked questions."
        );
      }

      setContacts(
        dashboardResponse.data.recentForms || []
      );

      setTotalForms(
        dashboardResponse.data.totalForms || 0
      );

      setLast24HoursCount(
        dashboardResponse.data.last24Hours?.count || 0
      );

      setQuestions(
        questionsResponse.data.questions || []
      );

      setTotalQuestions(
        questionsResponse.data.totalQuestions || 0
      );
    } catch (err) {
      console.error("Dashboard API error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    contacts,
    totalForms,
    last24HoursCount,
    questions,
    totalQuestions,
    loading,
    error,
    refresh: fetchDashboard,
  };
}