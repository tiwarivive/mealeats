import Image from "next/image";
import Link from "next/link";
import SectionBadge from "../about/SectionBadge";

const HERO_BACKGROUND = "/hero-sectio.png";
const HERO_DASHBOARD = "/heromiddle image.png";

export default function KnowledgeHero() {
  return (
    <section
      aria-labelledby="knowledge-hero-heading"
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-accent-light
        mt-[-112px]
        max-[768px]:mt-0

        /* =========================
           MOBILE
        ========================= */
        pt-[18px]
        pb-[30px]

        /* =========================
           SMALL TABLET
        ========================= */
        sm:pt-[28px]
        sm:pb-[50px]

        /* =========================
           DESKTOP
        ========================= */
        lg:pt-[44px]
        lg:pb-[92px]
      "
    >
      <div
        className="
          container-content
          mt-[112px]
          relative
          z-10
          w-full
        "
      >
        {/* =====================================================
            HERO CONTENT WRAPPER
        ===================================================== */}

        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[1220px]
          "
        >
          {/* =================================================
              LEFT FLOATING CARD

              Desktop/tablet only.
              Hidden on mobile because the mobile reference
              does not show these cards.
          ================================================= */}

          <Image
            src="/knowledge-left.png"
            alt=""
            width={237}
            height={117}
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[-7%]
              top-[42px]
              z-20
              hidden
              h-auto
              w-[18%]
              max-w-[237px]
              select-none
              object-contain

              sm:block
              sm:left-[4%]
              sm:top-[46px]
              sm:w-[19%]

              lg:left-[-7%]
              lg:top-[48px]
              lg:w-[19.5%]
            "
          />

          {/* =================================================
              RIGHT FLOATING CARD

              Desktop/tablet only.
          ================================================= */}

          <Image
            src="/knowledge-right.png"
            alt=""
            width={237}
            height={117}
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-[-7%]
              top-[72px]
              z-20
              hidden
              h-auto
              w-[18%]
              max-w-[237px]
              select-none
              object-contain

              sm:block
              sm:right-[4%]
              sm:top-[76px]
              sm:w-[19%]

              lg:right-[-8%]
              lg:top-[78px]
              lg:w-[19.5%]
            "
          />

          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              mx-auto
              flex
              w-full
              flex-col
              items-center
              text-center

              /* Mobile */
              max-w-[340px]

              /* Tablet */
              sm:max-w-[600px]

              /* Desktop */
              lg:max-w-[780px]
            "
          >
            {/* =================================================
                EYEBROW
            ================================================= */}

              <SectionBadge>Knowledge Hub</SectionBadge>
           

            {/* =================================================
                MAIN HEADING
            ================================================= */}

            <h1
              id="knowledge-hero-heading"
              className="
                /* =========================
                   MOBILE
                ========================= */
                mt-[3px]
                max-w-[300px]
                font-primary
                text-[19px]
                font-medium
                leading-[22px]
                tracking-[-0.7px]
                text-secondary

                /* =========================
                   SMALL TABLET
                ========================= */
                sm:mt-[8px]
                sm:max-w-[500px]
                sm:text-[30px]
                sm:leading-[34px]
                sm:tracking-[-1.4px]

                /* =========================
                   DESKTOP
                ========================= */
                lg:mt-[14px]
                lg:max-w-[760px]
                lg:!text-h2
                lg:leading-[69px]
                lg:tracking-[-4%]
                max-[768px]:!text-[28px]
                max-[768px]:!leading-[41px]
                max-[768px]:!max-w-full
              "
            >
              Understand Your Health.
              <br />
              Make Better Choices.
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                /* Mobile */
                mt-[7px]
                max-w-[300px]
                font-primary
                text-[7px]
                font-normal
                leading-[10px]
                text-text-muted

                /* Tablet */
                sm:mt-[10px]
                sm:max-w-[460px]
                sm:text-[10px]
                sm:leading-[15px]

                /* Desktop */
                lg:mt-[12px]
                lg:max-w-[570px]
                lg:text-body
                lg:leading-[28px]
                      max-[768px]:!text-[16px]
                max-[768px]:!leading-[22px]
               
              "
            >
              MealEats is designed around one idea: a recommendation is only
              useful if you understand why it was made.
            </p>

            {/* =================================================
                CTA
            ================================================= */}

            <Link
              href="/ai"
              aria-label="Try MealEats AI"
              className="
                /* =========================
                   MOBILE
                ========================= */
                mt-[11px]
                flex
                h-[28px]
                w-[calc(100vw-10px)]
                max-w-[330px]
                shrink-0
                items-center
                justify-center
                gap-[5px]
                rounded-full
                bg-primary-gradient
                px-[12px]
                font-primary
                text-[7px]
                font-medium
                leading-none
                !text-primary
                shadow-button

                transition-[transform,filter,box-shadow]
                duration-[var(--transition-normal)]
                ease-out

                hover:-translate-y-px
                hover:brightness-[0.97]
                hover:shadow-card

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent
                focus-visible:ring-offset-2

                active:translate-y-0

                motion-reduce:transition-none
                motion-reduce:hover:transform-none

                /* =========================
                   TABLET
                ========================= */
                sm:mt-[15px]
                sm:h-[36px]
                sm:w-auto
                sm:max-w-none
                sm:px-[18px]
                sm:text-[9px]

                /* =========================
                   DESKTOP
                ========================= */
                lg:mt-[18px]
                lg:h-[48px]
                lg:gap-[7px]
                lg:px-[18px]
                lg:!text-[16px]
                      max-[768px]:h-[40]
                max-[768px]:!text-[14px]
                max-[768px]:!leading-[24px]
              "
            >
              <span
                aria-hidden="true"
                className="
                  shrink-0
                  text-[9px]
                  leading-none

                  sm:text-[10px]

                  lg:text-[12px]
                "
              >
                ✧
              </span>

              <span>Try MealEats AI</span>
            </Link>
          </div>
        </div>

        {/* =====================================================
            HERO VISUAL
        ===================================================== */}

        <div
          className="
            relative
            mx-auto
            w-full

            /* Mobile */
            mt-[17px]
            max-w-[1220px]

            /* Tablet */
            sm:mt-[30px]

            /* Desktop */
            lg:mt-[50px]
          "
        >
          <div
            className="
              relative
              mx-auto
              aspect-[2048/1303]

              /* =========================
                 MOBILE
              ========================= */
              w-[calc(100%-10px)]
              max-w-[1120px]

              /* =========================
                 TABLET
              ========================= */
              sm:w-[calc(100%-32px)]

              /* =========================
                 DESKTOP
              ========================= */
              lg:w-[calc(100%-80px)]
            "
          >
            {/* =================================================
                BACKGROUND ARTWORK
            ================================================= */}

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
              <Image
                src={HERO_BACKGROUND}
                alt=""
                fill
                sizes="
                  (max-width: 639px) calc(100vw - 10px),
                  (max-width: 1023px) calc(100vw - 32px),
                  (max-width: 1279px) calc(100vw - 80px),
                  1120px
                "
                className="
                  object-contain
                  object-top
                  select-none
                "
              />
            </div>

            {/* =================================================
                DASHBOARD IMAGE
            ================================================= */}

            <div
              className="
                absolute
                inset-x-0
                top-0
                z-10
                mx-auto
                w-full
              "
            >
              <Image
                src={HERO_DASHBOARD}
                alt="MealEats AI health assistant interface"
                width={2048}
                height={1303}
                priority
                quality={85}
                sizes="
                  (max-width: 639px) calc(100vw - 10px),
                  (max-width: 1023px) calc(100vw - 32px),
                  (max-width: 1279px) calc(100vw - 80px),
                  1120px
                "
                className="
                  block
                  h-auto
                  w-full
                  select-none
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}