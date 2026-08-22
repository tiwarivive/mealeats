"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

/* =========================================================
   LOGO DATA
========================================================= */

const logos = [
  {
    name: "Humana",
    src: "/humana.png",
    width: 250,
    height: 67,
  },
  {
    name: "Centene Corporation",
    src: "/centene.png",
    width: 250,
    height: 78,
  },
  {
    name: "American Airlines",
    src: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377074/mealeats/products/american-airlines.png",
    width: 210,
    height: 87,
  },
  {
    name: "American International Blue Cross",
    src: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377075/mealeats/products/blue-cross.png",
    width: 152,
    height: 87,
  },
  {
    name: "Sixt",
    src: "/sixt.png",
    width: 170,
    height: 74,
  },
];

/* =========================================================
   LOGO SET

   IMPORTANT:
   Each set is exactly 50% of the 200% animation track.

   This removes the dependency on 100vw and makes the
   carousel work correctly even when the parent has a
   constrained width.
========================================================= */

function LogoSet() {
  return (
    <div
      className="
        flex
        w-1/2
        min-w-0
        shrink-0
        items-center
        justify-between

        gap-[8px]
        px-[12px]

        min-[375px]:gap-[10px]
        min-[375px]:px-[14px]

        min-[480px]:gap-[14px]
        min-[480px]:px-[18px]

        sm:gap-[20px]
        sm:px-[24px]

        md:gap-[28px]
        md:px-[36px]

        lg:gap-[40px]
        lg:px-[48px]

        xl:gap-[48px]
        xl:px-[64px]
      "
    >
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="
            flex
            min-w-0
            flex-1
            items-center
            justify-center

            h-[44px]

            sm:h-[48px]
            md:h-[52px]
            lg:h-[56px]
            xl:h-[60px]
          "
        >
          <Image
            src={logo.src}
            alt={`${logo.name} logo`}
            width={logo.width}
            height={logo.height}
            draggable={false}
            priority={false}
            sizes="
              (max-width: 374px) 18vw,
              (max-width: 479px) 19vw,
              (max-width: 639px) 20vw,
              (max-width: 767px) 21vw,
              (max-width: 1023px) 18vw,
              (max-width: 1279px) 16vw,
              190px
            "
            className="
              block
              h-auto
              w-auto
              max-h-full
              max-w-[58px]

              min-[375px]:max-w-[64px]
              min-[400px]:max-w-[70px]
              min-[480px]:max-w-[84px]

              sm:max-w-[110px]
              md:max-w-[140px]
              lg:max-w-[175px]
              xl:max-w-[190px]

              select-none
              object-contain

              opacity-40
              grayscale

              transition-opacity
              duration-300
              ease-out
            "
          />
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   TRUSTED COMPANIES
========================================================= */

export default function TrustedCompanies() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="trusted-companies"
      aria-labelledby="trusted-companies-title"
      className="
        relative
        w-full
        overflow-hidden
        bg-primary
      "
    >
      {/* =====================================================
          TITLE
      ====================================================== */}

      <div
        className="
          container-content
          mx-auto
          flex
          w-full
          items-center
          justify-center

          px-[16px]

          min-[480px]:px-[20px]

          md:px-[24px]

          lg:px-[32px]
        "
      >
        <h2
          id="trusted-companies-title"
          className="
            m-0
            w-full
            text-center
            font-primary
            text-[24px]
            font-medium
            leading-[1.15]
            tracking-[-0.045em]
            text-secondary

            max-[767px]:text-[22px]

            max-[600px]:text-[21px]

            max-[480px]:text-[20px]
            max-[480px]:leading-[26px]

            max-[375px]:text-[19px]
            max-[375px]:leading-[24px]
          "
        >
          Trusted by Companies
        </h2>
      </div>

      {/* =====================================================
          LOGO CAROUSEL
      ====================================================== */}

      <div
        className="
          relative
          mt-[32px]
          w-full
          overflow-hidden

          max-[767px]:mt-[28px]

          max-[600px]:mt-[26px]

          max-[480px]:mt-[24px]

          max-[375px]:mt-[22px]

          sm:mt-[36px]

          md:mt-[40px]

          lg:mt-[44px]

          xl:mt-[48px]
        "
      >
        {/* ===================================================
            LEFT FADE
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20

            w-[16px]

            bg-gradient-to-r
            from-primary
            to-transparent

            min-[375px]:w-[20px]

            min-[480px]:w-[24px]

            sm:w-[44px]

            md:w-[64px]

            lg:w-[90px]

            xl:w-[110px]
          "
        />

        {/* ===================================================
            RIGHT FADE
        ==================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-20

            w-[16px]

            bg-gradient-to-l
            from-primary
            to-transparent

            min-[375px]:w-[20px]

            min-[480px]:w-[24px]

            sm:w-[44px]

            md:w-[64px]

            lg:w-[90px]

            xl:w-[110px]
          "
        />

        {/* ===================================================
            ANIMATION TRACK

            Two sets = 200% total width.

            Each LogoSet = 50%.

            Animation:
              0%   -> first set
              -50% -> exactly one complete set

            This is more reliable than -100vw because it
            depends on the actual component width instead
            of the browser viewport width.
        ==================================================== */}

        <motion.div
          className="
            flex
            w-[200%]
            min-w-0
            shrink-0
            items-center
            will-change-transform
          "
          initial={{
            x: "0%",
          }}
          animate={
            shouldReduceMotion
              ? {
                  x: "0%",
                }
              : {
                  x: "-50%",
                }
          }
          transition={
            shouldReduceMotion
              ? {
                  duration: 0,
                }
              : {
                  duration: 28,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }
          }
        >
          <LogoSet />
          <LogoSet />
        </motion.div>
      </div>

      {/* =====================================================
          BOTTOM SPACE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          h-[32px]

          max-[767px]:h-[28px]

          max-[480px]:h-[24px]

          max-[375px]:h-[20px]

          sm:h-[32px]

          md:h-[36px]

          lg:h-[40px]
        "
      />
    </section>
  );
}