"use client";

import {
  Brain,
  HeartPulse,
  Sparkles,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

/* =========================================================
   TYPES
========================================================= */

type StoryCard = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

/* =========================================================
   DATA
========================================================= */

const storyCards: StoryCard[] = [
  {
    title: "A Better Way to Understand Health",
    description:
      "Meal Eats began with a simple idea: health guidance should feel personal, practical, and relevant to the individual — not generic or one-size-fits-all.",
    icon: <Brain aria-hidden="true" />,
  },
  {
    title: "Health Is More Than One Number",
    description:
      "We looked beyond isolated health goals to understand the bigger picture, lifestyle, habits, preferences, nutrition, and the everyday choices that shape wellbeing.",
    icon: <HeartPulse aria-hidden="true" />,
  },
  {
    title: "Personalization Meets AI",
    description:
      "We’re bringing AI and nutrition science together to create an experience that learns from each person and delivers increasingly relevant, explainable guidance.",
    icon: <Sparkles aria-hidden="true" />,
  },
  {
    title: "A Health Companion That Learns",
    description:
      "Every interaction helps Meal Eats understand what matters to you, making the experience more personalized and useful over time.",
    icon: <UsersRound aria-hidden="true" />,
  },
  {
    title: "Towards Intelligent, Personalized Health",
    description:
      "Our vision is to create a trusted AI health companion that helps individuals and families make healthier, smarter decisions every day.",
    icon: <ShieldCheck aria-hidden="true" />,
  },
];

/* =========================================================
   STORY CARD
========================================================= */

function StoryCardItem({
  card,
  index,
}: {
  card: StoryCard;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 24,
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
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        flex
        min-h-[180px]
        w-full
        flex-col
        overflow-hidden
        rounded-[16px]
        border
        border-[#e6ece3]
        bg-[#f7faf5]
        p-[22px]

        transition-all
        duration-300
        ease-out

        hover:-translate-y-[2px]
        hover:border-[#d8e2d3]
        hover:shadow-[0_12px_32px_rgba(0,0,0,0.055)]

        sm:min-h-[190px]
        sm:rounded-[18px]
        sm:p-[24px]

        lg:min-h-[198px]
        lg:p-[24px]

        xl:min-h-[205px]
      "
    >
      {/* ICON */}

      <div
        className="
          flex
          h-[38px]
          w-[38px]
          shrink-0
          items-center
          justify-center
          rounded-[7px]
          border
          border-[#e1e7df]
          bg-white
          text-secondary

          transition-transform
          duration-300
          ease-out

          group-hover:scale-[1.04]

          sm:h-[40px]
          sm:w-[40px]

          lg:h-[42px]
          lg:w-[42px]
        "
      >
        <span
          className="
            flex
            items-center
            justify-center

            [&>svg]:h-[18px]
            [&>svg]:w-[18px]
            [&>svg]:stroke-[1.35]

            sm:[&>svg]:h-[19px]
            sm:[&>svg]:w-[19px]
          "
        >
          {card.icon}
        </span>
      </div>

      {/* CONTENT */}

      <div className="mt-auto pt-[28px] sm:pt-[30px]">
        <h3
          className="
            max-w-[360px]
            font-primary
            text-[18px]
            font-medium
            leading-[1.12]
            tracking-[-0.04em]
            text-secondary

            min-[390px]:text-[19px]

            sm:text-[20px]

            lg:text-[21px]

            xl:text-[22px]
          "
        >
          {card.title}
        </h3>

        <p
          className="
            mt-[10px]
            max-w-[390px]
            font-primary
            text-[12px]
            font-normal
            leading-[1.42]
            tracking-[-0.012em]
            text-text-muted

            min-[390px]:text-[12.5px]

            sm:mt-[11px]
            sm:text-[13px]

            lg:text-[13.5px]

            xl:text-[14px]
            xl:leading-[1.4]
          "
        >
          {card.description}
        </p>
      </div>
    </motion.article>
  );
}

/* =========================================================
   TESTIMONIAL
========================================================= */

function TestimonialCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
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
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
        delay: shouldReduceMotion ? 0 : 0.12,
      }}
      className="
        w-full
        max-w-[420px]
        rounded-[16px]
        bg-[#171717]
        p-[24px]
        text-white

        sm:rounded-[18px]
        sm:p-[26px]

        lg:max-w-[410px]
        lg:p-[28px]

        xl:max-w-[430px]
        xl:p-[30px]
      "
    >
      <blockquote
        className="
          font-primary
          text-[15px]
          font-normal
          leading-[1.5]
          tracking-[-0.018em]
          text-white

          min-[390px]:text-[15.5px]

          sm:text-[16px]

          lg:text-[17px]
          lg:leading-[1.48]

          xl:text-[18px]
        "
      >
        “Meal Eats feels like having an AI that actually knows you. The
        recommendations are personalized, explainable, and get smarter the
        more you use it.”
      </blockquote>

      <div className="mt-[22px] flex items-center gap-[11px]">
        <div
          aria-hidden="true"
          className="
            h-[36px]
            w-[36px]
            shrink-0
            rounded-full
            bg-[#e5e5e5]

            sm:h-[38px]
            sm:w-[38px]

            lg:h-[40px]
            lg:w-[40px]
          "
        />

        <span
          className="
            font-primary
            text-[13px]
            font-normal
            tracking-[-0.01em]
            text-white/80

            sm:text-[14px]
          "
        >
          Parag Sharma
        </span>
      </div>
    </motion.div>
  );
}

/* =========================================================
   CTA BUTTON
========================================================= */

function MealEatsCTA() {
  return (
    <a
      href="#"
      className="
        group
        inline-flex
        h-[46px]
        w-fit
        items-center
        justify-center
        gap-[8px]
        rounded-full
        bg-accent
        px-[20px]
        font-primary
        text-[14px]
        font-medium
        leading-none
        text-white
        shadow-[0_5px_18px_rgba(130,183,46,0.24)]

        transition-all
        duration-300
        ease-out

        hover:-translate-y-[1px]
        hover:shadow-[0_8px_24px_rgba(130,183,46,0.32)]

        active:translate-y-0

        sm:h-[48px]
        sm:px-[22px]
        sm:text-[15px]

        lg:h-[50px]
        lg:px-[24px]
      "
    >
      <Sparkles
        aria-hidden="true"
        className="
          h-[15px]
          w-[15px]
          stroke-[1.6]

          transition-transform
          duration-300

          group-hover:rotate-[-8deg]
          group-hover:scale-110
        "
      />

      <span>Try Meal Eats AI</span>
    </a>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader() {
  const shouldReduceMotion = useReducedMotion();

  return (
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
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
      }}
    >
      <h2
        className="
          max-w-[590px]
          font-primary
          text-[42px]
          font-medium
          leading-[0.98]
          tracking-[-0.055em]
          text-secondary

          min-[390px]:text-[44px]

          sm:text-[48px]
          sm:leading-[1]

          md:text-[52px]

          lg:text-[56px]
          lg:leading-[0.98]

          xl:text-[60px]
        "
      >
        Built to make your
        <br className="hidden sm:block" /> health more personal
      </h2>

      <p
        className="
          mt-[20px]
          max-w-[510px]
          font-primary
          text-[14px]
          font-normal
          leading-[1.5]
          tracking-[-0.012em]
          text-text-muted

          min-[390px]:text-[14.5px]

          sm:mt-[22px]
          sm:text-[15px]

          md:max-w-[560px]
          md:text-[16px]

          lg:mt-[24px]
          lg:text-[17px]
          lg:leading-[1.48]

          xl:text-[18px]
        "
      >
        Meal Eats combines AI, nutrition science, and continuous learning to
        understand your goals, lifestyle, and needs — helping you make smarter
        health decisions every day.
      </p>

      <div className="mt-[24px] sm:mt-[26px] lg:mt-[28px]">
        <MealEatsCTA />
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function BuiltForYou() {
  return (
    <section
      id="built-for-you"
      aria-labelledby="built-for-you-heading"
      className="
        relative
        w-full
        overflow-hidden
        bg-primary
      "
    >
      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          container-content
          relative
          mx-auto
          px-page

          py-[64px]

          min-[390px]:py-[70px]

          sm:py-[80px]

          md:py-[90px]

          lg:py-[104px]

          xl:py-[120px]
          xl:py-[120px]
        "
      >
        {/* ===================================================
            DESKTOP / TABLET GRID
        =================================================== */}

        <div
          className="
            grid
            grid-cols-1

            lg:grid-cols-[minmax(0,0.96fr)_1px_minmax(390px,0.9fr)]

            lg:gap-x-[54px]

            xl:grid-cols-[minmax(0,1fr)_1px_minmax(450px,0.92fr)]

            xl:gap-x-[72px]

            2xl:gap-x-[92px]
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div
            className="
              min-w-0
              lg:pr-[10px]
              xl:pr-[20px]
            "
          >
            <SectionHeader />

            {/* TESTIMONIAL */}

            <div
              className="
                mt-[48px]

                min-[390px]:mt-[52px]

                sm:mt-[58px]

                md:mt-[64px]

                lg:mt-[72px]

                xl:mt-[78px]
              "
            >
              <TestimonialCard />
            </div>
          </div>

          {/* =================================================
              VERTICAL DIVIDER
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              hidden
              lg:block
              w-px
              bg-[#e5e5e5]
            "
          />

          {/* =================================================
              RIGHT CARDS
          ================================================= */}

          <div
            className="
              mt-[56px]
              flex
              min-w-0
              flex-col
              gap-[16px]

              min-[390px]:mt-[60px]
              min-[390px]:gap-[18px]

              sm:mt-[64px]
              sm:gap-[18px]

              md:mt-[72px]
              md:gap-[20px]

              lg:mt-0
              lg:gap-[20px]

              xl:gap-[22px]
            "
          >
            {storyCards.map((card, index) => (
              <StoryCardItem
                key={card.title}
                card={card}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}