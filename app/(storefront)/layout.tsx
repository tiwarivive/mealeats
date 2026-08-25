"use client";

import { usePathname } from "next/navigation";
import Header from "../../src/components/storefront/shared/Header";
import Footer from "../../src/components/storefront/shared/Footer";
import AIHeader from "@/src/components/storefront/ai-chat/AiHeader";


export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // /ai and anything nested under /ai
  const isAIPage = pathname === "/ai" || pathname.startsWith("/ai/");

  return (
    <div className="min-h-screen w-full bg-primary">
      {/* =====================================================
          HEADER
      ===================================================== */}

      {isAIPage ? <AIHeader /> : <Header />}

      {/* =====================================================
          PAGE CONTENT

          No global horizontal padding/max-width here.
          Individual sections control their own layout.
      ===================================================== */}

      <main className="w-full">{children}</main>

      {/* =====================================================
          FOOTER

          AI pages intentionally have no storefront footer.
      ===================================================== */}

      {!isAIPage && <Footer />}
    </div>
  );
}