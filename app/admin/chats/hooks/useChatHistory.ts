"use client";

import { useCallback, useEffect, useState } from "react";

import { apiClient } from "@/app/api/client";

import type {
  AIChat,
  AIChatsResponse,
  ChatPagination,
} from "../types";

const DEFAULT_PAGINATION: ChatPagination = {
  total: 0,
  page: 1,
  limit: 20,
  totalPages: 1,
};

export function useChatHistory() {
  const [chats, setChats] = useState<AIChat[]>([]);
  const [pagination, setPagination] =
    useState<ChatPagination>(DEFAULT_PAGINATION);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchChats = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient<AIChatsResponse>(
        `/ai/admin/chats?page=${page}&limit=20`,
        {
          method: "GET",
          requireAuth: true,
          cache: "no-store",
        }
      );

      if (!response.success || !response.data) {
        throw new Error(
          response.message || "Failed to load AI chat history."
        );
      }

      setChats(response.data.chats || []);
      setPagination(
        response.data.pagination || {
          ...DEFAULT_PAGINATION,
          page,
        }
      );
    } catch (err) {
      console.error("AI chat history error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load AI chat history."
      );

      setChats([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const goToPage = (nextPage: number) => {
    if (
      nextPage < 1 ||
      nextPage > pagination.totalPages ||
      nextPage === page
    ) {
      return;
    }

    setPage(nextPage);
  };

  return {
    chats,
    pagination,
    page,
    loading,
    error,
    refresh: fetchChats,
    goToPage,
  };
}