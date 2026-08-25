"use client";

import Image from "next/image";

type DecisionCard = {
  title: string;
  description: string;
  gif: string;
};

const decisionCards: DecisionCard[] = [
  {
    title: "Personalized for You",
    description:
      "Meal Eats is designed around the preferences and information you choose to share rather than treating everyone the same.",
    gif: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377142/mealeats/products/personalised.gif",
  },
  {
    title: "Practical for Real Life",
    description:
      "Start with everyday questions: What can I cook? What should I eat? What do I already have? What will I need this week?",
    gif: "/practicallife.gif",
  },
  {
    title: "Understand Your Food",
    description:
      "Go beyond recommendations and understand the estimated nutrition and reasoning behind everyday food choices.",
    gif: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377122/mealeats/products/ingredinets.gif",
  },
  {
    title: "You're Always in Control",
    description:
      "Meal Eats helps organize information and options. You decide what to cook, change, skip, plan or buy.",
    gif: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377138/mealeats/products/nutiritionsscore.gif",
  },
];

export default function LessGuessingSection() {
  return (
    <section
      aria-labelledby="less-guessing-title"
      className="
        relative
        w-full
        overflow-hidden
        bg-primary
        px-4

        pt-[104px]
        pb-[120px]


        max-[480px]:px-3
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-content
        "
      >
        {/* =====================================================
            EYEBROW
        ====================================================== */}

        <p
          className="
            mb-[12px]
            w-fit
            !mx-auto
            rounded-full
            bg-[#F4F4F433]
            px-[12px]
            py-[5px]

            text-center

            font-primary
            text-[12px]
            font-medium
            uppercase
            leading-[1.2]
            tracking-[0.085em]

            text-accent

            max-md:mb-[9px]
            max-md:px-[10px]
            max-md:py-[4px]
            max-md:text-[10px]
          "
        >
          Why Meal Eats
        </p>

        {/* =====================================================
            MAIN HEADING
        ====================================================== */}

        <h2
          id="less-guessing-title"
          className="
            !mt-2
            !mx-auto
            w-full
            max-w-[780px]

            text-center

            font-primary
            !text-h2
            font-medium
            leading-[69px]
            tracking-[-0.045em]

            text-secondary

            min-[1440px]:text-[42px]

            max-md:!text-[34px]
            max-md:!leading-[1.12]
            max-md:tracking-[-0.04em]

            max-[480px]:!text-[29px]
            max-[480px]:!leading-[1.15]
          "
        >
          Less Guessing.{" "}
          <span className="!font-accent italic font-[400]">
            More Food Decisions
          </span>
          <br className="max-md:hidden" />
          That Fit You
        </h2>

        {/* =====================================================
            CARDS
        ====================================================== */}

        <div
          className="
            mx-auto
            mt-[46px]

            grid
            w-full
            max-w-[1320px]
            grid-cols-4

            gap-[16px]

            min-[1440px]:mt-[50px]
            min-[1440px]:gap-[18px]

            max-[1279px]:mt-[40px]
            max-[1279px]:gap-[14px]

            max-[900px]:grid-cols-2

            max-md:mt-[32px]
            max-md:grid-cols-1
            max-md:gap-[14px]

            max-[480px]:mt-[27px]
            max-[480px]:gap-[12px]
          "
        >
          {decisionCards.map((card) => (
            <article
              key={card.title}
              className="
                group
                relative
                min-w-0

                !max-h-[297px]
                !max-w-[306px]

                rounded-[20px]

                border
                border-border

                bg-[#ffffff]

                px-[22px]
                py-[20px]

                shadow-[0px_2px_7.4px_0px_#ACACAC59]

                transition-all
                duration-normal
                ease-out

                hover:-translate-y-[1px]
                hover:border-border-light
                hover:shadow-sm

                /* =============================================
                   MOBILE ONLY
                   Do NOT affect desktop dimensions.
                ============================================= */

                max-md:!max-h-none
                max-md:!max-w-none
                max-md:w-full
                max-md:rounded-[18px]
                max-md:px-[20px]
                max-md:py-[20px]

                max-[480px]:rounded-[16px]
                max-[480px]:px-[17px]
                max-[480px]:py-[17px]
              "
            >
              {/* =================================================
                  GIF / ICON
              ================================================== */}

              <div
                className="
                  relative
                  mb-[22px]

                  h-[56px]
                  w-[56px]

                  overflow-hidden
                  rounded-[8px]

                  border
                  border-border-light

                  max-md:mb-[17px]

                  max-[480px]:
                  h-[50px]
                  max-[480px]:w-[50px]
                "
              >
                <Image
                  src={card.gif}
                  alt=""
                  aria-hidden="true"
                  fill
                  unoptimized
                  sizes="56px"
                  className="
                    m-auto
                    !h-[40px]
                    !w-[40px]
                    object-contain

                    max-[480px]:
                    !h-[36px]
                    max-[480px]:!w-[36px]
                  "
                />
              </div>

              {/* =================================================
                  CARD TITLE
              ================================================== */}

              <h3
                className="
                  max-w-[245px]

                  font-primary
                  !text-[24px]
                  min-h-[59px]
                  font-medium
                  !leading-[30px]
                  tracking-[-3%]

                  text-secondary

                  /* MOBILE */
                  max-md:max-w-[520px]
                  max-md:!text-[21px]
                  max-md:min-h-0
                  max-md:!leading-[27px]
                  max-md:tracking-[-0.025em]

                  max-[480px]:!text-[19px]
                  max-[480px]:!leading-[25px]
                "
              >
                {card.title}
              </h3>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <p
                className="
                  mt-[9px]

                  max-w-[285px]

                  font-primary
                  text-[12px]
                  font-normal
                  leading-[1.55]

                  text-text

                  max-[1279px]:text-[11.5px]

                  /* MOBILE */
                  max-md:mt-[8px]
                  max-md:max-w-[620px]
                  max-md:text-[13px]
                  max-md:leading-[1.55]

                  max-[480px]:text-[12px]
                  max-[480px]:leading-[1.55]
                "
              >
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}