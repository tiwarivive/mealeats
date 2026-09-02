"use client";

import {
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import type { AdminUser } from "@/app/auth/client";

type ProfileInformationProps = {
  admin: AdminUser;
};

export default function ProfileInformation({
  admin,
}: ProfileInformationProps) {
  const displayName =
    admin.name?.trim() || "Admin";

  const displayEmail =
    admin.email?.trim() || "Not available";

  const displayRole =
    admin.role?.trim() || "ADMIN";

  return (
    <section
      className="
        min-w-0
        overflow-hidden
        rounded-[14px]
        border
        !border-white/80
        !bg-white
        shadow-[0_2px_12px_rgba(15,23,42,0.04)]
      "
    >
      {/* Header */}
      <div
        className="
          flex
          min-w-0
          items-center
          gap-3
          border-b
          !border-[#edf0f4]
          px-4
          py-4
          sm:px-5
        "
      >
        <div
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
          "
        >
          <UserRound
            size={19}
            strokeWidth={1.8}
          />
        </div>

        <div className="min-w-0">
          <h2
            className="
              !mb-0
              !text-[15px]
              !font-semibold
              !leading-5
              !text-[#26354d]
              sm:!text-[16px]
            "
          >
            Profile information
          </h2>

          <p
            className="
              !mb-0
              mt-1
              !text-[11px]
              !leading-4
              !text-[#98A2B3]
              sm:!text-[12px]
            "
          >
            Your authenticated account details
          </p>
        </div>
      </div>

      {/* Profile */}
      <div className="p-4 sm:p-5">
        {/* Avatar / Name */}
        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
            rounded-xl
            !bg-[#f8fafc]
            p-3
            sm:p-4
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              !bg-[#146cff]
              !text-[16px]
              !font-semibold
              !text-white
              uppercase
            "
          >
            {getInitials(displayName)}
          </div>

          <div className="min-w-0">
            <p
              className="
                !mb-0
                truncate
                !text-[15px]
                !font-semibold
                !text-[#26354d]
                sm:!text-[16px]
              "
            >
              {displayName}
            </p>

            <p
              className="
                !mb-0
                mt-0.5
                truncate
                !text-[11px]
                !text-[#98A2B3]
                sm:!text-[12px]
              "
            >
              Administrator account
            </p>
          </div>
        </div>

        {/* Information */}
        <div className="mt-4 space-y-3">
          <ProfileRow
            icon={UserRound}
            label="Full name"
            value={displayName}
          />

          <ProfileRow
            icon={Mail}
            label="Email address"
            value={displayEmail}
          />

          <ProfileRow
            icon={ShieldCheck}
            label="Account role"
            value={displayRole}
            badge
          />
        </div>
      </div>
    </section>
  );
}

function ProfileRow({
  icon: Icon,
  label,
  value,
  badge = false,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
  badge?: boolean;
}) {
  return (
    <div
      className="
        flex
        min-w-0
        items-center
        gap-3
        rounded-xl
        border
        !border-[#edf0f4]
        px-3
        py-3
        sm:px-4
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-[9px]
          !bg-[#f5f7fa]
          !text-[#718096]
        "
      >
        <Icon
          size={15}
          strokeWidth={1.8}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="
            !mb-0
            !text-[10px]
            !font-medium
            !leading-4
            !text-[#98A2B3]
            sm:!text-[11px]
          "
        >
          {label}
        </p>

        {badge ? (
          <span
            className="
              mt-1
              inline-flex
              items-center
              rounded-full
              !bg-[#edf4ff]
              px-2.5
              py-1
              !text-[10px]
              !font-semibold
              uppercase
              tracking-[0.02em]
              !text-[#146cff]
            "
          >
            {value}
          </span>
        ) : (
          <p
            className="
              !mb-0
              mt-0.5
              truncate
              !text-[12px]
              !font-medium
              !leading-5
              !text-[#344054]
              sm:!text-[13px]
            "
            title={value}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function getInitials(name: string) {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "A";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}