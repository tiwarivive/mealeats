"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ClipboardList,
  MessageCircle,
} from "lucide-react";

import AppTopbar from "./AppTopbar";
import AppSidebar from "./AppSidebar";
import MobileNav from "./MobileNav";

/* =========================================================
   TYPES
========================================================= */

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/* =========================================================
   ADMIN NAVIGATION
========================================================= */

const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Collections",
    href: "/admin/form-submisions",
    icon: ClipboardList,
  },
  {
    label: "AI Chats",
    href: "/admin/chats",
    icon: MessageCircle,
  },
];

/* =========================================================
   CLASSNAME HELPER
========================================================= */

function cn(
  ...classes: Array<string | false | null | undefined>
) {
  return classes.filter(Boolean).join(" ");
}

/* =========================================================
   APP SHELL
========================================================= */

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* =================================================
          GLOBAL TOPBAR
      ================================================= */}

      <AppTopbar
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() =>
          setIsSidebarCollapsed(
            (previous) => !previous
          )
        }
      />

      {/* =================================================
          DASHBOARD LAYOUT
      ================================================= */}

      <div className="pt-[80px] md:pt-[96px]">
        {/* =================================================
            DESKTOP SIDEBAR
        ================================================= */}

        <div className="hidden md:block">
          <AppSidebar
            items={ADMIN_NAV_ITEMS}
            pathname={pathname}
            collapsed={isSidebarCollapsed}
          />
        </div>

        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}

        <div className="sticky top-[80px] z-30 md:hidden">
          <MobileNav
            items={ADMIN_NAV_ITEMS}
            pathname={pathname}
          />
        </div>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main
          className={cn(
            "min-w-0 px-4 pb-6 pt-2 transition-all duration-300 md:pt-0 max-[768px]:!px-3",
            isSidebarCollapsed
              ? "md:ml-[102px]"
              : "md:ml-[277px]"
          )}
        >
          <div className="min-h-[calc(100vh-110px)] min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}