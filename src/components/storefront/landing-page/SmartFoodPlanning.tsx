"use client";

import Image from "next/image";
import Link from "next/link";

/* =========================================================
   TYPES
========================================================= */

type FoodPlanningStep = {
  id: number;
  title: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
};

/* =========================================================
   DATA
========================================================= */

const foodPlanningSteps: FoodPlanningStep[] = [
  {
    id: 1,
    title: "Personalised Recipes",
    icon: "/personalised-recipes.png",
    iconWidth: 112,
    iconHeight: 112,
  },
  {
    id: 2,
    title: "7 Day smart Food Plan",
    icon: "/7-day-food-plan.png",
    iconWidth: 112,
    iconHeight: 112,
  },
  {
    id: 3,
    title: "Check Your Kitchen",
    icon: "/check-your-kitchen.png",
    iconWidth: 112,
    iconHeight: 112,
  },
  {
    id: 4,
    title: "Missing Ingredients",
    icon: "/missing-ingredients.png",
    iconWidth: 112,
    iconHeight: 112,
  },
  {
    id: 5,
    title: "Smart Shopping List",
    icon: "/smart-shopping-list.png",
    iconWidth: 112,
    iconHeight: 112,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function SmartFoodPlanning() {
  return (
    <section
      id="smart-food-planning"
      aria-labelledby="smart-food-planning-heading"
      className="
        relative
        w-full
        overflow-hidden
        bg-primary
        text-secondary
      "
    >
      {/* =====================================================
          CONTENT CONTAINER
          Full-width background + constrained inner content.
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1328px]
          px-[16px]
          pb-[76px]
        "
      >
        {/* =====================================================
            TOP CONTENT
        ===================================================== */}

        <div className="relative z-10 w-full">
          {/* ===================================================
              BADGE
          =================================================== */}

          <p
            className="
            !mb-[16px]
              m-0
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-accent-light
              px-[13px]
              py-[5px]
              font-primary
              !text-[13px]
              font-medium
              uppercase
              leading-none
              tracking-[0.025em]
              text-[#007246]
            "
          >
            SMART FOOD PLANNING
          </p>

          {/* ===================================================
              HEADING + DESCRIPTION
          =================================================== */}

          <div
            className="
              grid
              w-full
              grid-cols-1
              gap-[28px]
              sm:gap-[36px]
              lg:grid-cols-[47.5%_52.5%]
              lg:gap-0
            "
          >
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="min-w-0">
              <h2
                id="smart-food-planning-heading"
                className="
                  m-0
                  max-w-[680px]
                  font-primary
                  !text-h2
                  font-medium
                  leading-[69px]
                  tracking-[-4%]
                  text-secondary
                  max-[768px]:leading-[41px]
                "
              >
                A Meal is helpful. {" "}
                <br /> 
                <span className="font-accent italic font-[400]">A Smarter Week is Better</span>
              </h2>

              
            </div>

            {/* =================================================
                RIGHT CONTENT
            ================================================= */}

            <div
              className="
                min-w-0
                lg:flex
                lg:items-start
                lg:justify-end
              "
            >
              <p
                className="
                  m-0
                  max-w-[650px]
                  font-primary
                  text-[16px]
                  font-normal
                  leading-[28px]
                  tracking-[-4%]
                  text-[#545454]
                "
              >
                Meal Eats goes beyond individual recipe recommendations. Build a personalized food plan around your routine, preferences and goals, then understand what you already have and what you'll need for the days ahead.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            PLANNING STEPS
        ===================================================== */}

        <div
          className="
            relative
            mt-[64px]
            w-full

            sm:mt-[76px]

            md:mt-[92px]

            lg:mt-[112px]
          "
        >
          {/* ===================================================
              DESKTOP
          =================================================== */}

          <div
            className="
              hidden
              w-full
              items-start

              lg:grid
              lg:grid-cols-[17.15%_20.1%_19.9%_18.35%_24.5%]
            "
          >
            {foodPlanningSteps.map((step, index) => (
              <FoodPlanningDesktopItem
                key={step.id}
                step={step}
                showSeparator={index === 0 || index === 1}
              />
            ))}
          </div>

          {/* ===================================================
              TABLET
          =================================================== */}

          <div
            className="
              hidden
              w-full
              grid-cols-3
              gap-x-[20px]
              gap-y-[48px]

              md:grid

              lg:hidden
            "
          >
            {foodPlanningSteps.map((step) => (
              <FoodPlanningResponsiveItem
                key={step.id}
                step={step}
              />
            ))}
          </div>

          {/* ===================================================
              MOBILE
              2-column layout prevents the five items from
              becoming a very long compressed vertical list.
          =================================================== */}

          <div
            className="
              grid
              w-full
              grid-cols-2
              gap-x-[12px]
              gap-y-[34px]

              md:hidden
            "
          >
            {foodPlanningSteps.map((step, index) => (
              <FoodPlanningMobileItem
                key={step.id}
                step={step}
                isLast={index === foodPlanningSteps.length - 1}
              />
            ))}
          </div>
        </div>

        {/* =====================================================
            CTA
        ===================================================== */}

        <div
          className="
            mt-[58px]
            flex
            w-full
            flex-col
            items-center
          "
        >
          <Link
            href="#smart-food-planning"
            aria-label="Explore Smart Food Planning"
            className="
              inline-flex
              min-h-[48px]
              w-full
              max-w-[313px]
              items-center
              justify-center
              rounded-full
              bg-primary-gradient
              px-[24px]
              py-[14px]
              text-center
              font-primary
              text-[16px]
              font-medium
              leading-[24px]
              tracking-[-2%]
              !text-primary
              shadow-button
              transition-all
              duration-200
              ease-out
              hover:-translate-y-0.5
              hover:shadow-lg
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent
              focus-visible:ring-offset-2
              focus-visible:ring-offset-primary
            "
          >
            Explore Smart Food Planning
          </Link>

          {/* =================================================
              SUPPORTING COPY
          ================================================= */}

          <p
            className="
              mt-[18px]
              w-full
              max-w-[760px]
              text-center
              font-primary
              text-[16px]
              font-normal
              leading-[28px]
              tracking-[-4%]
              !mt-[16px]
              text-text
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

/* =========================================================
   DESKTOP ITEM
========================================================= */

function FoodPlanningDesktopItem({
  step,
  showSeparator,
}: {
  step: FoodPlanningStep;
  showSeparator: boolean;
}) {
  return (
    <div
      className="
        relative
        flex
        min-w-0
        flex-col
        items-center
        text-center
      "
    >
      {/* ===================================================
          ICON
      =================================================== */}

      <div
        className="
          flex
          h-[80px]
          w-full
          items-center
          justify-center
        "
      >
        <Image
          src={step.icon}
          alt=""
          width={step.iconWidth}
          height={step.iconHeight}
          className="
            block
            h-[80px]
            w-[80px]
            shrink-0
            object-contain

            xl:h-[104px]
            xl:w-[104px]

            2xl:h-[112px]
            2xl:w-[112px]
          "
          sizes="112px"
        />
      </div>

      {/* ===================================================
          TITLE
      =================================================== */}

      <h3
        className="
          m-0
          mt-[20px]
          max-w-[250px]
          px-[6px]
          font-primary
          !text-[20px]
          font-medium
          leading-[30px]
          tracking-[-4%]
          text-secondary
          !mt-[22px]
        "
      >
        {step.title}
      </h3>

      {/* ===================================================
          SEPARATOR
      =================================================== */}

     
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            hidden
            h-[146px]
            w-px
            bg-border-light

            lg:block
          "
        />
    
    </div>
  );
}

/* =========================================================
   TABLET ITEM
========================================================= */

function FoodPlanningResponsiveItem({
  step,
}: {
  step: FoodPlanningStep;
}) {
  return (
    <div
      className="
        flex
        min-w-0
        flex-col
        items-center
        rounded-[16px]
        px-[12px]
        py-[8px]
        text-center
      "
    >
      {/* ICON */}

      <div
        className="
          flex
          h-[100px]
          w-full
          items-center
          justify-center
        "
      >
        <Image
          src={step.icon}
          alt=""
          width={step.iconWidth}
          height={step.iconHeight}
          className="
            block
            h-[92px]
            w-[92px]
            shrink-0
            object-contain
          "
          sizes="92px"
        />
      </div>

      {/* TITLE */}

      <h3
        className="
          m-0
          mt-[18px]
          max-w-[230px]
          font-primary
          text-[19px]
          font-normal
          leading-[1.2]
          tracking-[-0.03em]
          text-secondary
        "
      >
        {step.title}
      </h3>
    </div>
  );
}

/* =========================================================
   MOBILE ITEM
========================================================= */

function FoodPlanningMobileItem({
  step,
  isLast,
}: {
  step: FoodPlanningStep;
  isLast: boolean;
}) {
  return (
    <div
      className={`
        flex
        min-w-0
        flex-col
        items-center
        rounded-[16px]
        border
        border-border-light
        bg-primary
        px-[8px]
        py-[18px]
        text-center

        ${isLast ? "col-span-2 mx-auto w-[calc(50%-6px)]" : ""}
      `}
    >
      {/* ===================================================
          ICON
      =================================================== */}

      <div
        className="
          flex
          h-[76px]
          w-full
          items-center
          justify-center
        "
      >
        <Image
          src={step.icon}
          alt=""
          width={step.iconWidth}
          height={step.iconHeight}
          className="
            block
            h-[72px]
            w-[72px]
            shrink-0
            object-contain

            sm:h-[80px]
            sm:w-[80px]
          "
          sizes="80px"
        />
      </div>

      {/* ===================================================
          TITLE
      =================================================== */}

      <h3
        className="
          m-0
          !mt-[14px]
          max-w-[145px]
          font-primary
          !text-[16px]
          font-medium
          !leading-[1]
          tracking-[-0.025em]
          text-secondary

          sm:text-[17px]
      
        "
      >
        {step.title}
      </h3>
    </div>
  );
}