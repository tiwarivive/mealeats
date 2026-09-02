"use client";

import { useMemo } from "react";

import ChatHistoryHeader from "./components/ChatHistoryHeader";
import ChatHistoryStats from "./components/ChatHistoryStats";
import ChatTable from "./components/ChatTable";
import { useChatHistory } from "./hooks/useChatHistory";

export default function ChatHistoryPage() {
  const {
    chats,
    pagination,
    page,
    loading,
    error,
    refresh,
    goToPage,
  } = useChatHistory();

  const uniqueSessions = useMemo(() => {
    return new Set(
      chats
        .map((chat) => chat.guestSessionId)
        .filter(Boolean)
    ).size;
  }, [chats]);

  return (
    <main className="min-w-0 w-full">
      <ChatHistoryHeader
        loading={loading}
        onRefresh={refresh}
      />

      <div className="space-y-4 sm:space-y-5">
        <ChatHistoryStats
          total={pagination.total}
          visible={chats.length}
          sessions={uniqueSessions}
        />

        {error ? (
          <section
            className="
              flex
              min-h-[180px]
              flex-col
              items-center
              justify-center
              rounded-[14px]
              border
              !border-[#fee2e2]
              !bg-white
              px-5
              py-8
              text-center
              shadow-[0_2px_12px_rgba(15,23,42,0.04)]
            "
          >
            <p
              className="
                !mb-0
                !text-[14px]
                !font-semibold
                !text-[#b42318]
              "
            >
              Unable to load chat history
            </p>

            <p
              className="
                !mb-0
                mt-1
                max-w-[400px]
                break-words
                !text-[12px]
                !leading-5
                !text-[#98A2B3]
              "
            >
              {error}
            </p>

            <button
              type="button"
              onClick={refresh}
              className="
                mt-4
                inline-flex
                h-9
                items-center
                justify-center
                rounded-full
                !bg-[#146cff]
                px-4
                !text-[12px]
                !font-medium
                !text-white
                transition
                hover:!bg-[#0f5ed7]
              "
            >
              Try again
            </button>
          </section>
        ) : (
          <ChatTable
            chats={chats}
            pagination={pagination}
            page={page}
            loading={loading}
            onPageChange={goToPage}
          />
        )}
      </div>
    </main>
  );
}