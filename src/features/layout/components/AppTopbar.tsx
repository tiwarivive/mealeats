"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  PanelLeft,
  X,
} from "lucide-react";

type AppTopbarProps = {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
};

type AdminUser = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

function getInitial(name?: string) {
  if (!name?.trim()) return "A";

  return name.trim().charAt(0).toUpperCase();
}

function formatRoleLabel(role?: string) {
  if (!role) return "Admin";

  return role
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function AppTopbar({
  isSidebarCollapsed,
  onToggleSidebar,
}: AppTopbarProps) {
  const [search, setSearch] = useState("");
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem("admin_user");

      if (storedAdmin) {
        setAdminUser(JSON.parse(storedAdmin));
      }
    } catch (error) {
      console.error("Failed to load admin user:", error);
    }
  }, []);

  const profileName =
    adminUser?.name?.trim() ||
    adminUser?.email?.split("@")[0] ||
    "Admin";

  const profileRole = formatRoleLabel(adminUser?.role);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-[999] px-2 pt-3 sm:px-4 sm:pt-4"
    >
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[82px] bg-[#F4F7FB]/85 backdrop-blur-[18px]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[86px] bg-gradient-to-b from-[#F4F7FB] via-[#F4F7FB]/95 to-[#F4F7FB]/80" />

      {/* TOPBAR */}

      <div className="h-[62px] rounded-[34px] border border-[#E7E9EE] bg-[#FCFCFD]/95 shadow-erp-card backdrop-blur-xl sm:h-[66px]">
        <div className="flex h-full items-center justify-between gap-2 px-[12px] sm:gap-3 sm:px-[18px] md:gap-4 md:px-[26px]">
          
          {/* LEFT */}

          <div className="flex min-w-0 items-center gap-2 sm:gap-3 md:gap-4">
            <div className="min-w-0 shrink">
              <Image
                src="https://res.cloudinary.com/gppcmjpt/image/upload/v1787377132/mealeats/products/mealeats.png"
                alt="Vibhushanam"
                width={90}
                height={90}
                priority
                className="h-[48px] w-auto object-contain sm:h-[52px]"
              />
            </div>

            <button
              type="button"
              aria-label="Toggle sidebar"
              onClick={onToggleSidebar}
              className="hidden h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] text-[#111827] transition hover:bg-[#F4F6F8] md:flex"
              title={
                isSidebarCollapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
              }
            >
              <PanelLeft size={19} strokeWidth={1.9} />
            </button>
          </div>

          {/* DIVIDER */}

          <div className="mx-1 hidden h-[26px] w-px shrink-0 bg-[#E6E8EC] md:block" />

          {/* SEARCH */}

          <div className="hidden min-w-0 flex-1 items-center md:flex">
            <div className="flex h-[38px] w-full items-center gap-3 rounded-[10px] bg-[#F6F7F9] px-4">
              <Search
                size={17}
                strokeWidth={1.9}
                className="shrink-0 text-[#9AA3AF]"
              />

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full border-none bg-transparent text-[14px] font-normal text-[#111827] outline-none placeholder:text-[#A1A8B3]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#98A2B3] transition hover:bg-[#E9EEF5] hover:text-[#475467]"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              )}
            </div>
          </div>

          {/* PROFILE */}

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/admin/profile"
              className="flex min-w-0 shrink-0 items-center gap-2 rounded-[999px] px-1 py-1 transition hover:bg-[#F7F8FA] sm:gap-3 sm:px-1.5"
            >
              {/* AVATAR */}

              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#DBEAFE] text-sm font-semibold text-[#1D4ED8] sm:h-[40px] sm:w-[40px]">
                {getInitial(profileName)}
              </div>

              {/* PROFILE DETAILS */}

              <div className="hidden min-w-0 text-left lg:block">
                <p className="truncate text-[15px] font-medium leading-[1.1] tracking-[-0.01em] text-[#111827]">
                  {profileName}
                </p>

                <p className="mt-[4px] truncate text-[12px] font-normal leading-none text-[#7C8795]">
                  {profileRole}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}