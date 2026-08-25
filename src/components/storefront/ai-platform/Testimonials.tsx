"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

/* =========================================================
   TYPES
========================================================= */

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating?: number;
}

/* =========================================================
   DATA
========================================================= */

const testimonials: Testimonial[] = [
  {
    id: "priya-s",
    name: "Priya S",
    text: "Whenever I had questions about my reports, the support team responded with insights and guidance in a way that was easy to understand.",
    rating: 4.5,
  },
  {
    id: "arun-k-1",
    name: "Arun K.",
    text: "I never felt lost during my treatment journey—the reminders, updates, and constant check-ins made me feel cared for beyond the hospital walls.",
    rating: 4.5,
  },
  {
    id: "arun-k-2",
    name: "Arun K.",
    text: "I never felt lost during my treatment journey—the reminders, updates, and constant check-ins made me feel cared for beyond the hospital walls.",
    rating: 4.5,
  },
];

/* =========================================================
   STAR RATING
========================================================= */

function Stars({ rating = 4.5 }: { rating?: number }) {
  return (
    <div
      className="flex h-[18px] items-center gap-[3px]"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < Math.floor(rating);
        const half =
          rating % 1 !== 0 && index === Math.floor(rating);

        return (
          <span
            key={index}
            aria-hidden="true"
            className={`
              relative
              block
              text-[38px]
              leading-none
              ${
                filled || half
                  ? "text-accent"
                  : "text-border-light"
              }
            `}
          >
            {half ? (
              <>
                <span className="text-border-light">★</span>

                <span
                  className="
                    absolute
                    inset-0
                    overflow-hidden
                    text-accent
                  "
                  style={{ width: "50%" }}
                >
                  ★
                </span>
              </>
            ) : (
              "★"
            )}
          </span>
        );
      })}
    </div>
  );
}

