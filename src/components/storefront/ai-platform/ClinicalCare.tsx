import Image from "next/image";

/* =========================================================
   TYPES
========================================================= */

type CareItem = {
  icon: string;
  title: string;
  description: string;
};

/* =========================================================
   ASSETS
========================================================= */

const CARE_ICONS = {
  clinical: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377122/mealeats/products/ingredinets.gif",
  human: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377120/mealeats/products/humanreview.gif",
  learning: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377079/mealeats/products/clinicalguardrails.gif",
} as const;

/* =========================================================
   DATA
========================================================= */

const careItems: CareItem[] = [
  {
    icon: CARE_ICONS.clinical,
    title: "Smart Food Guidance",
    description:
      "Reviewed prompt policies, condition-aware filtering and escalation language.",
  },
  {
    icon: CARE_ICONS.human,
    title: "Human review",
    description:
      "Registered dietitians audit sample outputs weekly and retrain the guidance layer.",
  },
  {
    icon: CARE_ICONS.learning,
    title: "Continuous learning",
    description:
      "Your feedback on every suggestion tunes the plan for next week.",
  },
];

/* =========================================================
   CARE CARD
========================================================= */

function CareCard({
  icon,
  title,
  description,
}: CareItem) {
  return (
    <article
      className="
        group
        flex
        min-h-[184px]
        w-full
        flex-col
        rounded-[16px]
        border
        border-border-light
        bg-surface
        p-5
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:shadow-card
        sm:min-h-[192px]
        sm:p-5
        lg:min-h-[190px]
      "
    >
      {/* =====================================================
          ICON
      ===================================================== */}

      <div
        className="
          flex
          h-icon-md
          w-icon-md
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-[8px]
          border
          border-border-light
          bg-primary
        "
        aria-hidden="true"
      >
        <Image
          src={icon}
          alt=""
          width={600}
          height={600}
          unoptimized
          className="
            h-icon-sm
            w-icon-sm
            object-contain
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mt-7 flex flex-1 flex-col">
        <h3
          className="
            font-primary
            !text-[22px]
            font-medium
            !leading-[30px]
            tracking-[-3%]
            text-secondary
            
          "
        >
          {title}
        </h3>

        <p
          className="
            !mt-4
            max-w-[378px]
            font-primary
            text-body
            font-normal
            leading-[20px]
            text-text-muted
            tracking-[-3%]
          "
        >
          {description}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function ClinicalCare() {
  return (
    <section
      id="clinical-care"
      aria-labelledby="clinical-care-heading"
      className="
        relative
        w-full
        overflow-hidden
        bg-primary
        
        pt-[62px]
        !pb-[91px]
        max-[768px]:pt-0
        sm:pt-[62px]
        sm:pb-[17px]
        lg:pt-[62px]
        lg:pb-[17px]
        lg:px-[56px]
        xl:px-[56px]
        max-[768px]:px-[16px]
    
      "
    >
      <div
        className="
          max-w-full
          mx-auto
          w-full
          
        "
      >
        <div
          className="
            flex
            w-full
            items-start
            flex-col
            gap-[56px]
          "
        >
          {/* =================================================
              HEADING CONTENT
          ================================================= */}

          <div className="w-full">
            <h2
              id="clinical-care-heading"
              className="
                !max-w-[736px]
                font-primary
                !text-h2
                font-medium
                leading-[69px]
                tracking-[-4%]
                text-secondary
                max-[768px]:!text-[28px]
                max-[768px]:leading-[41px]
                
              "
            >
              Where Meal Planning Ends,{" "} <br className=" max-[768px]:hidden" />
              <span className="font-accent font-normal italic">
                Smarter Choices Begin
              </span> {" "}
            </h2>

            <p
              className="
              !mt-[16px]
                mt-[var(--spacing-md)]
                max-w-[560px]
                font-primary
                text-body
                font-normal
                leading-[28px]
                max-[768px]:leading-[22px]
                text-text-muted
              "
            >
              Clinicians handle diagnosis and treatment. We handle the thousand small decisions in between — and we make sure both sides see the same data.
            </p>
          </div>

          {/* =================================================
              CARE CARDS
          ================================================= */}

          <div
            className="
              grid
              w-full
              grid-cols-1
              gap-[var(--spacing-md)]
              sm:grid-cols-3
              sm:gap-[var(--spacing-sm)]
              lg:gap-[var(--spacing-md)]
            "
          >
            {careItems.map((item) => (
              <CareCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}