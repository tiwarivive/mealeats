"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

/* =========================================================
   TYPES
========================================================= */

type HeaderProps = {
  /**
   * When true:
   * - Header floats over the first section
   * - First section background remains visible behind header
   * - No header spacer is rendered
   *
   * When false:
   * - Header keeps the normal document spacing
   * - Existing page layout remains unchanged
   */
  overlay?: boolean;
};

/* =========================================================
   NAVIGATION
========================================================= */

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about-us",
  },
  {
    label: "AI Platform",
    href: "/ai-platform",
  },
  {
    label: "Knowledge Hub",
    href: "/knowledge-hub",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const LOGO = "https://res.cloudinary.com/gppcmjpt/image/upload/v1787377132/mealeats/products/mealeats.png";

/* =========================================================
   HEADER
========================================================= */

export default function Header({
  overlay = false,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* =======================================================
     OPEN / CLOSE MENU
  ======================================================= */

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((current) => !current);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  /* =======================================================
     LOCK BODY SCROLL
  ======================================================= */

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  /* =======================================================
     CLOSE MENU WHEN MOVING TO DESKTOP
     
     Desktop breakpoint = 1024px
  ======================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =======================================================
     HANDLE NAVIGATION CLICK
  ======================================================= */

  const handleNavigationClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      {/* =====================================================
          HEADER

          IMPORTANT:
          The header itself is transparent.

          The WHITE rounded navigation card sits above
          the first section.

          Because the header is fixed, the first section
          can start at y = 0 and remain visible behind it.
      ===================================================== */}

      <header
        className={`
          fixed
          inset-x-0
          top-[22px]
          z-[1000]
          w-full

          px-[12px]

          sm:px-[16px]

          lg:pt-[0]

          ${overlay ? "bg-transparent" : ""}
        `}
      >
        {/* ===================================================
            HEADER CONTAINER
        ==================================================== */}

        <div
          className="
            relative
            mx-auto
            w-full

            max-w-[1328px]
          "
        >
          {/* =================================================
              HEADER BAR
          ================================================= */}

          <div
            className="
              relative

              flex
              h-[64px]
              w-full
              items-center

              rounded-[12px]

              border
              border-[#F6F6F6]

              bg-white

              pl-[16px]
              pr-[12px]

              shadow-[2px_2px_8.2px_0_#97979714]

              sm:h-[68px]
              sm:rounded-[14px]
              sm:pl-[20px]
              sm:pr-[16px]

              md:h-[70px]
              md:rounded-[16px]
              md:pl-[24px]
              md:pr-[20px]

              lg:h-[66px]
              lg:rounded-[var(--radius-md)]
              lg:border
              lg:border-[var(--color-border)]
              lg:bg-white/90
              lg:px-[12px]
              lg:shadow-[var(--shadow-card)]
              lg:backdrop-blur-xl

              xl:h-[68px]
            "
          >
            {/* =================================================
                LOGO
            ================================================= */}

            <Link
              href="/"
              aria-label="MealEats home"
              onClick={handleNavigationClick}
              className="
                relative
                z-[2]

                flex
                h-[42px]
                w-[94px]
                shrink-0
                items-center

                touch-manipulation

                focus-visible:rounded-[var(--radius-sm)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--color-accent)]
                focus-visible:ring-offset-2

                sm:h-[46px]
                sm:w-[102px]

                md:h-[48px]
                md:w-[108px]

                lg:h-[48px]
                lg:w-[108px]

                xl:h-[64px]
                xl:w-[94px]
              "
            >
              <Image
                src={LOGO}
                alt="MealEats"
                width={312}
                height={140}
                priority
                draggable={false}
                className="
                  block
                  h-full
                  w-full
                  select-none
                  object-contain
                  object-left
                "
              />
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION

                Only visible at 1024px+
            ================================================= */}

            <nav
              aria-label="Main navigation"
              className="
                absolute
                left-1/2

                hidden

                -translate-x-1/2

                items-center

                lg:flex
              "
            >
              <div
                className="
                  flex
                  items-center

                  gap-[14px]

                  xl:gap-[26px]

                  2xl:gap-[32px]
                "
              >
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavigationClick}
                    className="
                      group
                      relative
                      whitespace-nowrap

                      px-[8px]
                      py-[8px]

                      font-primary
                      text-[13px]
                      font-medium
                      leading-none
                      tracking-[-0.01em]

                      text-[var(--color-secondary)]

                      transition-colors
                      duration-200
                      ease-out

                      hover:text-[var(--color-accent)]

                      focus-visible:rounded-[var(--radius-sm)]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[var(--color-accent)]
                      focus-visible:ring-offset-2

                      xl:text-[14px]
                    "
                  >
                    {item.label}

                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none

                        absolute
                        bottom-[3px]
                        left-1/2

                        h-px
                        w-0

                        -translate-x-1/2

                        bg-[var(--color-accent)]

                        transition-[width]
                        duration-200
                        ease-out

                        group-hover:w-[calc(100%-16px)]
                      "
                    />
                  </Link>
                ))}
              </div>
            </nav>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div
              className="
                ml-auto

                flex
                shrink-0
                items-center

                gap-[10px]

                sm:gap-[12px]

                md:gap-[14px]

                lg:gap-0
              "
            >
              {/* =================================================
                  DESKTOP CTA

                  Only visible at 1024px+
              ================================================= */}

              <Link
                href="/ai"
                onClick={handleNavigationClick}
                className="
                  hidden

                  h-[38px]
                  min-w-[124px]

                  items-center
                  justify-center
                  gap-[7px]

                  rounded-full

                  bg-primary-gradient

                  px-[18px]

                  font-primary
                  text-[14px]
                  font-normal
                  leading-none

                  !text-primary

                  shadow-[var(--shadow-button)]

                  transition-[filter,box-shadow,transform]
                  duration-200
                  ease-out

                  hover:brightness-[0.95]

                  active:scale-[0.98]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--color-accent)]
                  focus-visible:ring-offset-2

                  lg:flex

                  xl:h-[40px]
                  xl:min-w-[136px]
                  xl:px-[20px]
                  xl:text-[14px]
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    flex
                    h-[16px]
                    w-[16px]
                    shrink-0
                    items-center
                    justify-center

                    text-[17px]
                    leading-none
                    text-primary
                  "
                >
                  <Image src='https://res.cloudinary.com/gppcmjpt/image/upload/v1787398839/tryaistar.png' alt="ai-platform-stars" height={20} width={20} className="h-[20px] w-[20px] object-contain mr-[2.8px]" />
                </span>

                <span>Try Meal Eats AI</span>
              </Link>

              {/* =================================================
                  MOBILE + TABLET CTA

                  Visible below 1024px
              ================================================= */}

              <Link
                href="/ai"
                onClick={handleNavigationClick}
                className="
                  flex

                  h-[40px]
                  min-w-[112px]

                  shrink-0

                  items-center
                  justify-center
                  gap-[5px]

                  rounded-full

                  bg-primary-gradient

                  px-[10px]

                  font-primary
                  text-[14px]
                  font-normal
                  leading-none

                  !text-primary

                  shadow-[var(--shadow-button)]

                  transition-[filter,transform,box-shadow]
                  duration-200
                  ease-out

                  hover:brightness-[0.95]

                  active:scale-[0.98]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--color-accent)]
                  focus-visible:ring-offset-2

                  touch-manipulation

                  max-[359px]:hidden

                  lg:hidden

                  sm:h-[42px]
                  sm:min-w-[120px]
                  max-[768px]:px-[24px]
                  sm:text-[13px]

                  md:h-[44px]
                  md:min-w-[128px]
                  md:px-[24px]
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    flex
                    h-[17px]
                    w-[17px]
                    shrink-0
                    items-center
                    justify-center

                    text-[18px]
                    leading-none
                    text-primary

                    sm:h-[18px]
                    sm:w-[18px]
                    sm:text-[19px]
                  "
                >
                  <Image src='https://res.cloudinary.com/gppcmjpt/image/upload/v1787398839/tryaistar.png' alt="ai-platform-stars" height={20} width={20} className="h-[20px] w-[20px] object-contain mr-[2.8px]" />
                </span>

                <span className="whitespace-nowrap">
                  Try Meal Eats AI
                </span>
              </Link>

              {/* =================================================
                  MOBILE + TABLET HAMBURGER

                  Visible below 1024px
              ================================================= */}

              <button
                type="button"
                aria-label={
                  isMenuOpen
                    ? "Close navigation"
                    : "Open navigation"
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  toggleMenu();
                }}
                className="
                  relative
                  z-[20]

                  flex

                  h-[40px]
                  w-[40px]

                  shrink-0

                  cursor-pointer

                  items-center
                  justify-center

                  touch-manipulation
                  select-none

                  rounded-[10px]

                  border-0
                  bg-transparent

                  p-0

                  text-inherit

                  transition-transform
                  duration-200
                  ease-out

                  active:scale-[0.94]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--color-accent)]
                  focus-visible:ring-offset-2

                  lg:hidden

                  sm:h-[42px]
                  sm:w-[42px]

                  md:h-[44px]
                  md:w-[44px]
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    relative
                    block

                    h-[20px]
                    w-[25px]

                    sm:h-[21px]
                    sm:w-[26px]

                    md:h-[22px]
                    md:w-[27px]
                  "
                >
                  {/* TOP LINE */}

                  <span
                    className={`
                      absolute
                      left-0

                      h-[2px]
                      w-full

                      rounded-full

                      bg-[var(--color-secondary)]

                      transition-all
                      duration-200
                      ease-out

                      ${
                        isMenuOpen
                          ? "top-1/2 -translate-y-1/2 rotate-45"
                          : "top-0"
                      }
                    `}
                  />

                  {/* MIDDLE LINE */}

                  <span
                    className={`
                      absolute
                      left-0
                      top-1/2

                      h-[3px]
                      w-full

                      -translate-y-1/2

                      rounded-full

                      bg-[var(--color-secondary)]

                      transition-all
                      duration-200
                      ease-out

                      ${
                        isMenuOpen
                          ? "scale-x-0 opacity-0"
                          : "scale-x-100 opacity-100"
                      }
                    `}
                  />

                  {/* BOTTOM LINE */}

                  <span
                    className={`
                      absolute
                      left-0

                      h-[2.5px]
                      w-full

                      rounded-full

                      bg-[var(--color-secondary)]

                      transition-all
                      duration-200
                      ease-out

                      ${
                        isMenuOpen
                          ? "bottom-1/2 translate-y-1/2 -rotate-45"
                          : "bottom-0"
                      }
                    `}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE + TABLET MENU LAYER

          Active below 1024px
      ===================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-[2000]

          lg:hidden

          ${
            isMenuOpen
              ? "pointer-events-auto visible"
              : "pointer-events-none invisible"
          }
        `}
        aria-hidden={!isMenuOpen}
      >
        {/* ===================================================
            BACKDROP
        ==================================================== */}

        <button
          type="button"
          aria-label="Close navigation"
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={closeMenu}
          className={`
            absolute
            inset-0

            w-full

            border-0
            p-0

            bg-black/10

            transition-opacity
            duration-200

            ${
              isMenuOpen
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        />

        {/* ===================================================
            MENU PANEL
        ==================================================== */}

        <div
          className={`
            absolute

            left-[12px]
            right-[12px]

            top-[78px]

            sm:left-[16px]
            sm:right-[16px]
            sm:top-[82px]

            md:left-[24px]
            md:right-[24px]
            md:top-[92px]

            ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0"
            }

            transition-[transform,opacity]
            duration-200
            ease-out
          `}
        >
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="
              relative

              mx-auto
              w-full

              overflow-hidden

              rounded-[18px]

              border
              border-[var(--color-border)]

              bg-white

              p-[8px]

              shadow-[0_20px_50px_rgba(0,0,0,0.15)]

              touch-manipulation

              sm:max-w-[520px]

              md:max-w-[600px]
            "
          >
            {/* =================================================
                NAVIGATION LINKS
            ================================================= */}

            <div className="flex flex-col gap-[2px]">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigationClick}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="
                    flex
                    min-h-[48px]
                    w-full

                    cursor-pointer

                    items-center

                    rounded-[12px]

                    px-[14px]
                    py-[12px]

                    font-primary
                    text-[15px]
                    font-medium
                    leading-none

                    text-[var(--color-secondary)]

                    touch-manipulation

                    transition-colors
                    duration-200

                    hover:bg-[var(--color-surface-light)]
                    hover:text-[var(--color-accent)]

                    active:bg-[var(--color-surface-light)]

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--color-accent)]
                    focus-visible:ring-inset

                    sm:min-h-[50px]
                    sm:px-[16px]

                    md:min-h-[52px]
                    md:px-[18px]
                    md:text-[16px]
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* =================================================
                MENU CTA
            ================================================= */}

            <Link
              href="/ai"
              onClick={handleNavigationClick}
              tabIndex={isMenuOpen ? 0 : -1}
              className="
                mt-[8px]

                flex
                h-[48px]
                w-full

                cursor-pointer

                items-center
                justify-center
                gap-[8px]

                rounded-full

                bg-primary-gradient

                px-[20px]

                font-primary
                text-[14px]
                font-medium
                leading-none

                !text-primary

                shadow-[var(--shadow-button)]

                transition-[filter,transform]
                duration-200

                hover:brightness-[0.95]

                active:scale-[0.98]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--color-accent)]
                focus-visible:ring-offset-2

                touch-manipulation

                sm:h-[50px]

                md:h-[52px]
                md:text-[15px]
              "
            >
              <span
                aria-hidden="true"
                className="
                  flex
                  h-[18px]
                  w-[18px]
                  shrink-0
                  items-center
                  justify-center

                  text-[19px]
                  leading-none
                  text-primary
                "
              >
                ✧
              </span>

              <span>Try Meal Eats AI</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* =====================================================
          HEADER SPACER

          NORMAL PAGES ONLY

          When overlay=true, this spacer disappears so the
          first section begins behind the header.

          This is the key fix.
      ===================================================== */}

      {!overlay && (
        <div
          aria-hidden="true"
          className="
            h-[94px]

            sm:h-[96px]

            md:h-[104px]

            lg:h-[104px]
          "
        />
      )}
    </>
  );
}