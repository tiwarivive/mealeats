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

type Testimonial = {
  id: number;
  rating: number;
  quote: string;
  name: string;
};

/* =========================================================
   DATA
========================================================= */

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 4,
    quote:
      '"Whenever I had questions about my reports, the support team responded within minutes and guided me patiently through every step."',
    name: "Priya S",
  },
  {
    id: 2,
    rating: 4,
    quote:
      '"I never felt lost during my treatment journey—their reminders, updates, and constant check-ins made me feel cared for beyond the hospital walls."',
    name: "Arun K.",
  },
  {
    id: 3,
    rating: 4,
    quote:
      '"I never felt lost during my treatment journey—their reminders, updates, and constant check-ins made me feel cared for beyond the hospital walls."',
    name: "Arun K.",
  },
  {
    id: 4,
    rating: 5,
    quote:
      '"The personalised recommendations made it much easier to stay consistent with my health goals every day."',
    name: "Meera R.",
  },
  {
    id: 5,
    rating: 5,
    quote:
      '"Everything feels simple, clear and personalised. I finally feel like I understand what my body needs."',
    name: "Rahul M.",
  },
];

/* =========================================================
   STAR ICON
========================================================= */

function Star({
  filled,
  size = 30,
}: {
  filled: boolean;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M12 2.7L14.85 8.48L21.23 9.41L16.62 13.91L17.71 20.27L12 17.27L6.29 20.27L7.38 13.91L2.77 9.41L9.15 8.48L12 2.7Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   RATING
========================================================= */

function Rating({ rating }: { rating: number }) {
  return (
    <div
      className="
        flex
        items-center
        gap-[8px]
        text-accent
      "
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          size={30}
        />
      ))}
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
        group
        relative
        flex
        h-[320px]
        w-[calc((100vw-70px)/3)]
        min-w-[calc((100vw-70px)/3)]
        max-w-[520px]
        shrink-0
        select-none
        flex-col
        rounded-[20px]
        border
        border-border-light
        bg-white
        p-[42px]
        shadow-[0_2px_8px_rgba(0,0,0,0.025)]
        snap-start

        min-[1600px]:h-[320px]
        min-[1600px]:p-[42px]

        max-[1280px]:h-[310px]
        max-[1280px]:min-w-[calc((100vw-48px)/3)]
        max-[1280px]:w-[calc((100vw-48px)/3)]
        max-[1280px]:p-[34px]

        max-[1023px]:min-w-[calc((100vw-48px)/2)]
        max-[1023px]:w-[calc((100vw-48px)/2)]
        max-[1023px]:h-[300px]

        max-[767px]:h-[330px]
        max-[767px]:min-w-[calc(100vw-32px)]
        max-[767px]:w-[calc(100vw-32px)]
        max-[767px]:rounded-[18px]
        max-[767px]:p-[28px]

        max-[480px]:h-[320px]
        max-[480px]:min-w-[calc(100vw-32px)]
        max-[480px]:w-[calc(100vw-32px)]
        max-[480px]:p-[24px]
      "
    >
      {/* =====================================================
          RATING
      ===================================================== */}

      <Rating rating={testimonial.rating} />

      {/* =====================================================
          QUOTE
      ===================================================== */}

      <p
        className="
          mt-[38px]
          max-w-[470px]
          font-primary
          text-[18px]
          font-normal
          leading-[1.42]
          tracking-[-0.025em]
          text-[#777777]

          max-[1280px]:mt-[30px]
          max-[1280px]:text-[17px]

          max-[767px]:mt-[28px]
          max-[767px]:text-[16px]
          max-[767px]:leading-[1.5]
        "
      >
        {testimonial.quote}
      </p>

      {/* =====================================================
          NAME
      ===================================================== */}

      <p
        className="
          mt-auto
          font-primary
          text-[21px]
          font-medium
          leading-[1.25]
          tracking-[-0.025em]
          text-secondary

          max-[767px]:text-[19px]
        "
      >
        — {testimonial.name}
      </p>
    </article>
  );
}

/* =========================================================
   BACKGROUND GLOW
========================================================= */

