"use client";

import Image from "next/image";
import DifferenceCard from "./DifferenceCard";

/* =========================================================
   TYPES
========================================================= */

type DifferenceType = "insights" | "nutrition" | "progress";

interface Difference {
  title: string;
  description: string;
  type: DifferenceType;
  image: string;
  imageWidth: number;
  imageHeight: number;
}

/* =========================================================
   FIGMA ASSETS
========================================================= */

const DIFFERENCE_IMAGES = {
  insights: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377094/mealeats/products/group%202085663266.png",
  nutrition: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377095/mealeats/products/group%202085664079.png",
  progress: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377096/mealeats/products/group%202085664080.png",
} as const;

/* =========================================================
   DIFFERENCE DATA
========================================================= */

const differences: Difference[] = [
  {
    title: "Personalized Health Insights",
    description:
      "Understand your health better with AI-powered insights based on your profile, habits, goals, and wellness progress.",
    type: "insights",
    image: DIFFERENCE_IMAGES.insights,
    imageWidth: 1477,
    imageHeight: 1529,
  },
  {
    title: "AI-Powered Nutrition Guidance",
    description:
      "Get personalized healthy food and meal suggestions designed around your dietary needs, preferences, and health goals.",
    type: "nutrition",
    image: DIFFERENCE_IMAGES.nutrition,
    imageWidth: 1416,
    imageHeight: 1426,
  },
  {
    title: "Smart Health Progress",
    description:
      "Track your nutrition, activity, hydration, and wellness progress through simple visual insights that help you stay consistent.",
    type: "progress",
    image: DIFFERENCE_IMAGES.progress,
    imageWidth: 1546,
    imageHeight: 1638,
  },
];

/* =========================================================
   DIFFERENCE VISUAL
========================================================= */

function DifferenceVisual({
  image,
  imageWidth,
  imageHeight,
  type,
}: {
  image: string;
  imageWidth: number;
  imageHeight: number;
  type: DifferenceType;
}) {
  return (
    <div
      className="
        mt-auto
        flex
        min-h-[190px]
        w-full
        items-end
        justify-center
        overflow-hidden
        pt-[var(--spacing-lg)]
        sm:min-h-[210px]
        sm:pt-[var(--spacing-xl)]
        lg:min-h-[220px]
        max-[768px]:block
      "
      aria-hidden="true"
    >
      <Image
        src={image}
        alt=""
        width={imageWidth}
        height={imageHeight}
        sizes="
          (max-width: 639px) 88vw,
          (max-width: 1023px) 42vw,
          28vw
        "
        className={`
          block
          h-auto
          w-full
          object-contain
          object-bottom
          ${
            type === "insights"
              ? "max-w-[215px] sm:max-w-[230px] lg:max-w-[245px] max-[768px]:!max-w-full"
              : type === "nutrition"
                ? "max-w-[205px] sm:max-w-[220px] lg:max-w-[235px] max-[768px]:!max-w-full"
                : "max-w-[220px] sm:max-w-[235px] lg:max-w-[250px] max-[768px]:!max-w-full"
          }
        `}
      />
    </div>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function WhatMakesUsDifferent() {
  return (
    <section
      id="what-makes-us-different"
      aria-labelledby="what-makes-us-different-heading"
      className="
        relative
        w-full
        overflow-hidden
        bg-primary
        py-[52px]
        sm:py-[52px]
        lg:py-[52px]
        max-[768px]:pb-[72px]
      "
    >
      <div
        className="
          container-content
          mx-auto
          w-full
        "
      >
        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div
          className="
            mx-auto
            w-full
            max-w-[650px]
            px-[var(--spacing-page)]
            text-center
          "
        >
          <h2
            id="what-makes-us-different-heading"
            className="
              font-primary
              !text-h2
              font-medium
              leading-[59px]
              tracking-[-4%]
              text-secondary
              max-[480px]:text-h4
            "
          >
            What Makes Us{" "}
            <span
              className="
                font-accent
                font-normal
                italic
              "
            >
              Different
            </span>
          </h2>

          <p
            className="
              !mx-auto
              !mt-[16px]
              max-[768px]:!mt-0
              max-w-[520px]
              font-primary
              !text-body
              font-normal
              leading-[28px]
              text-text-muted
            "
          >
            Personalized healthcare that understands you, not just your data.
          </p>
        </div>

        {/* =====================================================
            DIFFERENCE CARDS
        ===================================================== */}

        <div
          className="
            mt-[var(--spacing-3xl)]
            max-[768px]:mt-[47px]
            grid
            grid-cols-1
            gap-[var(--spacing-lg)]
            px-[var(--spacing-page)]
            sm:gap-[var(--spacing-xl)]
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {differences.map((item) => (
            <DifferenceCard
              key={item.title}
              title={item.title}
              description={item.description}
            >
              <DifferenceVisual
                image={item.image}
                imageWidth={item.imageWidth}
                imageHeight={item.imageHeight}
                type={item.type}
              />
            </DifferenceCard>
          ))}
        </div>
      </div>
    </section>
  );
}