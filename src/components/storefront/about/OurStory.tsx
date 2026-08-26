"use client";

export default function OurStory() {
  return (
    <section
      id="our-story"
      aria-labelledby="our-story-title"
      className="
        relative
        w-full
        overflow-hidden
        py-[66px]
        px-[0px]
        max-[768px]:px-[16px]
        sm:px-[16px]
        max-[768px]:py-0
        
        
      "
    >
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1920px]
          grid-cols-1
          lg:grid-cols-[40.6%_59.4%]
        "
      >
        {/* =====================================================
            LEFT — SECTION LABEL
        ====================================================== */}

        <div
          className="
            flex
            items-start
            pb-[48px]
            max-[768px]:pb-[14px]

            lg:pb-0
          "
        >
          <div
            className="
              inline-flex
              h-[42px]
              min-w-[138px]
              items-center
              justify-center
              rounded-full
              border
              border-[#eeeeee]
              bg-white
              px-[22px]
              text-[15px]
              font-medium
              leading-none
              tracking-[-0.01em]
              text-[#16805b]
              shadow-[0_1px_4px_rgba(0,0,0,0.04)]

              sm:h-[44px]
              sm:min-w-[140px]
              sm:text-[15px]

              lg:h-[43px]
              lg:min-w-[139px]
              max-[768px]:text-[10px]
              max-[768px]:leading-[28px]
            "
          >
            OUR STORY
          </div>
        </div>

        {/* =====================================================
            RIGHT — STORY CONTENT
        ====================================================== */}

        <div
          className="
            w-full
            max-w-[1090px]
          "
        >
          {/* ---------------------------------------------------
              HEADING
          ---------------------------------------------------- */}

          <h2
            id="our-story-title"
            className="
              m-0
              max-w-[1080px]
              font-[var(--font-primary)]
              !text-[40px]
              font-medium
              !leading-[53px]
              tracking-[-4%]
              text-[#1a1a1a]

              sm:text-[36px]
              sm:leading-[1.1]

              

              lg:!text-[40px]
              lg:leading-[53px]
              max-[768px]:!text-[24px]
              max-[768px]:!leading-[32px]
              max-[768px]:tracking-[-4%]

            "
          >
            What started with a simple idea is evolving
            <br className="hidden lg:block" />
            into a smarter, more personalized approach to
            
            everyday health.
          </h2>

          {/* ---------------------------------------------------
              DESCRIPTION
          ---------------------------------------------------- */}

          <p
            className="
              mt-[38px]
              max-w-[1070px]
              font-[var(--font-primary)]
              text-[16px]
              font-normal
              leading-[28px]
              tracking-[-4%]
              text-[#5d5d5d]
              !mt-[24px]
              max-[768px]:text-[14px]
              max-[768px]:leading-[22px]
              max-[768px]:!mt-[16px]
            "
          >
            Meal Eats was created to rethink how people understand their
            health and make everyday choices. By bringing together AI,
            nutrition science, personalization, and continuous learning,
            we’re building a platform that understands each individual’s
            goals, lifestyle, habits, and needs — and turns that
            understanding into practical, meaningful guidance.
          </p>

          {/* =================================================
              STATISTICS
          ================================================== */}

          <div
            className="
              mt-[54px]
              grid
              grid-cols-1
              gap-[38px]

              sm:grid-cols-3
              sm:gap-[28px]

              md:mt-[58px]
              md:gap-[40px]

              lg:mt-[58px]
              lg:grid-cols-3
              lg:gap-0
              max-[768px]:flex
            
            "
          >
            {/* -----------------------------------------------
                STAT 01
            ------------------------------------------------ */}

            <div className="flex flex-col">
              <span
                className="
                  font-accent
                  !text-[48px]
                  max-[768px]:!text-[40px]
                  max-[768px]:!leading-[53px]
                  font-normal
                  leading-none
                  tracking-[-4%]
                  text-[#1a1a1a]
                "
              >
                100%
              </span>

              <span
                className="
                  mt-[20px]
                  font-[var(--font-primary)]
                  text-[16px]
                  font-normal
                  leading-[28px]
                  tracking-[-4%]
                  text-[#5d5d5d]
                  max-[768px]:!text-[12px]
                  max-[768px]:!leading-[16px]
                  max-[768px]:!mt-[4px]
                "
              >
                Personalized to you
              </span>
            </div>

            {/* -----------------------------------------------
                STAT 02
            ------------------------------------------------ */}

            <div className="flex flex-col">
              <span
                className="
                   font-accent
                  !text-[48px]
                  font-normal
                  leading-none
                  tracking-[-4%]
                  text-[#1a1a1a]
                  max-[768px]:!text-[40px]
                  max-[768px]:!leading-[53px]
                "
              >
                100%
              </span>
              <span
                className="
                  mt-[20px]
                  font-[var(--font-primary)]
                  text-[16px]
                  font-normal
                  leading-[28px]
                  tracking-[-4%]
                  text-[#5d5d5d]
                  max-[768px]:!text-[12px]
                  max-[768px]:!leading-[16px]
                  max-[768px]:!mt-[4px]
                "
              >
                AI powered guidance
              </span>
            </div>

            {/* -----------------------------------------------
                STAT 03
            ------------------------------------------------ */}

            <div className="flex flex-col">
              <span
                className="
                   font-accent
                  !text-[48px]
                  font-normal
                  leading-none
                  tracking-[-4%]
                  text-[#1a1a1a]
                  max-[768px]:!text-[40px]
                  max-[768px]:!leading-[53px]
                "
              >
                100%
              </span>
              <span
                className="
                  mt-[20px]
                  font-[var(--font-primary)]
                  text-[16px]
                  font-normal
                  leading-[28px]
                  tracking-[-4%]
                  text-[#5d5d5d]
                  max-[768px]:!text-[12px]
                  max-[768px]:!leading-[16px]
                  max-[768px]:!mt-[4px]
                "
              >
                Complete wellness journey
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}