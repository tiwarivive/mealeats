"use client";

import type { Contact } from "../types";

type SubmissionTableProps = {
  contacts: Contact[];
  loading: boolean;
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

function truncate(
  value?: string,
  length = 32
) {
  if (!value) return "—";

  return value.length > length
    ? `${value.slice(0, length)}…`
    : value;
}

export default function SubmissionTable({
  contacts,
  loading,
}: SubmissionTableProps) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[760px] border-collapse">
        <thead>
          <tr className="border-b border-[#edf0f4]">
            <th className="px-5 py-4 text-left text-[12px] font-medium text-[#8a95a5]">
              Name
            </th>

            <th className="px-4 py-4 text-left text-[12px] font-medium text-[#8a95a5]">
              Email
            </th>

            <th className="px-4 py-4 text-left text-[12px] font-medium text-[#8a95a5]">
              Phone
            </th>

            <th className="px-4 py-4 text-left text-[12px] font-medium text-[#8a95a5]">
              Goal
            </th>

            <th className="px-5 py-4 text-left text-[12px] font-medium text-[#8a95a5]">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={index}
                className="border-b border-[#edf0f4]"
              >
                <td className="px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 animate-pulse rounded-full bg-[#edf1f6]" />
                    <div className="h-4 w-28 animate-pulse rounded bg-[#edf1f6]" />
                  </div>
                </td>

                <td className="px-4">
                  <div className="h-4 w-40 animate-pulse rounded bg-[#edf1f6]" />
                </td>

                <td className="px-4">
                  <div className="h-4 w-28 animate-pulse rounded bg-[#edf1f6]" />
                </td>

                <td className="px-4">
                  <div className="h-6 w-24 animate-pulse rounded bg-[#edf1f6]" />
                </td>

                <td className="px-5">
                  <div className="h-4 w-20 animate-pulse rounded bg-[#edf1f6]" />
                </td>
              </tr>
            ))
          ) : contacts.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-5 py-12 text-center text-sm text-[#8a95a5]"
              >
                No submissions found.
              </td>
            </tr>
          ) : (
            contacts.map((contact, index) => (
              <tr
                key={
                  contact._id ||
                  `${contact.email}-${contact.createdAt}-${index}`
                }
                className="border-b border-[#edf0f4] last:border-0"
              >
                <td className="px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                      style={{
                        backgroundColor:
                          getAvatarColor(contact.fullName),
                      }}
                    >
                      {getInitials(contact.fullName)}
                    </div>

                    <span className="max-w-[150px] truncate text-[13px] font-medium text-[#26354d]">
                      {contact.fullName || "Unknown"}
                    </span>
                  </div>
                </td>

                <td className="max-w-[220px] px-4 py-4 text-[13px] text-[#667085]">
                  <span className="block truncate">
                    {contact.email || "—"}
                  </span>
                </td>

                <td className="px-4 py-4 text-[13px] text-[#667085]">
                  {contact.phone || "—"}
                </td>

                <td className="max-w-[230px] px-4 py-4">
                  <span className="inline-block max-w-full truncate rounded-full bg-[#f1f5f9] px-3 py-1 text-[11px] text-[#667085]">
                    {truncate(contact.goal, 30)}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-[12px] text-[#8a95a5]">
                  {formatDate(contact.createdAt)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}