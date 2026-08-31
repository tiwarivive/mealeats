"use client";

import Image from "next/image";
import Link from "next/link";

const profileItems = [
  {
    title: "Goals",
    description: "Set your health and wellness goals.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377091/mealeats/products/goals.gif",
  },
  {
    title: "Allergies & Restrictions",
    description:
      "Tell us about foods or ingredients you need to avoid.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377104/mealeats/products/healthcondition.gif",
  },

  {
    title: "Eating Patterns",
    description:
      "Share how you usually eat and your preferred meal routine.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377089/mealeats/products/foodprefrence.gif",
  },

  {
    title: "Foods You Love",
    description: "Tell us what you enjoy eating most.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377149/mealeats/products/protien-shake.gif",
  },
  {
    title: "Ingredients at Home",
    description:
      "Add ingredients you already have for personalized recipes",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377118/mealeats/products/holi.gif",
  },
  {
    title: "Personalized Experience",
    description:
      "Get recommendations tailored to your unique profile",
    icon: "/userauthoticaton.gif",
  },
] as const;

export default function MoreWeUnderstand() {
  return (
    <section
      aria-labelledby="yourself-heading"
      className="
        bg-primary
        pt-[0px]
        pb-[64px]
        sm:pb-[76px]
        lg:pb-[96px]
        max-[768px]:pb-[28px]
        lg:px-[56px]
        xl:px-[56px]
        max-[768px]:px-[16px]

      "
    >
      <div
        className="
          max-w-full
       
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
            The More We Understand Your Food Preferences,{" "}
            <br />
            The{" "}
            <span
              className="
                mr-[7px]
                font-accent
                !font-[400]
                italic
                text-secondary
              "
            >
              More Relevant Meal Eats Becomes
            </span>
          </h2>

          <p
            className="
              !mx-auto
              !text-center
              mt-[10px]
              max-w-[670px]
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
            Your Meal Eats experience starts with you. Tell us only what
            you're comfortable sharing so recommendations can better reflect
            your preferences and everyday needs.
          </p>
        </header>

        {/* =========================================================
            INFORMATION CARD CONTAINER
        ========================================================= */}

        <div
          className="
            relative
            mx-auto
            mt-[32px]
            w-full
            overflow-hidden
            rounded-[24px]
            !border
            !border-[#E3E3E3]
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
              z-20
              hidden
              w-px
              border
              border-solid
              [border-image:linear-gradient(90deg,#EFEFEF_0%,#C4C4C4_47.6%,#E9E9E9_98.56%)_1]
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
              z-20
              hidden
              w-px
              border
              border-solid
              [border-image:linear-gradient(90deg,#EFEFEF_0%,#C4C4C4_47.6%,#E9E9E9_98.56%)_1]
              lg:block
            "
          />

          {/* =========================================================
              DESKTOP HORIZONTAL DIVIDER
              
              Crosses both vertical dividers.

              Position:
              - Exactly between row 1 and row 2
              - Does not affect card dimensions
              - Does not participate in grid layout
              - Same subtle gradient treatment as vertical bars
          ========================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[5px]
              right-[5px]
              top-1/2
              z-20
              hidden
              h-px
              -translate-y-1/2
              bg-[0px_4px_11.8px_0px_#89898940]
              

              lg:block
            "
          />

          {/* =========================================================
              GRID
        ========================================================= */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {profileItems.map((item) => (
              <article
                key={item.title}
                className="
                  min-w-0
                  border-b
                  border-border-light

                  px-[20px]
                  py-[22px]

                  sm:px-[24px]
                  sm:py-[26px]

                  lg:border-b-0
                  lg:px-[28px]
                  lg:py-[30px]

                  max-[767px]:px-[12px]
                  max-[767px]:py-[12px]
                  max-[768px]:shadow-[0_4px_11.8px_0_#89898940]
                  max-[768px]:!rounded-[16px]
                  max-[768px]:!mt-[12px]
                  max-[768px]:border
                  max-[768px]:!p-[24px]
                  max-[768px]:border-border-light
                "
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
                    text-[#7E7E7E]
                    tracking-[-3%]

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

        {/* =========================================================
            CTA
        ========================================================= */}

       <Link href='/ai' > <button
          type="button"
          className="
            !mt-[40px]
            !mx-auto
            block
            h-[48px]
            w-[281px]
            rounded-[37px]
            bg-primary-gradient
            shadow-[0px_4px_16.1px_0px_#2F770D45]
            text-[16px]
            !text-[#FFFFFF]
            leading-[24px]
            font-primary
          "
        >
          Build my Food Profile
        </button></Link>
      </div>
    </section>
  );
}