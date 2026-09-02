"use client";

import { useEffect, useState } from "react";

import {
  getCurrentAdmin,
} from "@/app/auth/client";

import type { AdminUser } from "@/app/auth/client";

import ProfileHeader from "./components/ProfileHeader";
import ProfileInformation from "./components/ProfileInformation";
import ChangePassword from "./components/ChangePassword";

export default function ProfilePage() {
  const [admin, setAdmin] =
    useState<AdminUser | null>(null);

  useEffect(() => {
    const currentAdmin =
      getCurrentAdmin();

    setAdmin(currentAdmin);
  }, []);

  if (!admin) {
    return (
      <main className="min-w-0 w-full">
        <ProfileHeader />

        <div
          className="
            flex
            min-h-[220px]
            items-center
            justify-center
            rounded-[14px]
            border
            !border-white/80
            !bg-white
            px-5
            text-center
            shadow-[0_2px_12px_rgba(15,23,42,0.04)]
          "
        >
          <div>
            <p
              className="
                !mb-0
                !text-[14px]
                !font-semibold
                !text-[#475467]
              "
            >
              Profile information unavailable
            </p>

            <p
              className="
                !mb-0
                mt-1
                !text-[12px]
                !text-[#98A2B3]
              "
            >
              Please sign in again to continue.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-w-0 w-full">
      <ProfileHeader />

      <div
        className="
          grid
          min-w-0
          grid-cols-1
          gap-4
          lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
          lg:gap-5
        "
      >
        <ProfileInformation
          admin={admin}
        />

        <ChangePassword />
      </div>
    </main>
  );
}