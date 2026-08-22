"use client";

import Image from "next/image";
import SectionBadge from "./SectionBadge";

/* =========================================================
   ASSETS
========================================================= */

const MISSION_VISION_IMAGE = "/overlaymission.png";
const MISSION_GIF = "/mission.gif";

const PROBLEM_GIF = "/problem.gif";
const SOLUTION_GIF = "/thesolution.gif";

/* =========================================================
   CONTENT
========================================================= */

const MISSION_DESCRIPTION =
  "We believe better health starts with better understanding. Our AI-powered platform brings personalised nutrition, fitness, health guidance, and everyday wellness into one simple experience — designed around your needs, goals, and lifestyle.";

const PROBLEM_DESCRIPTION =
  "Healthcare advice is often generic, scattered, and difficult to follow. People struggle to know what to eat, which exercises are right for them, how to build healthier habits, or which information they can trust. Everyday wellness shouldn’t mean searching through countless apps and websites.";

const SOLUTION_DESCRIPTION =
  "MealEats brings personalised health guidance into one simple experience. It connects nutrition, fitness, wellness, and everyday health insights around your needs, goals, and lifestyle — helping you make clearer and more confident decisions.";

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function MissionVision() {
  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-vision-heading"
      className="
        relative
        w-full
        overflow-hidden
        bg-primary
      "
    >
      {/* =====================================================
          CONTENT CONTAINER
      ====================================================== */}

      <div
        className="
          container-content
          mx-auto
          w-full
          px-[16px]

          pt-[66px]
          pb-[66px]
          max-[768px]:pt-[52px]

    
        "
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

        <header
          className="
            mx-auto
            flex
            w-full
            max-w-[720px]
            flex-col
            items-center
            text-center
          "
        >
          {/* =================================================
              BADGE
          ================================================== */}

          <SectionBadge>MISSION &amp; VISION</SectionBadge>

          {/* =================================================
              HEADING
          ================================================== */}

          <h2
            id="mission-vision-heading"
            className="
              mt-[16px]
              max-w-[700px]

              font-primary
              text-h2
              font-normal
              leading-[60px]
              tracking-[-4%]
              text-secondary

              max-[1024px]:max-w-[620px]

              max-[768px]:mt-[14px]
              max-[768px]:max-w-[560px]

              max-[600px]:max-w-[450px]

              max-[480px]:mt-[12px]
              max-[480px]:max-w-[340px]
              max-[768px]:!text-[28px]
              max-[768px]:!leading-[41px]
            "
          >
            Healthcare, Built Around You
          </h2>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            className="
              mt-[12px]
              max-w-[680px]

              font-primary
              text-body
              font-normal
              leading-[28px]
              tracking-[-0.015em]
              text-text-muted

              max-[1024px]:max-w-[640px]

              max-[768px]:mt-[11px]
              max-[768px]:max-w-[600px]

              max-[600px]:max-w-[500px]

              max-[480px]:mt-[10px]
              max-[480px]:max-w-[345px]
              max-[768px]:!text-[16px]
              max-[768px]:!leading-[22px]
            "
          >
            {MISSION_DESCRIPTION}
          </p>
        </header>

        {/* ===================================================
            IMAGE + FLOATING PANEL
        ==================================================== */}

        <div
          className="
            relative
            mt-[28px]
            w-full

          
          "
        >
          {/* =================================================
              MAIN IMAGE
          ================================================== */}

          <div
            className="
              relative
              w-full
              overflow-hidden

              rounded-[18px]

              aspect-[2.05/1]
              max-[768px]:!hidden

          
            "
          >
            <Image
              src={MISSION_VISION_IMAGE}
              alt="People collaborating together in a healthcare and wellness environment"
              width={1328}
              height={645}
              className="
              min-h-[600px]
              max-w-[1328px]
              mx-auto
                object-cover
                object-center
              "
            />

          </div>

          {/* =================================================
              FLOATING PROBLEM / SOLUTION PANEL
          ================================================== */}

          <div
            className="
              absolute
              bottom-[26px]
              left-1/2
              z-10

              w-[90%]
              max-[768px]:!w-full
              -translate-x-1/2

              rounded-[14px]
              border
              border-border
               max-[768px]:!mt-[32px]

              bg-primary

              p-[10px]
              max-[768px]:!p-0

              shadow-card

              max-[1280px]:bottom-[22px]

              max-[1024px]:bottom-[20px]
              max-[1024px]:w-[91%]

              max-[768px]:static
              max-[768px]:mx-auto
              max-[768px]:mt-[-42px]
              max-[768px]:w-[calc(100%-36px)]
              max-[768px]:translate-x-0
              max-[768px]:rounded-[13px]
              max-[768px]:p-[8px]

              max-[600px]:mt-[-36px]
              max-[600px]:w-[calc(100%-30px)]
              max-[600px]:p-[7px]

              max-[480px]:mt-[-30px]
              max-[480px]:w-[calc(100%-24px)]
              max-[480px]:rounded-[11px]
              max-[480px]:p-[6px]
              max-[768px]:shadow-none
              max-[768px]:border-none

            "
          >
            {/* =================================================
                CARDS GRID
            ================================================== */}

            <div
              className="
                grid
                grid-cols-2
                gap-[10px]

                max-[1024px]:gap-[9px]

                max-[768px]:gap-[8px]

                max-[600px]:grid-cols-1
                max-[600px]:gap-[7px]
               
              "
            >
              {/* =================================================
                  PROBLEM
              ================================================== */}

              <MissionCard
                title="The Problem"
                description={PROBLEM_DESCRIPTION}
                icon={PROBLEM_GIF}
                iconAlt="Problem"
              />

              {/* =================================================
                  SOLUTION
              ================================================== */}

              <MissionCard
                title="The Solution"
                description={SOLUTION_DESCRIPTION}
                icon={SOLUTION_GIF}
                iconAlt="Solution"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MISSION CARD
========================================================= */

type MissionCardProps = {
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
};

function MissionCard({
  title,
  description,
  icon,
  iconAlt,
}: MissionCardProps) {
  return (
    <article
      className="
      
        min-h-[378px]
        max-[768px]:min-h-fit
    

        rounded-[8px]
        border-[1px]
        border-[#DFDDDC]

        bg-[#FAFAFA]

        px-[24px]
        py-[32px]
        max-[768px]:!p-[24px]

        
      "
    >
      {/* =====================================================
          GIF ICON
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          relative
          flex
          h-[64px]
          w-[64px]
          max-[768px]:h-icon-md
          max-[768px]:w-icon-md
          shrink-0
          items-center
          !p-[5px]
        
         justify-center
          overflow-hidden
          rounded-[8px]

          border-[#C5C5C5]
          border-[1px]

          bg-primary


        "
      >
        <Image
          src={icon}
          alt={iconAlt}
          fill
          unoptimized
          sizes="48px"
          className="
          m-auto
            object-cover
            !h-icon-md
            !w-icon-md
            max-[768px]:!h-[32px]
          max-[768px]:!w-[32px]
          "
        />
      </div>

      {/* =====================================================
          TITLE
      ====================================================== */}

      <h4
        className="
          !mt-[59px]

          font-primary
          text-[24px]
          font-medium
          leading-[30px]
          tracking-[-3%]
          max-[768px]:!text-[20px]
          max-[768px]:!leading-[30px]

          text-dark
        "
      >
        {title}
      </h4>

      {/* =====================================================
          DESCRIPTION
      ====================================================== */}

      <p
        className="
          !mt-[16px]
          max-w-[560px]

          font-primary
          text-[18px]
          font-normal
          leading-[27px]
          tracking-[-1%]

          text-[#7E7E7E]
          max-[768px]:!text-[14px]
          max-[768px]:!leading-[22px]
        "
      >
        {description}
      </p>
    </article>
  );
}