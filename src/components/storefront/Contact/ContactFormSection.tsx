"use client";

import { FormEvent, useState } from "react";
import { Check } from "lucide-react";

const CONTACT_API_URL =
  "https://mealeats-ai.onrender.com/api/contact/add";

/* =========================================================
   INCLUDED ITEMS
========================================================= */

const INCLUDED_ITEMS = [
  "Personalized Health Guidance",
  "Smarter Nutrition & Meal Planning",
  "AI-Powered Recipes & Healthy Alternatives",
];

/* =========================================================
   TYPES
========================================================= */

type Status = {
  type: "success" | "error" | "";
  message: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: {
    id?: string;
  };
};

/* =========================================================
   CONTACT FORM SECTION
========================================================= */

export default function ContactFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState<Status>({
    type: "",
    message: "",
  });

  /* =======================================================
     FORM SUBMIT
  ======================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const fullName = String(
      formData.get("fullName") ?? "",
    ).trim();

    const email = String(
      formData.get("email") ?? "",
    )
      .trim()
      .toLowerCase();

    // IMPORTANT:
    // Keep phone as STRING.
    const phone = String(
      formData.get("phone") ?? "",
    ).trim();

    const goal = String(
      formData.get("goal") ?? "",
    ).trim();

    // Clear previous status
    setStatus({
      type: "",
      message: "",
    });

    /* =======================================================
       VALIDATION
    ======================================================= */

    if (!fullName) {
      setStatus({
        type: "error",
        message: "Please enter your full name.",
      });
      return;
    }

    if (fullName.length < 2) {
      setStatus({
        type: "error",
        message: "Please enter a valid full name.",
      });
      return;
    }

    if (!email) {
      setStatus({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (!phone) {
      setStatus({
        type: "error",
        message: "Please enter your phone number.",
      });
      return;
    }

    const phoneRegex =
      /^[0-9+\-().\s]{7,20}$/;

    if (!phoneRegex.test(phone)) {
      setStatus({
        type: "error",
        message: "Please enter a valid phone number.",
      });
      return;
    }

    if (!goal) {
      setStatus({
        type: "error",
        message:
          "Please tell us how MealEats can help you.",
      });
      return;
    }

    if (goal.length < 3) {
      setStatus({
        type: "error",
        message:
          "Please provide a little more information.",
      });
      return;
    }

    /* =======================================================
       API REQUEST
    ======================================================= */

    setIsSubmitting(true);

    try {
      const response = await fetch(
        CONTACT_API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName,
            email,
            phone,
            goal,
          }),
        },
      );

      let data: ApiResponse | null = null;

      try {
        data = (await response.json()) as ApiResponse;
      } catch {
        data = null;
      }

      if (!response.ok || data?.success !== true) {
        throw new Error(
          data?.message ||
            "Unable to submit your request. Please try again.",
        );
      }

      /* =====================================================
         SUCCESS
      ===================================================== */

      form.reset();

      setStatus({
        type: "success",
        message:
          data.message ||
          "Thank you for contacting MealEats! We will contact you shortly.",
      });
    } catch (error) {
      console.error(
        "MealEats Contact Form Error:",
        error,
      );

      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="
        w-full
        min-[768px]:bg-[linear-gradient(180deg,#F3FDDE_0%,#FFFFFF_100%)]

        !mt-[-110px]
        lg:px-[56px]
        xl:px-[56px]
        max-[768px]:px-[16px]
        max-[767px]:bg-white
      "
    >
      <div
        className="
          max-w-full
          mx-auto
          w-full
       
          py-[64px]

          max-[1280px]:py-[58px]
          max-[1024px]:py-[52px]
          max-[768px]:py-[48px]
          max-[768px]:!pt-[130px]
          max-[480px]:py-[40px]

          pt-[160px]

          /* ===================================================
             MOBILE ONLY
             Header is floating over the first section.
             Keep enough top space for the header.
          =================================================== */

          max-[767px]:px-0
          max-[767px]:pt-[126px]
          max-[767px]:pb-0
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
            items-start
            gap-[78px]

            max-[1280px]:gap-[60px]
            max-[1024px]:gap-[48px]

            max-[767px]:grid-cols-1
            max-[767px]:gap-0
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div
            className="
              min-w-0
              pt-[5px]

            
              max-[767px]:pt-0
            "
          >
            {/* =================================================
                HEADING
            ================================================= */}

            <h1
              id="contact-form-heading"
              className="
                max-w-[540px]

                font-primary
                !text-[48px]
                !leading-[56px]
                font-[500]
                leading-[1.02]
                tracking-[-0.045em]

                text-[#060606]

                max-[767px]:max-w-none
                max-[767px]:!text-[28px]
                max-[767px]:!leading-[41px]
                max-[767px]:tracking-[-3%]
              "
            >
              {/* =================================================
                  DESKTOP VERSION

                  KEEPING EXISTING DESKTOP LINE BREAKS
              ================================================= */}

              <span className="max-[767px]:hidden">
                Transform Your
                <br />
                Health With AI-
                <br />
                Powered Personalized
                <br />
                Guidance
              </span>

              {/* =================================================
                  MOBILE VERSION

                  Natural wrapping produces:

                  Transform Your Health With
                  AI-Powered Personalized
                  Guidance
              ================================================= */}

              <span className="hidden max-[767px]:inline">
                Transform Your Health With AI-Powered
                Personalized Guidance
              </span>
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-[14px]
                max-w-[500px]

                font-primary
                text-[14px]
                font-normal
                leading-[1.45]

                text-[#737373]

                max-[1024px]:text-[13px]
                max-[767px]:mt-[22px]
                max-[767px]:max-w-none
                max-[767px]:text-[16px]
                max-[767px]:leading-[24px]
                max-[767px]:tracking-[-3%]
              "
            >
              Be among the first to experience a smarter
              approach to everyday health. Discover how
              our AI-powered app brings personalized
              nutrition, healthy recipes, exercise guidance,
              and health insights together in one simple
              experience.
            </p>

            {/* =================================================
                WHAT'S INCLUDED
            ================================================= */}

            <div
              className="
                mt-[28px]

                max-[767px]:mt-[32px]
              "
            >
              <h2
                className="
                  font-primary
                  !text-[28px]
                  font-[500]
                  leading-[36px]
                  text-secondary

                  max-[480px]:text-[20px]

                  max-[767px]:!text-[23px]
                  max-[767px]:!leading-[31px]
                  max-[767px]:tracking-[-3%]
                "
              >
                What’s included:
              </h2>

              <ul
                className="
                  mt-[12px]

                  flex
                  flex-col
                  gap-[10px]

                  max-[767px]:mt-[24px]
                  max-[767px]:gap-[19px]
                "
              >
                {INCLUDED_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="
                      flex
                      items-center
                      gap-[8px]

                      font-primary
                      text-[24px]
                      font-normal
                      leading-[1.3]

                      text-[#202020]
                      max-[767px]:gap-[12px]
                      max-[767px]:text-[16px]
                      max-[767px]:leading-[31px]
                      max-[767px]:tracking-[-0.018em]
                    "
                  >
                    <span
                      className="
                        flex
                        h-[14px]
                        w-[14px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-accent

                        max-[767px]:h-[18px]
                        max-[767px]:w-[18px]
                      "
                    >
                      <Check
                        aria-hidden="true"
                        size={8}
                        strokeWidth={3}
                        className="
                          text-primary

                          max-[767px]:h-[11px]
                          max-[767px]:w-[11px]
                        "
                      />
                    </span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* =================================================
              RIGHT FORM

              DESKTOP:
              Existing layout remains unchanged.

              MOBILE:
              This becomes the pale-green Figma form panel.
          ================================================= */}

          <div
            className="
              w-full
              max-w-[530px]
              justify-self-end

              max-[767px]:mt-[48px]
              max-[767px]:max-w-none
              max-[767px]:justify-self-auto
              max-[767px]:rounded-t-[34px]
              !bg-[linear-gradient(180deg,#F3FDDE_0%,#FFFFFF_100%)]
              max-[767px]:px-[16px]
              max-[767px]:pb-[32px]
              max-[767px]:pt-[47px]
            "
          >
            <form
              id="contactForm"
              onSubmit={handleSubmit}
              noValidate
              className="
                w-full

                max-[767px]:mx-auto
                max-[767px]:max-w-[620px]
              "
            >
              {/* =================================================
                  FULL NAME
              ================================================= */}

              <ContactInput
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Type your full name here"
                autoComplete="name"
              />

              {/* =================================================
                  EMAIL
              ================================================= */}

              <ContactInput
                label="E Mail ID"
                name="email"
                type="email"
                placeholder="Your e-mail id here"
                autoComplete="email"
              />

              {/* =================================================
                  PHONE
              ================================================= */}

              <ContactInput
                label="Phone Number"
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="Type your company name"
                autoComplete="tel"
              />

              {/* =================================================
                  GOAL / MESSAGE
              ================================================= */}

              <div
                className="
                  mt-[19px]

                  max-[767px]:mt-[39px]
                "
              >
                <label
                  htmlFor="goal"
                  className="
                    mb-[7px]
                    block

                    font-primary
                    text-[12px]
                    font-medium

                    text-[#252525]

                    max-[767px]:mb-[10px]
                    max-[767px]:text-[17px]
                    max-[767px]:font-normal
                    max-[767px]:leading-[1.35]
                    max-[767px]:tracking-[-0.025em]
                  "
                >
                  How can MealEats help you reach your goals?*
                </label>

                <textarea
                  id="goal"
                  name="goal"
                  required
                  maxLength={2000}
                  placeholder="What goals are you looking to achieve with MealEats?"
                  disabled={isSubmitting}
                  className="
                    block
                    h-[112px]
                    w-full
                    resize-none
                    rounded-[6px]
                    border
                    border-[#DEDEDE]
                    bg-primary
                    px-[12px]
                    py-[10px]

                    font-primary
                    text-[12px]
                    font-normal
                    leading-[1.4]

                    text-secondary

                    outline-none

                    placeholder:text-[#C7C7C7]

                    transition-[border-color,box-shadow]
                    duration-200

                    focus:border-accent
                    focus:ring-[3px]
                    focus:ring-[#82B72E1A]

                    disabled:cursor-not-allowed
                    disabled:opacity-70

                    max-[480px]:h-[120px]

                    max-[767px]:h-[192px]
                    max-[767px]:rounded-[9px]
                    max-[767px]:px-[19px]
                    max-[767px]:py-[20px]
                    max-[767px]:text-[16px]
                    max-[767px]:leading-[1.4]
                  "
                />

                {/* =================================================
                    STATUS MESSAGE
                ================================================= */}

                {status.message && (
                  <div
                    role={
                      status.type === "error"
                        ? "alert"
                        : "status"
                    }
                    aria-live="polite"
                    className={`
                      mt-[10px]
                      rounded-[6px]
                      border
                      px-[12px]
                      py-[9px]

                      font-primary
                      text-[11px]
                      leading-[1.45]

                      ${
                        status.type === "success"
                          ? "border-[#B9DFA0] bg-[#F1F9E9] text-[#39751D]"
                          : "border-[#F0B8B8] bg-[#FFF4F4] text-[#B42318]"
                      }

                      max-[767px]:text-[13px]
                    `}
                  >
                    {status.message}
                  </div>
                )}

                {/* =================================================
                    SUBMIT BUTTON
                ================================================= */}

                <button
                  type="submit"
                  id="contactSubmit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="
                    mt-[17px]
                    flex
                    h-[48px]
                    w-full
                    items-center
                    justify-center

                    rounded-full

                    bg-primary-gradient

                    font-primary
                    text-[12px]
                    font-medium

                    text-primary

                    shadow-[0_5px_14px_rgba(82,127,11,0.20)]

                    transition-[transform,box-shadow,opacity]
                    duration-200

                    hover:-translate-y-[1px]
                    hover:shadow-[0_7px_18px_rgba(82,127,11,0.25)]

                    focus-visible:outline-none
                    focus-visible:ring-[3px]
                    focus-visible:ring-[#82B72E66]

                    disabled:cursor-not-allowed
                    disabled:opacity-70
                    disabled:hover:translate-y-0

                    max-[767px]:mt-[37px]
                    max-[767px]:h-[56px]
                    max-[767px]:text-[17px]
                  "
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit"}
                </button>

                {/* =================================================
                    TERMS
                ================================================= */}

                <p
                  className="
                    text-center

                    font-primary
                    text-[13px]
                    font-normal
                    leading-[21px]

                    text-[#0F0F0F]

                    !mt-[16px]

                    max-[767px]:mt-[30px]
                    max-[767px]:text-[15px]
                    max-[767px]:leading-[1.45]
                    max-[767px]:tracking-[-0.015em]
                  "
                >
                  By filling out this form you agree to MealEats&apos;s
                  <br />
                  Terms of Use &amp; Privacy Policy
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   REUSABLE CONTACT INPUT
========================================================= */

function ContactInput({
  label,
  name,
  type,
  placeholder,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "tel";
  placeholder: string;
  autoComplete?: string;
  inputMode?:
    | "text"
    | "email"
    | "tel"
    | "numeric";
}) {
  return (
    <div
      className="
        mb-[19px]

        max-[767px]:mb-[39px]
      "
    >
      {/* =====================================================
          LABEL
      ===================================================== */}

      <label
        htmlFor={name}
        className="
          mb-[7px]
          block

          font-primary
          text-body
          font-normal
          tracking-[-2%]
          leading-[24px]

          text-[#0F0F0F]

          max-[767px]:mb-[13px]
          max-[767px]:text-[17px]
          max-[767px]:leading-[1.35]
          max-[767px]:tracking-[-0.025em]
        "
      >
        {label}
      </label>

      {/* =====================================================
          INPUT
      ===================================================== */}

      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        disabled={false}
        className="
          block

          h-[56px]
          w-full

          rounded-[9px]

          border
          border-[#E3E3E3]

          bg-[#FFFFFF]

          px-[12px]

          font-primary
          text-[12px]
          font-normal

          text-secondary

          outline-none

          placeholder:text-[#C7C7C7]

          transition-[border-color,box-shadow]
          duration-200

          focus:border-accent
          focus:ring-[3px]
          focus:ring-[#82B72E1A]

          disabled:cursor-not-allowed
          disabled:opacity-70

          max-[767px]:h-[56px]
          max-[767px]:rounded-[9px]
          max-[767px]:px-[19px]
          max-[767px]:text-[16px]
          max-[767px]:leading-none
        "
      />
    </div>
  );
}