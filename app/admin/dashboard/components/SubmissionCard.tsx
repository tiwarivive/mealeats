"use client";

import type { Contact } from "../types";

type SubmissionCardProps = {
  contact: Contact;
};

function getInitials(name?: string) {
  if (!name?.trim()) return "?";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function getAvatarColor(name?: string) {
  const colors = [
    "#3FA6A9",
    "#FFAE0B",
    "#2188E8",
    "#1CA9D4",
    "#9EA5BF",
    "#667EEA",
  ];

  if (!name) return colors[0];

  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function SubmissionCard({
  contact,
}: SubmissionCardProps) {
  return (
    <div className="rounded-xl border border-[#edf0f4] bg-white p-4">
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
          style={{
            backgroundColor: getAvatarColor(contact.fullName),
          }}
        >
          {getInitials(contact.fullName)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-[#26354d]">
            {contact.fullName || "Unknown"}
          </p>

          <p className="mt-0.5 truncate text-[12px] text-[#718096]">
            {contact.email || "No email"}
          </p>
        </div>

        <span className="shrink-0 text-[10px] text-[#9aa4b2]">
          {formatDate(contact.createdAt)}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[#edf0f4] pt-3 sm:grid-cols-2">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wide text-[#9aa4b2]">
            Phone
          </p>

          <p className="mt-1 truncate text-[12px] text-[#526174]">
            {contact.phone || "—"}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wide text-[#9aa4b2]">
            Goal
          </p>

          <p className="mt-1 break-words text-[12px] text-[#526174]">
            {contact.goal || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}