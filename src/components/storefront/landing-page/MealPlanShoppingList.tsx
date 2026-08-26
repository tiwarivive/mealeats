"use client";

import Image from "next/image";

type MealPlanStep = {
  title: string;
  image: string;
  wide?: boolean;
};

const mealPlanSteps: MealPlanStep[] = [
  {
    title: "PLAN",
    image: "/plan.png",
  },
  {
    title: "CHECK PANTRY",
    image: "/check-pantry.png",
  },
  {
    title: "FIND GAPS",
    image: "/find-gaps.png",
  },
  {
    title: "BUILD LIST",
    image: "/build-list.png",
    wide: true,
  },
  {
    title: "SHOP",
    image: "/shop.png",
    wide: true,
  },
];

export default function MealPlanShoppingList() {
  return (
    <section
      aria-labelledby="meal-plan-shopping-heading"
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-primary
        pt-[104px]
        pb-[92px]

        min-[1440px]:pt-[116px]
        min-[1440px]:pb-[55px]

        max-[1279px]:pt-[92px]
        max-[1279px]:pb-[86px]

        max-md:pt-[76px]
        max-md:pb-[72px]

        max-[480px]:pt-[64px]
        max-[480px]:pb-[62px]

        max-[375px]:pt-[58px]
        max-[375px]:pb-[56px]
        lg:px-[56px]
        xl:px-[56px]
        max-[768px]:px-[16px]
      "
    >
      {/* =====================================================
          FIGMA GREEN ARCH BACKGROUND

          DESKTOP:
          -----------------------------------------------------
          Desktop geometry is intentionally preserved.

          MOBILE:
          -----------------------------------------------------
          Only the mobile geometry changes so the curve remains
          visually visible on narrow screens.
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >
        {/* ===================================================
            CONTINUOUS GREEN BODY
        =================================================== */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            top-[142px]
            bg-accent-light

            max-[1279px]:top-[122px]

            max-md:top-[104px]

            max-[480px]:top-[88px]

            max-[375px]:top-[80px]
          "
        />

        {/* ===================================================
            MAIN GREEN ARCH

            DESKTOP VALUES ARE UNCHANGED.

            The mobile values are intentionally narrower so
            the curve remains visible on small screens.
        =================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-0
            h-[1100px]
            w-[150vw]
            -translate-x-1/2
            rounded-[50%]
            bg-accent-light

            min-[1440px]:h-[1100px]
            min-[1440px]:w-[150vw]

            max-[1279px]:h-[900px]
            max-[1279px]:w-[165vw]

            /* ================= MOBILE ================= */

            max-md:h-[760px]
            max-md:w-[185vw]

            max-[480px]:h-[650px]
            max-[480px]:w-[175vw]

            max-[375px]:h-[590px]
            max-[375px]:w-[170vw]
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-full
          
        "
      >
        {/* ===================================================
            HEADING
        ==================================================== */}

        <header
          className="
            mx-auto
            mb-[56px]
            w-full
            max-w-[980px]
            text-center

            min-[1440px]:mb-[62px]

            max-[1279px]:mb-[48px]

            max-md:mb-[38px]

            max-[480px]:mb-[32px]

            max-[375px]:mb-[28px]
          "
        >
          <h2
            id="meal-plan-shopping-heading"
            className="
              m-0
              font-primary
              text-[48px]
              font-medium
              leading-[1.08]
              tracking-[-0.045em]
              text-secondary

              min-[1440px]:text-[50px]

              max-[1279px]:text-[44px]

              /* ================= MOBILE ================= */

              max-md:text-[34px]
              max-md:leading-[1.12]
              max-md:tracking-[-0.04em]

              max-[480px]:text-[29px]
              max-[480px]:leading-[1.14]
              max-[480px]:tracking-[-0.035em]

              max-[375px]:text-[27px]
              max-[375px]:leading-[1.16]
            "
          >
            From Meal Plan to{" "}
            <span
              className="
                font-accent
                font-normal
                italic
                tracking-[-0.035em]
              "
            >
              Shopping List
            </span>
          </h2>

          <p
            className="
              !mx-auto
              mt-[17px]
              w-full
              max-w-[880px]
              font-primary
              text-[15px]
              font-normal
              leading-[1.7]
              text-text

              max-[1279px]:max-w-[760px]
              max-[1279px]:text-[14px]

              /* ================= MOBILE ================= */

              max-md:mt-[14px]
              max-md:max-w-[650px]
              max-md:text-[14px]
              max-md:leading-[1.65]

              max-[480px]:mt-[13px]
              max-[480px]:max-w-[390px]
              max-[480px]:text-[13px]
              max-[480px]:leading-[1.65]

              max-[375px]:max-w-[350px]
              max-[375px]:text-[12.5px]
              max-[375px]:leading-[1.62]
            "
          >
            Once you know what you want to eat, Meal Eats can help
            you understand what you&apos;ll need. Your planned meals
            can be translated into an organized ingredient list
            while considering ingredients you already have at home.
          </p>
        </header>

        {/* ===================================================
            IMAGE GRID

            DESKTOP:
            ---------------------------------------------------
            2 / 6 | 2 / 6 | 2 / 6

            3 / 6 | 3 / 6

            MOBILE:
            ---------------------------------------------------
            One clean full-width card per row.

            This prevents the images from becoming too narrow
            and keeps the Figma imagery readable.
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-6
            items-start

            column-gap-[56px]
            row-gap-[40px]

            min-[1440px]:gap-x-[58px]
            min-[1440px]:gap-y-[44px]

            max-[1279px]:gap-x-[30px]
            max-[1279px]:gap-y-[36px]

            /* ================= MOBILE ================= */

            max-md:grid-cols-1
            max-md:gap-[30px]

            max-[480px]:gap-[27px]

            max-[375px]:gap-[24px]
          "
        >
          {mealPlanSteps.map((step) => (
            <article
              key={step.title}
              className={`
                group
                min-w-0

                ${
                  step.wide
                    ? "col-span-3"
                    : "col-span-2"
                }

                /* ================= MOBILE ================= */

                max-md:col-span-1
                max-md:w-full
              `}
            >
              {/* =============================================
                  IMAGE
              ============================================= */}

              <div
                className={`
                  relative
                  w-full
                  overflow-hidden
                  rounded-md
                  bg-surface-light

                  ${
                    step.wide
                      ? "aspect-[2.34/1]"
                      : "aspect-[1.98/1]"
                  }

                  /* ================= MOBILE ================= */

                  max-md:aspect-[1.72/1]

                  max-[480px]:aspect-[1.68/1]

                  max-[375px]:aspect-[1.64/1]
                `}
              >
                <Image
                  src={step.image}
                  alt={`${step.title.toLowerCase()} meal planning step`}
                  fill
                  sizes={
                    step.wide
                      ? "(max-width: 375px) calc(100vw - 28px), (max-width: 480px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 50vw, 50vw"
                      : "(max-width: 375px) calc(100vw - 28px), (max-width: 480px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 33vw, 33vw"
                  }
                  className="
                    object-cover
                    object-center

                    transition-transform
                    duration-slow
                    ease-out

                    group-hover:scale-[1.015]
                  "
                />
              </div>

              {/* =============================================
                  LABEL
              ============================================= */}

              <h3
                className="
                  mt-[14px]
                  text-center
                  font-primary
                  !text-[24px]
                  font-medium
                  leading-[31px]
                  tracking-[-3%]
                  text-secondary

                  min-[1440px]:text-[24px]

                  max-[1279px]:mt-[13px]
                  max-[1279px]:text-[21px]

                  /* ================= MOBILE ================= */

                  max-md:mt-[11px]
                  max-md:text-[19px]
                  max-md:leading-[27px]

                  max-[480px]:mt-[10px]
                  max-[480px]:text-[18px]
                  max-[480px]:leading-[25px]

                  max-[375px]:mt-[9px]
                  max-[375px]:text-[17px]
                  max-[375px]:leading-[24px]
                "
              >
                {step.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}