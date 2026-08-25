import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377085/mealeats/products/erp-dashboard.png";

export default function AIPlatformHero() {
  return (
    <section
      aria-labelledby="ai-platform-hero-heading"
      className="
        relative
        w-full
        overflow-hidden
        bg-primary
      "
    >
      <div className="container-content">
        <div
          className="
            grid
            min-h-[calc(100vh-100px)]
            items-center
          ]
            !pt-0
            py-[80px]
            pb-[57px]
            max-[768px]:pt-0
            max-[768px]:px-[16px]
            lg:grid-cols-[minmax(0,1fr)_680px]
      
            lg:py-[72px]
            lg:pb-[65px]
            
          "
        >
          {/* =====================================================
              HERO CONTENT
          ===================================================== */}

          <div className="relative z-10 flex flex-col items-start">
            {/* Eyebrow */}

            <div
              className="
                mb-[16px]
                inline-flex
                items-center
                rounded-full
                border
                border-border-light
                bg-accent-light
                px-[12px]
                py-[6px]
              "
            >
              <span
                className="
                  flex
                  items-center
                  font-primary
                  text-[10px]
                  font-medium
                  uppercase
                  leading-none
                  tracking-[0.04em]
                  !text-[#007246]
                "
              >
                <Image
                  src="https://res.cloudinary.com/gppcmjpt/image/upload/v1787377070/mealeats/products/ai-platform-stars.png"
                  alt=""
                  width={15}
                  height={15}
                  aria-hidden="true"
                  className="mr-[3px] h-[15px] w-[15px] object-contain"
                />
                Your best healthcare tool
              </span>
            </div>

            {/* Heading */}

            <h1
              id="ai-platform-hero-heading"
              className="
                max-w-[700px]
                font-primary
                !text-h2
                max-[768px]:text-[27px]
                max-[768px]:leading-[41px]
                font-medium
                leading-[69px]
                !tracking-[-4%]
                text-secondary
              "
            >
             Meals That Match 
              <br />
              Your Lifestyle
            </h1>

            {/* Description */}

            <p
              className="
                mt-[16px]
                max-w-[590px]
                font-primary
                text-caption
                max-[768px]:text-[16px]
                max-[768px]:leading-[22px]
                max-[768px]:!mt-[8px]
                font-normal
                leading-[1.55]
                text-text-muted
              "
            >
             Meal Eats is designed around one idea: a recommendation is only useful if you understand why it was made.
            </p>

            {/* CTA */}

            <Link
              href="#contact"
              className="
                mt-[24px]
                inline-flex
                min-h-[48px]
                max-[768px]:w-full
                items-center
                justify-center
                rounded-full
                bg-primary-gradient
                px-[24px]
                py-[12px]
                font-primary
                !text-cta
                font-medium
                leading-none
                !text-primary
                shadow-button
                transition-[transform,box-shadow]
                duration-[var(--transition-normal)]
                hover:-translate-y-[1px]
                hover:shadow-card
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent
                focus-visible:ring-offset-2
              "
            >
              Book a Demo
            </Link>
          </div>

          {/* =====================================================
              HERO VISUAL
          ===================================================== */}

          <div
            className="
              relative
              max-[768px]:mt-[37px]
              z-10
              w-full
              min-w-0
              lg:-mr-[24px]
            "
          >
            <Image
              src='https://res.cloudinary.com/gppcmjpt/image/upload/v1787377073/mealeats/products/altplatformheromobile.png'
              alt="MealEats AI health platform dashboard"
              width={2048}
              height={1308}
              quality={90}
              priority
              sizes="(max-width: 1023px) 100vw, 575px"
              className="
              min-[768px]:hidden
                block
                h-auto
                w-full
                object-contain
              "
            />
            <Image
              src={HERO_IMAGE}
              alt="MealEats AI health platform dashboard"
              width={2048}
              height={1308}
              quality={90}
              priority
              sizes="(max-width: 1023px) 100vw, 575px"
              className="
              max-[768px]:hidden
                block
                h-auto
                w-full
                object-contain
              "
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          DESKTOP VISUAL ACCENT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-180px]
          top-[30%]
          z-0
          hidden
          h-[420px]
          w-[420px]
          rounded-full
          bg-accent/5
          blur-[100px]
          lg:block
        "
      />
    </section>
  );
}