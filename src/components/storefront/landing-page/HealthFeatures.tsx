"use client";

import Image from "next/image";
import Link from "next/link";

/* =========================================================
   DATA
========================================================= */

const IMAGES = {
  couple: "/health-couple.png",
  meal: "/healthy-meal.png",
};

/* =========================================================
   AI ICON
========================================================= */

function HealthAIIcon() {
  return (
    <div
      aria-hidden="true"
      className="
        relative
        flex
        h-[52px]
        w-[52px]
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-[12px]
        bg-accent
        shadow-button

        min-[375px]:h-[56px]
        min-[375px]:w-[56px]

        sm:h-[60px]
        sm:w-[60px]

        lg:h-[62px]
        lg:w-[62px]

        xl:h-[64px]
        xl:w-[64px]
      "
    >
      <Image
        src="https://res.cloudinary.com/gppcmjpt/image/upload/v1787377068/mealeats/products/ai-assistant.gif"
        height={32}
        width={32}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="
          h-[28px]
          w-[28px]
          object-contain

          min-[375px]:h-[30px]
          min-[375px]:w-[30px]

          sm:h-[32px]
          sm:w-[32px]
        "
      />
    </div>
  );
}

/* =========================================================
   FEATURE SECTION
========================================================= */

export default function HealthFeatures() {
  return (
    <section
      id="features"
      aria-labelledby="health-features-title"
      className="
        relative
        w-full
        overflow-hidden
        bg-primary

        py-[48px]

        min-[375px]:py-[52px]

        sm:py-[76px]

        md:py-[88px]

        lg:py-[104px]

        xl:py-[120px]

        /* ===================================================
           TABLET
        ==================================================== */

        max-[1023px]:py-[72px]

        max-[767px]:py-[48px]

        max-[600px]:py-[44px]

        max-[480px]:py-[40px]

        max-[375px]:py-[38px]
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          container-content
          mx-auto
          flex
          w-full
          flex-col
          items-center
          px-page
          text-center

          /* =================================================
             TABLET
          ================================================== */

          max-[1023px]:px-[32px]

          /* =================================================
             MOBILE
          ================================================== */

          max-[767px]:px-[20px]

          max-[600px]:px-[18px]

          max-[480px]:px-[16px]
        "
      >
        {/* ===================================================
            EYEBROW
        ==================================================== */}

        <div
          className="
            inline-flex
            min-h-[32px]
            max-w-full
            items-center
            justify-center
            rounded-full
            bg-primary
            px-[14px]
            py-[7px]

            font-primary
            text-[11px]
            font-[400]
            uppercase
            leading-none
            tracking-[0.08em]
            text-[#007246]

            sm:min-h-[36px]
            sm:px-[19px]
            sm:text-[11px]

            md:text-[12px]

            /* =================================================
               TABLET
            ================================================== */

            max-[1023px]:min-h-[34px]
            max-[1023px]:px-[18px]
            max-[1023px]:text-[11px]

            /* =================================================
               MOBILE
            ================================================== */

            max-[480px]:min-h-[31px]
            max-[480px]:px-[14px]
            max-[480px]:py-[7px]
            max-[480px]:text-[9px]
          "
        >
          Built for everyday health
        </div>

        {/* ===================================================
            HEADING
        ==================================================== */}

        <h2
          id="health-features-title"
          className="
            mt-[20px]
            w-full
            max-w-[900px]
            break-words

            font-primary
            text-[38px]
            font-medium
            leading-[1.02]
            tracking-[-0.055em]
            text-secondary

            min-[375px]:text-[40px]

            min-[480px]:text-[44px]

            sm:mt-[28px]
            sm:text-h3
            sm:leading-[0.99]

            md:max-w-[950px]
            md:text-[58px]

            lg:text-h2

            xl:max-w-[1000px]

            /* =================================================
               TABLET
            ================================================== */

            max-[1023px]:mt-[24px]
            max-[1023px]:max-w-[850px]
            max-[1023px]:text-[48px]
            max-[1023px]:leading-[1.02]

            /* =================================================
               MOBILE
            ================================================== */

            max-[767px]:mt-[20px]
            max-[767px]:max-w-[650px]
            max-[767px]:text-[36px]
            max-[767px]:leading-[1.06]

            max-[600px]:text-[33px]

            max-[480px]:text-[30px]
            max-[480px]:leading-[1.08]

            max-[375px]:text-[28px]
          "
        >
          Built for{" "}
          <span
            className="
              font-accent
              font-normal
              italic
              tracking-[-0.04em]
            "
          >
            Smarter Health
          </span>{" "}
          Every
          <br className="hidden sm:block" /> Single Day
        </h2>

        {/* ===================================================
            DESCRIPTION
        ==================================================== */}

        <p
          className="
            mt-[14px]
            w-full
            max-w-[700px]

            font-primary
            text-[14px]
            font-normal
            leading-[1.5]
            tracking-[-0.012em]
            text-text-muted

            min-[375px]:text-[15px]

            sm:mt-[16px]
            sm:text-body
            sm:leading-[20px]

            /* =================================================
               TABLET
            ================================================== */

            max-[1023px]:mt-[18px]
            max-[1023px]:max-w-[680px]
            max-[1023px]:text-[14px]
            max-[1023px]:leading-[1.5]

            /* =================================================
               MOBILE
            ================================================== */

            max-[767px]:mt-[14px]
            max-[767px]:max-w-[520px]
            max-[767px]:text-[13.5px]
            max-[767px]:leading-[1.5]

            max-[480px]:text-[13px]
          "
        >
          By Healthcare AI simplifies wellness with real-time tracking,
          medical-aware insights and AI guidance — helping you make better
          choices and feel your best.
        </p>
      </div>

      {/* =====================================================
          FEATURE CARDS
      ====================================================== */}

      <div
        className="
          container-page
          mx-auto
          mt-[40px]
          w-full

          min-[375px]:mt-[44px]

          sm:mt-[64px]

          md:mt-[76px]

          lg:mt-[88px]

          xl:mt-[96px]

          /* =================================================
             TABLET
          ================================================== */

          max-[1023px]:mt-[56px]
          max-[1023px]:px-[32px]

          /* =================================================
             MOBILE
          ================================================== */

          max-[767px]:mt-[42px]
          max-[767px]:px-[20px]

          max-[600px]:mt-[40px]
          max-[600px]:px-[18px]

          max-[480px]:mt-[36px]
          max-[480px]:px-[16px]
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-[16px]

            sm:gap-[20px]

            md:gap-[24px]

            lg:grid-cols-[1.52fr_1fr_1fr]
            lg:gap-[28px]

            xl:gap-[32px]

            /* =================================================
               TABLET
               
               Two columns:
               Couple = full-width top
               AI + Meal = side-by-side
            ================================================== */

            max-[1023px]:grid-cols-2
            max-[1023px]:gap-[20px]

            /* =================================================
               MOBILE
            ================================================== */

            max-[767px]:grid-cols-1
            max-[767px]:gap-[16px]
          "
        >
          {/* =================================================
              CARD 1 — COUPLE IMAGE
          ================================================= */}

          <article
            className="
              group
              relative
              min-w-0
              w-full
              overflow-hidden
              rounded-[18px]
              bg-surface-light

              min-[375px]:rounded-[20px]

              lg:min-h-[388px]
              lg:rounded-[20px]

              /* =================================================
                 TABLET
              ================================================== */

              max-[1023px]:col-span-2
              max-[1023px]:rounded-[20px]

              /* =================================================
                 MOBILE
              ================================================== */

              max-[767px]:col-span-1
            "
          >
            <div
              className="
                relative
                w-full

                aspect-[1.35/1]

                min-[375px]:aspect-[1.4/1]

                sm:aspect-[1.5/1]

                lg:aspect-auto
                lg:min-h-[388px]

                /* =================================================
                   TABLET
                ================================================== */

                max-[1023px]:aspect-[2.2/1]

                /* =================================================
                   MOBILE
                ================================================== */

                max-[767px]:aspect-[1.45/1]

                max-[600px]:aspect-[1.4/1]

                max-[480px]:aspect-[1.35/1]
              "
            >
              <Image
                src={IMAGES.couple}
                alt="People using technology to support healthier living"
                fill
                sizes="
                  (max-width: 374px) calc(100vw - 32px),
                  (max-width: 767px) calc(100vw - 32px),
                  (max-width: 1023px) calc(100vw - 64px),
                  (max-width: 1279px) 48vw,
                  556px
                "
                className="
                  object-cover
                  object-center

                  transition-transform
                  duration-700
                  ease-out

                  group-hover:scale-[1.025]
                "
              />

              {/* =================================================
                  IMAGE BLEND
              ================================================= */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-[90px]

                  bg-gradient-to-t
                  from-black/10
                  to-transparent

                  sm:h-[120px]

                  max-[1023px]:h-[110px]
                "
              />
            </div>
          </article>

          {/* =================================================
              CARD 2 — AI INSIGHTS
          ================================================= */}

          <article
            className="
              flex
              min-w-0
              w-full
              flex-col
              rounded-[18px]
              border
              border-border
              bg-accent-light

              p-[20px]

              min-[375px]:rounded-[20px]
              min-[375px]:p-[22px]

              sm:min-h-[368px]
              sm:rounded-[20px]
              sm:p-[28px]

              md:p-[32px]

              lg:min-h-0
              lg:p-[28px]

              xl:p-[32px]

              /* =================================================
                 TABLET
              ================================================== */

              max-[1023px]:min-h-[390px]
              max-[1023px]:rounded-[20px]
              max-[1023px]:p-[24px]

              /* =================================================
                 MOBILE
              ================================================== */

              max-[767px]:min-h-0
            "
          >
            {/* =================================================
                ICON
            ================================================= */}

            <HealthAIIcon />

            {/* =================================================
                CONTENT
            ================================================= */}

            <div
              className="
                flex
                min-w-0
                flex-1
                flex-col

                pt-[40px]

                min-[375px]:pt-[44px]

                sm:pt-[72px]

                md:pt-[80px]

                lg:pt-[48px]

                xl:pt-[56px]

                /* =================================================
                   TABLET
                ================================================== */

                max-[1023px]:pt-[52px]

                /* =================================================
                   MOBILE
                ================================================== */

                max-[767px]:pt-[40px]

                max-[480px]:pt-[36px]
              "
            >
              <h4
                className="
                  w-full
                  max-w-[430px]
                  break-words

                  font-primary
                  font-sans
                  text-[24px]
                  font-medium
                  leading-[1.08]
                  tracking-[-0.045em]
                  text-secondary

                  min-[375px]:text-[25px]

                  sm:text-h4

                  /* =================================================
                     TABLET
                  ================================================== */

                  max-[1023px]:text-[23px]
                  max-[1023px]:leading-[1.1]

                  /* =================================================
                     MOBILE
                  ================================================== */

                  max-[767px]:text-[24px]
                "
              >
                Optimise Your Health with AI Insights
              </h4>

              <p
                className="
                  mt-[14px]
                  w-full
                  max-w-[450px]

                  font-primary
                  text-[14px]
                  font-normal
                  leading-[1.55]
                  tracking-[-0.012em]
                  text-[#545454]

                  sm:mt-[16px]

                  /* =================================================
                     TABLET
                  ================================================== */

                  max-[1023px]:mt-[14px]
                  max-[1023px]:text-[13px]
                  max-[1023px]:leading-[1.5]

                  /* =================================================
                     MOBILE
                  ================================================== */

                  max-[767px]:text-[14px]
                "
              >
                Automatically track meals, monitor vitals and get
                real-time, condition-aware insights that improve every
                decision you make about your body.
              </p>

              {/* =================================================
                  CTA
              ================================================= */}

              <Link
                href="/ai"
                className="
                  mt-[22px]
                  flex
                  min-h-[50px]
                  w-full
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary-gradient
                  px-[20px]

                  font-primary
                  text-[15px]
                  font-medium
                  leading-none
                  !text-primary

                  shadow-button
                  transition-all
                  duration-200

                  hover:brightness-[0.96]
                  hover:shadow-card

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent
                  focus-visible:ring-offset-2

                  active:scale-[0.99]

                  sm:mt-[24px]
                  sm:h-[52px]
                  sm:text-[16px]

                  md:h-[54px]

                  lg:h-[52px]

                  xl:h-[54px]

                  /* =================================================
                     TABLET
                  ================================================== */

                  max-[1023px]:mt-auto
                  max-[1023px]:min-h-[50px]
                  max-[1023px]:h-[50px]
                  max-[1023px]:text-[14px]

                  /* =================================================
                     MOBILE
                  ================================================== */

                  max-[767px]:mt-[22px]
                  max-[767px]:h-[50px]
                  max-[767px]:min-h-[50px]
                  max-[767px]:text-[15px]
                "
              >
                Get Started
              </Link>
            </div>
          </article>

          {/* =================================================
              CARD 3 — HEALTHY MEAL
          ================================================= */}

          <article
            className="
              group
              min-w-0
              w-full
              overflow-hidden
              rounded-[18px]
              border
              border-border
              bg-surface-light

              min-[375px]:rounded-[20px]

              sm:min-h-[368px]
              sm:rounded-[20px]

              /* =================================================
                 TABLET
              ================================================== */

              max-[1023px]:min-h-[390px]
              max-[1023px]:rounded-[20px]

              /* =================================================
                 MOBILE
              ================================================== */

              max-[767px]:min-h-0
            "
          >
            {/* =================================================
                IMAGE
            ================================================= */}

            <div
              className="
                relative
                h-[210px]
                w-full
                overflow-hidden

                min-[375px]:h-[220px]

                min-[480px]:h-[240px]

                sm:h-[278px]

                /* =================================================
                   TABLET
                ================================================== */

                max-[1023px]:h-[255px]

                /* =================================================
                   MOBILE
                ================================================== */

                max-[767px]:h-[210px]

                max-[600px]:h-[220px]

                max-[480px]:h-[210px]
              "
            >
              <Image
                src={IMAGES.meal}
                alt="Healthy meal prepared for personalised nutrition"
                fill
                sizes="
                  (max-width: 374px) calc(100vw - 32px),
                  (max-width: 767px) calc(100vw - 32px),
                  (max-width: 1023px) calc((100vw - 84px) / 2),
                  (max-width: 1279px) 30vw,
                  361px
                "
                className="
                  object-cover
                  object-center
                  transition-transform
                  duration-700
                  ease-out

                  group-hover:scale-[1.025]
                "
              />
            </div>

            {/* =================================================
                TEXT
            ================================================= */}

            <div
              className="
                px-[18px]
                py-[16px]

                min-[375px]:px-[19px]

                sm:py-[17px]

                /* =================================================
                   TABLET
                ================================================== */

                max-[1023px]:px-[20px]
                max-[1023px]:py-[16px]

                /* =================================================
                   MOBILE
                ================================================== */

                max-[767px]:px-[18px]
                max-[767px]:py-[16px]
              "
            >
              <h4
                className="
                  w-full
                  max-w-[470px]
                  break-words

                  font-primary
                  font-sans
                  text-[21px]
                  font-medium
                  leading-[1.12]
                  tracking-[-0.03em]
                  text-[#000000]

                  min-[375px]:text-[22px]

                  min-[480px]:text-[23px]

                  sm:text-[24px]
                  sm:tracking-[-0.03em]

                  /* =================================================
                     TABLET
                  ================================================== */

                  max-[1023px]:text-[21px]
                  max-[1023px]:leading-[1.12]

                  /* =================================================
                     MOBILE
                  ================================================== */

                  max-[767px]:text-[21px]

                  max-[480px]:text-[20px]
                "
              >
                Private Health Suggestions Anytime - Anywhere
              </h4>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}