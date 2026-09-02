"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  useEffect(() => {
    const token = localStorage.getItem(
      "admin_token"
    );

    if (!token) {
      router.replace(
        `/me-admin-login?redirect=${encodeURIComponent(
          pathname
        )}`
      );

      return;
    }

    setCheckingAuth(false);
  }, [pathname, router]);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6]">
        <div className="text-sm text-[#5F5F5F]">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}