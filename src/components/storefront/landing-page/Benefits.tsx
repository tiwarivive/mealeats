"use client";

import { motion, useReducedMotion } from "motion/react";

/* =========================================================
   TYPES
========================================================= */

type FeatureIconName =
  | "assistant"
  | "diet"
  | "workout"
  | "recipe";

type Feature = {
  title: string;
  description: string;
  icon: string;
};

/* =========================================================
   FEATURE DATA
========================================================= */

const features: Record<FeatureIconName, Feature> = {
  assistant: {
    title: "AI Food Companion",
    description:
      "Tell Meal Eats what’s already in your kitchen to discover recipes tailored to your ingredients, preferences, and goals—while reducing food waste.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377156/mealeats/products/running.gif",
  },

  diet: {
    title: "Personalised Smart Food Plans",
    description:
      "Plan meals around your lifestyle—not generic diet charts. Meal Eats tailors daily and weekly meals to your preferences, routine, goals, and ingredients.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377093/mealeats/products/grocries.gif",
  },

  workout: {
    title: "Daily Food Guidance",
    description:
      "Get practical suggestions for breakfast, lunch, dinner and snacks based on your Food Profile, previous choices & the ingredients availability.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377122/mealeats/products/ingredinets.gif",
  },

  recipe: {
    title: "Ingredients-to-Recipe AI",
    description:
      "Tell Meal Eats what's already in your kitchen and get a healthy recipe with full nutrition facts in seconds.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377088/mealeats/products/food.gif",
  },
};

/* =========================================================
   FEATURE ICON
========================================================= */

function FeatureIcon({
  type,
}: {
  type: FeatureIconName;
}) {
  const feature = features[type];

  return (
    <div
      aria-hidden="true"
      className="
        relative
        flex
        h-[46px]
        w-[46px]
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-[10px]
        border
        border-border
        bg-primary

        min-[375px]:h-[48px]
        min-[375px]:w-[48px]

        sm:h-[52px]
        sm:w-[52px]

        lg:h-[54px]
        lg:w-[54px]
      "
    >
      <img
        src={feature.icon}
        alt=""
        width={54}
        height={54}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="
          h-full
          w-full
          select-none
          object-contain
          p-[6px]

          min-[375px]:p-[7px]

          sm:p-[8px]
        "
      />
    </div>
  );
}

/* =========================================================
   FEATURE CONTENT
========================================================= */

function FeatureContent({
  type,
}: {
  type: FeatureIconName;
}) {
  const feature = features[type];

  return (
    <>
      <FeatureIcon type={type} />

      <div className="mt-auto pt-6 min-[375px]:pt-7 sm:pt-8">
        <h4
          className="
            max-w-full
            font-primary
            text-[19px]
            font-medium
            leading-[1.08]
            tracking-[-0.045em]
            text-secondary

            min-[375px]:text-[20px]

            sm:text-h4
            !mb-[16px]
          "
        >
          {feature.title}
        </h4>

        <p
          className="
            mt-2.5
            max-w-full
            font-primary
            text-[12px]
            font-normal
            leading-[1.48]
            tracking-[-0.012em]
            text-text-muted

            min-[375px]:mt-3
            min-[375px]:text-[13px]

            min-[430px]:text-[13.5px]

            sm:text-[14px]

            lg:mt-[14px]
            lg:text-[15px]
            lg:leading-[1.4]

            xl:text-[16px]
          "
        >
          {feature.description}
        </p>
      </div>
    </>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  type,
  className = "",
}: {
  type: FeatureIconName;
  className?: string;
}) {
  return (
    <article
      className={`
        relative
        flex
        min-w-0
        flex-col
        rounded-[14px]
        border
        border-[#DCDCDC]
        bg-primary
        p-[17px]

        min-[375px]:rounded-[15px]
        min-[375px]:p-[19px]

        min-[430px]:p-[20px]

        transition-all
        duration-300
        ease-out

        hover:-translate-y-[2px]
        hover:border-[#cbd5cb]
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)]

        focus-within:border-[#cbd5cb]
        focus-within:shadow-[0_12px_35px_rgba(0,0,0,0.06)]

        sm:rounded-[16px]
        sm:p-[22px]

        lg:p-[23px]

        ${className}
      `}
    >
      <FeatureContent type={type} />
    </article>
  );
}

/* =========================================================
   PHONE VISUAL
========================================================= */

