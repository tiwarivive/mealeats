"use client";

import Image from "next/image";
import Link from "next/link";

/* =========================================================
   TYPES
========================================================= */

type PlanningStep = {
  id: number;
  icon: string;
  alt: string;
};

/* =========================================================
   DATA

   Replace these paths with your actual Figma/exported assets.
========================================================= */

const planningSteps: PlanningStep[] = [
  {
    id: 1,
    icon: "/images/food-planning/food-preferences.png",
    alt: "Food preferences",
  },
  {
    id: 2,
    icon: "/images/food-planning/weekly-planning.png",
    alt: "Weekly food planning",
  },
  {
    id: 3,
    icon: "/images/food-planning/kitchen-inventory.png",
    alt: "Kitchen inventory",
  },
  {
    id: 4,
    icon: "/images/food-planning/food-preferences-check.png",
    alt: "Food preference check",
  },
  {
    id: 5,
    icon: "/images/food-planning/shopping-list.png",
    alt: "Shopping list",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function SmartFoodPlanning() {
  return (
    <section
      id="smart-food-planning"
      aria-labelledby="smart-food-planning-title"
      className="
        relative
        w-full
        overflow-hidden
        bg-black
      "
    >
      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[2048px]
          px-5
          py-10

          sm:px-8
          sm:py-14

          md:px-10
          md:py-16

          lg:px-[4.1vw]
          lg:py-[4.1vw]
        "
      >
        {/* ===================================================
            BADGE
        =================================================== */}

        <div
          className="
            inline-flex
            min-h-[42px]
            items-center
            justify-center
            rounded-full
            bg-white
            px-6
            py-2

            sm:min-h-[44px]
            sm:px-7

            lg:min-h-[47px]
            lg:px-[30px]
          "
        >
          <span
            className="
              font-sans
              text-[14px]
              font-normal
              leading-none
              tracking-[-0.02em]
              text-[#19835B]

              sm:text-[15px]

              lg:text-[16px]
            "
          >
            SMART FOOD PLANNING
          </span>
        </div>

        {/* ===================================================
            INTRO CONTENT
        =================================================== */}

        <div
          className="
            mt-9
            grid
            grid-cols-1
            gap-8

            md:mt-12
            md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
            md:gap-10

            lg:mt-[38px]
            lg:grid-cols-[minmax(0,1fr)_minmax(0,0.97fr)]
            lg:gap-[5vw]
          "
        >
          {/* LEFT HEADING */}

          <div className="min-w-0">
            <h2
              id="smart-food-planning-title"
              className="
                max-w-[650px]
                font-sans
                text-[44px]
                font-medium
                leading-[0.98]
                tracking-[-0.055em]
                text-[#171717]

                sm:text-[56px]

                md:text-[64px]

                lg:text-[72px]

                xl:text-[80px]
              "
            >
              A Meal is helpful.
            </h2>

            <p
              className="
                mt-2
                max-w-[720px]
                font-calligraffitti
                text-[40px]
                font-normal
                leading-[1.05]
                tracking-[-0.045em]
                text-[#171717]

                sm:text-[48px]

                md:text-[54px]

                lg:mt-3
                lg:text-[60px]

                xl:text-[68px]
              "
            >
              A Smarter Week is Better
            </p>
          </div>

          {/* RIGHT DESCRIPTION */}

          <div
            className="
              flex
              items-start
              md:pt-1
              lg:pt-[3px]
            "
          >
            <p
              className="
                max-w-[820px]
                font-sans
                text-[17px]
                font-medium
                leading-[1.55]
                tracking-[-0.025em]
                text-[#858585]

                sm:text-[18px]

                md:text-[19px]

                lg:text-[20px]
                lg:leading-[1.58]

                xl:text-[21px]
              "
            >
              Meal Eats goes beyond individual recipe recommendations. Build
              a personalized food plan around your routine, preferences and
              goals, then understand what you already have and what you&apos;ll
              need for the days ahead.
            </p>
          </div>
        </div>

        {/* ===================================================
            PLANNING FLOW
        =================================================== */}

        <div
          className="
            relative
            mt-20

            sm:mt-24

            md:mt-28

            lg:mt-[135px]
          "
        >
          {/* =================================================
              DESKTOP FLOW

              Five equal columns + four separators.
          ================================================= */}

          <div
            className="
              hidden
              lg:grid
              lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]
              lg:items-center
              lg:gap-0
            "
          >
            {planningSteps.map((step, index) => (
              <div
                key={step.id}
                className="
                  flex
                  min-w-0
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    relative
                    flex
                    h-[130px]
                    w-full
                    items-center
                    justify-center
                  "
                >
                  <Image
                    src={step.icon}
                    alt={step.alt}
                    width={120}
                    height={120}
                    className="
                      h-auto
                      max-h-[120px]
                      w-auto
                      max-w-[125px]
                      object-contain
                    "
                  />
                </div>

                {index < planningSteps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="
                      h-[174px]
                      w-px
                      shrink-0
                      bg-[#D8D8D8]
                    "
                  />
                )}
              </div>
            ))}
          </div>

          {/* =================================================
              TABLET FLOW

              Two-column layout prevents the desktop flow
              from becoming cramped around tablet widths.
          ================================================= */}

          <div
            className="
              hidden
              md:grid
              md:grid-cols-2
              md:gap-y-10
              lg:hidden
            "
          >
            {planningSteps.map((step) => (
              <div
                key={step.id}
                className="
                  flex
                  min-h-[150px]
                  items-center
                  justify-center
                  border-b
                  border-[#D8D8D8]
                  px-5
                "
              >
                <Image
                  src={step.icon}
                  alt={step.alt}
                  width={120}
                  height={120}
                  className="
                    h-auto
                    max-h-[115px]
                    w-auto
                    max-w-[125px]
                    object-contain
                  "
                />
              </div>
            ))}
          </div>

          {/* =================================================
              MOBILE FLOW

              Vertical layout with horizontal separators.
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              md:hidden
            "
          >
            {planningSteps.map((step, index) => (
              <div
                key={step.id}
                className="
                  flex
                  min-h-[150px]
                  items-center
                  justify-center
                  px-6
                  py-8
                "
              >
                <div
                  className="
                    flex
                    h-[105px]
                    w-full
                    items-center
                    justify-center
                  "
                >
                  <Image
                    src={step.icon}
                    alt={step.alt}
                    width={115}
                    height={115}
                    className="
                      h-auto
                      max-h-[105px]
                      w-auto
                      max-w-[115px]
                      object-contain
                    "
                  />
                </div>

                {index < planningSteps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      left-1/2
                      mt-[150px]
                      h-px
                      w-[70%]
                      -translate-x-1/2
                      bg-[#D8D8D8]
                    "
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================
            CTA
        =================================================== */}

        <div
          className="
            mt-14
            flex
            flex-col
            items-center

            sm:mt-16

            md:mt-20

            lg:mt-[68px]
          "
        >
          <Link
            href="#"
            className="
              group
              relative
              inline-flex
              min-h-[66px]
              w-full
              max-w-[470px]
              items-center
              justify-center
              overflow-visible
              rounded-full
              bg-[#79B51D]
              px-8
              text-center
              font-sans
              text-[18px]
              font-medium
              leading-none
              tracking-[-0.025em]
              text-white
              transition-transform
              duration-300
              hover:scale-[1.02]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#79B51D]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-black

              sm:min-h-[70px]
              sm:text-[19px]

              md:max-w-[480px]

              lg:min-h-[72px]
              lg:max-w-[510px]
              lg:text-[20px]

              xl:max-w-[520px]
            "
          >
            {/* Glow */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-[7px]
                -z-10
                rounded-full
                bg-[#79B51D]/50
                blur-[9px]
                opacity-90
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />

            <span className="relative z-10">
              Explore Smart Food Planning
            </span>
          </Link>

          {/* =================================================
              CTA DESCRIPTION
          ================================================= */}

          <p
            className="
              mt-5
              max-w-[850px]
              px-4
              text-center
              font-sans
              text-[15px]
              font-medium
              leading-[1.5]
              tracking-[-0.025em]
              text-[#858585]

              sm:text-[16px]

              md:text-[17px]

              lg:mt-[13px]
              lg:text-[18px]
              lg:leading-[1.45]

              xl:text-[19px]
            "
          >
            This is where you begin preparing users for your future paid
            planning capability without immediately selling them a
            subscription.
          </p>
        </div>
      </div>
    </section>
  );
}