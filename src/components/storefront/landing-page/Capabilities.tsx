"use client";

import Image from "next/image";

/* =========================================================
   TYPES
========================================================= */

type Capability = {
  title: string;
  description: string;
  icon: string;
};

/* =========================================================
   DATA
========================================================= */

const capabilities: Capability[] = [
  {
    title: "Complete Nutrition Understanding",
    description:
      "See estimated calories, protein, carbohydrates, fats, fibre and available micronutrient information per serving so you understand more than just the recipe.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377154/mealeats/products/rise-bowl.gif",
  },
  {
    title: "Smarter Ingredient Swaps",
    description:
      "Missing something? Discover practical substitutions that can work with your recipe while considering your selected food preferences and restrictions.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377149/mealeats/products/protien-shake.gif",
  },
  {
    title: "Step-by-Step Cooking Guidance",
    description:
      "Follow clear ingredient quantities, preparation instructions, cooking steps, estimated cooking time and serving guidance.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377161/mealeats/products/strategy.gif",
  },
  {
    title: "Smart Meal Planning",
    description:
      "Like the recipe? Add it to your food plan and let Meal Eats help organize your week and identify what you'll need next.",
    icon: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377118/mealeats/products/holi.gif",
  },
];

const PHONE_IMAGE = "/cooksomething.png";

/* =========================================================
   CAPABILITY ITEM
========================================================= */

