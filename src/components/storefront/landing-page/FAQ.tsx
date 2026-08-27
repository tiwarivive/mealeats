"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type FAQItem = {
  question: string;
  answer: string;
};

/* =========================================================
   FAQ DATA
========================================================= */

const faqItems: FAQItem[] = [
  {
    question: "What is Meal Eats?",
    answer:
      "Meal Eats is a food, nutrition and wellness platform that helps you make smarter everyday food choices, discover recipes and plan meals.",
  },
  {
    question: "Is Meal Eats a medical service?",
    answer:
      "No. Meal Eats does not provide medical diagnosis or treatment. For specific health concerns, consult a qualified healthcare professional.",
  },
  {
    question: "How does Meal Eats personalize my recommendations?",
    answer:
      "Meal Eats uses your preferences, dietary needs, goals and food choices to provide recommendations tailored to your everyday lifestyle.",
  },
  {
    question: "Can Meal Eats create recipes from ingredients I already have?",
    answer:
      "Yes. Simply add the ingredients you have, and Meal Eats can suggest recipe ideas using them.",
  },
  {
    question: "Can Meal Eats help plan my meals for the week?",
    answer:
      "Yes. Meal Eats can help you organize balanced, personalized meal ideas into a convenient weekly plan.",
  },
   {
    question: "Will Meal Eats help with grocery shopping?",
    answer:
      "Yes. Meal Eats can help turn your meal plans into organized grocery lists, making shopping simpler and more efficient.",
  },
   {
    question: "Do I need to log everything I eat?",
    answer:
      "No. Meal Eats is designed to be flexible—you can use only the features that fit your lifestyle and preferences.",
  },
  {
    question: "How does Meal Eats use my information?",
    answer:
      "Your information is used to personalize your experience and improve recommendations, with privacy and responsible data use in mind.",
  },
  {
    question: "Is Meal Eats free?",
    answer:
      "Meal Eats may offer both free and premium features. Pricing and available plans will be clearly shown within the platform.",
  },
];

/* =========================================================
   FAQ ITEM
========================================================= */

