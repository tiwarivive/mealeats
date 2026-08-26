"use client";

import Image from "next/image";

/* =========================================================
   TYPES
========================================================= */

type Capability = {
  id: number;
  topLabel: boolean;
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
    topLabel:false,
    description:
      "Enter ingredients you already have and discover recipe ideas that consider your preferences and goals—helping you cook smarter and reduce unnecessary food purchases.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377122/mealeats/products/ingredinets.gif",
  },
  {
    id: 2,
    title: "Personalised Recommendation",
    topLabel:false,
    description:
      "Receive food and recipe suggestions based on the profile, preferences and goals you choose to share instead of generic recommendations.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377142/mealeats/products/personalised.gif",
  },
  {
    id: 3,
    title: "Daily Nutrition Insights",
    topLabel:false,
    description:
      "Understand estimated calories, protein, carbohydrates, fats, fibre and available nutrition information behind your meals so you can make more informed everyday choices.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377138/mealeats/products/nutiritionsscore.gif",
  },
  {
    id: 4,
    title: "Product Comparison",
    topLabel:true,
    description:
      "Compare food products based on ingredients, nutrition and your stated preferences to understand which option may better match what you're looking for.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377146/mealeats/products/productcomparison.gif",
  },
  {
    id: 5,
    title: "Smart Shopping",
    topLabel:true,
    description:
      "Turn planned meals into an organized ingredient list, account for what you already have and make it easier to purchase missing ingredients through supported shopping platforms.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377158/mealeats/products/smartshoping.gif",
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
        !rounded-[16px]
        border
        border-[#E3E3E3]
        bg-white
        px-[32px]
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
        lg:min-h-[317px]
        xl:min-h-[317px]
      `}
    >
      {/* =====================================================
          ICON
      ===================================================== */}

    <div className="">
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
      {
        capability.topLabel && (
          <div className="h-[32px] w-[123px] bg-[#F3F6F2] rounded-[6px] absolute top-[32px] right-[32px] flex items-center justify-center gap-1 text-[14px] font-medium leading-[30px] tracking-[-3%]">
            <span className="h-[6px] w-[6px] bg-[#6DA01D] inline-block rounded-full"></span>
            <div className="text-[14px] font-medium leading-[30px] tracking-[-3%] text-[#6DA01D] font-primary">Coming Soon</div>
          </div>
        )
      }
    </div>

      {/* =====================================================
          CARD CONTENT
      ===================================================== */}

      <div
        className="
          !mt-[51px]

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
            !leading-[30px]
            tracking-[-3%]
            text-dark
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
            !mt-[16px]
            mt-[18px]
            max-w-[900px]
            font-primary
            text-[16px]
            font-normal
            leading-[20px]
            tracking-[-3%]
            text-[#7E7E7E]

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
        max-w-[1328px]
        mx-auto
        lg:px-0

        /* =====================================================
           LARGE DESKTOP
        ===================================================== */

        max-[1439px]:py-[68px]

        /* =====================================================
           TABLET
        ===================================================== */
        max-[1199px]:py-[58px]
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
            grid
            lg:grid-cols-[430px_609px]
            justify-between 
          "
        >
          {/* =================================================
              EYEBROW
          ================================================= */}

          <div className="">


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
              font-medium
              leading-[1.06]
              tracking-[-0.06em]
              text-secondary

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

          </div>

          <p className="text-[16px] leading-[28px] text-[#545454] tracking-[-4%]">From deciding tonight's dinner to planning next week's groceries, Meal Eats is being built to connect everyday food decisions that are usually scattered across recipe websites, nutrition apps, shopping lists and search engines.
</p>
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