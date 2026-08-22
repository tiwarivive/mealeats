"use client";

import Image from "next/image";

/* =========================================================
   TYPES
========================================================= */

type Capability = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

/* =========================================================
   DATA
========================================================= */

const capabilities: Capability[] = [
  {
    id: 1,
    title: "Ingredients to Recipe",
    description:
      "Enter ingredients you have at home and get healthy recipes.",
    icon: "/ingredinets.gif",
  },
  {
    id: 2,
    title: "Personalised Recommendation",
    description:
      "All suggestions based on your health, goals and preferences.",
    icon: "/personalised.gif",
  },
  {
    id: 3,
    title: "Daily Nutrition Score",
    description:
      "Track your daily nutrition and understand how balanced you are.",
    icon: "/nutiritionsscore.gif",
  },
  {
    id: 4,
    title: "Product Comparison",
    description:
      "Compare products and make healthier, more informed choices with personalized guidance tailored to your needs.",
    icon: "/productcomparison.gif",
  },
  {
    id: 5,
    title: "Smart Shopping",
    description:
      "Find the right products, trusted brands, and healthier alternatives with personalized recommendations tailored to your health goals and needs.",
    icon: "/smartshoping.gif",
  },
];

/* =========================================================
   CAPABILITY CARD
========================================================= */

