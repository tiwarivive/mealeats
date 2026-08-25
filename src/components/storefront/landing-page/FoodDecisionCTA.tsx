"use client";

import Image from "next/image";

export default function FoodDecisionCTA() {
  return (
    <section
      aria-labelledby="food-decision-cta-title"
      className="
        relative
        w-full
        px-[18px]
        py-[18px]

        max-md:px-3
        max-md:py-3

        max-[480px]:px-2
        max-[480px]:py-2
      "
    >
      {/* =====================================================
          MAIN CTA CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[670px]
          w-full
          max-w-[1328px]

          flex-col
          items-center
          justify-center

          overflow-hidden

          rounded-[30px]

          border
          border-[#E3E3E3]

          bg-primary-gradient

          px-8
          py-20

          shadow-[0px_4px_11.8px_0px_#89898940]

          max-[1600px]:min-h-[444px]

          max-[1279px]:max-h-[444px]
          max-[1279px]:rounded-[27px]
          max-[1279px]:px-10

          /*
           * MOBILE
           *
           * Do NOT keep max-height here.
           * The original 444px max-height can clip the heading,
           * description, buttons and footer copy.
           */
          max-md:min-h-[520px]
          max-md:h-auto
          max-md:max-h-none
          max-md:rounded-[24px]
          max-md:px-6
          max-md:py-14

          max-[480px]:min-h-[610px]
          max-[480px]:h-auto
          max-[480px]:max-h-none
          max-[480px]:rounded-[20px]
          max-[480px]:px-5
          max-[480px]:py-12

          max-[375px]:min-h-[625px]
          max-[375px]:px-4
          max-[375px]:py-10
        "
      >
        {/* ===================================================
            VERY SUBTLE LIGHT GLOW
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-220px]

            h-[420px]
            w-[850px]

            -translate-x-1/2

            rounded-full

            bg-white/[0.07]

            blur-[70px]

            max-md:top-[-160px]
            max-md:h-[300px]
            max-md:w-[600px]

            max-[480px]:top-[-120px]
            max-[480px]:h-[230px]
            max-[480px]:w-[430px]

            max-[375px]:w-[380px]
          "
        />

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div
          className="
            relative
            z-10

            flex
            w-full
            max-w-[1500px]

            flex-col
            items-center

            text-center
          "
        >
          {/* =================================================
              HEADING
          ================================================== */}

          <h2
            id="food-decision-cta-title"
            className="
              m-0
              w-full

              font-primary
              text-[48px]
              font-[400]
              leading-[69px]
              tracking-[-1%]

              !text-white

              /*
               * MOBILE TYPOGRAPHY
               */
              max-md:text-[36px]
              max-md:leading-[1.15]
              max-md:tracking-[-0.035em]

              max-[480px]:text-[30px]
              max-[480px]:leading-[1.18]
              max-[480px]:tracking-[-0.04em]

              max-[375px]:text-[28px]
            "
          >
            You Decide{" "}
            <span
              className="
                font-accent
                font-normal
                italic
                tracking-[-0.035em]
              "
            >
              What to Eat Every Day.
            </span>

            <br />

            <span
              className="
                font-accent
                font-normal
                italic
                tracking-[-0.035em]
              "
            >
              Meal Eats
            </span>{" "}
            Is Here to Make That{" "}
            <span
              className="
                font-accent
                font-normal
                italic
                tracking-[-0.035em]
              "
            >
              Decision Easier.
            </span>
          </h2>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            className="
              !mt-[24px]
              !mb-[32px]

              max-w-[1160px]

              font-primary
              !text-[18px]
              font-normal
              !leading-[24px]
              tracking-[-4%]

              text-[#F6F6F6]

              /*
               * MOBILE
               */
              max-md:!mt-[20px]
              max-md:!mb-[26px]
              max-md:max-w-[620px]
              max-md:!text-[15px]
              max-md:!leading-[23px]
              max-md:tracking-[-0.02em]

              max-[480px]:!mt-[17px]
              max-[480px]:!mb-[24px]
              max-[480px]:max-w-[330px]
              max-[480px]:!text-[14px]
              max-[480px]:!leading-[21px]

              max-[375px]:max-w-[300px]
              max-[375px]:!text-[13.5px]
              max-[375px]:!leading-[20px]
            "
          >
            Start by telling Meal Eats about the foods you enjoy,
            what matters to you and what&apos;s already in your kitchen.

            <br className="max-md:hidden" />

            <span className="max-md:hidden">
              {" "}
              We&apos;ll use that context to build an experience designed
              around the way you actually eat and live.
            </span>

            <span className="hidden max-md:inline">
              {" "}
              We&apos;ll use that context to build an experience designed
              around the way you actually eat and live.
            </span>
          </p>

          {/* =================================================
              CTA BUTTONS
          ================================================== */}

          <div
            className="
              !mb-[16px]

              flex
              items-center
              justify-center
              gap-[24px]

              /*
               * MOBILE
               *
               * Stack buttons vertically so they never overflow.
               */
              max-md:w-full
              max-md:max-w-[320px]
              max-md:flex-col
              max-md:gap-[12px]

              max-[480px]:max-w-[290px]
              max-[375px]:max-w-[270px]
            "
          >
            {/* ===============================================
                PRIMARY BUTTON
            ================================================ */}

            <button
              type="button"
              className="
                flex
                h-[48px]
                min-w-[222px]

                items-center
                justify-center

                rounded-full

                border
                border-white

                bg-[#FDFAFA]

                px-10

                font-primary
                !text-[18px]
                !font-medium
                leading-[28px]
                tracking-[-4%]

                text-[#2F2F2F]

                shadow-[0px_4px_18px_0px_#2F770D45]

                transition-all
                duration-normal
                ease-out

                hover:-translate-y-[2px]
                hover:bg-white/95
                hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)]

                active:translate-y-0
                active:scale-[0.99]

                /*
                 * MOBILE
                 */
                max-md:h-[46px]
                max-md:w-full
                max-md:min-w-0
                max-md:max-w-[320px]
                max-md:px-6
                max-md:!text-[15px]
                max-md:leading-[22px]

                max-[480px]:h-[45px]
                max-[480px]:max-w-[290px]
                max-[480px]:!text-[14px]

                max-[375px]:h-[44px]
                max-[375px]:max-w-[270px]
                max-[375px]:!text-[13.5px]
              "
            >
              Build My Food Profile
            </button>

            {/* ===============================================
                SECONDARY BUTTON
            ================================================ */}

            <button
              type="button"
              className="
                flex
                h-[48px]
                min-w-[222px]

                items-center
                justify-center
                gap-[12px]

                rounded-full

                border
                border-white

                bg-transparent

                px-10

                font-primary
                text-[18px]
                font-medium
                leading-none
                tracking-[-0.025em]

                text-white

                transition-all
                duration-normal
                ease-out

                hover:-translate-y-[2px]
                hover:bg-white/[0.10]

                active:translate-y-0
                active:scale-[0.99]

                /*
                 * MOBILE
                 */
                max-md:h-[46px]
                max-md:w-full
                max-md:min-w-0
                max-md:max-w-[320px]
                max-md:px-6
                max-md:!text-[15px]

                max-[480px]:h-[45px]
                max-[480px]:max-w-[290px]
                max-[480px]:!text-[14px]
                max-[480px]:gap-[9px]

                max-[375px]:h-[44px]
                max-[375px]:max-w-[270px]
                max-[375px]:!text-[13.5px]
              "
            >
              <Image
                src="https://res.cloudinary.com/gppcmjpt/image/upload/v1787398839/tryaistar.png"
                alt="star image"
                height={20}
                width={20}
                className="
                  h-[20px]
                  w-[20px]
                  shrink-0

                  max-[480px]:h-[18px]
                  max-[480px]:w-[18px]
                "
              />

              <span>Try MealEats AI</span>
            </button>
          </div>

          {/* =================================================
              FOOTER MICRO COPY
          ================================================== */}

          <p
            className="
              mt-[32px]

              font-primary
              text-[12px]
              font-normal
              leading-[24px]
              tracking-[-4%]

              text-white

              /*
               * MOBILE
               */
              max-md:mt-[20px]
              max-md:max-w-[320px]
              max-md:text-[11px]
              max-md:leading-[19px]
              max-md:tracking-[-0.02em]

              max-[480px]:mt-[18px]
              max-[480px]:max-w-[280px]
              max-[480px]:text-[10.5px]
              max-[480px]:leading-[18px]

              max-[375px]:max-w-[260px]
              max-[375px]:text-[10px]
            "
          >
            Start Free · Stay in Control · Change Your Preferences Anytime
          </p>
        </div>
      </div>
    </section>
  );
}