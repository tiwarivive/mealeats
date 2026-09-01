"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionBadge from "../about/SectionBadge";
import GreenGlassLabel from "../shared/GreenGlassLabel";

/* =========================================================
   TYPES
========================================================= */

type FAQItem = {
    id: string;
    question: string;
    answer: string;
};

/* =========================================================
   FAQ DATA
========================================================= */

const faqItems: FAQItem[] = [
    {
        id: "fruit-sugar",
        question: "Is Fruit Sugar bad for you?",
        answer:
            "Whole fruits contain natural sugars together with fiber, vitamins, minerals, and beneficial plant compounds. For most people, whole fruit can be part of a balanced diet. The fiber in whole fruit also helps slow the absorption of naturally occurring sugars.",
    },
    {
        id: "protein",
        question: "How much Protein do I need?",
        answer:
            "Protein requirements vary according to factors such as age, body size, activity level, and individual goals. Good protein sources include pulses, beans, dairy, eggs, fish, meat, soy, nuts, and seeds. A balanced diet can usually provide protein through a variety of foods.",
    },
    {
        id: "fiber",
        question: "What foods are high in fiber?",
        answer:
            "Foods naturally rich in fiber include vegetables, fruits, beans, lentils, chickpeas, oats, whole grains, nuts, and seeds. Eating a variety of these foods regularly can support digestive health and help you feel satisfied after meals.",
    },
    {
        id: "balanced-meal",
        question: "How can I build a Balanced Meal?",
        answer:
            "A balanced meal can include vegetables or fruit, a protein source, whole or minimally processed carbohydrates, and a moderate amount of healthy fat. The right combination depends on your nutritional needs, activity level, and overall lifestyle.",
    },
    {
        id: "healthy-snack",
        question: "What is a healthy Snack?",
        answer:
            "A healthy snack can combine nutrient-dense foods containing protein, fiber, or healthy fats. Examples include fruit with nuts, yogurt with seeds, roasted chickpeas, vegetables with hummus, or other minimally processed foods.",
    },
    {
        id: "exercise",
        question: "How often should I exercise?",
        answer:
            "Regular physical activity can support cardiovascular health, strength, mobility, and overall well-being. A healthy routine can combine aerobic activity, strength exercises, and regular movement throughout the day. Your ideal routine depends on your fitness level and individual goals.",
    },
    {
        id: "hydration",
        question: "How can I stay hydrated?",
        answer:
            "Drink fluids regularly throughout the day and increase your fluid intake when exercising or during hot weather. Water is a simple everyday choice, while fruits and vegetables can also contribute to your overall fluid intake.",
    },
    {
        id: "nutrition-label",
        question: "What should I look for on a nutrition label?",
        answer:
            "Check the serving size, calories, protein, fiber, added sugar, saturated fat, sodium, and ingredient list. Comparing products using the same serving size makes it easier to understand which option better fits your nutritional goals.",
    },
];

/* =========================================================
   FAQ ITEM
========================================================= */

