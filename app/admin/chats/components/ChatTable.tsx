"use client";

import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  MessageSquare,
  UserRound,
} from "lucide-react";

import type {
  AIChat,
  ChatPagination,
} from "../types";

import ChatCard from "./ChatCard";
import ChatSkeleton from "./ChatSkeleton";

type ChatTableProps = {
  chats: AIChat[];
  pagination: ChatPagination;
  page: number;
  loading: boolean;
  onPageChange: (page: number) => void;
};

function formatTime(chat: AIChat) {
  if (!chat.time) return "—";

  const [hours, minutes] = chat.time.split(":");

  if (!hours || !minutes) {
    return chat.time;
  }

  const hour = Number(hours);

  if (Number.isNaN(hour)) {
    return chat.time;
  }

  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${formattedHour}:${minutes} ${suffix}`;
}

export default function ChatTable({
  chats,
  pagination,
  page,
  loading,
  onPageChange,
}: ChatTableProps) {
  if (loading) {
    return (
      <div
        className="
          overflow-hidden
          rounded-[14px]
          border
          !border-white/80
          !bg-white
          shadow-[0_2px_12px_rgba(15,23,42,0.04)]
        "
      >
        <ChatSkeleton />
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[280px]
          flex-col
          items-center
          justify-center
          rounded-[14px]
          border
          !border-white/80
          !bg-white
          px-5
          py-10
          text-center
          shadow-[0_2px_12px_rgba(15,23,42,0.04)]
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            !bg-[#f5f7fa]
            !text-[#98A2B3]
          "
        >
          <MessageSquare
            size={21}
            strokeWidth={1.7}
          />
        </div>

        <p
          className="
            !mb-0
            mt-3
            !text-[14px]
            !font-semibold
            !text-[#475467]
          "
        >
          No AI chats found
        </p>

        <p
          className="
            !mb-0
            mt-1
            max-w-[300px]
            !text-[12px]
            !leading-5
            !text-[#98A2B3]
          "
        >
          AI conversations will appear here once visitors
          start chatting with your assistant.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}
      <div
        className="
          hidden
          overflow-hidden
          rounded-[14px]
          border
          !border-white/80
          !bg-white
          shadow-[0_2px_12px_rgba(15,23,42,0.04)]
          md:block
        "
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-b !border-[#edf0f4]">
                <th
                  className="
                    px-5
                    py-3.5
                    text-left
                    !text-[11px]
                    !font-semibold
                    uppercase
                    tracking-[0.04em]
                    !text-[#98A2B3]
                  "
                >
                  Message
                </th>

                <th
                  className="
                    w-[230px]
                    px-5
                    py-3.5
                    text-left
                    !text-[11px]
                    !font-semibold
                    uppercase
                    tracking-[0.04em]
                    !text-[#98A2B3]
                  "
                >
                  Guest session
                </th>

                <th
                  className="
                    w-[180px]
                    px-5
                    py-3.5
                    text-left
                    !text-[11px]
                    !font-semibold
                    uppercase
                    tracking-[0.04em]
                    !text-[#98A2B3]
                  "
                >
                  Date & time
                </th>
              </tr>
            </thead>

            <tbody>
              {chats.map((chat) => (
                <tr
                  key={chat.id}
                  className="
                    border-b
                    !border-[#f0f2f5]
                    last:border-b-0
                    hover:!bg-[#fbfcfe]
                  "
                >
                  <td className="max-w-[500px] px-5 py-4 align-top">
                    <div className="flex min-w-0 items-start gap-3">
                      <div
                        className="
                          mt-0.5
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-[9px]
                          !bg-[#edf4ff]
                          !text-[#146cff]
                        "
                      >
                        <MessageSquare
                          size={15}
                          strokeWidth={1.8}
                        />
                      </div>

                      <p
                        className="
                          min-w-0
                          break-words
                          whitespace-pre-wrap
                          !text-[13px]
                          !font-normal
                          !leading-5
                          !text-[#344054]
                        "
                      >
                        {chat.message?.trim()
                          ? chat.message
                          : "No message content"}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 align-top">
                    <div className="flex min-w-0 items-center gap-2">
                      <UserRound
                        size={14}
                        strokeWidth={1.8}
                        className="shrink-0 text-[#98A2B3]"
                      />

                      <span
                        className="
                          min-w-0
                          truncate
                          !text-[12px]
                          !font-medium
                          !text-[#667085]
                        "
                        title={chat.guestSessionId}
                      >
                        {chat.guestSessionId}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 align-top">
                    <div
                      className="
                        flex
                        flex-col
                        gap-1
                        !text-[11px]
                        !text-[#718096]
                      "
                    >
                      <span>
                        {chat.date}
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <Clock3
                          size={11}
                          strokeWidth={1.8}
                        />

                        {formatTime(chat)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          pagination={pagination}
          page={page}
          onPageChange={onPageChange}
        />
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {chats.map((chat) => (
          <ChatCard
            key={chat.id}
            chat={chat}
          />
        ))}

        <div
          className="
            overflow-hidden
            rounded-[13px]
            border
            !border-white/80
            !bg-white
            shadow-[0_2px_12px_rgba(15,23,42,0.04)]
          "
        >
          <Pagination
            pagination={pagination}
            page={page}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
}

function Pagination({
  pagination,
  page,
  onPageChange,
}: {
  pagination: ChatPagination;
  page: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(
    pagination.totalPages || 1,
    1
  );

  const currentPage = Math.min(
    Math.max(page, 1),
    totalPages
  );

  return (
    <div
      className="
        flex
        flex-col
        gap-3
        border-t
        !border-[#edf0f4]
        px-4
        py-3
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:px-5
      "
    >
      <p
        className="
          !mb-0
          text-center
          !text-[11px]
          !leading-5
          !text-[#98A2B3]
          sm:text-left
        "
      >
        Page {currentPage} of {totalPages}
        <span className="hidden sm:inline">
          {" "}
          · {pagination.total} total messages
        </span>
      </p>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            border
            !border-[#e2e8f0]
            !bg-white
            !text-[#667085]
            transition
            hover:!border-[#146cff]
            hover:!text-[#146cff]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronLeft
            size={15}
            strokeWidth={1.8}
          />
        </button>

        <span
          className="
            flex
            h-8
            min-w-8
            items-center
            justify-center
            rounded-lg
            !bg-[#146cff]
            px-2
            !text-[11px]
            !font-medium
            !text-white
          "
        >
          {currentPage}
        </span>

        <button
          type="button"
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            border
            !border-[#e2e8f0]
            !bg-white
            !text-[#667085]
            transition
            hover:!border-[#146cff]
            hover:!text-[#146cff]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronRight
            size={15}
            strokeWidth={1.8}
          />
        </button>
      </div>
    </div>
  );
}