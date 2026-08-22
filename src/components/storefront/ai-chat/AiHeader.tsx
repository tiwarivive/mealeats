"use client";

import Image from "next/image";
import Link from "next/link";

/* =========================================================
   AI HEADER
   ---------------------------------------------------------
   Same visual header treatment as the storefront header,
   but intentionally contains ONLY the MealEats logo.

   - No navigation links
   - No CTA
   - No hamburger
   - No mobile menu
   - Logo remains aligned to the left
========================================================= */

const LOGO = "/mealeats.png";

export default function AIHeader() {
  return (
    <>
      {/* =====================================================
          AI HEADER
      ===================================================== */}

      <header
        className="
          fixed
          inset-x-0
          top-[22px]
          z-[1000]
       
          px-[12px]
          w-fit
          mr-auto
          ml-[56px]
          max-[768px]:!ml-[16px]

          sm:px-[16px]

          lg:pt-0
        "
      >
        {/* ===================================================
            HEADER CONTAINER
        ==================================================== */}

        <div
          className="
            relative
            mx-auto
            w-full
            max-w-fit
            !mr-auto
          "
        >
          {/* =================================================
              HEADER BAR
          ================================================= */}

          <div
            className="
              relative
              flex
              h-[64px]
              w-full
              items-center

              rounded-[12px]

              border
              border-[#F6F6F6]

              bg-white

              pl-[16px]
              pr-[12px]

              shadow-[2px_2px_8.2px_0_#97979714]

              sm:h-[68px]
              sm:rounded-[14px]
              sm:pl-[20px]
              sm:pr-[16px]

              md:h-[70px]
              md:rounded-[16px]
              md:pl-[24px]
              md:pr-[20px]

              lg:h-[66px]
              lg:rounded-[var(--radius-md)]
              lg:border
              lg:border-[var(--color-border)]
              lg:bg-white/90
              lg:px-[12px]
              lg:shadow-[var(--shadow-card)]
              lg:backdrop-blur-xl

              xl:h-[68px]
            "
          >
            {/* =================================================
                LOGO
                -------------------------------------------------
                Left aligned exactly like the existing header.
            ================================================= */}

            <Link
              href="/"
              aria-label="MealEats home"
              className="
                relative
                z-[2]

                flex
                h-[42px]
                w-[94px]
                shrink-0
                items-center
                justify-start

                touch-manipulation

                focus-visible:rounded-[var(--radius-sm)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--color-accent)]
                focus-visible:ring-offset-2

                sm:h-[46px]
                sm:w-[102px]

                md:h-[48px]
                md:w-[108px]

                lg:h-[48px]
                lg:w-[108px]

                xl:h-[64px]
                xl:w-[94px]
              "
            >
              <Image
                src={LOGO}
                alt="MealEats"
                width={312}
                height={140}
                priority
                draggable={false}
                className="
                  block
                  h-full
                  w-full
                  select-none
                  object-contain
                  object-left
                "
              />
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          HEADER SPACER

          Keeps the page content from sitting underneath the
          fixed AI header.
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          h-[94px]

          sm:h-[96px]

          md:h-[104px]

          lg:h-[104px]
        "
      />
    </>
  );
}