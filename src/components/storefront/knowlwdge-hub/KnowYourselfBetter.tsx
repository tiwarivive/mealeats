"use client";

import Image from "next/image";

const profileItems = [
  {
    title: "Personal Information",
    description:
      "Basic details like age, gender and activity levels so guidance starts from a realistic baseline.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377140/mealeats/products/personal.gif",
  },
  {
    title: "Health Conditions",
    description:
      "Anything we should be careful about — so suggestions stay safe and sensitive for you.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377104/mealeats/products/healthcondition.gif",
  },
  {
    title: "Goals",
    description:
      "What you're working toward, whether that's energy, balance, strength or steadier meals.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377091/mealeats/products/goals.gif",
  },
  {
    title: "Eating Pattern",
    description:
      "How you actually eat across a day — timings, portions, eating out and snacking habits.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377084/mealeats/products/eatingpattern.gif",
  },
  {
    title: "Ingredients at Home",
    description:
      "What's already in your pantry and fridge, so recommendations are practical tonight.",
    icon: "/ingredients.gif",
  },
  {
    title: "Food Preferences",
    description:
      "What you love, what you avoid, and any allergies or diets we must respect.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377089/mealeats/products/foodprefrence.gif",
  },
] as const;

export default function KnowYourselfBetter() {
  return (
    <section
      aria-labelledby="yourself-heading"
      className="
        bg-primary
        pt-[52px]
        pb-[64px]
        sm:pb-[76px]
        lg:pb-[96px]
        max-[768px]:pb-[28px]
      "
    >
      <div
        className="
          container-content
          px-[var(--spacing-page)]
        "
      >
        {/* =========================================================
            SECTION HEADING
        ========================================================= */}
        <header className="mx-auto text-center">
          <h2
            id="yourself-heading"
            className="
              font-primary
              !text-h2
              font-medium
              leading-[69px]
              tracking-[-4%]
              text-secondary

              max-[767px]:!text-[28px]
              max-[767px]:!leading-[41px]
              max-[767px]:!tracking-[-2%]
            "
          >
            Know{" "}
            <span
              className="
                mr-[7px]
                font-accent
                !font-[400]
                italic
                text-secondary
              "
            >
              Yourself
            </span>{" "}
            Better
          </h2>

          <p
            className="
              !mx-auto
              !text-center
              mt-[10px]
              max-w-[620px]
              font-primary
              text-body
              font-normal
              leading-[28px]
              text-text-muted

              max-[767px]:mt-[7px]
              max-[767px]:max-w-[340px]
              max-[767px]:!text-[16px]
              max-[767px]:!leading-[22px]
            "
          >
            The more you share, the better the meal suggestions and health
            guidance can fit your life.
          </p>
        </header>

        {/* =========================================================
            INFORMATION CARD CONTAINER
            Height is now content-driven.
        ========================================================= */}
        <div
          className="
            relative
            mx-auto
            mt-[32px]
            w-full
            overflow-hidden
            rounded-[24px]
            !border !border-[#E3E3E3]
            bg-white
            !shadow-[0_4px_11.8px_0_#89898940]

            sm:mt-[36px]

            max-[767px]:shadow-none
            max-[767px]:border-none
            max-[767px]:overflow-visible
            max-[767px]:!shadow-none
          "
        >
          {/* =========================================================
              DESKTOP VERTICAL DIVIDER — 1/3
          ========================================================= */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              top-[5px]
              bottom-[5px]
              left-1/3
              z-10
              hidden
              w-px
              border border-solid [border-image:linear-gradient(90deg,#EFEFEF_0%,#C4C4C4_47.6%,#E9E9E9_98.56%)_1]
              lg:block
            "
          />

          {/* =========================================================
              DESKTOP VERTICAL DIVIDER — 2/3
          ========================================================= */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              top-[5px]
              bottom-[5px]
              left-2/3
              z-10
              hidden
              w-px
              border border-solid [border-image:linear-gradient(90deg,#EFEFEF_0%,#C4C4C4_47.6%,#E9E9E9_98.56%)_1]
              lg:block
            "
          />

          {/* =========================================================
              GRID
              Height is completely content-driven.
          ========================================================= */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {profileItems.map((item, index) => (
              <article
                key={item.title}
                className={`
                  min-w-0
                  border-b
                  border-border-light

                  /* -----------------------------------------------
                     DESKTOP / TABLET
                  ----------------------------------------------- */
                  px-[20px]
                  py-[22px]

                  sm:px-[24px]
                  sm:py-[26px]

                  lg:border-b-0
                  lg:px-[28px]
                  lg:py-[30px]

                  /* -----------------------------------------------
                     MOBILE
                  ----------------------------------------------- */
                  max-[767px]:px-[12px]
                  max-[767px]:py-[12px]
                  max-[768px]:shadow-[0_4px_11.8px_0_#89898940]
                  max-[768px]:!rounded-[16px]
                  max-[768px]:!mt-[12px]
                  max-[768px]:border
                  max-[768px]:!p-[24px]
                  max-[768px]:border-border-light    
                `}
              >
                {/* =================================================
                    ICON
                ================================================= */}
                <div
                  className="
                    flex
                    h-icon-md
                    w-icon-md
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[7px]
                    bg-accent

                    max-[767px]:h-icon-md
                    max-[767px]:w-icon-md
                    max-[767px]:rounded-[5px]
                  "
                >
                  <Image
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    width={25}
                    height={25}
                    unoptimized
                    className="
                      block
                      h-icon-sm
                      w-icon-sm
                      object-contain
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
                    !leading-[30px]
                    !tracking-[-3%]
                    text-secondary

                    sm:mt-[22px]

                    lg:mt-[24px]
                    lg:text-[15px]

                    max-[767px]:!mt-[39px]
                    max-[767px]:!text-[20px]
                    max-[767px]:!leading-[30px]
                    max-[767px]:!tracking-[-4%]
                  "
                >
                  {item.title}
                </h3>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}
                <p
                  className="
                    !mt-[10px]
                    max-w-full
                    font-primary
                    text-body
                    font-normal
                    leading-[20px]
                    text-text-muted

                    lg:max-w-[280px]

                    max-[767px]:!mt-[8px]
                    max-[767px]:!text-[14px]
                    max-[767px]:!leading-[20px]
                  "
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}