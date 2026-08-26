"use client";

import Image from "next/image";

/* =========================================================
   TYPES
========================================================= */

type Category = {
  title: string;
  image: string;
};

/* =========================================================
   DATA

   Replace only the image paths if your public asset names
   are different. The visual/content structure is kept
   independent from the asset filenames.
========================================================= */

const categories: Category[] = [
  {
    title: "Millets Based Food",
    image: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377134/mealeats/products/millets.png",
  },
  {
    title: "Protein-Rich Foods",
    image: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377115/mealeats/products/high-protein.png",
  },
  {
    title: "Balanced Eating",
    image: "/BalancedEating.png",
  },
  {
    title: "Weight Management",
    image: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377167/mealeats/products/weight-loss.png",
  },
  {
    title: "Kids Nutrition",
    image: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377127/mealeats/products/kids-nutrition.png",
  },
  {
    title: "Better Snacking",
    image: "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377108/mealeats/products/healthy-snacks.png",
  },
];

/* =========================================================
   CATEGORY CARD
========================================================= */

function CategoryCard({ title, image }: Category) {
  return (
    <article
      className="
        min-w-0
        overflow-hidden
        rounded-[var(--radius-sm)]
        border
        border-border-light
        bg-primary
        shadow-card

        transition-shadow
        duration-200
        ease-out

        hover:shadow-card

        max-[767px]:rounded-[14px]
      "
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div
        className="
          relative
          mx-[10px]
          mt-[10px]
          aspect-[1.25/1]
          overflow-hidden
          rounded-[12px]
          bg-surface-light

          max-[767px]:mx-[8px]
          max-[767px]:mt-[8px]
          max-[767px]:rounded-[10px]

          max-[480px]:rounded-[9px]
        "
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="
            (max-width: 480px) calc((100vw - 44px) / 2),
            (max-width: 767px) calc((100vw - 48px) / 2),
            (max-width: 1024px) 145px,
            210px
          "
          className="
            object-cover
            object-center
          "
        />
      </div>

      {/* =====================================================
          TITLE
      ===================================================== */}

      <div
        className="
          flex
          min-h-[48px]
          items-center
          justify-center
          px-[8px]
          pb-[10px]
          pt-[7px]

          max-[767px]:min-h-[44px]
          max-[767px]:px-[6px]
          max-[767px]:pb-[9px]
          max-[767px]:pt-[6px]

          max-[480px]:min-h-[42px]
        "
      >
        <h3
          className="
            m-0
            text-center
            font-primary
            !text-body
            font-medium
            leading-[28px]
            tracking-[-4%]
            text-[#1B1B1B]
          "
        >
          {title}
        </h3>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function PopularCategories() {
  return (
    <section
      id="popular-categories"
      aria-labelledby="popular-categories-heading"
      className="
      mt-[0px]
      lg:px-[56px]
      xl:px-[56px]
      max-[768px]:!px-[16px]
        w-full
        overflow-hidden
        bg-primary
      "
    >
      {/* =====================================================
          SECTION CONTAINER

          Uses the project's existing container system.
      ===================================================== */}

      <div
        className="
          max-w-full
          mx-auto
    
          pb-[90px]
          pt-[2px]

      
          max-[1280px]:pb-[78px]

          max-[1024px]:pb-[70px]

        
          max-[767px]:pb-[56px]
          max-[767px]:pt-[4px]

       
          max-[480px]:pb-[46px]
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <header
          className="
            flex
            flex-col
            items-center
            text-center
          "
        >
          {/* =================================================
              EYEBROW
          ================================================= */}

          <p
            className="
            !mb-[16px]
              m-0
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-accent-light
              px-[13px]
              py-[5px]
              font-primary
              !text-[13px]
              font-medium
              uppercase
              leading-none
              tracking-[0.025em]
              text-[#007246]
            "
          >
            POPULAR CATEGORIES
          </p>

          {/* =================================================
              HEADING

              Explicit values are used here only to preserve
              the supplied Figma composition while the font
              itself comes from your theme.
          ================================================= */}

          <h2
            id="popular-categories-heading"
            className="
              m-0
              mt-[18px]
              max-w-[760px]
              font-primary
              text-[40px]
              font-medium
              leading-[1.08]
              tracking-[-0.055em]
              text-secondary

              max-[1280px]:mt-[17px]
              max-[1280px]:text-[38px]

              max-[1024px]:text-[37px]

              max-[767px]:mt-[15px]
              max-[767px]:max-w-[620px]
              max-[767px]:text-[34px]
              max-[767px]:leading-[1.08]

              max-[600px]:text-[31px]

              max-[480px]:max-w-[360px]
              max-[480px]:text-[28px]
            "
          >
            Explore Food for the Way {" "}
            <br/>
            <span
              className="
                font-accent
                italic
                font-normal
                tracking-[-4%]
              "
            >
              You Live
            </span>
          </h2>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              m-0
              !mt-[16px]
              max-w-[760px]
              font-primary
              !text-[16px]
              font-normal
              leading-[28px]
              tracking-[-0.01em]
              text-text-muted

              max-[1280px]:mt-[19px]

              max-[1024px]:text-[12px]

              max-[767px]:mt-[17px]
              max-[767px]:max-w-[520px]
              max-[767px]:text-[13px]
              max-[767px]:leading-[1.45]

              max-[480px]:max-w-[350px]
              max-[480px]:text-[12px]
            "
          >
            Everyone's food priorities are different. Explore recipes, ingredients and practical food knowledge across popular lifestyles and nutrition goals—then let Meal Eats personalize the experience around you.
          </p>
        </header>

        {/* ===================================================
            CATEGORY GRID

            Desktop:
            6 equal cards in one row.

            Tablet:
            3 × 2.

            Mobile:
            2 × 3.
        =================================================== */}

        <div
          className="
            mt-[46px]
            grid
            grid-cols-6
            gap-[14px]

            max-[1280px]:mt-[44px]
            max-[1280px]:gap-[13px]

            max-[1024px]:mt-[42px]
            max-[1024px]:grid-cols-3
            max-[1024px]:gap-[14px]

            max-[767px]:mt-[32px]
            max-[767px]:grid-cols-2
            max-[767px]:gap-[12px]

            max-[480px]:mt-[28px]
            max-[480px]:gap-[10px]
          "
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