function CapabilityItem({
  title,
  description,
  icon,
}: Capability) {
  return (
    <div
      className="
        flex
        w-full
        min-w-0
        items-start
        gap-[18px]

        max-[1280px]:gap-[16px]

        /* ===================================================
           MOBILE ONLY
           Desktop remains unchanged.
        =================================================== */

        max-[767px]:flex-col
        max-[767px]:items-center
        max-[767px]:justify-center
        max-[767px]:gap-0
        max-[767px]:text-center
      "
    >
      {/* =====================================================
          GIF ICON
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          flex
          h-[48px]
          w-[48px]
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-[8px]
          bg-[linear-gradient(136.8deg,#7BB322_21.81%,#B8ED97_116.26%)]

          max-[1280px]:h-[48px]
          max-[1280px]:w-[48px]

          
        "
      >
        <Image
          src={icon}
          alt=""
          width={32}
          height={32}
          unoptimized
          aria-hidden="true"
          draggable={false}
          className="
            block
            h-[32px]
            w-[32px]
            select-none
            object-cover
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          min-w-0
          flex-1
          pt-[1px]

          /* =================================================
             MOBILE
          ================================================= */

          max-[767px]:mt-[26px]
          max-[767px]:w-full
          max-[767px]:flex-none
          max-[767px]:text-center

          max-[480px]:mt-[24px]

          max-[375px]:mt-[22px]
        "
      >
        <h3
          className="
            m-0
            !mb-[8px]
            font-primary
            !text-[24px]
            font-medium
            !leading-[30px]
            tracking-[-3%]
            text-dark

            max-[1280px]:text-[19px]

            max-[1024px]:text-[18px]

            /* =================================================
               MOBILE
            ================================================== */

            max-[767px]:text-[0px]
            max-[767px]:leading-none
            max-[767px]:tracking-normal
          "
        >
          {title}
        </h3>

        <p
          className="
            m-[8px]
            mt-[5px]
            max-w-[560px]

            font-primary
            text-body
            font-normal
            leading-[20px]
            tracking-[-3%]
            text-[#7E7E7E]

            max-[1280px]:text-[12.5px]

            max-[1024px]:text-[12px]

            /* =================================================
               MOBILE
            ================================================== */

            max-[767px]:mx-auto
            max-[767px]:mt-0
            max-[767px]:w-full
            max-[767px]:max-w-[390px]
            max-[767px]:text-[14px]
            max-[767px]:leading-[1.45]
            max-[767px]:tracking-[-0.015em]
            max-[767px]:text-center

            max-[600px]:max-w-[360px]
            max-[600px]:text-[13.5px]

            max-[480px]:max-w-[330px]
            max-[480px]:text-[13px]
            max-[480px]:leading-[1.45]

            max-[375px]:max-w-[300px]
            max-[375px]:text-[12.5px]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PHONE MOCKUP
========================================================= */

function PhoneMockup() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        right-[-2px]
        top-0
        lg:top-[109px]
        z-10

        flex
        h-full
        w-[45%]
        items-start
        justify-end

        max-[1280px]:w-[45%]

        max-[1024px]:w-[45%]

        /* ===================================================
           MOBILE PHONE
        ==================================================== */

        max-[767px]:relative
        max-[767px]:right-auto
        max-[767px]:top-auto
        max-[767px]:z-10
        max-[767px]:mt-[72px]
        max-[767px]:h-auto
        max-[767px]:w-full
        max-[767px]:items-center
        max-[767px]:justify-center
        max-[767px]:px-0

        max-[600px]:mt-[64px]

        max-[480px]:mt-[58px]

        max-[375px]:mt-[52px]
      "
    >
      
      <Image
        src={PHONE_IMAGE}
        alt="MealEats Health Assistant recipe screen"
        width={720}
        height={900}
        draggable={false}
        sizes="
          (max-width: 375px) 88vw,
          (max-width: 480px) 86vw,
          (max-width: 767px) 82vw,
          37vw
        "
        className="
          block
          h-[677px]
          w-auto
          max-w-none
          shrink-0
          select-none
          object-contain
          object-top

          max-[1280px]:h-[min(680px,57.2vw)]
          lg:mr-[100px]

          max-[1024px]:h-[min(586px,57.2vw)]

          /* =================================================
             MOBILE IMAGE
          ================================================== */

          max-[767px]:h-auto
          max-[767px]:w-[82vw]
          max-[767px]:max-w-[430px]

          max-[600px]:w-[84vw]
          max-[600px]:max-w-[410px]

          max-[480px]:w-[86vw]
          max-[480px]:max-w-[390px]

          max-[375px]:w-[88vw]
          max-[375px]:max-w-[360px]
        "
      />
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        max-w-[1328px]
        mx-auto
        

        px-0

        lg:px-[0px]

        /* ===================================================
           MOBILE
        ==================================================== */
        max-[767px]:px-[16px]
        max-[767px]:overflow-visible
      "
    >
      {/* =====================================================
          MAIN FRAME
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          min-h-[586px]
          w-full
          max-w-[1600px]

          overflow-hidden

          px-0
          !pt-[109px]
          pb-[18px]

          max-[1280px]:min-h-[560px]
          max-[1280px]:pt-[10px]

          max-[1024px]:min-h-[586px]
          max-[1024px]:pt-[10px]
          max-[1024px]:pb-[14px]

          /* =================================================
             MOBILE FRAME
          ================================================== */

          max-[767px]:min-h-0
          max-[767px]:overflow-visible
          max-[767px]:px-[20px]
          max-[767px]:pt-[34px]
          max-[767px]:pb-[56px]

          max-[600px]:px-[18px]
          max-[600px]:pt-[32px]
          max-[600px]:pb-[52px]

          max-[480px]:px-[16px]
          max-[480px]:pt-[30px]
          max-[480px]:pb-[48px]

          pb-[107px]
        "
      >
        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <div
          className="
            relative
            z-20
            w-[62%]
            max-w-[750px]

            max-[1280px]:w-[61%]
            max-[1280px]:max-w-[620px]

            max-[1024px]:w-[63%]
            max-[1024px]:max-w-[640px]

            /* =================================================
               MOBILE
            ================================================== */

            max-[767px]:w-full
            max-[767px]:max-w-none
            max-[767px]:text-center
          "
        >
          {/* =================================================
              EYEBROW
          ================================================= */}

          <div
            className="
              flex
              w-full
              justify-start

              max-[767px]:justify-center
            "
          >
            <p
              className="
                m-0
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-[#FFFFFF]
                px-[22px]
                py-[10px]

                font-primary
                text-[10px]
                font-medium
                uppercase
                leading-none
                tracking-[0.035em]
                text-[#237C62]

                shadow-[0_1px_8px_rgba(0,0,0,0.08)]

                max-[480px]:px-[20px]
                max-[480px]:py-[9px]
                max-[480px]:text-[9px]
              "
            >
              Capabilities
            </p>
          </div>

          {/* =================================================
              HEADING
          ================================================= */}

          <h2
            id="capabilities-heading"
            className="
              m-0
              mt-[28px]
              max-w-[770px]

              font-primary
              text-[48px]
              font-medium
              leading-[1.02]
              tracking-[-0.06em]
              text-[#111111]

              max-[1280px]:mt-[26px]
              max-[1280px]:text-[46px]

              max-[1024px]:max-w-[770px]
              max-[1024px]:text-[44px]

              max-[900px]:text-[42px]

              /* =================================================
                 MOBILE
              ================================================== */

              max-[767px]:mx-auto
              max-[767px]:mt-[24px]
          
              max-[767px]:text-[36px]
              max-[767px]:leading-[1.08]
              max-[767px]:tracking-[-0.055em]
              max-[767px]:text-center

              max-[600px]:mt-[22px]
              max-[600px]:max-w-[500px]
              max-[600px]:text-[34px]

              max-[480px]:mt-[20px]
              max-[480px]:text-[31px]
              max-[480px]:leading-[1.08]
              max-[480px]:tracking-[-0.05em]
              max-[375px]:text-[29px]
            "
          >
            Cook Something You'll{" "}
            <br className="max-[767px]:hidden" />
            Love with what you

            <span
              className="
                font-accent
                italic
                font-normal
                tracking-[-0.045em]
                !ml-[2px]
              "
            >
              Already Have
            </span>
          </h2>

          {/* =================================================
              DESCRIPTION
          ================================================= */}
          <p className="text-[16px] font-medium leading-[24px] tracking-[-4%] text-[#232323]">Don't know what to cook? Start with your kitchen.</p>

          <p
            className="
              m-0
              mt-[26px]
              max-w-[620px]

              font-primary
              text-[14px]
              font-normal
              leading-[1.45]
              tracking-[-0.015em]
              text-[#858585]

              max-[1280px]:mt-[24px]
              max-[1280px]:max-w-[590px]

              max-[1024px]:mt-[22px]
              max-[1024px]:max-w-[575px]
              max-[1024px]:text-[13.5px]

              /* =================================================
                 MOBILE
              ================================================== */

              max-[767px]:mx-auto
              max-[767px]:mt-[20px]
              max-[767px]:max-w-[520px]
              max-[767px]:text-[14px]
              max-[767px]:leading-[1.5]
              max-[767px]:text-center

              max-[600px]:max-w-[460px]
              max-[600px]:text-[13.5px]

              max-[480px]:mt-[18px]
              max-[480px]:max-w-[360px]
              max-[480px]:text-[13px]
              max-[480px]:leading-[1.5]

              max-[375px]:max-w-[320px]
              max-[375px]:text-[12.5px]
            "
          >
            Tell Meal Eats what ingredients you have and what you’re craving. It combines them with your Food Profile to suggest recipes tailored to your preferences and goals.
          </p>

          {/* =================================================
              CAPABILITIES LIST
          ================================================= */}

          <div
            className="
              mt-[46px]
              flex
              w-full
              flex-col
              gap-[27px]

              max-[1280px]:mt-[42px]
              max-[1280px]:gap-[25px]

              max-[1024px]:mt-[40px]
              max-[1024px]:gap-[24px]

              max-[900px]:mt-[36px]
              max-[900px]:gap-[22px]

              /* =================================================
                 MOBILE
              ================================================== */

              max-[767px]:mt-[58px]
              max-[767px]:gap-[66px]
              max-[767px]:items-center

              max-[600px]:mt-[52px]
              max-[600px]:gap-[62px]

              max-[480px]:mt-[48px]
              max-[480px]:gap-[58px]

              max-[375px]:mt-[44px]
              max-[375px]:gap-[54px]
            "
          >
            {capabilities.map((capability) => (
              <CapabilityItem
                key={capability.title}
                title={capability.title}
                description={capability.description}
                icon={capability.icon}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            PHONE

            Desktop:
            Absolute right-side placement.

            Mobile:
            Normal document flow underneath capabilities.
        ==================================================== */}

        <PhoneMockup />
      </div>
    </section>
  );
}