function FAQItemCard({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerId = `faq-answer-${index}`;
  const buttonId = `faq-question-${index}`;

  return (
    <article
      className="
        w-full
        min-w-0
        overflow-hidden
        rounded-[14px]
        bg-white
        shadow-[0_4px_11.8px_0_#89898940]

        min-[375px]:rounded-[15px]

        sm:rounded-[16px]

        lg:rounded-[18px]
      "
    >
      {/* =====================================================
          QUESTION
      ====================================================== */}

      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={onToggle}
          className="
            flex
            min-h-[62px]
            w-full
            min-w-0
            items-center
            justify-between
            gap-[14px]

            px-[20px]
            py-[14px]

            text-left

            outline-none
            

            transition-colors
            duration-200

            focus-visible:ring-2
            focus-visible:ring-accent
            focus-visible:ring-inset

            min-[375px]:min-h-[64px]
            min-[375px]:px-[21px]

            min-[480px]:min-h-[68px]
            min-[480px]:px-[22px]

            sm:min-h-[72px]
            sm:gap-[20px]
            sm:px-[26px]

            lg:min-h-[78px]
            lg:gap-[24px]
            lg:px-[40px]
          "
        >
          {/* =================================================
              QUESTION TEXT
          ================================================= */}

          <span
            className="
              min-w-0
              flex-1
              break-words

              font-primary
              !text-[20px]
              font-medium
              leading-[30px]
              tracking-[-3%]
              text-dark
              
            "
          >
            {item.question}
          </span>

          {/* =================================================
              CHEVRON
          ================================================= */}

          <span
            aria-hidden="true"
            className="
              flex
              h-[26px]
              w-[26px]
              shrink-0
              items-center
              justify-center

              sm:h-[28px]
              sm:w-[28px]

              lg:h-[30px]
              lg:w-[30px]
            "
          >
            <ChevronDown
              className={`
                h-[20px]
                w-[20px]
                shrink-0
                stroke-[1.5]

                transition-transform
                duration-200
                ease-out

                sm:h-[22px]
                sm:w-[22px]

                lg:h-[24px]
                lg:w-[24px]

                ${isOpen ? "rotate-180" : "rotate-0"}
              `}
            />
          </span>
        </button>
      </h3>

      {/* =====================================================
          ANSWER
      ====================================================== */}

      {isOpen && (
        <div
          id={answerId}
          role="region"
          aria-labelledby={buttonId}
          className="
            w-full
            min-w-0

            px-[20px]
            pb-[22px]

            min-[375px]:px-[21px]
            min-[375px]:pb-[23px]

            min-[480px]:px-[22px]
            min-[480px]:pb-[24px]

            sm:px-[26px]
            sm:pb-[27px]

            lg:px-[40px]
            lg:pb-[34px]
          "
        >
          <p
            className="
              m-0
              w-full
              max-w-[820px]
              break-words

              font-primary
              text-[14px]
              font-normal
              leading-[1.52]
              tracking-[-0.018em]
              text-text-muted

              min-[375px]:text-[14.5px]

              min-[480px]:text-[15px]

              sm:text-[16px]
              sm:leading-[1.5]

              lg:text-[17px]
              lg:leading-[1.45]
            "
          >
            {item.answer}
          </p>
        </div>
      )}
    </article>
  );
}

/* =========================================================
   FAQ SECTION
========================================================= */

export default function FAQ() {
  /*
   * First FAQ is open by default.
   * Clicking the active FAQ closes it.
   */
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? -1 : index,
    );
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="
        w-full
        overflow-hidden
        bg-primary

        py-[48px]

        min-[375px]:py-[52px]

        min-[480px]:py-[56px]

        sm:py-[68px]

        md:py-[76px]

        lg:py-[88px]

        xl:py-[100px]
      "
    >
      {/* =====================================================
          MAIN CONTAINER

          Explicit padding is used here so the mobile layout
          remains consistent regardless of custom container
          utility behavior.
      ====================================================== */}

      <div
        className="
          mx-auto
          grid
          w-full
          max-w-fullpx
          min-w-0
          grid-cols-1

          px-[16px]

          min-[375px]:px-[18px]

          min-[480px]:px-[20px]

          sm:px-[24px]

          md:px-[28px]

          lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]
          lg:gap-x-[64px]
          lg:px-[32px]

          xl:gap-x-[88px]
          xl:px-[48px]

          2xl:px-[64px]
        "
      >
        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <div
          className="
            min-w-0
            w-full
            self-start
            max-[768px]:self-center

            lg:pt-[4px]
          "
        >
          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <h2
            id="faq-heading"
            className="
              m-0
              w-full
              max-w-[700px]

              font-primary
              text-[32px]
              font-normal
              leading-[1.06]
              tracking-[-0.055em]
              text-secondary

              min-[375px]:text-[34px]

              min-[480px]:text-[37px]

              sm:text-[42px]

              md:text-[46px]

              lg:text-[50px]

              xl:text-h2
              max-[768px]:text-center
            "
          >
            Frequently Asked
          </h2>

          {/* =================================================
              SERIF HEADING
          ================================================= */}

          <h3
            className="
              m-0
              mt-[4px]

              !font-accent
              text-[36px]
              font-normal
              italic
              leading-[0.98]
              tracking-[-0.055em]
              text-secondary

              min-[375px]:text-[38px]

              min-[480px]:text-[41px]

              sm:mt-[6px]
              sm:text-[45px]

              md:text-[48px]

              lg:mt-[8px]
              lg:text-[52px]

              xl:text-[58px]
              max-[768px]:text-center
            "
          >
            Questions
          </h3>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              m-0
              mt-[16px]
              w-full
              max-w-[580px]

              font-primary
              text-[13.5px]
              font-normal
              leading-[1.5]
              tracking-[-0.018em]
              text-text-muted

              min-[375px]:mt-[17px]
              min-[375px]:text-[14px]

              min-[480px]:mt-[18px]
              min-[480px]:text-[14.5px]

              sm:mt-[22px]
              sm:text-[15px]

              md:mt-[26px]
              md:text-[16px]

              lg:mt-[38px]
              lg:text-body
              lg:leading-[1.42]
              max-[768px]:text-center
              max-[768px]:!mt-[16px]
            "
          >
            Have questions? Find clear answers about how MealEats works and
            how our AI can help you make better food decisions.
          </p>
        </div>

        {/* ===================================================
            FAQ LIST
        ==================================================== */}

        <div
          className="
            mt-[32px]
            flex
            min-w-0
            w-full
            flex-col
            gap-[10px]

            min-[375px]:mt-[34px]

            min-[480px]:mt-[36px]
            min-[480px]:gap-[11px]

            sm:mt-[42px]
            sm:gap-[12px]

            md:mt-[46px]

            lg:mt-0
            lg:gap-[14px]
          "
        >
          {faqItems.map((item, index) => (
            <FAQItemCard
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}