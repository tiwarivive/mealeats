"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  BrainCircuit,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

/* =========================================================
   TYPES
========================================================= */

type HealthCard = {
  icon: typeof BrainCircuit;
  gif: string;
  title: string;
  description: string;
};

/* =========================================================
   CONTENT
========================================================= */

const MEALEATS_AI_HREF = "/ai-platform";

const HEALTH_CARDS: HealthCard[] = [
  {
    icon: BrainCircuit,
    gif: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377156/mealeats/products/running.gif",
    title: "A Better Way to Plan Your Meals",
    description:
      "Meal Eats began with a simple idea: health guidance should feel personal, practical, and relevant to the individual — not generic or one-size-fits-all.",
  },
  {
    icon: HeartPulse,
    gif: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377105/mealeats/products/healthismore.gif",
    title: "Health Is More Than One Number",
    description:
      "We looked beyond isolated health goals to understand the bigger picture, lifestyle, habits, preferences, nutrition, and the everyday choices that shape wellbeing.",
  },
  {
    icon: Sparkles,
    gif: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377156/mealeats/products/running.gif",
    title: "Personalization Meets AI",
    description:
      "We’re bringing AI and nutrition science together to create an experience that learns from each person and delivers increasingly relevant, explainable guidance.",
  },
  {
    icon: UserRoundCheck,
    gif: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377155/mealeats/products/robottalking.gif",
    title: "A Health Companion That Learns",
    description:
      "Every interaction helps MealEats understand what matters to you, making your experience more personal and useful over time.",
  },
  {
    icon: ShieldCheck,
    gif: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377106/mealeats/products/healthprofile.gif",
    title: "Towards Intelligent, Personalized Meal Planning",
    description:
      "Our vision is to create a trusted AI health companion that helps individuals and families make healthier, smarter decisions every day.",
  },
];

/* =========================================================
   STICKY STORY CONTENT
========================================================= */

