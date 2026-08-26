import Image from "next/image";
import Link from "next/link";

/* =========================================================
   AI HEADER
========================================================= */

const LOGO =
  "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377132/mealeats/products/mealeats.png";

export default function AIHeader() {
  return (
    <header
      aria-label="MealEats header"
      className="
        pointer-events-none
        fixed
        left-[80px]
        top-[18px]
        z-[1000]

        max-[1024px]:left-[32px]

        max-[768px]:left-[16px]
        max-[768px]:top-[16px]
      "
    >
      <div
        className="
          pointer-events-auto
          relative
          flex
          h-[51px]
          w-[81px]
          items-center
          justify-center
          max-[768px]:!block
          max-[768px]:!ml-[-16px]
          overflow-hidden
          rounded-[20px]

          max-[768px]:h-[64px]
          max-[768px]:w-[116px]
          max-[768px]:rounded-[17px]
        "
      >
        <Link
          href="/"
          aria-label="MealEats home"
          className="
            relative
            flex
            h-[64px]
            w-[94px]
            items-center
            justify-center
            rounded-[12px]
            outline-none

            focus-visible:ring-2
            focus-visible:ring-[#76B82A]
            focus-visible:ring-offset-2

            max-[768px]:h-[50px]
            max-[768px]:w-[98px]
          "
        >
          <Image
            src={LOGO}
            alt="MealEats"
            width={94}
            height={64}
            priority
            draggable={false}
            className="
              block
              h-[64px]
              w-[94px]
              select-none
              object-contain

              max-[768px]:h-[50px]
              max-[768px]:w-[98px]
            "
          />
        </Link>
      </div>
    </header>
  );
}