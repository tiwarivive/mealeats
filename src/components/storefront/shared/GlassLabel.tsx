"use client";

import Image from "next/image";

type GlassLabelProps = {
  label: string;
  showStar?: boolean;
};

export default function GlassLabel({
  label,
  showStar = true,
}: GlassLabelProps) {
  return (
    <div
      className="
        flex
        h-[33px]
        min-w-[95px]
        items-center
        justify-center
        gap-[6px]
        rounded-[37px]
        bg-[#F4F4F4]/20
        px-4
        backdrop-blur-[20px]
      "
    >
      {showStar && (
        <Image
          src="https://res.cloudinary.com/gppcmjpt/image/upload/v1787377070/mealeats/products/ai-platform-stars.png"
          alt="AI stars"
          width={12}
          height={12}
          className="h-[12px] w-[12px] shrink-0"
        />
      )}

      <span
        className="
          font-primary
          text-[14px]
          font-normal
          leading-none
          tracking-[-3%]
          text-[#007246]
        "
      >
        {label}
      </span>
    </div>
  );
}