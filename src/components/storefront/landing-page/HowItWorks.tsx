"use client";

import Image from "next/image";

/* =========================================================
   TYPES
========================================================= */

type Step = {
  id: number;
  icon: string;
  description: string;
  title: string;
};

/* =========================================================
   DATA
========================================================= */

const steps: Step[] = [
  {
    id: 1,
    icon: "/healthprofile.gif",
    title: 'Build your health profile',
    description:
      "Age, weight, conditions, allergies, activity level and goals — two minutes, once.",
  },
  {
    id: 2,
    icon: "/robottalking.gif",
    title: 'AI learns your patterns',
    description:
      "Every meal, workout and reading refines the model of how your body responds.",
  },
  {
    id: 3,
    icon: "/running.gif",
    title: 'Get daily guidance',
    description:
      "Meals, recipes, workouts and reminders arrive already tailored to today.",
  },
  {
    id: 4,
    icon: "/trackprogrress.gif",
    title: 'Track real progress',
    description:
      "Watch your health score, weight trend and consistency improve week over week.",
  },
];

/* =========================================================
   DESKTOP CONNECTORS

   IMPORTANT:
   Desktop design is intentionally unchanged.
========================================================= */

function DesktopConnectors() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-x-0
        top-0
        z-0
        hidden
        h-[94px]
        overflow-visible
        lg:block
      "
    >
      {/* STEP 1 → STEP 2 */}
      <img
        src="/leftthread.png"
        alt=""
        width={867}
        height={120}
        draggable={false}
        className="
          absolute
          left-[10.30%]
          top-[47px]
          block
          h-auto
          w-[26.47%]
          max-w-none
          select-none
        "
      />

      {/* STEP 2 → STEP 3 */}
      <img
        src="/middlethread.png"
        alt=""
        width={867}
        height={120}
        draggable={false}
        className="
          absolute
          left-[36.77%]
          bottom-[47px]
          block
          h-auto
          w-[26.47%]
          max-w-none
          select-none
        "
      />

      {/* STEP 3 → STEP 4 */}
      <img
        src="/rightthread.png"
        alt=""
        width={867}
        height={120}
        draggable={false}
        className="
          absolute
          left-[63.23%]
          top-[47px]
          block
          h-auto
          w-[26.57%]
          max-w-none
          select-none
        "
      />
    </div>
  );
}

/* =========================================================
   DESKTOP ICON POSITIONING

   IMPORTANT:
   Desktop positioning is unchanged.
========================================================= */

const desktopPositionClasses: Record<number, string> = {
  1: "lg:[transform:translateX(-2.20vw)]",
  2: "lg:[transform:translateX(-0.73vw)]",
  3: "lg:[transform:translateX(0.73vw)]",
  4: "lg:[transform:translateX(2.30vw)]",
};

/* =========================================================
   STEP ICON
========================================================= */