function PhoneVisual() {
  return (
    <div
      className="
        relative
        flex
        w-full
        min-w-0
        items-end
        justify-center
      "
    >
      <img
        src="/designed for your.png"
        alt="Meal Eats AI health assistant interface"
        width={1241}
        height={2048}
        loading="eager"
        decoding="async"
        draggable={false}
        className="
          relative
          z-10
          block
          h-auto
          max-w-full
          select-none
          object-contain

          w-full
          lg:w-[310px]

          xl:w-[315px]

          2xl:w-[447px]
        "
      />
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function BenefitsHeader() {
  const shouldReduceMotion = useReducedMotion();

  /*
   * IMPORTANT:
   *
   * The previous implementation started these elements with
   * opacity: 0. On some mobile browsers Motion's viewport
   * observer may not trigger correctly, leaving the heading
   * permanently invisible.
   *
   * The header therefore starts visible.
   *
   * Desktop layout/styles remain unchanged.
   */
  const fadeUp = () => ({
    initial: {
      opacity: 1,
      y: 0,
    },

    whileInView: shouldReduceMotion
      ? undefined
      : {
          opacity: 1,
          y: 0,
        },

    viewport: {
      once: true,
      amount: 0.1,
    },
  });

  return (
    <header className="flex w-full flex-col items-center text-center">
      {/* =====================================================
          EYEBROW
      ===================================================== */}

      <motion.div
        {...fadeUp()}
        transition={{
          duration: 0.45,
        }}
        className="
          inline-flex
          min-h-[34px]
          items-center
          justify-center
          rounded-full
          bg-primary
          px-[17px]
          py-[8px]

          font-primary
          text-[13px]
          font-[400]
          uppercase
          leading-none
          tracking-[0.08em]
          text-[#007246]

          border-0

          sm:min-h-[36px]
          sm:px-[19px]
          sm:text-[11px]

          md:text-[12px]
        "
      >
        Benefits
      </motion.div>

      {/* =====================================================
          HEADING
      ===================================================== */}

      <motion.h2
        id="benefits-title"
        {...fadeUp()}
        transition={{
          duration: 0.55,
          delay: shouldReduceMotion ? 0 : 0.05,
        }}
        className="
          mt-[18px]
          w-full
          max-w-[350px]
          font-primary
          text-[30px]
          font-medium
          leading-[1.08]
          tracking-[-0.055em]
          text-secondary

          min-[360px]:max-w-[350px]
          min-[360px]:text-[31px]

          min-[375px]:max-w-[360px]
          min-[375px]:text-[32px]

          min-[430px]:max-w-[400px]
          min-[430px]:text-[34px]

          sm:mt-[28px]
          sm:max-w-[700px]
          sm:text-[45px]

          md:max-w-[850px]
          md:text-[52px]

          lg:max-w-[1000px]
          lg:text-[57px]

          xl:max-w-[1050px]
          xl:text-[60px]
        "
      >
        Designed for Your{" "}
        <span
          className="
            font-accent
            font-normal
            italic
            tracking-[-0.045em]
          "
        >
          Everyday Lifestyle
        </span>
      </motion.h2>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <motion.p
        {...fadeUp()}
        transition={{
          duration: 0.5,
          delay: shouldReduceMotion ? 0 : 0.12,
        }}
        className="
          mt-[20px]
          w-full
          max-w-[395px]
          font-primary
          text-[15px]
          font-normal
          leading-[1.48]
          tracking-[-0.012em]
          text-text-muted

          min-[360px]:max-w-[400px]
          min-[360px]:text-[15px]

          min-[375px]:mt-[21px]
          min-[375px]:max-w-[405px]
          min-[375px]:text-[15px]

          min-[430px]:max-w-[420px]
          min-[430px]:text-[15.5px]

          sm:max-w-[620px]
          sm:text-[14px]

          md:max-w-[680px]
          md:text-[15px]
          md:leading-[1.6]

          lg:max-w-[730px]
          lg:text-[16px]
          lg:leading-[1.65]
        "
      >
        Food choices don't happen in isolation. Your goals, preferences, routine, available ingredients and everyday habits influence what works for you. Meal Eats brings this context together to make food recommendations more personal, practical and easier to follow.
      </motion.p>
    </header>
  );
}

/* =========================================================
   DESKTOP / LARGE TABLET LAYOUT
   DO NOT CHANGE
========================================================= */

function DesktopBenefitsLayout() {
  const shouldReduceMotion = useReducedMotion();

  const cardAnimation = (
    direction: "left" | "right",
    delay = 0
  ) => ({
    initial: shouldReduceMotion
      ? false
      : {
          opacity: 0,
          x: direction === "left" ? -20 : 20,
        },

    whileInView: shouldReduceMotion
      ? undefined
      : {
          opacity: 1,
          x: 0,
        },

    viewport: {
      once: true,
      amount: 0.2,
    },

    transition: {
      duration: 0.5,
      delay: shouldReduceMotion ? 0 : delay,
    },
  });

  return (
    <div
      className="
        mx-auto
        mt-[48px]
        hidden
        w-full
        max-w-[1320px]
        lg:grid
        lg:grid-cols-[minmax(250px,1fr)_minmax(350px,430px)_minmax(250px,1fr)]
        justify-between
        lg:items-start
        lg:gap-x-[38px]

        xl:mt-[54px]
        xl:grid-cols-[minmax(280px,354px)_minmax(390px,447px)_minmax(280px,354px)]
        xl:gap-x-[48px]

        2xl:gap-x-[64px]
      "
    >
      {/* =====================================================
          LEFT
      ===================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-col
          justify-center
          gap-[30px]
          pt-[55px]

          xl:pt-[62px]
        "
      >
        <motion.div {...cardAnimation("left")}>
          <FeatureCard
            type="assistant"
            className="
              min-h-[225px]

              xl:min-h-[241px]
            "
          />
        </motion.div>

        <motion.div {...cardAnimation("left", 0.08)}>
          <FeatureCard
            type="workout"
            className="
              min-h-[225px]

              xl:min-h-[241px]
            "
          />
        </motion.div>
      </div>

      {/* =====================================================
          CENTER PHONE
      ===================================================== */}

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 20,
              }
        }
        whileInView={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
              }
        }
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.65,
          delay: shouldReduceMotion ? 0 : 0.05,
        }}
        className="
          flex
          min-w-0
          justify-center
        "
      >
        <PhoneVisual />
      </motion.div>

      {/* =====================================================
          RIGHT
      ===================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-[30px]
          pt-[55px]

          xl:pt-[62px]
        "
      >
        <motion.div {...cardAnimation("right")}>
          <FeatureCard
            type="diet"
            className="
              min-h-[225px]

              xl:min-h-[241px]
            "
          />
        </motion.div>

        <motion.div {...cardAnimation("right", 0.08)}>
          <FeatureCard
            type="recipe"
            className="
              min-h-[225px]

              xl:min-h-[241px]
            "
          />
        </motion.div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE / TABLET LAYOUT
   MOBILE FIX
========================================================= */

function MobileBenefitsLayout() {
  const shouldReduceMotion = useReducedMotion();

  /*
   * Mobile content starts visible.
   *
   * This prevents a mobile browser from leaving the cards at
   * opacity: 0 if IntersectionObserver does not fire.
   */
  const mobileAnimation = (delay = 0) => ({
    initial: {
      opacity: 1,
      y: 0,
    },

    whileInView: shouldReduceMotion
      ? undefined
      : {
          opacity: 1,
          y: 0,
        },

    viewport: {
      once: true,
      amount: 0.05,
    },

    transition: {
      duration: 0.45,
      delay: shouldReduceMotion ? 0 : delay,
    },
  });

  const phoneAnimation = {
    initial: {
      opacity: 1,
      y: 0,
    },

    whileInView: shouldReduceMotion
      ? undefined
      : {
          opacity: 1,
          y: 0,
        },

    viewport: {
      once: true,
      amount: 0.05,
    },

    transition: {
      duration: 0.6,
      delay: shouldReduceMotion ? 0 : 0.08,
    },
  };

  return (
    <div
      className="
        mx-auto
        mt-[48px]
        flex
        w-full
        max-w-[700px]
        flex-col

        sm:mt-[48px]

        lg:hidden
      "
    >
      {/* =====================================================
          MOBILE CARD 1
          AI HEALTH ASSISTANT
      ===================================================== */}

      <motion.div {...mobileAnimation()}>
        <FeatureCard
          type="assistant"
          className="
            min-h-[257px]
            rounded-[16px]
            p-[19px]

            min-[375px]:min-h-[257px]
            min-[375px]:p-[19px]

            min-[430px]:min-h-[257px]
            min-[430px]:p-[19px]

            sm:min-h-[225px]
            sm:p-[22px]
          "
        />
      </motion.div>

      {/* =====================================================
          MOBILE CARD 2
          WORKOUT
      ===================================================== */}

      <motion.div
        {...mobileAnimation(0.06)}
        className="
          mt-[18px]

          min-[375px]:mt-[19px]

          min-[430px]:mt-[19px]

          sm:mt-[18px]
        "
      >
        <FeatureCard
          type="workout"
          className="
            min-h-[233px]
            rounded-[16px]
            p-[19px]

            min-[375px]:min-h-[233px]
            min-[375px]:p-[19px]

            min-[430px]:min-h-[233px]
            min-[430px]:p-[19px]

            sm:min-h-[225px]
            sm:p-[22px]
          "
        />
      </motion.div>

      {/* =====================================================
          MOBILE CARD 3
          DIET
      ===================================================== */}

      <motion.div
        {...mobileAnimation(0.12)}
        className="
          mt-[18px]

          min-[375px]:mt-[19px]

          min-[430px]:mt-[19px]

          sm:mt-[18px]
        "
      >
        <FeatureCard
          type="diet"
          className="
            min-h-[233px]
            rounded-[16px]
            p-[19px]

            min-[375px]:min-h-[233px]
            min-[375px]:p-[19px]

            min-[430px]:min-h-[233px]
            min-[430px]:p-[19px]

            sm:min-h-[225px]
            sm:p-[22px]
          "
        />
      </motion.div>

      {/* =====================================================
          MOBILE CARD 4
          RECIPE
      ===================================================== */}

      <motion.div
        {...mobileAnimation(0.18)}
        className="
          mt-[18px]

          min-[375px]:mt-[19px]

          min-[430px]:mt-[19px]

          sm:mt-[18px]
        "
      >
        <FeatureCard
          type="recipe"
          className="
            min-h-[233px]
            rounded-[16px]
            p-[19px]

            min-[375px]:min-h-[233px]
            min-[375px]:p-[19px]

            min-[430px]:min-h-[233px]
            min-[430px]:p-[19px]

            sm:min-h-[225px]
            sm:p-[22px]
          "
        />
      </motion.div>

      {/* =====================================================
          MOBILE PHONE
      ===================================================== */}

      <motion.div
        {...phoneAnimation}
        className="
          relative
          mt-[56px]
          flex
          w-full
          min-h-0
          items-end
          justify-center
          overflow-visible

          min-[375px]:mt-[56px]

          min-[430px]:mt-[56px]

          sm:mt-[48px]
          sm:min-h-[450px]
        "
      >
        <PhoneVisual />
      </motion.div>
    </div>
  );
}

/* =========================================================
   MAIN BENEFITS SECTION
========================================================= */

export default function Benefits() {
  return (
    <section
      id="benefits"
      aria-labelledby="benefits-title"
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-primary
      "
    >
      {/* =====================================================
          FIGMA GRADIENT / CURVED ARCH BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          z-0
          h-[1090px]
          max-[768px]:hidden
          w-[155%]
          -translate-x-1/2
          rounded-b-[50%]
          bg-[linear-gradient(180deg,rgba(253,250,250,0.72)_0%,rgba(242,250,240,0.72)_69.86%)]
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-container-content

          px-[16px]

          min-[375px]:px-[16px]

          min-[430px]:px-[16px]

          sm:px-page

          pt-[0px]
          pb-[90px]

          min-[375px]:pt-[0px]
          min-[375px]:pb-[90px]

          min-[430px]:pt-[0px]
          min-[430px]:pb-[90px]

          sm:pt-[54px]
          sm:pb-[165px]

          md:pt-[58px]
          md:pb-[190px]

          lg:pt-[52px]
          lg:pb-[220px]

          xl:pt-[55px]
          xl:pb-[240px]
        "
      >
        {/* HEADER */}

        <BenefitsHeader />

        {/* ===================================================
            DESKTOP
            COMPLETELY SEPARATE
        ==================================================== */}

        <DesktopBenefitsLayout />

        {/* ===================================================
            MOBILE
        ==================================================== */}

        <MobileBenefitsLayout />
      </div>

      {/* =====================================================
          SOFT AMBIENT GREEN GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[45px]
          left-1/2
          z-[5]
          h-[150px]
          w-[230px]
          -translate-x-1/2
          rounded-full
          bg-accent
          opacity-[0.035]
          blur-[45px]

          min-[375px]:bottom-[50px]
          min-[375px]:h-[175px]
          min-[375px]:w-[270px]

          min-[430px]:bottom-[55px]
          min-[430px]:h-[200px]
          min-[430px]:w-[320px]

          sm:bottom-[65px]
          sm:h-[280px]
          sm:w-[460px]
          sm:blur-[65px]

          md:bottom-[80px]
          md:h-[340px]
          md:w-[560px]

          lg:bottom-[95px]
          lg:h-[400px]
          lg:w-[640px]

          xl:bottom-[110px]
          xl:h-[440px]
          xl:w-[700px]
        "
      />
    </section>
  );
}