import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    // Figma card 1 = Fruit Sugar
    // Uses the 3rd uploaded image: fruit + oats + tart
    image: "/fruite-sugar.png",
    category: "NUTRITION BASICS",
    title: "Is Fruit Sugar Actually Bad for You?",
    description:
      "Understand the difference between naturally occurring sugar in fruit and added sugars, and what it means for everyday eating.",
    href: "/knowledge-hub/fruit-sugar",
    alt: "Fruit, oats, nuts, and a healthy breakfast setup",
  },
  {
    // Figma card 2 = High Fiber
    // Uses the 2nd uploaded image: oats + kiwi + banana + nuts
    image: "/highfiber.png",
    category: "NUTRITION BASICS",
    title: "What does “High Fiber” really mean?",
    description:
      "A simple guide to fiber, why it matters, and easy ways to include more fiber in your meals.",
    href: "/knowledge-hub/high-fiber",
    alt: "Bowl of oats with kiwi, banana, and nuts",
  },
  {
    // Figma card 3 = Carbohydrates
    // Uses the 1st uploaded image: bread + pasta + grains
    image: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377077/mealeats/products/centene.png",
    category: "MYTH BUSTING",
    title: "Carbs Aren't the Enemy",
    description:
      "Understand carbohydrates, their role in your diet, and why balance matters more than cutting out entire food groups.",
    href: "/knowledge-hub/carbohydrates",
    alt: "Bread, pasta, grains, and other carbohydrate-rich foods",
  },
] as const;

export default function LearnSomethingToday() {
  return (
    <section
      aria-labelledby="learn-heading"
      className="bg-primary py-[72px] sm:py-[88px] lg:py-[104px] max-[768px]:pb-[18px]"
    >
      <div className="container-content px-[var(--spacing-page)]">
        {/* =========================================================
            SECTION HEADER
        ========================================================= */}
        <div className="grid items-end gap-[24px] max-[768px]:gap-[12px] items-center lg:grid-cols-[1.15fr_0.85fr] lg:gap-[72px]">
          {/* Heading */}
          <div >
            <span
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-border-light
                bg-[#CED9BD33]
                px-[10px]
                py-[5px]
                font-primary
                text-[13px]
                font-medium
                uppercase
                leading-[28px]
                tracking-[-3%]
                text-accent
                max-[768px]:hidden
              "
            >
              Featured Knowledge
            </span>

            <h2
              id="learn-heading"
              className="
                mt-[12px]
                max-w-[620px]
                font-primary
                !text-h2
                font-medium
                leading-[69px]
                tracking-[-4%]
                text-secondary
                max-[768px]:!text-[28px]
                max-[768px]:!leading-[41px]
              "
            >
              Learn Something That
              <br />
              Helps You Today
            </h2>
          </div>

          {/* Supporting copy */}
          <p
            className="
              max-w-[460px]
              font-primary
              text-[16px]
              font-normal
              leading-[28px]
              text-text-muted
            
              lg:pb-[3px]
              max-[768px]:text-[16px]
              max-[768px]:leading-[22px]
            "
          >
            Practical health and nutrition knowledge to help you understand
            your choices and build healthier everyday habits.
          </p>
        </div>

        {/* =========================================================
            ARTICLE CARDS
        ========================================================= */}
        <div
          className="
            mt-[30px]
            grid
            gap-[12px]
            sm:mt-[32px]
            md:grid-cols-3
            md:gap-[12px]
            lg:gap-[14px]
          "
        >
          {articles.map((article, index) => (
            <article
              key={article.title}
              className="
                group
                overflow-hidden
                rounded-[24px]
                border
                border-border-light
                bg-primary
                shadow-[0px_4px_11.8px_0px_#89898940]
                transition-[transform,box-shadow]
                duration-200
                ease-out
                hover:-translate-y-[2px]
                hover:shadow-[0px_4px_11.8px_0px_#89898940]
              "
            >
              <div
                className="
                  block
                  h-full
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent
                  focus-visible:ring-inset
                "
              >
                {/* =================================================
                    IMAGE
                ================================================= */}
                <div
                  className="
                    relative
                    aspect-[1.62/1]
                    w-full
                    overflow-hidden
                    bg-surface-light
                  "
                >
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    priority={index === 0}
                    quality={85}
                    sizes="
                      (max-width: 767px) calc(100vw - 40px),
                      (max-width: 1023px) 45vw,
                      33vw
                    "
                    className="
                      object-cover
                      object-center
                      transition-transform
                      rounded-[16px]
                      duration-300
                      ease-out
                      group-hover:scale-[1.025]
                    "
                  />
                </div>

                {/* =================================================
                    CARD CONTENT
                ================================================= */}
                <div className="px-[24px] py-[34px] sm:p-[16px]">
                  {/* Category */}
                  <span
                    className="
                      inline-flex
                      items-center
                      rounded-full
                      bg-[#CED9BD33]
                      px-[9px]
                      py-[4px]
                      font-primary
                      text-[13px]
                      font-[400]
                      uppercase
                      leading-none
                      tracking-[-3%]
                      text-[#007246]
                      max-[768px]:!text-[13px]
                      max-[768px]:leading-[28px]
                      max-[768px]:!font-[400]
                      max-[768px]:!px-[8px]
                    "
                  >
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3
                    className="
                      mt-[10px]
                      font-primary
                      !text-[24px]
                      font-medium
                      leading-[30px]
                      tracking-[-3%]
                      text-secondary
                      max-[768px]:!text-[20px]
                      max-[768px]:!leading-[30px]
                    "
                  >
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-[7px]
                      font-primary
                      text-[16px]
                      font-normal
                      leading-[20px]
                      text-text-muted
                      max-[768px]:!text-[14px]
                      max-[768px]:leading-[20px]
                      max-[768px]:tracking-[-3%]
                      
                    "
                  >
                    {article.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}