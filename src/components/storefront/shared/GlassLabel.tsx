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
        relative
        inline-flex
        h-[33px]
        min-w-[95px]
        items-center
        justify-center
        overflow-hidden
        rounded-[37px]
        bg-[#F4F4F433]
        backdrop-blur-[20px]
      "
    >
      {showStar && (
        <Image
          src="https://res.cloudinary.com/gppcmjpt/image/upload/v1787377070/mealeats/products/ai-platform-stars.png"
          alt="AI stars"
          width={12}
          height={12}
          className="
            relative
            z-10
            mr-[2.5px]
            h-[12px]
            w-[12px]
            shrink-0
            object-contain
          "
        />
      )}

      <span
        className="
          relative
          z-10
          whitespace-nowrap
          font-primary
          text-[13px]
          font-normal
          leading-[28]
          tracking-[-3%]
          text-[#007246]
        "
      >
        {label}
      </span>
    </div>
  );
}