"use client";

import Image from "next/image";

type GlassLabelProps = {
label: string;
showStar?: boolean;
};

export default function GreenGlassLabel({
label,
showStar = true,
}: GlassLabelProps) {
return (
<div
className="
!mb-[20px]
max-[768px]:!mb-[8px]
relative
inline-flex
isolate
h-[33px]
min-w-[95px]
items-center
justify-center
overflow-hidden
rounded-full
    

    bg-[#CED9BD33]

    px-[16px]
    py-[8px]
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

      bg-gradient-to-b
      from-[#CED9BD33]
      via-[#CED9BD33]
      opacity-[50%]

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

      bg-gradient-to-b
      from-[#CED9BD33]
      via-[#CED9BD33]
      opacity-[50%]

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
      from-[#CED9BD33]
      via-[#CED9BD33]
      to-transparent
      opacity-[50%]
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
      opacity-[50%]
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

      bg-[#CED9BD33]
    "
  />

  {/* =========================================================
      CONTENT
  ========================================================== */}  <span
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