function StepIcon({ step }: { step: Step }) {
  return (
    <div
      className="
        relative
        z-10
        flex
        shrink-0
        items-center
        justify-center
        rounded-full
        border-[1.5px]
        border-dashed
        border-accent
        bg-primary

        /* ================================================
           MOBILE
           Figma reference:
           large centered circular icon.
           Size scales with viewport.
        ================================================ */

        h-[clamp(96px,26.5vw,184px)]
        w-[clamp(96px,26.5vw,184px)]

        /* ================================================
           TABLET
        ================================================ */

        sm:h-[clamp(120px,24vw,170px)]
        sm:w-[clamp(120px,24vw,170px)]

        /* ================================================
           DESKTOP
           EXISTING DESIGN — UNCHANGED
        ================================================ */

        lg:h-[94px]
        lg:w-[94px]
        lg:border-[2px]
      "
    >
      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-center
          rounded-full
          border
          border-[#D8D8D8]
          bg-primary
          shadow-[0_2px_5px_rgba(0,0,0,0.10)]
        "
      >
        <Image
          src={step.icon}
          alt=""
          width={48}
          height={48}
          unoptimized
          draggable={false}
          className="
            h-[clamp(44px,13vw,96px)]
            w-[clamp(44px,13vw,96px)]
            object-contain
            select-none

            sm:h-[clamp(52px,11vw,82px)]
            sm:w-[clamp(52px,11vw,82px)]

            /* DESKTOP — UNCHANGED */
            lg:h-[46px]
            lg:w-[46px]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   STEP ITEM
========================================================= */

function StepItem({ step }: { step: Step }) {
  return (
    <article
      className={`
        relative
        z-10
        flex
        min-w-0
        flex-col
        items-center
        text-center

        ${desktopPositionClasses[step.id]}

        /* =================================================
           MOBILE

           Figma is ONE COLUMN.

           Every step gets a fixed responsive vertical
           rhythm so the four icons/descriptions remain
           evenly distributed.
        ================================================= */

        w-full
        min-h-[clamp(250px,66.9vw,467px)]

        /* =================================================
           DESKTOP

           EXISTING DESIGN — UNCHANGED
        ================================================= */
        lg:min-h-0
      `}
    >
      {/* =================================================
          ICON
      ================================================= */}

      <StepIcon step={step} />

      {/* =================================================
          DESCRIPTION
      ================================================= */}
      <h3 className="!text-[22px] !font-[500] !leading-[30px] text-dark pt-[44px] pb-[12px] max-[768px]:pt-[24px] max-[768px]:pb-[12px]">
        {step.title}
      </h3>
      <p
        className="
          /* ==============================================
             MOBILE
          ============================================== */

          mt-[clamp(56px,19vw,132px)]
          w-full
          max-w-[clamp(280px,72vw,510px)]
          px-2

          font-primary
          text-[clamp(14px,3.45vw,24px)]
          font-normal
          leading-[1.42]
          tracking-[-0.025em]
          text-text

          /* ==============================================
             SMALL TABLET
          ============================================== */

          sm:mt-[clamp(56px,14vw,105px)]
          sm:max-w-[520px]
          sm:text-[clamp(15px,2.5vw,22px)]

          /* ==============================================
             DESKTOP — EXISTING DESIGN
          ============================================== */

          lg:mt-[68px]
          lg:max-w-[220px]
          lg:px-0
          lg:text-[15px]
          lg:leading-[1.42]
          lg:tracking-[-0.025em]

          xl:max-w-[220px]
          xl:text-[15px]

          2xl:max-w-[225px]
          2xl:text-[16px]
        "
      >
        {step.description}
      </p>
    </article>
  );
}

/* =========================================================
   HOW IT WORKS
========================================================= */

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="
        relative
        w-full
        overflow-hidden
        bg-primary
        px-[56px]

        /* ================================================
           MOBILE
        ================================================ */

        pt-[32px]
        pb-[24px]

        min-[375px]:pt-[36px]
        min-[375px]:pb-[28px]

        /* ================================================
           TABLET
        ================================================ */

        sm:pt-[42px]
        sm:pb-[40px]

        /* ================================================
           DESKTOP — EXISTING DESIGN UNCHANGED
        ================================================ */

        lg:pt-[12px]
        lg:pb-[72px]

        xl:pt-[14px]
        xl:pb-[78px]
      "
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <header
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-content
          flex-col
          items-center
          px-page
          text-center
        "
      >
        {/* =================================================
            TITLE
        ================================================= */}

        <h2
          id="how-it-works-title"
          className="
            font-primary
            text-[clamp(30px,7.6vw,54px)]
            font-normal
            leading-[1.08]
            tracking-[-0.055em]
            text-secondary

            min-[375px]:text-[clamp(32px,7.4vw,54px)]

            min-[480px]:text-[clamp(36px,6.8vw,52px)]

            sm:text-[clamp(38px,6vw,50px)]

            /* DESKTOP — EXISTING */
            lg:text-[46px]
            lg:leading-[1.05]

            xl:text-[48px]
          "
        >
          How it{" "}
          <span className="font-accent italic">
            Works
          </span>
        </h2>

        {/* =================================================
            SUBTITLE
        ================================================= */}

        <p
          className="
            mt-[10px]
            max-w-[clamp(300px,82vw,600px)]

            font-primary
            text-[clamp(14px,3.6vw,25px)]
            font-normal
            leading-[1.4]
            tracking-[-0.02em]
            text-text

            min-[375px]:max-w-[clamp(310px,82vw,600px)]

            min-[480px]:max-w-none
            min-[480px]:text-[clamp(15px,3.2vw,23px)]

            sm:mt-[12px]
            sm:text-[clamp(16px,2.7vw,21px)]

            /* DESKTOP — EXISTING */
            lg:mt-[14px]
            lg:text-[17px]

            xl:text-[18px]
          "
        >
          Four steps to a health routine that sticks
        </p>
      </header>

      {/* ===================================================
          STEPS AREA

          MOBILE:
          ONE COLUMN

          DESKTOP:
          EXISTING 4-COLUMN LAYOUT
      ==================================================== */}

      <div
        className="
          relative
          mx-auto
          mt-[clamp(70px,28vw,195px)]
          w-full

          px-[20px]

          min-[375px]:px-[24px]

          min-[480px]:px-[28px]

          sm:mt-[clamp(70px,22vw,165px)]
          sm:px-[32px]

          /* ================================================
             DESKTOP — EXISTING DESIGN UNCHANGED
          ================================================ */
          max-[768px]:mt-[56px]
          lg:mt-[47px]
          lg:px-0

          xl:mt-[47px]
        "
      >
        {/* =================================================
            DESKTOP CONNECTORS

            Hidden below lg.
        ================================================= */}

        <DesktopConnectors />

        {/* =================================================
            STEP LAYOUT
        ================================================= */}

        <div
          className="
            relative
            z-10
            grid
            w-full

            /* ==============================================
               MOBILE

               IMPORTANT:
               Change from 2 columns → 1 column.
            ============================================== */

            grid-cols-1
            gap-0

            /* ==============================================
               TABLET

               Still one vertical column to match the
               supplied mobile/reference composition.
            ============================================== */

            sm:grid-cols-1

            /* ==============================================
               DESKTOP

               EXISTING DESIGN — UNCHANGED
            ============================================== */

            lg:grid-cols-4
            lg:gap-x-0
            lg:gap-y-0
          "
        >
          {steps.map((step) => (
            <StepItem
              key={step.id}
              step={step}
            />
          ))}
        </div>
      </div>
    </section>
  );
}