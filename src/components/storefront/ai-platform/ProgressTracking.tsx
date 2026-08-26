import Image from "next/image";

const IMAGE = "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377148/mealeats/products/progress-tracking.png";

export default function ProgressTracking() {
  return (
    <section
      aria-labelledby="progress-tracking-heading"
      className="
        w-full
        bg-primary
        py-[80px]
        max-[768px]:pb-0
        lg:px-[56px]
        xl:px-[56px]
        max-[768px]:px-[16px]
        pt-0
        lg:pt-0
        lg:py-[11px]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-full
          lg:px-0
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-[48px]
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-[80px]
            max-[768px]:flex
            max-[768px]:flex-col-reverse
          "
        >
          {/* =================================================
              LEFT — CONTENT
          ================================================= */}

          <div className="w-full max-w-[500px]">
            <h2
              id="progress-tracking-heading"
              className="
                font-primary
                !text-[40px]
                !font-medium
                leading-[69px]
                tracking-[-4%]
                max-[768px]:!text-[24px]
                max-[768px]:!leading-[59px]
                text-secondary
              "
            >
              Personalized{" "}
              <span className="font-accent font-normal italic">
                Progress Tracking
              </span>
            </h2>

            <p
              className="
                mt-[16px]
                max-w-[500px]
                font-primary
                text-body
                font-normal
                leading-[28px]
                text-text-muted
                max-[768px]:text-[14px]
                max-[768px]:leading-[22px]
                max-[768px]:!mt-[0px]
              "
            >
              Track your progress across nutrition, exercise, hydration,
              weight, and daily wellness. Interactive graphs and weekly
              summaries help you see your consistency, celebrate improvements,
              and stay motivated toward your health goals.
            </p>
          </div>

          {/* =================================================
              RIGHT — VISUAL
          ================================================= */}

          <div
            className="
              relative
              w-full
              max-w-[620px]
              justify-self-end
            "
          >
            <Image
              src={IMAGE}
              alt="Personalized progress tracking dashboard"
              width={800}
              height={500}
              sizes="(max-width: 1023px) 100vw, 620px"
              className="
                block
                h-auto
                w-full
                object-contain
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}