function FAQItem({
    item,
    isOpen,
    onToggle,
}: {
    item: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
}) {
    const answerId = `${item.id}-answer`;

    return (
        <div
            className="
                self-start
                w-full
                min-w-0
                max-w-full
                overflow-hidden

                rounded-[16px]

                border
                border-[var(--color-border-light)]

                bg-white
                shadow-[0px_4px_11.8px_0px_#6868681F]

                transition-[box-shadow,border-color]
                duration-[var(--transition-normal)]
                ease-out
            "
        >
            {/* =================================================
                QUESTION
            ================================================= */}

            <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={onToggle}
                className="
                    flex
                    w-full
                    min-w-0
                    items-center
                    justify-between

                    gap-[16px]

                    px-[20px]
                    py-[14px]

                    text-left

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--color-accent)]
                    focus-visible:ring-inset

                    /* -----------------------------------------
                       MOBILE ONLY
                    ----------------------------------------- */

                    max-[767px]:
                    min-h-[30px]
                    gap-[8px]
                    px-[10px]
                    py-[7px]

                    max-[480px]:
                    min-h-[29px]
                    gap-[7px]
                    px-[9px]
                    py-[6px]

                    max-[359px]:
                    min-h-[28px]
                    gap-[6px]
                    px-[8px]
                    py-[6px]

                    /* -----------------------------------------
                       DESKTOP — EXISTING DESIGN
                    ----------------------------------------- */

                    md:
                    min-h-[70px]
                    gap-[16px]
                    px-[18px]
                    py-[14px]

                    lg:
                    min-h-[78px]
                    px-[20px]
                "
            >
                <span
                    className="
                        min-w-0
                        flex-1

                        overflow-hidden
                        break-words
                        whitespace-normal

                        font-primary
                        font-medium

                        tracking-[-0.01em]

                        text-[var(--color-secondary)]

                        /* -----------------------------------------
                           BASE / DESKTOP
                        ----------------------------------------- */

                        !text-[20px]
                        !leading-[30px]

                        /* -----------------------------------------
                           MOBILE — MATCH FIGMA SCALE
                        ----------------------------------------- */

                        max-[767px]:
                        !text-[10px]
                        !leading-[14px]
                        tracking-[-0.01em]

                        max-[480px]:
                        !text-[10px]
                        !leading-[14px]

                        max-[359px]:
                        !text-[9px]
                        !leading-[13px]

                        /* -----------------------------------------
                           DESKTOP RESTORED
                        ----------------------------------------- */

                        md:
                        !text-[17px]
                        !leading-[25px]

                        lg:
                        !text-[20px]
                        !leading-[30px]
                    "
                >
                    {item.question}
                </span>

                <ChevronDown
                    aria-hidden="true"
                    className="
                        shrink-0

                        h-[16px]
                        w-[16px]

                        text-[var(--color-text-muted)]

                        transition-transform
                        duration-[var(--transition-normal)]
                        ease-out

                        /* -----------------------------------------
                           MOBILE
                        ----------------------------------------- */

                        max-[767px]:
                        h-[11px]
                        w-[11px]

                        max-[480px]:
                        h-[10px]
                        w-[10px]

                        max-[359px]:
                        h-[9px]
                        w-[9px]

                        /* -----------------------------------------
                           DESKTOP
                        ----------------------------------------- */

                        md:
                        h-[15px]
                        w-[15px]
                    "
                    style={{
                        transform: isOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                    }}
                    strokeWidth={1.5}
                />
            </button>

            {/* =================================================
                ANSWER

                The answer only expands its own FAQ card.
            ================================================= */}

            <div
                id={answerId}
                aria-hidden={!isOpen}
                className="
                    grid

                    transition-[grid-template-rows,opacity]
                    duration-[var(--transition-normal)]
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                "
                style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                }}
            >
                <div className="min-h-0 overflow-hidden">
                    <div
                        className="
                            border-t
                            border-[var(--color-border)]

                            px-[20px]
                            pb-[20px]
                            pt-[16px]

                            /* -----------------------------------------
                               MOBILE
                            ----------------------------------------- */

                            max-[767px]:
                            px-[10px]
                            pb-[10px]
                            pt-[8px]

                            max-[480px]:
                            px-[9px]
                            pb-[9px]
                            pt-[7px]

                            max-[359px]:
                            px-[8px]
                            pb-[8px]
                            pt-[7px]

                            /* -----------------------------------------
                               DESKTOP — EXISTING DESIGN
                            ----------------------------------------- */

                            md:
                            px-[18px]
                            pb-[18px]
                            pt-[14px]

                            lg:
                            px-[20px]
                            pb-[20px]
                            pt-[16px]
                        "
                    >
                        <p
                            className="
                                font-manrope
                                font-normal

                                break-words
                                whitespace-normal

                                text-[var(--color-text-muted)]

                                !text-[16px]
                                !leading-[145%]

                                /* -----------------------------------------
                                   MOBILE
                                ----------------------------------------- */

                                max-[767px]:
                                !text-[10px]
                                !leading-[145%]

                                max-[480px]:
                                !text-[10px]
                                !leading-[145%]

                                max-[359px]:
                                !text-[9px]
                                !leading-[145%]

                                /* -----------------------------------------
                                   DESKTOP
                                ----------------------------------------- */

                                md:
                                !text-[13px]

                                lg:
                                !text-[16px]
                            "
                        >
                            {item.answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   MAIN FAQ SECTION
========================================================= */

export default function QuestionsPeopleAsk() {
    /*
     * ONE OPEN FAQ ONLY
     */

    const [openId, setOpenId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setOpenId((currentId) => {
            return currentId === id ? null : id;
        });
    };

    /*
     * DESKTOP:
     *
     * LEFT:
     *   1
     *   3
     *   5
     *   7
     *
     * RIGHT:
     *   2
     *   4
     *   6
     *   8
     */

    const leftColumnItems = faqItems.filter(
        (_, index) => index % 2 === 0
    );

    const rightColumnItems = faqItems.filter(
        (_, index) => index % 2 !== 0
    );

    return (
        <section
            id="health-faq"
            aria-labelledby="health-faq-heading"
            className="
                w-full
                max-w-full
                overflow-x-hidden

                bg-[var(--color-primary)]

                pt-[26px]
                pb-[var(--spacing-3xl)]

                max-[480px]:
                pt-[20px]
                pb-[var(--spacing-2xl)]

                sm:
                pt-[30px]
                pb-[var(--spacing-3xl)]

                md:
                pt-[36px]
                pb-[var(--spacing-4xl)]

                lg:
                pt-[36px]
                pb-[var(--spacing-5xl)]
            "
        >
            <div
                className="
                    lg:px-[56px]
                    xl:px-[56px]
                    mx-auto
                    w-full
                    min-w-0
                    max-w-full

                    /* -----------------------------------------
                       MOBILE

                       Remove inherited container padding.
                    ----------------------------------------- */

                    max-[767px]:!w-full
                    !max-w-none
                    
        max-[768px]:px-[16px]
                "
            >
                {/* =================================================
                    SECTION BADGE

                    Desktop unchanged.
                    Hidden on mobile because the Figma mobile
                    FAQ reference starts directly with the heading.
                ================================================= */}

                <div className="mx-auto w-fit"><GreenGlassLabel label="FEATURED KNOWLEDGE"/></div>

                {/* =================================================
                    HEADING
                ================================================= */}

                <h2
                    id="health-faq-heading"
                    className="
                        mt-[var(--spacing-sm)]

                        mx-auto
                        w-full

                        text-center

                        font-primary
                        text-h2
                        font-medium

                        leading-[69px]
                        tracking-[-4%]

                        text-[var(--color-secondary)]

                        /* -----------------------------------------
                           MOBILE — FIGMA
                        ----------------------------------------- */

                        max-[767px]:
                        max-w-[260px]
                        px-0
                        !text-[16px]
                        !leading-[1.15]
                        tracking-[-0.03em]

                        max-[480px]:
                        max-w-[250px]
                        !text-[16px]
                        !leading-[1.15]

                        max-[359px]:
                        max-w-[235px]
                        !text-[15px]

                        /* -----------------------------------------
                           DESKTOP — EXISTING DESIGN
                        ----------------------------------------- */

                        md:
                        max-w-none
                        !text-[36px]
                        !leading-[1.15]

                        max-[768px]:!text-[28px]
                        max-[768px]:leading-[41px]

                        lg:
                        !text-[40px]
                        !leading-[1.15]
                    "
                >
                    Questions People Ask About{" "}
                    <span
                        className="
                            font-accent
                            italic
                            font-normal
                        "
                    >
                        Health
                    </span>
                </h2>

                {/* =================================================
                    FAQ AREA
                ================================================= */}

                <div
                    className="
                        mx-auto

                        mt-[80px]
                        max-[768px]:mt-[32px]

                        w-full
                        max-w-full
                        min-w-0

                        

                        /* -----------------------------------------
                           MOBILE — COMPACT FIGMA LAYOUT
                        ----------------------------------------- */

                        max-[767px]:
                        mt-[14px]
                        

                        max-[480px]:
                        mt-[14px]
                        

                        max-[359px]:
                        mt-[12px]
                        

                        /* -----------------------------------------
                           DESKTOP — EXISTING DESIGN
                        ----------------------------------------- */

                        sm:
                        mt-[48px]
                        

                        md:
                        mt-[60px]
                        

                        lg:
                        mt-[80px]
                        
                    "
                >
                    {/* =================================================
                        MOBILE
                    ================================================= */}

                    <div
                        className="
                            flex
                            w-full
                            min-w-0

                            flex-col

                            gap-[4px]

                            max-[480px]:
                            gap-[4px]

                            max-[359px]:
                            gap-[3px]

                            md:hidden
                        "
                    >
                        {faqItems.map((item) => (
                            <FAQItem
                                key={item.id}
                                item={item}
                                isOpen={openId === item.id}
                                onToggle={() =>
                                    handleToggle(item.id)
                                }
                            />
                        ))}
                    </div>

                    {/* =================================================
                        DESKTOP

                        Existing two-column design preserved.
                    ================================================= */}

                    <div
                        className="
                            hidden

                            md:grid
                            md:grid-cols-2
                            md:items-start
                            md:gap-[var(--spacing-md)]

                            lg:gap-[var(--spacing-md)]
                        "
                    >
                        {/* =================================================
                            LEFT COLUMN
                        ================================================= */}

                        <div
                            className="
                                flex
                                min-w-0
                                flex-col
                                items-start

                                gap-[var(--spacing-md)]
                            "
                        >
                            {leftColumnItems.map((item) => (
                                <FAQItem
                                    key={item.id}
                                    item={item}
                                    isOpen={openId === item.id}
                                    onToggle={() =>
                                        handleToggle(item.id)
                                    }
                                />
                            ))}
                        </div>

                        {/* =================================================
                            RIGHT COLUMN
                        ================================================= */}

                        <div
                            className="
                                flex
                                min-w-0
                                flex-col
                                items-start

                                gap-[var(--spacing-md)]
                            "
                        >
                            {rightColumnItems.map((item) => (
                                <FAQItem
                                    key={item.id}
                                    item={item}
                                    isOpen={openId === item.id}
                                    onToggle={() =>
                                        handleToggle(item.id)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}