/* =========================================================
   TESTIMONIAL CARD
========================================================= */

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article
      className="
        flex
        h-[308px]
        bg-[#FFFFFF]
        w-[calc(100vw-40px)]
        shrink-0
        flex-col
        rounded-[20px]
        border
        border-[#EFEFEF]
        p-6
        shadow-none

        sm:w-[420px]
        sm:p-7

        lg:w-[484px]
        lg:p-8
      "
    >
      {/* Rating */}

      <Stars rating={testimonial.rating} />

      {/* Testimonial text */}

      <p
        className="
          !mt-[32px]
          !text-body
          max-w-[390px]
          font-primary
          text-caption
          font-normal
          leading-[1.65]
          text-text-muted
        "
      >
        “{testimonial.text}”
      </p>

      {/* Author */}

      <div className="mt-auto pt-6">
        <p
          className="
            font-primary
            text-[20px]
            font-medium
            leading-[100%]
            text-[#000000]
          "
        >
          — {testimonial.name}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);

  /* =======================================================
     POINTER DOWN
  ======================================================= */

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const slider = sliderRef.current;

      if (!slider) return;

      /*
       * Only use primary mouse button for desktop dragging.
       * Touch and pen are still supported.
       */
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      pointerIdRef.current = event.pointerId;
      startXRef.current = event.clientX;
      startScrollLeftRef.current = slider.scrollLeft;

      isDraggingRef.current = false;

      try {
        slider.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is not available in every environment.
      }
    },
    [],
  );

  /* =======================================================
     POINTER MOVE
  ======================================================= */

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const slider = sliderRef.current;

      if (
        !slider ||
        pointerIdRef.current !== event.pointerId
      ) {
        return;
      }

      const distance =
        event.clientX - startXRef.current;

      /*
       * Small movement is ignored so normal clicks
       * don't accidentally become drag operations.
       */
      if (
        !isDraggingRef.current &&
        Math.abs(distance) < 5
      ) {
        return;
      }

      isDraggingRef.current = true;
      setIsDragging(true);

      slider.scrollLeft =
        startScrollLeftRef.current - distance;
    },
    [],
  );

  /* =======================================================
     POINTER END
  ======================================================= */

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const slider = sliderRef.current;

      if (
        !slider ||
        pointerIdRef.current !== event.pointerId
      ) {
        return;
      }

      try {
        slider.releasePointerCapture(event.pointerId);
      } catch {
        // Safe fallback for browsers without pointer capture.
      }

      pointerIdRef.current = null;

      /*
       * Keep the dragging state for the current frame
       * and reset it immediately after.
       */
      requestAnimationFrame(() => {
        isDraggingRef.current = false;
        setIsDragging(false);
      });
    },
    [],
  );

  /* =======================================================
     WHEEL SUPPORT
  ======================================================= */

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      const slider = sliderRef.current;

      if (!slider) return;

      /*
       * Horizontal wheel movement is handled naturally.
       * For vertical mouse wheels, translate the wheel
       * into horizontal movement when the section is hovered.
       */
      if (
        Math.abs(event.deltaY) >
        Math.abs(event.deltaX)
      ) {
        const maxScroll =
          slider.scrollWidth - slider.clientWidth;

        if (maxScroll <= 0) return;

        const nextScroll =
          slider.scrollLeft + event.deltaY;

        if (
          nextScroll > 0 &&
          nextScroll < maxScroll
        ) {
          event.preventDefault();

          slider.scrollLeft = nextScroll;
        }
      }
    },
    [],
  );

  /* =======================================================
     KEYBOARD ACCESS
  ======================================================= */

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const slider = sliderRef.current;

      if (!slider) return;

      const amount =
        window.innerWidth >= 1024 ? 504 : 340;

      if (event.key === "ArrowRight") {
        event.preventDefault();

        slider.scrollBy({
          left: amount,
          behavior: "smooth",
        });
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        slider.scrollBy({
          left: -amount,
          behavior: "smooth",
        });
      }

      if (event.key === "Home") {
        event.preventDefault();

        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }

      if (event.key === "End") {
        event.preventDefault();

        slider.scrollTo({
          left: slider.scrollWidth,
          behavior: "smooth",
        });
      }
    },
    [],
  );

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      pointerIdRef.current = null;
      isDraggingRef.current = false;
    };
  }, []);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="
        relative
        w-full
        overflow-hidden
        max-w-[1328px]
        mx-auto
        bg-primary
        py-[var(--spacing-4xl)]
        sm:py-[var(--spacing-5xl)]
        lg:py-[var(--spacing-5xl)]
        max-[768px]:pt-[55px]
      "
    >
      {/* =====================================================
          SECTION CONTENT
      ===================================================== */}

      <div className="w-full">
        {/* ===================================================
            HEADING
        =================================================== */}

        <div
          className="
            mx-auto
            w-full
            max-w-full
            flex flex-col items-center justify-center
            px-[var(--spacing-page)]
            text-center
          "
        >
          {/* Eyebrow */}

          <div
            className="
              mb-[var(--spacing-sm)]
              inline-flex
              items-center
              rounded-full
              bg-[#F4F4F433]
              px-3
              py-1
            "
          >
            <span
              className="
                font-primary
                text-[13px]
                max-[768px]:text-[10px]
                leading-[28px]
                font-normal
                uppercase
                leading-[28px]
                tracking-[-3%]
                text-[#007246]
              "
            >
              Testimonials
            </span>
          </div>

          {/* Heading */}

          <h2
            id="testimonials-heading"
            className="
              font-primary
              !text-h2
              font-medium
              max-[768px]:!text-[28px]
              max-[768px]:!leading-[41px]
              leading-[100%]
              tracking-[0%]
              text-secondary
            "
          >
            People who stopped
            <br className="min-[768px]:hidden" />
            <span
              className="
                font-accent
                font-normal
                italic
              "
            >
              Guessing
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              
              !mt-[var(--spacing-sm)]
              max-w-[520px]
              !mx-auto
              font-manrope
              text-body
              font-normal
              max-[768px]:leading-[22px]
              leading-[100%]
              text-text-muted
            "
          >
            These Testimonials highlights our commitment to providing Personalised, Compassionate and Effective Healthcare Solutions
          </p>
        </div>

        {/* ===================================================
            DRAG CAROUSEL
        =================================================== */}

        <div
          ref={sliderRef}
          tabIndex={0}
          role="region"
          aria-label="Customer testimonials"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={(event) => {
            /*
             * Do not terminate pointer capture here.
             * Pointer capture allows dragging outside
             * the carousel without losing the interaction.
             */
            if (
              pointerIdRef.current !== null &&
              event.pointerId === pointerIdRef.current
            ) {
              return;
            }
          }}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          className={`
            mt-[var(--spacing-3xl)]
            
            flex
            w-full
            gap-[20px]
            overflow-x-auto
            overflow-y-hidden
            px-[0px]
            pb-1
            outline-none
            select-none

            sm:gap-[20px]
            sm:px-[0px]

            lg:gap-[20px]
            lg:px-[0px]
            max-[768px]:px-[16px]

            [scrollbar-width:none]
            [-ms-overflow-style:none]

            [&::-webkit-scrollbar]:hidden

            ${
              isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
            }
          `}
          style={{
            touchAction: "pan-y",
            overscrollBehaviorX: "contain",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* =================================================
              LEFT SPACER

              Keeps the first card aligned with the Figma
              56px desktop content edge while allowing
              horizontal dragging.
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              hidden
              shrink-0
              lg:block
              lg:w-0
            "
          />

          {/* =================================================
              CARDS
          ================================================= */}

          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}

          {/* =================================================
              RIGHT BREATHING SPACE
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              h-px
              w-[1px]
              shrink-0
            "
          />
        </div>
      </div>
    </section>
  );
}