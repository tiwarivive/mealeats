"use client";

import {
  Clock3,
  MessageSquare,
  UserRound,
} from "lucide-react";

import type { AIChat } from "../types";

type ChatCardProps = {
  chat: AIChat;
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

export default function ChatCard({
  chat,
}: ChatCardProps) {
  return (
    <article
      className="
        min-w-0
        overflow-hidden
        rounded-[13px]
        border
        !border-[#edf0f4]
        !bg-white
        p-4
        shadow-[0_1px_7px_rgba(15,23,42,0.03)]
      "
    >
      <div className="flex min-w-0 items-start gap-3">
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
          "
        >
          <MessageSquare
            size={17}
            strokeWidth={1.8}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
            <span
              className="
                inline-flex
                min-w-0
                max-w-full
                items-center
                gap-1.5
                truncate
                !text-[11px]
                !font-medium
                !text-[#667085]
              "
            >
              <UserRound
                size={12}
                strokeWidth={1.8}
              />

              <span className="truncate">
                {chat.guestSessionId}
              </span>
            </span>

            <span
              className="
                inline-flex
                shrink-0
                items-center
                gap-1
                !text-[10px]
                !text-[#98A2B3]
              "
            >
              <Clock3
                size={11}
                strokeWidth={1.8}
              />

              {chat.date} · {formatTime(chat)}
            </span>
          </div>

          <p
            className="
              !mb-0
              mt-3
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
      </div>
    </article>
  );
}