function CapabilityCard({
  capability,
  wide = false,
}: {
  capability: Capability;
  wide?: boolean;
}) {
  return (
    <article
      className={`
        relative
        flex
        min-w-0
        w-full
        flex-col
        overflow-hidden
        rounded-[16px]
        border
        border-[#E1E1E1]
        bg-white
        px-[38px]
        pt-[37px]
        pb-[38px]

        ${
          wide
            ? `
              min-h-fit
            `
            : `
              min-h-fit
            `
        }

        /* =====================================================
           LARGE DESKTOP
        ===================================================== */

        max-[1439px]:px-[34px]

        /* =====================================================
           TABLET / SMALL DESKTOP
        ===================================================== */

        max-[1199px]:min-h-fit
        max-[1199px]:rounded-[15px]
        max-[1199px]:px-[30px]
        max-[1199px]:pt-[30px]
        max-[1199px]:pb-[30px]

        /* =====================================================
           TABLET
        ===================================================== */

        max-[1023px]:min-h-fit
        max-[1023px]:px-[26px]
        max-[1023px]:pt-[27px]
        max-[1023px]:pb-[28px]

        /* =====================================================
           MOBILE
        ===================================================== */

        max-[767px]:min-h-0
        max-[767px]:rounded-[14px]
        max-[767px]:px-[24px]
        max-[767px]:pt-[24px]
        max-[767px]:pb-[26px]

        max-[480px]:px-[20px]
        max-[480px]:pt-[21px]
        max-[480px]:pb-[23px]
        !max-h-[277px]
      `}
    >
      {/* =====================================================
          ICON
      ===================================================== */}

      <div
        className="
          flex
          h-[56px]
          w-[56px]
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-[10px]
          border
          border-[#D5D5D5]
          bg-white

          max-[1199px]:h-[62px]
          max-[1199px]:w-[62px]

          max-[1023px]:h-[60px]
          max-[1023px]:w-[60px]

          max-[767px]:h-[56px]
          max-[767px]:w-[56px]
          max-[767px]:rounded-[9px]

          max-[480px]:h-[52px]
          max-[480px]:w-[52px]
        "
      >
        <Image
          src={capability.icon}
          alt=""
          width={40}
          height={40}
          unoptimized
          aria-hidden="true"
          draggable={false}
          className="
            h-[40px]
            w-[40px]
            object-contain

            max-[1199px]:h-[40px]
            max-[1199px]:w-[40px]

            max-[1023px]:h-[40px]
            max-[1023px]:w-[40px]

            max-[767px]:h-[40px]
            max-[767px]:w-[40px]

            max-[480px]:h-[40px]
            max-[480px]:w-[40px]
          "
        />
      </div>

      {/* =====================================================
          CARD CONTENT
      ===================================================== */}

      <div
        className="
          mt-[84px]

          max-[1439px]:mt-[72px]

          max-[1199px]:mt-[52px]

          max-[1023px]:mt-[46px]

          max-[767px]:mt-[34px]

          max-[480px]:mt-[28px]
        "
      >
        {/* ===================================================
            TITLE
        =================================================== */}

        <h3
          className="
            m-0
            font-primary
            !text-[24px]
            font-medium
            leading-[30px]
            tracking-[-0.045em]
            text-dark

            max-[1439px]:text-[26px]

            max-[1199px]:text-[24px]

            max-[1023px]:text-[23px]
            max-[1023px]:leading-[1.16]

            max-[767px]:text-[21px]
            max-[767px]:leading-[1.18]

            max-[480px]:text-[20px]
          "
        >
          {capability.title}
        </h3>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <p
          className="
            m-0
            mt-[18px]
            max-w-[900px]
            font-primary
            text-[18px]
            font-normal
            leading-[1.35]
            tracking-[-0.02em]
            text-[#858585]

            max-[1439px]:text-[17px]

            max-[1199px]:mt-[15px]
            max-[1199px]:text-[16px]

            max-[1023px]:text-[15px]
            max-[1023px]:leading-[1.4]

            max-[767px]:mt-[12px]
            max-[767px]:text-[14px]
            max-[767px]:leading-[1.42]

            max-[480px]:text-[13.5px]
          "
        >
          {capability.description}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   GENERAL CHATBOT / CAPABILITIES
========================================================= */

export default function GeneralChatbot() {
  return (
    <section
      id="general-chatbot"
      aria-labelledby="general-chatbot-title"
      className="
        relative
        w-full
        overflow-hidden
        bg-primary
        text-secondary
        py-[76px]
        px-[56px]

        /* =====================================================
           LARGE DESKTOP
        ===================================================== */

        max-[1439px]:py-[68px]

        /* =====================================================
           TABLET
        ===================================================== */

        max-[1199px]:px-[40px]
        max-[1199px]:py-[58px]

        max-[1023px]:px-[30px]
        max-[1023px]:py-[52px]

        /* =====================================================
           MOBILE
        ===================================================== */

        max-[767px]:px-[16px]
        max-[767px]:py-[46px]

        max-[480px]:px-[14px]
        max-[480px]:py-[38px]
      "
    >
      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <header
          className="
            relative
            z-10
            w-full
          "
        >
          {/* =================================================
              EYEBROW
          ================================================= */}

          <p
            className="
              m-0
              font-primary
              text-[12px]
              font-medium
              uppercase
              leading-none
              tracking-[0.08em]
              text-[#237C62]

              max-[1199px]:text-[11px]

              max-[767px]:text-[10px]
            "
          >
            Capabilities
          </p>

          {/* =================================================
              TITLE
          ================================================= */}

          <h2
            id="general-chatbot-title"
            className="
              m-0
              mt-[20px]
              max-w-[900px]
              font-primary
              text-h2
              font-normal
              leading-[1.06]
              tracking-[-0.06em]
              text-[#111111]

              max-[1439px]:text-[52px]

              /* TABLET */

              max-[1199px]:mt-[18px]
              max-[1199px]:max-w-[800px]
              max-[1199px]:text-[46px]

              max-[1023px]:max-w-[720px]
              max-[1023px]:text-[42px]
              max-[1023px]:leading-[1.08]

              /* MOBILE */

              max-[767px]:mt-[14px]
              max-[767px]:max-w-[430px]
              max-[767px]:text-[36px]
              max-[767px]:leading-[1.08]
              max-[767px]:tracking-[-0.055em]

              max-[480px]:text-[31px]
            "
          >
            What can{" "}
            <span
              className="
                font-accent
                italic
                font-normal
              "
            >
              Meal Eats
            </span>{" "}
            <br />
            do for you?
          </h2>
        </header>

        {/* ===================================================
            CARDS AREA
        =================================================== */}

        <div
          className="
            mt-[58px]

            max-[1439px]:mt-[52px]

            max-[1199px]:mt-[44px]

            max-[1023px]:mt-[40px]

            max-[767px]:mt-[34px]
          "
        >
          {/* =================================================
              FIRST ROW

              Desktop: 3 columns
              Tablet: 2 columns
              Mobile: 1 column

              FIX:
              items-start prevents CSS Grid from stretching
              all cards to the tallest card's height.
          ================================================= */}

          <div
            className="
              grid
              items-start
              grid-cols-3

              gap-x-[60px]
              gap-y-[60px]

              /* LARGE DESKTOP */

              max-[1439px]:gap-x-[42px]
              max-[1439px]:gap-y-[42px]

              /* TABLET */

              max-[1199px]:grid-cols-2
              max-[1199px]:gap-x-[28px]
              max-[1199px]:gap-y-[28px]

              max-[1023px]:gap-x-[22px]
              max-[1023px]:gap-y-[22px]

              /* MOBILE */

              max-[767px]:grid-cols-1
              max-[767px]:gap-x-0
              max-[767px]:gap-y-[16px]
            "
          >
            {capabilities.slice(0, 3).map((capability) => (
              <CapabilityCard
                key={capability.id}
                capability={capability}
              />
            ))}
          </div>

          {/* =================================================
              SECOND ROW

              Desktop: 2 equal width cards
              Tablet: 2 equal width cards
              Mobile: 1 card per row

              FIX:
              items-start prevents the two cards from being
              stretched to the same height.
          ================================================= */}

          <div
            className="
              mt-[60px]

              grid
              items-start
              grid-cols-2

              gap-x-[60px]

              /* LARGE DESKTOP */

              max-[1439px]:mt-[42px]
              max-[1439px]:gap-x-[42px]

              /* TABLET */

              max-[1199px]:mt-[28px]
              max-[1199px]:gap-x-[28px]

              max-[1023px]:mt-[22px]
              max-[1023px]:gap-x-[22px]

              /* MOBILE */

              max-[767px]:mt-[16px]
              max-[767px]:grid-cols-1
              max-[767px]:gap-x-0
              max-[767px]:gap-y-[16px]
            "
          >
            {capabilities.slice(3, 5).map((capability) => (
              <CapabilityCard
                key={capability.id}
                capability={capability}
                wide
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}