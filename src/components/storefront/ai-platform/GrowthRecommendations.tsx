import Image from "next/image";

const IMAGE = "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377097/mealeats/products/growth-recommendations.png";

export default function GrowthRecommendations() {
  return (
    <section
      aria-labelledby="growth-recommendations-heading"
      className="
        w-full
        bg-primary
        py-[56px]
        lg:py-[56px]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1200px]
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
            max-[768px]:gap-[16px]
            lg:grid-cols-2
            lg:gap-[96px]
          "
        >
          {/* =================================================
              LEFT — VISUAL
          ================================================= */}

          <div className="w-full">
            <Image
              src={IMAGE}
              alt="AI-powered growth recommendations dashboard"
              width={800}
              height={600}
              sizes="(max-width: 1023px) 100vw, 560px"
              className="
                block
                h-auto
                w-full
                max-w-[560px]
                object-contain
                lg:max-w-none
              "
            />
          </div>

          {/* =================================================
              RIGHT — CONTENT
          ================================================= */}

          <div className="w-full max-w-[560px]">
            <h2
              id="growth-recommendations-heading"
              className="
                font-primary
                !text-[40px]
                font-medium
                !leading-[49px]
                !tracking-[-4%]
                max-[768px]:!text-[24px]
                max-[768px]:!leading-[28px]
                text-secondary
              "
            >
              <span className=" !font-accent !font-normal italic">
                AI-Powered
              </span>{" "}
              Growth
              <br />
              Recommendations
            </h2>

            <p
              className="
                !mt-[24px]
                max-w-[560px]
                font-primary
                text-body
                font-normal
                leading-[28px]
                max-[768px]:text-[14px]
                max-[768px]:leading-[28px]
                max-[768px]:!mt-[8px]
                text-text-muted
              "
            >
              Get personalized recommendations based on your progress,
              lifestyle, and goals. From adjusting your diet and suggesting new
              exercises to improving daily habits, the AI continuously helps
              you make small, meaningful changes that support long-term growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}