function StickyStoryContent() {
  return (
    <div
      className="
        flex
        w-full
        min-w-0
        flex-col
        items-start
      "
    >
      {/* =====================================================
          HEADING
      ===================================================== */}

      <h2
        id="personal-health-heading"
        className="
          max-w-[540px]

          font-primary
          text-h2
          font-[500]
          leading-[60px]
          tracking-[-4%]

          text-secondary

          max-[768px]:max-w-full
          max-[768px]:!text-[28px]
          max-[768px]:!leading-[41px]
        "
      >
        Built to make your health more personal
      </h2>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <p
        className="
          !mt-[24px]
          max-w-[537px]

          !font-manrope
          text-body
          font-normal
          !leading-[110%]
          tracking-[0%]

          text-text-muted

          max-[768px]:mt-[8px]
          max-[768px]:max-w-full
          max-[768px]:!text-[16px]
          max-[768px]:!leading-[22px]
        "
      >
        MealEats combines AI, nutrition science, and continuous learning to
        understand your goals, lifestyle, and needs — helping you make smarter
        health decisions every day.
      </p>

      {/* =====================================================
          CTA
      ===================================================== */}

      <Link
        href={MEALEATS_AI_HREF}
        aria-label="Try MealEats AI"
        className="
          mt-[14px]
          min-w-[219px]
          mt-[24px]

          inline-flex
          h-[48px]
          shrink-0
          items-center
          justify-center
          gap-[7px]

          rounded-[37px]

          bg-primary-gradient

          px-[16px]

          font-primary
          !text-body
          font-medium
          leading-[28px]

          !text-primary

          shadow-[0px_4px_16.1px_0px_#2F770D45]

          transition-[transform,box-shadow]
          duration-200

          hover:-translate-y-[1px]
          hover:shadow-[0px_6px_20px_0px_#2F770D45]

          max-[767px]:w-full
          max-[767px]:max-w-full
        "
      >
        <Sparkles
          aria-hidden="true"
          size={13}
          strokeWidth={1.8}
        />

        <span>Try MealEats AI</span>
      </Link>

      {/* =====================================================
          TESTIMONIAL
      ===================================================== */}

      <article
        aria-label="MealEats testimonial"
        className="
          mt-[24px]

          max-w-[441px]
          w-full
          min-h-[236px]

          overflow-hidden
          rounded-[9px]

          bg-secondary

          max-[767px]:w-full
        "
      >
        <Image
          src="https://res.cloudinary.com/gppcmjpt/image/upload/v1787377137/mealeats/products/myheath.png"
          alt=""
          height={236}
          width={441}
          className="
            block
            h-[236px]
            w-[441px]
            max-w-full
            object-cover

            max-[767px]:h-auto
            max-[767px]:w-full
          "
        />
      </article>
    </div>
  );
}

/* =========================================================
   SCROLL PROGRESS RAIL
========================================================= */

function ScrollProgressRail({
  children,
}: {
  children: React.ReactNode;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 72%", "end 28%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 1000 : 180,
    damping: shouldReduceMotion ? 100 : 28,
    mass: shouldReduceMotion ? 0.01 : 0.35,
  });

  return (
    <div
      ref={railRef}
      className="
        relative
        min-w-0
        self-stretch

        pl-[28px]

        max-[1280px]:pl-[24px]
        max-[1024px]:pl-[22px]

        max-[767px]:pl-[22px]
      "
    >
      {/* ===================================================
          STATIC TRACK
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-0
          top-0
          bottom-0
          z-0

          w-[2px]

          rounded-full

          bg-[#E5E5E5]

          max-[1280px]:w-[2px]

          max-[767px]:left-[3px]
          max-[767px]:w-[2px]
        "
      />

      {/* ===================================================
          SCROLLING GREEN FILL
      =================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-0
          top-0
          bottom-0
          z-[1]

          w-[2px]

          rounded-full

          bg-accent

          max-[767px]:left-[3px]
          max-[767px]:w-[2px]
        "
        style={{
          scaleY: smoothProgress,
          transformOrigin: "top",
        }}
      />

      {/* ===================================================
          CARD STACK
      =================================================== */}

      <div className="relative z-10 w-full min-w-0">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   HEALTH CARD
========================================================= */

function HealthCard({
  card,
}: {
  card: HealthCard;
}) {
  return (
    <article
      className="
        group
        relative
        min-w-0

        min-h-[148px]
        !max-w-[431px]
        !ml-auto
        w-full

        overflow-hidden

        rounded-[20px]

     

        !bg-[#F6FBF4CC]

        px-[24px]
        py-[17px]

        transition-[transform,border-color,box-shadow]
        duration-300
        ease-out

        hover:-translate-y-[1px]
      

        max-[1280px]:min-h-[144px]

        max-[1024px]:min-h-[140px]
        max-[1024px]:px-[16px]
        max-[1024px]:py-[16px]

        max-[768px]:min-h-[136px]

        max-[480px]:min-h-[130px]
        max-[480px]:rounded-[8px]
        max-[480px]:px-[15px]
        max-[480px]:py-[14px]
      "
    >
      {/* ===================================================
          ICON
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          relative
          z-10

          flex
          h-icon-md
          w-icon-md
          items-center
          justify-center

          overflow-hidden

          rounded-[10px]

          !bg-[#FFFFFF]

          border-[1px]
          border-[#EEEEEE]

          max-[480px]:h-[48px]
          max-[480px]:w-[48px]
        "
      >
        <Image
          src={card.gif}
          alt=""
          width={64}
          height={64}
          unoptimized
          draggable={false}
          className="
            block
            h-icon-sm
            w-icon-sm

            select-none

            object-contain

            p-[3px]

            transition-transform
            duration-500
            ease-out

            group-hover:scale-[1.06]
          "
        />
      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div
        className="
          relative
          z-10

          pr-[24px]

          max-[480px]:pr-[0]
        "
      >
        {/* TITLE */}

        <h3
          className="
            !mt-[34px]

            font-primary
            !text-[24px]
            font-medium
            !leading-[30px]
            tracking-[-3%]

            text-dark

            max-[1024px]:mt-[16px]
            max-[1024px]:!text-h4

            max-[480px]:mt-[15px]
            max-[480px]:!text-h4
          "
        >
          {card.title}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            !mt-[16px]

            font-primary
            text-[15px]
            font-normal
            leading-[20px]
            tracking-[-3%]

            text-text-muted

            max-[480px]:!mt-[10px]
          "
        >
          {card.description}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   HEALTH CARD STACK
========================================================= */

function HealthCardStack() {
  return (
    <div
      className="
        flex
        w-full
        flex-col
        gap-[12px]

        max-[768px]:gap-[24px]
      "
    >
      {HEALTH_CARDS.map((card) => (
        <HealthCard
          key={card.title}
          card={card}
        />
      ))}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function PersonalHealth() {
  return (
    <section
      id="personal-health"
      aria-labelledby="personal-health-heading"
      className="
        relative
        w-full
        bg-primary
      "
    >
      <div
        className="
          container-content
          mx-auto
          w-full
          px-[16px]

          py-[96px]

          max-[1280px]:py-[88px]

          max-[1024px]:py-[76px]

          max-[768px]:!pt-[72px]

          max-[480px]:py-[52px]
          max-[768px]:!pb-0
        "
      >
        {/* =====================================================
            DESKTOP / TABLET

            Desktop layout remains unchanged.
        ===================================================== */}

        <div
          className="
            grid
            w-full
            items-stretch

            grid-cols-[minmax(0,1fr)_minmax(420px,0.88fr)]

            gap-[72px]

            max-[1280px]:grid-cols-[minmax(0,0.95fr)_minmax(400px,0.9fr)]
            max-[1280px]:gap-[60px]

            max-[1024px]:grid-cols-[minmax(0,0.92fr)_minmax(0,0.9fr)]
            max-[1024px]:gap-[44px]

            max-[767px]:hidden
          "
        >
          {/* ===================================================
              LEFT COLUMN — DESKTOP STICKY ONLY
          =================================================== */}

          <div
            className="
              relative
              min-w-0
              self-stretch
            "
          >
            <div
              className="
                sticky
                top-[100px]
                z-20

                w-full
              "
            >
              <StickyStoryContent />
            </div>
          </div>

          {/* ===================================================
              RIGHT COLUMN + DESKTOP PROGRESS RAIL
          =================================================== */}

          <ScrollProgressRail>
            <HealthCardStack />
          </ScrollProgressRail>
        </div>

        {/* =====================================================
            MOBILE

            IMPORTANT:
            No sticky functionality on mobile.
            Hierarchy stays:
            Heading
            Description
            CTA
            Testimonial
            Progress rail + cards
        ===================================================== */}

        <div
          className="
            hidden

            max-[767px]:block
          "
        >
          {/* ===================================================
              MOBILE STORY — STATIC
          =================================================== */}

          <div
            className="
              relative
              z-10

              w-full

              pb-[32px]
            "
          >
            <StickyStoryContent />
          </div>

          {/* ===================================================
              MOBILE CARDS + AUTO FILLING RAIL
          =================================================== */}

          <div
            className="
              relative
              z-10

              mt-[4px]

              w-full
            "
          >
            <ScrollProgressRail>
              <HealthCardStack />
            </ScrollProgressRail>
          </div>
        </div>
      </div>
    </section>
  );
}