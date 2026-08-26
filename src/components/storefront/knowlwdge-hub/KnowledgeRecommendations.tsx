"use client";

const recommendations = [
  {
    title: "Why This Meal?",
    description:
      "Understand the nutritional value behind personalized meal suggestions.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377159/mealeats/products/speech-buble.gif",
  },
  {
    title: "Why This Exercise?",
    description:
      "Learn how different types of movement can support different fitness goals.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377162/mealeats/products/support.gif",
  },
  {
    title: "Understand Your Health",
    description:
      "Explore educational information related to the health topics you care about.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377150/mealeats/products/question.gif",
  },
  {
    title: "Learn Before You Decide",
    description:
      "Build knowledge for better healthcare conversations.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377126/mealeats/products/inventetion.gif",
  },
] as const;

export default function KnowledgeRecommendations() {
  return (
    <section
      aria-labelledby="recommendations-heading"
      className="bg-primary py-[56px] sm:py-[72px] lg:py-[88px] max-[768px]:pb-[0px]"
    >
      <div className="max-w-full lg:px-[56px]
        xl:px-[56px]
        max-[768px]:px-[16px]">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid items-end gap-[18px] max-[768px]:!gap-[12px] sm:gap-[24px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-[72px]">
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center rounded-full border border-border-light bg-[#CED9BD33] px-[9px] py-[4px] font-primary !text-[13px] font-medium uppercase leading-[28px] tracking-[-3%] text-[#007246] sm:px-[10px] sm:py-[5px] max-[768px]:!text-[10px]">
              AI + KNOWLEDGE
            </span>

            <h2
              id="recommendations-heading"
              className="mt-[10px] max-w-[520px] font-primary !text-h2 font-medium leading-[69px] max-[768px]:!text-[28px] max-[768px]:!leading-[41px] tracking-[-4%] text-secondary max-[768px]:mt-[0px]"
            >
              Go Beyond
              <br />
              Recommendations
            </h2>
          </div>

          {/* RIGHT */}
          <p className="max-w-[460px] font-primary text-body leading-[28px] text-text-muted lg:pb-[4px] max-[768px]:!text-[16px] max-[768px]:!leading-[20px] max-[768px]:!mt-[12px] ">
            Your AI can suggest a meal or exercise — but understanding why it
            was suggested matters too. Explore educational content that helps
            you understand the thinking behind healthier choices.
          </p>
        </div>

        {/* =====================================================
            RECOMMENDATION CARDS
        ===================================================== */}

        <div className="!mt-[56px] grid gap-[9px] sm:mt-[28px] sm:grid-cols-2 sm:gap-[10px] lg:mt-[30px] lg:grid-cols-4">
          {recommendations.map(({ title, description, icon }) => (
            <article
              key={title}
              className="
                group
                min-h-[142px]
                rounded-[16px]
                border
                border-border-light
                bg-primary
                px-[16px]
                py-[24px]
                shadow-[0_1px_4px_rgba(0,0,0,0.025)]
                transition-[box-shadow,transform]
                duration-200
                hover:-translate-y-[1px]
                hover:shadow-card
                sm:min-h-[148px]
                sm:p-[16px]
              "
            >
              {/* =================================================
                  GIF ICON
              ================================================= */}

              <div
                className="
                  flex
                  h-icon-md
                  w-icon-md
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[6px]
                  border
                  border-border-light
                  bg-surface
                "
              >
                <img
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="
                    block
                    h-icon-sm
                    w-icon-sm
                    object-contain
                    object-center
                  "
                />
              </div>

              {/* =================================================
                  TITLE
              ================================================= */}

              <h3
                className="
                  !mt-[39px]
                  font-primary
                  !text-[22px]
                  font-medium
                  leading-[1.25]
                  tracking-[-0.02em]
                  text-secondary
                  sm:mt-[16px]
                  max-[768px]:text-[20px]
                  max-[768px]:leading-[30px]
                  lg:text-[11px]
                  
                "
              >
                {title}
              </h3>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p
                className="
                  mt-[6px]
                  max-w-[230px]
                  max-[768px]:max-w-full
                  font-primary
                  !text-body
                  leading-[20px]
                  text-text-muted
                  max-[768px]:mt-[14px]
                  max-[768px]:leading-[20px]
                  
                "
              >
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}