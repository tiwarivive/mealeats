"use client";

import { ClipboardList } from "lucide-react";

import type { Contact } from "../types";
import SubmissionCard from "./SubmissionCard";
import SubmissionTable from "./SubmissionTable";

type RecentSubmissionsProps = {
  contacts: Contact[];
  loading: boolean;
};

export default function RecentSubmissions({
  contacts,
  loading,
}: RecentSubmissionsProps) {
  const visibleCount = contacts.length;

  return (
    <section
      aria-labelledby="recent-submissions-title"
      className="
        flex
        min-w-0
        flex-col
        overflow-hidden
        rounded-[14px]
        border
        !border-white/80
        !bg-white
        shadow-[0_2px_12px_rgba(15,23,42,0.04)]
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div
        className="
          flex
          min-w-0
          shrink-0
          items-center
          justify-between
          gap-3
          border-b
          !border-[#edf0f4]
          px-4
          py-3.5
          sm:px-5
          sm:py-4
        "
      >
        {/* =================================================
            LEFT SIDE
        ================================================== */}
        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
          "
        >
          {/* Icon */}
          <div
            aria-hidden="true"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-[10px]
              !bg-[#edf4ff]
              !text-[#146cff]
              sm:h-11
              sm:w-11
            "
          >
            <ClipboardList
              size={21}
              strokeWidth={1.8}
            />
          </div>

          {/* Heading */}
          <div className="min-w-0">
            <h2
              id="recent-submissions-title"
              className="
                !mb-0
                !truncate
                !text-[16px]
                !font-semibold
                !leading-5
                tracking-[-0.01em]
                !text-[#26354d]
                sm:!text-[17px]
              "
            >
              Recent submissions
            </h2>

            <p
              className="
                !mb-0
                mt-1
                !text-[11px]
                !font-normal
                !leading-4
                !text-[#98A2B3]
                sm:!text-[12px]
              "
            >
              Latest contact form activity
            </p>
          </div>
        </div>

        {/* =================================================
            COUNT BADGE
        ================================================== */}
        <div
          className="
            flex
            h-7
            shrink-0
            items-center
            justify-center
            rounded-full
            !bg-[#f5f7fa]
            px-2.5
            sm:h-8
            sm:px-3
          "
        >
          <span
            className="
              !text-[10px]
              !font-medium
              !leading-4
              !text-[#718096]
              sm:!text-[11px]
            "
          >
            {loading
              ? "Loading..."
              : `${visibleCount} ${
                  visibleCount === 1
                    ? "shown"
                    : "shown"
                }`}
          </span>
        </div>
      </div>

      {/* =====================================================
          DESKTOP TABLE

          SubmissionTable handles desktop presentation.
      ====================================================== */}
      <div
        className="
          hidden
          min-w-0
          md:block
        "
      >
        <SubmissionTable
          contacts={contacts}
          loading={loading}
        />
      </div>

      {/* =====================================================
          MOBILE SUBMISSIONS

          Cards are intentionally separate from the desktop
          table so the mobile layout never forces horizontal
          scrolling.
      ====================================================== */}
      <div
        className="
          min-w-0
          space-y-3
          p-3
          md:hidden
        "
      >
        {/* =================================================
            MOBILE LOADING
        ================================================== */}
        {loading ? (
          <>
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={`submission-skeleton-${index}`}
                aria-hidden="true"
                className="
                  min-h-[118px]
                  w-full
                  animate-pulse
                  rounded-xl
                  !bg-[#f3f5f8]
                "
              />
            ))}
          </>
        ) : contacts.length === 0 ? (
          /* =================================================
              MOBILE EMPTY STATE
          ================================================== */
          <div
            className="
              flex
              min-h-[220px]
              flex-col
              items-center
              justify-center
              px-5
              py-10
              text-center
            "
          >
            <div
              aria-hidden="true"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                !bg-[#f5f7fa]
                !text-[#98A2B3]
              "
            >
              <ClipboardList
                size={20}
                strokeWidth={1.7}
              />
            </div>

            <p
              className="
                !mb-0
                mt-3
                !text-[13px]
                !font-semibold
                !leading-5
                !text-[#475467]
              "
            >
              No submissions yet
            </p>

            <p
              className="
                !mb-0
                mt-1
                max-w-[260px]
                !text-[11px]
                !font-normal
                !leading-5
                !text-[#98A2B3]
              "
            >
              New contact form submissions
              will appear here.
            </p>
          </div>
        ) : (
          /* =================================================
              MOBILE DATA
          ================================================== */
          contacts.map(
            (contact, index) => (
              <SubmissionCard
                key={
                  contact._id ||
                  `${contact.email}-${contact.createdAt}-${index}`
                }
                contact={contact}
              />
            )
          )
        )}
      </div>
    </section>
  );
}