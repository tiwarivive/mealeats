import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "/hero-hand.png";
const HERO_BACKGROUND = "https://res.cloudinary.com/gppcmjpt/image/upload/v1787396914/hero-bg.png";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-primary
        text-text
        mt-[-103px]

        lg:pt-[60px]
        xl:pt-[60px]

        max-[767px]:pt-[60px]
        max-[480px]:pt-[60px]
      "
    >
      {/* =========================================================
          HERO BACKGROUND
          DESKTOP DESIGN UNCHANGED
      ========================================================= */}

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
          priority
          sizes="100vw"
          draggable={false}
          className="
            select-none
            object-cover
            object-center
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-primary/15
          "
        />
      </div>

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}

      <div
        className="
          container-page
          max-[768px]:mt-[22px]
          relative
          z-10
          mx-auto
          flex
          w-full
          flex-col
          items-center
          text-center

          px-[var(--spacing-page)]

          pt-[54px]

          max-[1024px]:pt-[50px]

          max-[767px]:px-[16px]
         

          max-[480px]:px-[16px]
         

          max-[375px]:px-[16px]
         
          pt-[103px]
        "
      >
        {/* =======================================================
            EYEBROW
        ======================================================= */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-[6px]
            font-primary
            text-[13px]
            tracking-[-3%]
            font-[400]
            font-[#007246]
            uppercase
            leading-[28px]
            text-[#007246]

            max-[767px]:text-[10px]
            max-[480px]:text-[10px]
      
          "
        >
          <Image src='https://res.cloudinary.com/gppcmjpt/image/upload/v1787377070/mealeats/products/ai-platform-stars.png' alt="ai-platform-stars" height={12} width={12} className="h-[12px] w-[12px] mr-[2.5px]" />

          YOUR PERSONAL AI FOOD COMPANION
        </div>

        {/* =======================================================
            MAIN HEADING
            DESKTOP UNCHANGED
            MOBILE REFINED
        ======================================================= */}

        <h1
          id="hero-heading"
          className="
            mt-[20px]
            w-full
            max-w-[900px]
            font-primary
            text-[64px]
            font-medium
            leading-[0.98]
            tracking-[-0.058em]
            text-secondary

            max-[1280px]:max-w-[800px]
            max-[1280px]:text-[58px]

            max-[1024px]:max-w-[700px]
            max-[1024px]:text-[50px]
            max-[1024px]:leading-[1]

            /* MOBILE */
            max-[767px]:mt-[18px]
            max-[767px]:max-w-[620px]
            max-[767px]:px-[8px]
            max-[767px]:text-[42px]
            max-[767px]:leading-[1.03]
            max-[767px]:tracking-[-0.052em]

            max-[600px]:max-w-[500px]
            max-[600px]:px-0
            max-[600px]:text-[37px]
            max-[600px]:leading-[1.04]

            max-[480px]:mt-[17px]
            max-[480px]:max-w-[350px]
            max-[480px]:text-[31px]
            max-[480px]:leading-[1.07]
            max-[480px]:tracking-[-0.048em]

            max-[375px]:max-w-[340px]
            max-[375px]:text-[32px]
            max-[375px]:leading-[41px]
          "
        >
          Smart Food.Better{" "}
          <span className="block">
            You.{" "}
            <span
              className="
                font-accent
                !font-normal
                italic
                tracking-[-0.04em]
              "
            >
              Every Day
            </span>
          </span>
        </h1>

        {/* =======================================================
            DESCRIPTION
        ======================================================= */}

        <p
          className="
            !mt-[8px]
            w-full
            max-w-[680px]
            font-primary
            text-[16px]
            font-normal
            leading-[22px]
            tracking-[-4%]
            text-text-muted

            max-[1024px]:max-w-[600px]
            max-[1024px]:text-[14px]

            /* MOBILE */
            max-[767px]:mt-[20px]
            max-[767px]:max-w-[540px]
            max-[767px]:text-[13.5px]
            max-[767px]:leading-[1.48]

            max-[600px]:mt-[18px]
            max-[600px]:max-w-[460px]
            max-[600px]:text-[13px]
            max-[600px]:leading-[1.5]

            max-[480px]:mt-[17px]
            max-[480px]:max-w-[345px]
            max-[480px]:text-[12px]
            max-[480px]:leading-[1.52]

            max-[375px]:mt-[16px]
            max-[375px]:max-w-[330px]
            max-[375px]:text-[11.5px]
            max-[375px]:leading-[1.52]
          "
        >
          Meal Eats is your personal AI food companion that learns your food preferences, lifestyle, goals and everyday eating patterns to help you make smarter food decisions.
        </p>

        {/* =======================================================
            CTA GROUP
        ======================================================= */}

        <div
          className="
            mt-[25px]
            flex
            flex-wrap
            items-center
            justify-center
            gap-[10px]

            max-[1024px]:mt-[23px]

            max-[767px]:mt-[21px]
            max-[767px]:gap-[8px]

            max-[600px]:mt-[20px]
            max-[600px]:gap-[7px]

            max-[480px]:mt-[18px]
            max-[480px]:gap-[7px]

            max-[375px]:mt-[17px]
            max-[375px]:gap-[6px]
          "
        >
          {/* =====================================================
              PRIMARY CTA
          ===================================================== */}

          <Link
            href="/ai"
            className="
              inline-flex
              !tracking-[-4%]
              h-[42px]
              max-[370px]:!px-[15px]
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-primary-gradient
              px-[20px]
              font-primary
              font-medium
              leading-none
              !text-primary
              shadow-button
              outline-none
              transition-[filter,box-shadow,transform]
              duration-200
              ease-out
              hover:-translate-y-px
              hover:brightness-[0.96]
              hover:shadow-card
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent
              focus-visible:ring-offset-2

              lg:text-body
              lg:leading-[28px]
              lg:tracking-[-4%]
              lg:font-[500]
              lg:!min-w-[219px]
              lg:h-[48px]
              max-[768px]:!h-[44px]
              max-[768px]:text-[14px]
              max-[768px]:px-[28px]
              max-[768px]:!font-medium

            

            "
          >
            <Image src='https://res.cloudinary.com/gppcmjpt/image/upload/v1787398839/tryaistar.png' alt="ai-platform-stars" height={15} width={15} className="h-[15px] w-[15px] mr-[6.8px]" />

            Try Meal Eats AI
          </Link>

          {/* =====================================================
              SECONDARY CTA
          ===================================================== */}

          <Link
            href="#contact"
            className="
              inline-flex
              tracking-[-4%]
              h-[42px]
              max-[370px]:!px-[15px]
              min-w-[148px]
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-border
              bg-primary
              px-[20px]
              font-primary
              text-[13px]
              font-medium
              leading-none
              text-secondary
              shadow-sm
              outline-none
              transition-[border-color,background-color,box-shadow,transform]
              duration-200
              ease-out
              hover:-translate-y-px
              hover:border-accent
              hover:bg-surface-light
              hover:shadow-card
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent
              focus-visible:ring-offset-2

              max-[1024px]:h-[40px]
              max-[1024px]:text-[12px]

              lg:!text-body
              lg:leading-[28px]
              lg:tracking-[-4%]
              lg:font-[500]
              lg:!min-w-[219px]
              lg:!h-[48px]

              max-[768px]:h-[44px]
              max-[768px]:!px-[28px]
              max-[768px]:!text-[14px]
              max-[768px]:font-medium
            "
          >
            Build My Food Profile
          </Link>
        </div>

        <p className=" max-[768px]:leading-[22px] max-[768px]:!mt-[16px] text-[18px] leading-[69px] text-[#55820C] text-center mt-[24px] font-primary">Personalized to You  •  Built Around Real Food  •  Designed for Everyday Life</p>

        {/* =======================================================
            PHONE / HAND VISUAL
        ======================================================= */}

        <div
          className="
            relative
            mt-[34px]
            h-[455px]
            w-full
            max-w-[760px]

            max-[1280px]:mt-[32px]
            max-[1280px]:h-[430px]
            max-[1280px]:max-w-[700px]

            max-[1024px]:mt-[30px]
            max-[1024px]:h-[390px]
            max-[1024px]:max-w-[620px]

            /* =================================================
               MOBILE
               ================================================= */

            max-[767px]:mt-[28px]
            max-[767px]:h-[330px]
            max-[767px]:max-w-[540px]

            max-[600px]:mt-[25px]
            max-[600px]:h-[300px]
            max-[600px]:max-w-[470px]

            max-[480px]:mt-[23px]
            max-[480px]:h-[285px]
            max-[480px]:max-w-[390px]

            max-[375px]:mt-[22px]
            max-[375px]:h-[270px]
            max-[375px]:max-w-[350px]
          "
        >
          {/* =====================================================
              PHONE IMAGE WRAPPER
          ===================================================== */}

          <div
            className="
              absolute
              left-1/2
              top-0
              z-10
              -translate-x-1/2

              w-[760px]

              max-[1280px]:w-[700px]
              max-[1024px]:w-[620px]

              /* MOBILE */
              max-[767px]:top-[0px]
              max-[767px]:w-[540px]

              max-[600px]:w-[470px]

              max-[480px]:w-[390px]

              max-[375px]:w-[350px]
            "
          >
            <Image
              src={HERO_IMAGE}
              alt="Hand holding the Meal Eats AI health assistant"
              width={1024}
              height={1024}
              priority
              draggable={false}
              sizes="
                (max-width: 375px) 350px,
                (max-width: 480px) 390px,
                (max-width: 600px) 470px,
                (max-width: 767px) 540px,
                (max-width: 1024px) 620px,
                (max-width: 1280px) 700px,
                760px
              "
              className="
                block
                h-auto
                w-full
                select-none
                scale-[1.2]
                mt-[30px]
                object-contain
                max-[768px]:scale-[1.5]
                max-[768px]:mt-[59px]
              "
            />
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM FADE
          DESKTOP UNCHANGED
      ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-20
          h-[105px]

          max-[767px]:h-[78px]
          max-[600px]:h-[70px]
          max-[480px]:h-[62px]
          max-[375px]:h-[56px]
        "
        style={{
          background: `
            linear-gradient(
              to top,
              var(--color-primary) 0%,
              rgba(255, 255, 255, 0.98) 28%,
              rgba(255, 255, 255, 0.82) 48%,
              rgba(255, 255, 255, 0.45) 70%,
              rgba(255, 255, 255, 0) 100%
            )
          `,
        }}
      />
    </section>
  );
}