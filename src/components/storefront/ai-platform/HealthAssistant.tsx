import Image from "next/image";

/* =========================================================
   TYPES
========================================================= */

type HealthFeature = {
  icon: string;
  title: string;
  description: string;
};

/* =========================================================
   ASSETS
========================================================= */

const PHONE_IMAGE = "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377100/mealeats/products/health-assistant-phone.png";

const FEATURE_ICONS = {
  mealSuggestions: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377143/mealeats/products/personalizedmealsuggestions.gif",
  healthRecommendations: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377103/mealeats/products/health.gif",
  exercisePlans: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377072/mealeats/products/airecipegenerator.gif",
  recipeGenerator: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377151/mealeats/products/recipie.gif",
} as const;

/* =========================================================
   CONTENT
========================================================= */

const features: HealthFeature[] = [
  {
    icon: FEATURE_ICONS.mealSuggestions,
    title: "Personalized Meal Suggestions",
    description:
      "AI-powered meal recommendations based on your health goals, preferences, and dietary needs.",
  },
  {
    icon: FEATURE_ICONS.healthRecommendations,
    title: "AI Health Recommendations",
    description:
      "Get personalized health insights, guidance, and relevant medical references based on your profile and needs.",
  },
  {
    icon: FEATURE_ICONS.exercisePlans,
    title: "Smart Exercise Plans",
    description:
      "Discover exercises and workout routines tailored to your fitness level, goals, and lifestyle.",
  },
  {
    icon: FEATURE_ICONS.recipeGenerator,
    title: "AI Recipe Generator",
    description:
      "Turn the ingredients you already have at home into healthy, personalized recipes with nutrition information and easy to follow steps.",
  },
];

/* =========================================================
   FEATURE CARD
========================================================= */

function HealthFeatureCard({
  icon,
  title,
  description,
}: HealthFeature) {
  return (
    <article
      className="
        flex
        min-h-[228px]
        w-full
        flex-col
        rounded-[12px]
        border
        border-border-light
        bg-surface
        px-[24px]
        py-[24px]
        sm:min-h-[214px]
        lg:min-h-[228px]
      "
    >
      <div
        className="
          flex
          h-[56px]
          w-[56px]
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-[8px]
          border
          border-border-light
          bg-surface
        "
      >
        <Image
          src={icon}
          alt=""
          width={512}
          height={512}
          unoptimized
          aria-hidden="true"
          className="h-[40px] w-[40px] object-contain"
        />
      </div>

      <h3
        className="
          !mt-[24px]
          max-w-full
          font-primary
          !text-[20px]
          min-h-[60px]
          font-medium
           max-[768px]:!mt-[48px]
          !leading-[30px]
          tracking-[-4%]
          text-secondary
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-[10px]
          max-w-[285px]
          font-primary
          text-[12px]
          font-normal
          leading-[1.5]
          text-text-muted
        "
      >
        {description}
      </p>
    </article>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function HealthAssistant() {
  return (
    <section
      id="health-assistant"
      aria-labelledby="health-assistant-heading"
      className="
        w-full
        overflow-hidden
        bg-primary
        max-[768px]:py-[8px]
        max-[768px]:pt-[32px]
        lg:py-[92px]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-full
          px-page
          lg:px-0
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-[48px]
            lg:grid-cols-[440px_minmax(0,1fr)]
            xl:grid-cols-[640px_minmax(0,1fr)]
            max-[768px]:flex
            max-[768px]:flex-col-reverse
            lg:gap-[120px]
            lg:px-[56px]
        xl:px-[56px]
       
          "
        >
          {/* =================================================
              LEFT — PHONE
          ================================================= */}

          <div
            className="
              flex
              w-full
              items-center
              justify-center
              lg:justify-start
            "
          >
            <Image
              src={PHONE_IMAGE}
              alt="MealEats AI health assistant chat interface"
              width={440}
              height={760}
              sizes="(max-width: 1023px) 360px, 440px"
              className="
                block
                h-auto
                w-[360px]
                max-w-full
                object-contain
                lg:w-[440px]
                rounded-md
              "
            />
          </div>

          {/* =================================================
              RIGHT — CONTENT
          ================================================= */}

          <div className="w-full">
            <h2
              id="health-assistant-heading"
              className="
                max-w-[620px]
                font-primary
                !text-[40px]
                max-[768px]:!text-[28px]
                max-[768px]:!leading-[41px]
               
                !leading-[53px]
                font-medium
                tracking-[-4%]
                text-secondary
              "
            >
              Everything You Need for a{" "} <br />
              <span className="font-accent font-normal italic">
                Healthier You
              </span>
            </h2>

            <p
              className="
                mt-[16px]
                max-w-[600px]
                leading-[28px]
                tracking-[-4%]
                max-[768px]:leading-[22px]
                font-primary
                text-body
                font-normal
                text-text-muted
              "
            >
              Personalized AI guidance for healthier meals, smarter workouts,
              recipes, and everyday health decisions.
            </p>

            <div
              className="
                mt-[32px]
                grid
                w-full
                grid-cols-1
                gap-[16px]
                sm:grid-cols-2
                lg:max-w-[680px]
              "
            >
              {features.map((feature) => (
                <HealthFeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}