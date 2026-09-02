"use client";

import { UserRound } from "lucide-react";

export default function ProfileHeader() {
  return (
    <header
      className="
        mb-5
        flex
        min-w-0
        items-center
        gap-3
        sm:mb-6
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
          rounded-[11px]
          !bg-[#edf4ff]
          !text-[#146cff]
          sm:h-11
          sm:w-11
        "
      >
        <UserRound
          size={21}
          strokeWidth={1.8}
        />
      </div>

      <div className="min-w-0">
        <h1
          className="
            !mb-0
            !text-[25px]
            !font-medium
            !leading-tight
            tracking-[-0.02em]
            !text-[#07152f]
            sm:!text-[27px]
            lg:!text-[28px]
          "
        >
          Profile
        </h1>

        <p
          className="
            !mb-0
            mt-1
            break-words
            !text-[12px]
            !font-normal
            !leading-5
            !text-[#718096]
            sm:!text-[13px]
            lg:!text-[14px]
          "
        >
          Manage your account information and password.
        </p>
      </div>
    </header>
  );
}