function BackgroundGlow() {
  return (
    <>
      {/* Main elliptical glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[55px]
          z-0
          h-[850px]
          w-[1350px]
          -translate-x-1/2
          rounded-[50%]
          bg-[radial-gradient(ellipse_at_center,rgba(247,251,244,0.98)_0%,rgba(244,249,240,0.94)_48%,rgba(238,247,232,0.72)_68%,rgba(255,255,255,0)_82%)]
          blur-[2px]

          max-[1280px]:h-[760px]
          max-[1280px]:w-[1150px]

          max-[767px]:top-[80px]
          max-[767px]:h-[650px]
          max-[767px]:w-[850px]
        "
      />

      {/* Secondary soft green atmosphere */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[180px]
          z-0
          h-[620px]
          w-[1000px]
          -translate-x-1/2
          rounded-full
          bg-[radial-gradient(ellipse_at_center,rgba(226,240,213,0.3)_0%,rgba(255,255,255,0)_70%)]
          blur-[45px]

          max-[767px]:h-[500px]
          max-[767px]:w-[700px]
        "
      />
    </>
  );
}

/* =========================================================
   TESTIMONIALS
========================================================= */

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  /* =======================================================
     DESKTOP MOUSE DRAG STATE
  ======================================================= */

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const [isDraggingState, setIsDraggingState] = useState(false);

  /* =======================================================
     POINTER DOWN
     
     IMPORTANT:
     On mobile/touch we DO NOT take over scrolling.
     The browser handles native horizontal swipe.
  ======================================================= */

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const slider = sliderRef.current;

      if (!slider) return;

      /*
       * Mobile touch:
       * Let the browser handle native horizontal scrolling.
       */
      if (event.pointerType === "touch") {
        return;
      }

      /*
       * Mouse / trackpad:
       * Enable custom drag.
       */
      isDragging.current = true;
      hasDragged.current = false;

      startX.current = event.clientX;
      startScrollLeft.current = slider.scrollLeft;

      setIsDraggingState(true);

      slider.setPointerCapture?.(event.pointerId);
    },
    [],
  );

  /* =======================================================
     POINTER MOVE
     
     Only used for mouse/pointer devices.
     Mobile uses native touch scrolling.
  ======================================================= */

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const slider = sliderRef.current;

      if (!slider || !isDragging.current) return;

      /*
       * Never manually control touch scrolling.
       */
      if (event.pointerType === "touch") {
        return;
      }

      const distance = event.clientX - startX.current;

      if (Math.abs(distance) > 5) {
        hasDragged.current = true;
      }

      slider.scrollLeft = startScrollLeft.current - distance;
    },
    [],
  );

  /* =======================================================
     STOP DRAGGING
  ======================================================= */

  const stopDragging = useCallback(
    (event?: ReactPointerEvent<HTMLDivElement>) => {
      const slider = sliderRef.current;

      isDragging.current = false;
      setIsDraggingState(false);

      if (slider && event && event.pointerType !== "touch") {
        try {
          if (slider.hasPointerCapture?.(event.pointerId)) {
            slider.releasePointerCapture?.(event.pointerId);
          }
        } catch {
          // Ignore pointer capture cleanup errors.
        }
      }
    },
    [],
  );

  /* =======================================================
     WHEEL SUPPORT
     
     Converts vertical wheel movement into horizontal
     scrolling when appropriate.
  ======================================================= */

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const handleWheel = (event: WheelEvent) => {
      /*
       * If the user is already using horizontal wheel input,
       * let the browser handle it naturally.
       */
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }

      /*
       * Only convert vertical wheel movement when the
       * carousel actually has horizontal overflow.
       */
      if (slider.scrollWidth <= slider.clientWidth) {
        return;
      }

      /*
       * Do not interfere with normal vertical page scrolling
       * unless the carousel can move horizontally.
       */
      const maxScroll =
        slider.scrollWidth - slider.clientWidth;

      const nextScroll =
        slider.scrollLeft + event.deltaY;

      if (
        nextScroll > 0 &&
        nextScroll < maxScroll
      ) {
        event.preventDefault();
        slider.scrollLeft = nextScroll;
      }
    };

    slider.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      slider.removeEventListener("wheel", handleWheel);
    };
  }, []);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="
        relative
        w-full
        overflow-hidden
        bg-primary
        py-[115px]

        max-[1280px]:py-[95px]

        max-[767px]:py-[75px]

        max-[480px]:py-[60px]
      "
    >
      <BackgroundGlow />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-content
          flex-col
          items-center
          px-page
          text-center

          max-[767px]:px-[16px]
        "
      >
        {/* ===================================================
            LABEL
        =================================================== */}

        <div
          className="
            inline-flex
            items-center
            justify-center
            rounded-full
            border
            border-border-light
            bg-white/80
            px-[20px]
            py-[8px]
            shadow-[0_1px_5px_rgba(0,0,0,0.025)]
            backdrop-blur-[4px]

            max-[767px]:px-[17px]
            max-[767px]:py-[7px]
          "
        >
          <span
            className="
              font-primary
              text-[14px]
              font-normal
              leading-none
              tracking-[-0.015em]
              text-[#23815b]

              max-[767px]:text-[12px]
            "
          >
            TESTIMONIALS
          </span>
        </div>

        {/* ===================================================
            HEADING
        =================================================== */}

        <h2
          id="testimonials-title"
          className="
            mt-[30px]
            max-w-[1050px]
            font-primary
            text-[56px]
            font-normal
            leading-[1.08]
            tracking-[-0.055em]
            text-secondary

            max-[1280px]:mt-[26px]
            max-[1280px]:text-[48px]

            max-[767px]:mt-[22px]
            max-[767px]:max-w-[100%]
            max-[767px]:text-[40px]
            max-[767px]:leading-[1.12]
            max-[767px]:tracking-[-0.045em]

            max-[480px]:text-[34px]
          "
        >
          People who stopped{" "}
          <span
            className="
              font-accent
              italic
              font-normal
              tracking-[-0.035em]
            "
          >
            Guessing
          </span>
        </h2>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <p
          className="
            mt-[22px]
            max-w-[870px]
            font-primary
            text-[20px]
            font-normal
            leading-[1.35]
            tracking-[-0.025em]
            text-[#777777]

            max-[1280px]:max-w-[780px]
            max-[1280px]:text-[18px]

            max-[767px]:mt-[18px]
            max-[767px]:max-w-[620px]
            max-[767px]:text-[16px]
            max-[767px]:leading-[1.5]

            max-[480px]:max-w-[340px]
            max-[480px]:text-[15px]
          "
        >
          These Testimonials highlights our commitment to providing
          Personalised, Compassionate and Effective Healthcare Solutions
        </p>
      </header>

      {/* =====================================================
          DRAGGABLE / SWIPE CAROUSEL
      ===================================================== */}

      <div
        ref={sliderRef}
        role="region"
        aria-label="Customer testimonials"
        className={`
          relative
          z-10
          mt-[72px]
          flex
          w-full
          cursor-grab
          gap-[35px]
          overflow-x-auto
          overflow-y-hidden
          px-[0px]
          pb-[8px]
          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden

          snap-x
          snap-mandatory

          ${isDraggingState ? "cursor-grabbing select-none" : ""}

          max-[1280px]:mt-[60px]
          max-[1280px]:gap-[24px]

          max-[767px]:mt-[48px]
          max-[767px]:gap-[16px]
          max-[767px]:px-[16px]
          max-[767px]:snap-x
          max-[767px]:snap-mandatory
        `}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        style={{
          /*
           * CRITICAL FIX:
           *
           * Tell the browser that horizontal touch
           * gestures belong to this scroll container.
           *
           * This allows native mobile swipe.
           */
          touchAction: "pan-x",

          overscrollBehaviorX: "contain",

          /*
           * Smooth native scrolling on mobile.
           */
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* ===================================================
            LEFT SPACER
        =================================================== */}

        <div
          aria-hidden="true"
          className="
            hidden
            shrink-0

            min-[768px]:block
            min-[768px]:w-[0px]

            min-[1440px]:w-[0px]
          "
        />

        {/* ===================================================
            TESTIMONIAL CARDS
        =================================================== */}

        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
          />
        ))}

        {/* ===================================================
            RIGHT BREATHING ROOM
        =================================================== */}

        <div
          aria-hidden="true"
          className="
            h-px
            w-[20px]
            min-w-[20px]
            shrink-0

            max-[767px]:w-[16px]
            max-[767px]:min-w-[16px]
          "
        />
      </div>

      {/* =====================================================
          DRAG HINT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          relative
          z-10
          mt-[25px]
          flex
          justify-center
          opacity-60

          max-[767px]:mt-[18px]
        "
      >
        <span
          className="
            font-primary
            text-[12px]
            tracking-[0.02em]
            text-text-muted
          "
        >
          Swipe to explore
        </span>
      </div>
    </section>
  );
}