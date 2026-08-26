"use client";

import Image from "next/image";

const HERO_IMAGES = {
  main: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377066/mealeats/products/about-hero-main.png",
  side: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377067/mealeats/products/about-hero-side.png",
};

export default function Hero() {
  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative w-full overflow-hidden bg-white 
        
        max-[768px]:px-[16px]
        sm:px-[16px] mx-auto"
    >
      <div
        className="
          mx-auto
          w-full
          px-5
          pb-[72px]
          pt-[36px]
          max-[768px]:!px-0
          sm:pb-[88px]
          sm:pt-[44px]

          lg:px-10
          lg:pb-[70px]
          lg:pt-[32px]
          

          xl:px-0
          max-[768px]:!pb-[64px]
        "
      >
        {/* =========================================================
            HERO INTRO
        ========================================================= */}

        <div
          className="
            w-full
            max-w-[1180px]
          "
        >
          <h2
            id="about-hero-title"
            className="
              m-0
              max-w-[850px]
              text-[#1A1A1A]
font-primary
              text-h2
              font-[500]
              
            
              leading-[69px]
              tracking-[-4%]
              max-[768px]:!text-[28px]
              max-[768px]:!leading-[140%]

             
            "
          >
            AI that understands{" "}
            <span
              className="
                !font-serif
                itali
                !font-[400]
                tracking-[-4%]
              "
            >
              How You
            </span>
            <br className="sm:!hidden" />

            <span
              className="
                !font-serif
                italic
                !font-[300]
                tracking-[-0.055em]
              "
            >
              Live,
            </span>{" "}
            not just what you ask.
          </h2>

          <p
            className="
              !mt-[16px]
              max-w-[920px]
              text-[#545454]
              font-primary

              text-body
              font-normal
              leading-[1.55]
              tracking-[-0.01em]

             
            "
          >
            Meal Eats brings together personalization, intelligence, and
            continuous learning to help you make smarter decisions
            <br className="hidden sm:block" />
            every day — with recommendations built around you, not generic
            advice.
          </p>
        </div>

        {/* =========================================================
            HERO MEDIA
        ========================================================= */}

        <div
          className="
            mt-7
            grid
            w-full
            grid-cols-1
            gap-3

            sm:mt-9
            sm:gap-4

            lg:mt-10
            lg:grid-cols-[minmax(0,2.15fr)_minmax(300px,0.65fr)]
            lg:gap-[18px]

            xl:mt-[42px]
            xl:grid-cols-[minmax(0,1118px)_minmax(0,508px)]
            xl:gap-[28px]
          "
        >
          {/* =======================================================
              MAIN IMAGE
          ======================================================= */}

          <div
            className="
              relative
              aspect-[1.77/1]
              w-full
              overflow-hidden
              rounded-[18px]
              bg-[#eeeeee]

              sm:rounded-[20px]

              lg:aspect-auto
              lg:h-[615px]
              lg:rounded-[20px]

              xl:h-[615px]
            "
          >
            <Image
              src={HERO_IMAGES.main}
              alt="Woman preparing a healthy meal in a kitchen"
              fill
              sizes="(max-width: 639px) 100vw,(max-width: 1023px) 100vw,70vw"
              className="
                object-cover
                object-center
              "
            />
          </div>

          {/* =======================================================
              RIGHT COLUMN
          ======================================================= */}

          <div
            className="
              grid
              w-full
              grid-cols-1
              gap-3

              sm:grid-cols-2
              sm:gap-4

              lg:flex
              lg:flex-col
              lg:gap-[18px]
          "
          >
            {/* -------------------------------------------------------
                SECONDARY IMAGE
            ------------------------------------------------------- */}

            <div
              className="
                relative
                aspect-[1.8/1]
                w-full
                overflow-hidden
                rounded-[18px]
                bg-[#eeeeee]

                sm:aspect-auto
                sm:h-[260px]

                lg:h-[275px]
                lg:rounded-[20px]

                xl:h-[275px]
              "
            >
              <Image
                src={HERO_IMAGES.side}
                alt="Person exercising at home"
                fill
                sizes="(max-width: 639px) 100vw,(max-width: 1023px) 50vw,32vw"
                className="
                  object-cover
                  object-center
                "
              />
            </div>

            {/* -------------------------------------------------------
                TESTIMONIAL
            ------------------------------------------------------- */}

            <div
              className="
                flex
                min-h-[250px]
                w-full
                flex-col
                justify-between
                overflow-hidden
                rounded-[18px]
                bg-[#151515]
                px-7
                py-7
                text-white

                sm:min-h-[260px]
                sm:px-7
                sm:py-7

                lg:min-h-0
                lg:h-[322px]
                lg:rounded-[20px]
                lg:px-[32px]
                lg:py-[31px]

                xl:h-[322px]
                xl:px-[32px]
                xl:py-[31px]
              "
            >
              {/* Rating */}

              <div
                className="
                  flex
                  items-center
                  gap-[17px]
                "
              >
                <div
                  aria-label="5 out of 5 stars"
                  className="
                    flex
                    items-center
                    gap-[3px]
                    text-[#78B82A]
                  "
                >
                  <Star />
                  <Star />
                  <Star />
                  <Star />

                  <Star
                    className="text-[#e4e4e4]"
                  />
                </div>

                <span
                  className="
                    text-[15px]
                    font-normal
                    leading-none
                    tracking-[-0.02em]
                    text-[#e8e8e8]
                  "
                >
                  5.0
                </span>
              </div>

              {/* Quote */}

              <blockquote
                className="
                  m-0
                  max-w-[390px]
                  text-[#eeeeee]

                  text-[17px]
                  font-normal
                  leading-[1.48]
                  tracking-[-0.025em]

                  sm:text-[17px]

                  lg:text-[18px]
                  lg:leading-[1.5]

                  xl:text-[19px]
                "
              >
                “Meal Eats feels like having an AI that actually knows you.
                The recommendations are personalized, explainable, and get
                smarter the more you use it.”
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===============================================================
   STAR ICON
================================================================ */

function Star({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-[19px] w-[19px] ${className}`}
      fill="currentColor"
    >
      <path d="M12 2.5l2.91 5.9 6.51.95-4.71 4.59 1.11 6.49L12 17.37l-5.82 3.06 1.11-6.49-4.71-4.59 6.51-.95L12 2.5z" />
    </svg>
  );
}