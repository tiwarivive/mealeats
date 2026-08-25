"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionBadge from "../about/SectionBadge";

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
                overflow-hidden

                rounded-[16px]

                border
                border-[var(--color-border-light)]

                bg-white

                shadow-[0px_4px_11.8px_0px_#89898940]

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
                    min-h-[78px]
                    w-full
                    items-center
                    justify-between
                    gap-[16px]

                    px-[20px]
                    py-[14px]

                    text-left

                    max-[480px]:
                    min-h-[48px]
                    gap-[8px]
                    px-[12px]
                    py-[8px]

                    sm:
                    min-h-[58px]
                    px-[16px]

                    md:
                    min-h-[70px]
                    px-[18px]

                    lg:
                    min-h-[78px]
                    px-[20px]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--color-accent)]
                    focus-visible:ring-inset
                "
            >
                <span
                    className="
                        min-w-0
                        flex-1

                        font-primary
                        font-medium

                        !text-[20px]
                        !leading-[30px]

                        tracking-[-0.01em]

                        text-[var(--color-secondary)]

                        max-[480px]:
                        !text-[11px]
                        !leading-[16px]

                        sm:
                        !text-[14px]
                        !leading-[21px]

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
                        h-[16px]
                        w-[16px]
                        shrink-0

                        text-[var(--color-text-muted)]

                        transition-transform
                        duration-[var(--transition-normal)]
                        ease-out

                        max-[480px]:
                        h-[13px]
                        w-[13px]

                        sm:
                        h-[14px]
                        w-[14px]

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

                Height belongs ONLY to this FAQ.
                It cannot affect another desktop column.
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

                            max-[480px]:
                            px-[12px]
                            pb-[12px]
                            pt-[10px]

                            sm:
                            px-[16px]
                            pb-[16px]
                            pt-[13px]

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
                                text-body
                                font-normal

                                !leading-[145%]

                                text-[var(--color-text-muted)]

                                max-[480px]:
                                !text-[10px]
                                !leading-[145%]

                                sm:
                                !text-[11px]

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
     *
     * null:
     *      All FAQs closed.
     *
     * "fruit-sugar":
     *      Fruit Sugar is open.
     *
     * "protein":
     *      Protein is open.
     *
     * When another FAQ opens, the previous one closes.
     */

    const [openId, setOpenId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setOpenId((currentId) => {
            if (currentId === id) {
                return null;
            }

            return id;
        });
    };

    /*
     * IMPORTANT:
     *
     * Desktop:
     * We deliberately create TWO independent columns.
     *
     * This is NOT:
     *
     * grid grid-cols-2
     *
     * because CSS Grid rows would make the height of one FAQ
     * affect the FAQ beside it.
     *
     * Instead:
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
     *
     * Therefore opening item 1 only affects the LEFT column.
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
                    container-page
                    mx-auto
                    w-full
                "
            >
                {/* =================================================
                    SECTION BADGE
                ================================================= */}

                <div
                    className="
                        mx-auto
                        mb-[24px]
                        flex
                        justify-center

                        max-[480px]:
                        mb-[18px]

                        sm:
                        mb-[22px]

                        md:
                        mb-[24px]
                    "
                >
                    <SectionBadge>
                        FEATURED KNOWLEDGE
                    </SectionBadge>
                </div>

                {/* =================================================
                    HEADING
                ================================================= */}

                <h2
                    id="health-faq-heading"
                    className="
                        mt-[var(--spacing-sm)]

                        text-center

                        font-primary
                        text-h2
                        font-medium

                        leading-[69px]
                        tracking-[-4%]

                        text-[var(--color-secondary)]

                        max-[480px]:
                        !text-[24px]
                        !leading-[1.15]

                        sm:
                        !text-[28px]
                        !leading-[1.15]

                        md:
                        !text-[36px]
                        !leading-[1.15]

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
                    DESKTOP FAQ AREA

                    TWO COMPLETELY INDEPENDENT COLUMNS.

                    Opening a card on the LEFT:
                    - does not resize RIGHT cards
                    - does not move RIGHT cards
                    - does not change RIGHT column

                    Opening a card on the RIGHT:
                    - does not resize LEFT cards
                    - does not move LEFT cards
                    - does not change LEFT column
                ================================================= */}

                <div
                    className="
                        mx-auto

                        mt-[80px]

                        w-full
                        max-w-full

                        px-[56px]

                        max-[480px]:
                        mt-[32px]
                        px-0

                        sm:
                        mt-[48px]
                        px-[20px]

                        md:
                        mt-[60px]
                        px-[32px]

                        lg:
                        mt-[80px]
                        px-[56px]
                    "
                >
                    {/* =================================================
                        MOBILE

                        One vertical column.
                    ================================================= */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-[10px]

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

                        Independent columns.
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