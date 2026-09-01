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
!mb-[20px]
relative
inline-flex
isolate
h-[33px]
min-w-[95px]
items-center
justify-center
overflow-hidden
rounded-full
    border
    border-black/[0.05]

    bg-[#F4F4F433]

    px-[16px]
    py-[8px]

    shadow-[0_3px_12px_rgba(0,0,0,0.04)]

    backdrop-blur-[24px]
  "
>
  {/* =========================================================
      BACKGROUND COLOR LAYER

      Creates subtle variation inside the transparent pill.
      This helps the glass effect remain visible on white pages.
  ========================================================== */}
  <div
    className="
      pointer-events-none
      absolute
      -left-[20%]
      top-1/2
      z-0

      h-[80px]
      w-[80px]

      -translate-y-1/2
      rounded-full

      bg-[#F4F4F433]

      blur-[28px]
    "
  />

  <div
    className="
      pointer-events-none
      absolute
      -right-[20%]
      top-1/2
      z-0

      h-[80px]
      w-[80px]

      -translate-y-1/2
      rounded-full

      bg-[#F4F4F433]

      blur-[28px]
    "
  />

  {/* =========================================================
      GLASS SURFACE
  ========================================================== */}
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      z-[1]

      bg-gradient-to-b
      from-white/[0.45]
      via-white/[0.10]
      to-transparent
    "
  />

  {/* =========================================================
      INNER GLASS EDGE
  ========================================================== */}
  <div
    className="
      pointer-events-none
      absolute
      inset-[1px]
      z-[2]

      rounded-full

      border
      border-white/[0.55]
    "
  />

  {/* =========================================================
      TOP LIGHT REFLECTION
  ========================================================== */}
  <div
    className="
      pointer-events-none
      absolute
      left-[15%]
      right-[15%]
      top-0
      z-[3]

      h-px

      rounded-full

      bg-white/80
    "
  />

  {/* =========================================================
      CONTENT
  ========================================================== */}
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
      leading-[28px]
      tracking-[-0.03em]

      text-[#007246]
    "
  >
    {label}
  </span>
</div>


);
}
