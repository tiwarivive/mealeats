"use client";

import Image from "next/image";
import SectionBadge from "./SectionBadge";

/* =========================================================
   TYPES
========================================================= */

type CoreValue = {
  title: string;
  description: string;
  gif: string;
};

/* =========================================================
   DATA
========================================================= */

const coreValues: CoreValue[] = [
  {
    title: "Innovation with evidence",
    description:
      "Every model output is grounded in nutrition science and clinical guidelines, not internet folklore.",
    gif: "/innovative.gif",
  },
  {
    title: "Privacy as a default",
    description:
      "Health data is encrypted, minimised and never sold. You can export or erase everything at any time.",
    gif: "/privacy.gif",
  },
  {
    title: "Trust before growth",
    description:
      "We would rather say 'ask your doctor' than invent an answer. Safety rails ship before features.",
    gif: "/trust.gif",
  },
  {
    title: "Radical personalisation",
    description:
      "Two members with the same weight can receive opposite advice because their bodies and histories differ.",
    gif: "/redical.gif",
  },
];

/* =========================================================
   CORE VALUE CARD
========================================================= */

function CoreValueCard({
  title,
  description,
  gif,
}: CoreValue) {
  return (
    <article
      className="
        group
        relative
        flex
        min-w-0
        flex-col

        rounded-[12px]
        border
        border-border
        bg-primary

        px-[21px]
        py-[21px]
        max-[768px]:px-[16px]

        shadow-[0px_2px_7.4px_0px_#ACACAC59]

        transition-transform
        duration-300
        ease-out

        motion-safe:hover:-translate-y-[3px]
        motion-reduce:transition-none

        
      "
    >
      {/* =================================================
          GIF
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          relative
          flex
          p-[4px]
          h-icon-lg
          w-icon-lg
          shrink-0
          items-center
          justify-center
          overflow-hidden

          rounded-[10px]
          border
          border-border-light
          bg-primary

          transition-colors
          duration-300

          group-hover:border-accent

          motion-reduce:transition-none
        "
      >
        <Image
          src={gif}
          alt=""
          width={40}
          height={40}
          unoptimized
          className="
            h-[40px]
            w-[40px]
            max-[768px]:h-[32px]
            max-[768px]:w-[32px]
            object-cover
          "
        />
      </div>

      {/* =================================================
          CARD CONTENT
      ================================================= */}

      <div
        className="
        mt-[34px]
          max-[1440px]:mt-[30px]
          max-[1280px]:mt-[28px]
          max-[1024px]:mt-[26px]
          max-[768px]:!mt-0
          max-[480px]:mt-[22px]
        "
      >
        {/* =================================================
            TITLE
        ================================================= */}

        <h4
          className="
            max-w-[300px]

            font-primary
            text-h4
            mb-[16px]
            font-[500]
            leading-[30px]
            tracking-[-3%]
            text-secondary
            max-[768px]:!mt-[48px]
            max-[768px]:!text-[20px]
            max-[768px]:!leading-[30px]
            
          "
        >
          {title}
        </h4>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p
          className="
            mt-[14px]
            max-w-[320px]

            font-primary
            text-body
            font-normal
            leading-[20px]
            tracking-[-3%]
            text-text-muted

            max-[1440px]:text-[13.5px]

            max-[1280px]:mt-[13px]
            max-[1280px]:text-[13px]
            max-[1280px]:leading-[1.48]

          "
        >
          {description}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CoreValues() {
  return (
    <section
      id="core-values"
      aria-labelledby="core-values-heading"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#FCF8F28F]
      "
    >
      {/* ===================================================
          MAIN WRAPPER
      =================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]

          px-[56px]
          py-[72px]

          max-[1440px]:px-[48px]
          max-[1440px]:py-[68px]

          max-[1280px]:px-[40px]
          max-[1280px]:py-[64px]

          max-[1024px]:px-[32px]
          max-[1024px]:py-[60px]

          max-[768px]:px-[24px]
          max-[768px]:py-[56px]

          max-[480px]:px-[16px]
          max-[480px]:py-[48px]
        "
      >
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div
          className="
            flex
            w-full
            flex-col
            items-start
          "
        >
          {/* =================================================
              BADGE
          ================================================= */}


          <SectionBadge>CORE VALUES</SectionBadge>




          {/* =================================================
              HEADING
          ================================================= */}

          <h2
            id="core-values-heading"
            className="
              !mt-[16px]
              max-w-[520px]

              font-primary
              !text-h2
              font-[500]
              leading-[60px]
              tracking-[-4%]
              text-secondary
              max-[768px]:!text-[24px]
            max-[768px]:!leading-[32px]
            "
          >
            Four commitments we don&apos;t trade away
          </h2>
        </div>

        {/* =================================================
            CARDS
        ================================================= */}

        <div
          className="
            mt-[64px]

            grid
            grid-cols-4
            gap-[28px]

            max-[1440px]:mt-[58px]
            max-[1440px]:gap-[24px]

            max-[1280px]:mt-[54px]
            max-[1280px]:gap-[20px]

            max-[1024px]:mt-[48px]
            max-[1024px]:grid-cols-2
            max-[1024px]:gap-[20px]

            max-[768px]:mt-[42px]
            max-[768px]:gap-[18px]

            max-[600px]:grid-cols-1
            max-[600px]:gap-[16px]

            max-[480px]:mt-[36px]
          "
        >
          {coreValues.map((value) => (
            <CoreValueCard
              key={value.title}
              title={value.title}
              description={value.description}
              gif={value.gif}
            />
          ))}
        </div>
      </div>
    </section>
  );
}