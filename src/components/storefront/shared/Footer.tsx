"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

/* =========================================================
   DATA
========================================================= */

const shopLinks: FooterLink[] = [
  {
    label: "Recruitment",
    href: "/recruitment",
  },
  {
    label: "Training",
    href: "/training",
  },
  {
    label: "Productivity",
    href: "/productivity",
  },
  {
    label: "Optimization",
    href: "/optimization",
  },
  {
    label: "Security",
    href: "/security",
  },
];

const policyLinks: FooterLink[] = [
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
  {
    label: "Refund & Return Policy",
    href: "/refund-return-policy",
  },
  {
    label: "Shipping Policy",
    href: "/shipping-policy",
  },
  {
    label: "FAQs",
    href: "/faqs",
  },
];

/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div className="min-w-0">
      <h3
        className="
          font-primary
          !text-[23px]
          font-medium
          leading-[31px]
          tracking-[-3%]
          text-[var(--color-secondary)]
        "
      >
        {title}
      </h3>

      <nav
        aria-label={`${title} links`}
        className="
          mt-[9px]
          flex
          min-w-0
          flex-col
          gap-[0px]

          min-[400px]:mt-[12px]
          min-[400px]:gap-[7px]

          sm:mt-[11px]
         

          md:mt-[12px]
         

          lg:mt-[13px]
          

          xl:mt-[14px]
          
        "
      >
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="
              block
              min-w-0
              max-w-full
              overflow-hidden
              text-ellipsis
              whitespace-nowrap

              font-primary
              !text-[16px]
              font-normal
              leading-[24px]
              tracking-[-2%]
              text-[var(--color-text-muted)]
              transition-opacity
              duration-[var(--transition-fast)]

              hover:opacity-60

              focus-visible:outline-none
              focus-visible:ring-1
              focus-visible:ring-[var(--color-accent)]
              focus-visible:ring-offset-1
            "
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

/* =========================================================
   CONTACT ITEM
========================================================= */

function ContactItem({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className="
        flex
        min-w-0
        items-start
        gap-[7px]

        min-[400px]:gap-[9px]

        sm:gap-[8px]
        md:gap-[9px]
        lg:gap-[10px]
      "
    >
      <span
        aria-hidden="true"
        className="
          mt-[2px]
          flex
          h-[20px]
          w-[20px]
          shrink-0
          items-center
          justify-center
          text-[var(--color-text)]

          min-[400px]:h-[20px]
          min-[400px]:w-[20px]

          sm:h-[14px]
          sm:w-[14px]
          md:h-[14px]
          md:w-[14px]
          lg:h-[14px]
          lg:w-[14px]
        "
      >
        {icon}
      </span>

      <div
        className="
          min-w-0
          max-w-full
          break-words

          font-primary
          !text-[16px]
          font-normal
          leading-[120%]
          tracking-[-2%]
          text-[var(--color-text-muted)]
        "
      >
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   SOCIAL ICONS
========================================================= */

function FacebookIcon() {
  return (
    <Image src='/instagram (2).png' alt="facebook" className='h-[24px] w-[24px]' height={24} width={24} />
  );
}

function LinkedInIcon() {
  return (
    <Image src='/linkdin (2).png' alt="facebook" className='h-[24px] w-[24px]' height={24} width={24} />
  );
}

function InstagramIcon() {
  return (
    <Image src='/facebook (2).png' alt="facebook" className='h-[24px] w-[24px]' height={24} width={24} />
  );
}

/* =========================================================
   SOCIAL LINKS
========================================================= */

function SocialLinks() {
  const socialLinks = [
    {
      label: "Instagram",
      href: "",
      icon: InstagramIcon,
    },
    {
      label: "LinkedIn",
      href: "",
      icon: LinkedInIcon,
    },
     {
      label: "Facebook",
      href: "",
      icon: FacebookIcon,
    },
  ];

  return (
    <nav
      aria-label="Social media"
      className="
        flex
        shrink-0
        items-center
        gap-[8px]

        min-[400px]:gap-[18px]

        sm:gap-[10px]
        md:gap-[11px]
        lg:gap-[12px]
      "
    >
      {socialLinks.map((social) => {
        const Icon = social.icon;

        return (
          <a
            key={social.label}
            href={social.href || undefined}
            aria-label={social.label}
            aria-disabled={!social.href}
            tabIndex={social.href ? 0 : -1}
            onClick={
              !social.href
                ? (event) => event.preventDefault()
                : undefined
            }
            className="
              flex
              !h-[30px]
              !w-[30px]
              shrink-0
              items-center
              justify-center
              rounded-full

              text-[var(--color-text-muted)]

              min-[400px]:!h-[32px]
              min-[400px]:!w-[32px]

              sm:!h-icon-md
              sm:!w-icon-md

              transition-[color,transform]
              duration-[var(--transition-fast)]

              hover:-translate-y-px
              hover:text-[var(--color-secondary)]

              focus-visible:outline-none
              focus-visible:ring-1
              focus-visible:ring-[var(--color-accent)]
              focus-visible:ring-offset-1
            "
          >
            <span
              className="
                block
                h-full
                w-full
              "
            >
              <Icon />
            </span>
          </a>
        );
      })}
    </nav>
  );
}

/* =========================================================
   BRAND
========================================================= */

function FooterBrand() {
  return (
    <div
      className="
        min-w-0

        text-center
      "
    >
      <a
        href="/"
        aria-label="Meal Eats home"
        className="
          inline-flex
          max-w-full
          items-start
          !justify-start
          
          min-[400px]:justify-start

          focus-visible:outline-none
          focus-visible:ring-1
          focus-visible:ring-[var(--color-accent)]
          focus-visible:ring-offset-1
          !w-full
        "
      >
        <Image
          src="https://res.cloudinary.com/gppcmjpt/image/upload/v1787377132/mealeats/products/mealeats.png"
          alt="Meal Eats"
          width={190}
          height={100}
          priority
          className="
            block
            h-auto
            w-[120px]
            !mr-auto
            max-w-full
            object-contain
            object-left

            lg:w-[120px]

           max-[768px]:!w-[111px]
           max-[768px]:!mx-auto
          "
        />
      </a>

      <p
        className="
          mt-[12px]
          w-full
          max-w-[100%]
           min-[400px]:text-left
          font-primary
          !text-[16px]
          font-normal
          leading-[1.48]
          tracking-[-0.008em]
          text-[var(--color-text-muted)]

          min-[400px]:mt-[12px]
          min-[400px]:max-w-[420px]

          sm:mt-[11px]
          sm:max-w-[330px]
          sm:!text-[16px]

          md:mt-[12px]
          md:max-w-[300px]
          md:!text-[16px]

          lg:mt-[14px]
          lg:max-w-[320px]
          lg:!text-[16px]

          xl:mt-[15px]
          xl:max-w-[350px]
          xl:!text-[16px]
          !text-left
        "
      >
        Meal Eats is building a personalized food intelligence platform designed to help people understand their food, discover what to cook, plan ahead and make smarter everyday food decisions.
      </p>
    </div>
  );
}

/* =========================================================
   CONTACT
========================================================= */

function FooterContact() {
  return (
    <div className="min-w-0">
      <h3
        className="
          font-primary
          !text-[23px]
          font-medium
          leading-[31px]
          tracking-[-3%]
          text-[var(--color-secondary)]

         
        "
      >
        Contact
      </h3>

      <div
        className="
          mt-[12px]
          flex
          min-w-0
          flex-col
          gap-[14px]

          min-[400px]:mt-[14px]
          min-[400px]:gap-[16px]

          sm:mt-[12px]
          sm:gap-[11px]

          md:mt-[13px]
          md:gap-[12px]

          lg:mt-[14px]
          lg:gap-[13px]

          xl:mt-[15px]
          xl:gap-[14px]
        "
      >
        <ContactItem
          icon={
            <MapPin
              className="h-full w-full"
              strokeWidth={1.7}
            />
          }
        >
          SF 274, Gaur City Centre,
          <br />
          Greater Noida West,
          <br />
          Gautam Budh Nagar,
          <br />
          Uttar Pradesh
        </ContactItem>

        <ContactItem
          icon={
            <Mail
              className="h-full w-full"
              strokeWidth={1.7}
            />
          }
        >
          <a
            href="mailto:info@meal-eats.com"
            className="
              break-all
              transition-opacity
              duration-[var(--transition-fast)]
              hover:opacity-60
            "
          >
            info@meal-eats.com
          </a>

          <br />

          <a
            href="mailto:support@meal-eats.com"
            className="
              break-all
              transition-opacity
              duration-[var(--transition-fast)]
              hover:opacity-60
            "
          >
            support@meal-eats.com
          </a>
        </ContactItem>

        <ContactItem
          icon={
            <Phone
              className="h-full w-full"
              strokeWidth={1.7}
            />
          }
        >
          <a
            href="tel:+919818804597"
            className="
              break-all
              transition-opacity
              duration-[var(--transition-fast)]
              hover:opacity-60
            "
          >
            +91-9818804597
          </a>
        </ContactItem>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN FOOTER
========================================================= */

function FooterMain() {
  return (
    <section className="w-full bg-[var(--color-primary)]">
      <div
        className="
          mx-auto
          w-full
          max-w-full

       
          pt-[22px]
          pb-[30px]

       
          min-[400px]:pt-[24px]
          min-[400px]:pb-[30px]

        
          sm:pt-[36px]
          sm:pb-[28px]

          md:pt-[40px]
          md:pb-[30px]

         
          lg:pt-[46px]
          lg:pb-[34px]

       lg:px-[56px]
        xl:px-[56px]
        max-[768px]:px-[16px]
          xl:pt-[52px]
          xl:pb-[38px]
        "
      >
        <div
          className="
            grid
            min-w-0
            items-start

            /*
             * MOBILE:
             * Brand first
             * Shop + Policies side by side
             * Contact full width below
             */
            grid-cols-1
            gap-y-[28px]

            min-[400px]:grid-cols-2
            min-[400px]:gap-x-[20px]
            min-[400px]:gap-y-[28px]

            sm:grid-cols-2
            sm:gap-x-[40px]
            sm:gap-y-[34px]

            md:grid-cols-[1.45fr_.74fr_.84fr_1.38fr]
            md:gap-x-[30px]
            md:gap-y-0

            lg:grid-cols-[1.52fr_.72fr_.82fr_1.4fr]
            lg:gap-x-[45px]

            xl:grid-cols-[1.58fr_.74fr_.84fr_1.44fr]
            xl:gap-x-[55px]
          "
        >
          {/* =================================================
              BRAND
          ================================================= */}

          <div
            className="
              min-w-0

              col-span-1

              min-[400px]:col-span-2

              sm:col-span-2

              md:col-span-1
            "
          >
            <FooterBrand />
          </div>

          {/* =================================================
              SHOP
          ================================================= */}

          <div
            className="
              min-w-0

              col-span-1
            "
          >
            <FooterColumn
              title="Shop"
              links={shopLinks}
            />
          </div>

          {/* =================================================
              POLICIES
          ================================================= */}

          <div
            className="
              min-w-0

              col-span-1
            "
          >
            <FooterColumn
              title="Policies"
              links={policyLinks}
            />
          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div
            className="
              min-w-0

              col-span-1

              min-[400px]:col-span-2

              sm:col-span-2

              md:col-span-1
            "
          >
            <FooterContact />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   UTILITY FOOTER
========================================================= */

function FooterUtility() {
  return (
    <section className="w-full bg-[var(--color-primary)]">
      <div
        className="
          mx-auto
          w-full
          max-w-full

      
          pb-[25px]

          min-[400px]:px-[18px]
          min-[400px]:pb-[26px]

  
          sm:pb-[25px]

          md:px-[40px]
          md:pb-[28px]

        
          lg:pb-[31px]

          xl:pb-[34px]
          max-[768px]:!p-0
        "
      >
        {/* Divider */}
        <div
          aria-hidden="true"
          className="
            hidden
            h-px
            w-full
            bg-[var(--color-border-light)]

            sm:block
          "
        />

        {/* =================================================
            MOBILE UTILITY
        ================================================= */}

        <div
          className="
            flex
            flex-col
            items-center
            justify-center

            sm:hidden
          "
        >
          <div className="border-[1px] border-[#E3E3E3] max-w-[95%] w-full mx-auto my-[24px]"></div>
          {/* Social icons */}
          <div className="flex justify-center">
            <SocialLinks />
          </div>

           

          {/* Legal links */}
          <nav
            aria-label="Legal links"
            className="
              mt-[22px]
              flex
              items-center
              justify-center
              gap-[50px]
            "
          >
            <Link
              href="/privacy-policy"
              className="
                font-primary
                text-[14px]
                font-normal
                leading-[1.3]
                tracking-[-0.01em]
                text-[var(--color-text-muted)]
                transition-opacity
                hover:opacity-60
              "
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-of-use"
              className="
                font-primary
                text-[14px]
                font-normal
                leading-[1.3]
                tracking-[-0.01em]
                text-[var(--color-text-muted)]
                transition-opacity
                hover:opacity-60
              "
            >
              Terms Of Use
            </Link>
          </nav>

          {/* Copyright */}
          <p
            className="
              mt-[20px]
              text-center

              font-primary
              text-[14px]
              font-normal
              leading-[1.3]
              tracking-[-0.008em]
              text-[var(--color-secondary)]
            "
          >
            © {new Date().getFullYear()} MealEats. All rights reserved.
          </p>
        </div>

        {/* =================================================
            DESKTOP UTILITY
            Existing desktop layout preserved
        ================================================= */}

        <div
          className="
            hidden

            sm:flex
            min-w-0
            items-center
            justify-between
            gap-[12px]
            pt-[9px]

            min-[400px]:pt-[10px]

            sm:pt-[11px]
            md:pt-[12px]
            lg:pt-[13px]
          "
        >
          <p
            className="
              min-w-0
              flex-1
              truncate

              font-primary
              text-[16px]
              font-normal
              leading-[1.3]
              tracking-[-0.008em]
              text-[var(--color-text-muted)]
            "
          >
            © {new Date().getFullYear()} MealEats. All rights reserved.
          </p>

         

          <SocialLinks />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   BOTTOM BRAND AREA
========================================================= */

function FooterBrandArea() {
  return (
    <section
      aria-label="Meal Eats"
      className="
        relative
        w-full
        min-h-[125px]
        overflow-hidden

        min-[360px]:min-h-[135px]

        min-[400px]:min-h-[145px]

        max-[768px]:min-h-[107px]

        md:min-h-[195px]

        lg:min-h-[225px]

        xl:min-h-[250px]
        bg-[linear-gradient(181.18deg,#FFFFFF_12.77%,#7BB322_97.78%)]
        opacity-[70%]
        xl

      "

    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          flex
          w-full
          justify-center

          px-[4px]
          pb-[10px]

          min-[360px]:px-[6px]
          min-[360px]:pb-[11px]

          min-[400px]:px-[8px]
          min-[400px]:pb-[12px]

          max-[768px]:!px-[0px]
          max-[768px]:!pb-[0px]

          md:px-[28px]
          md:pb-[18px]

          lg:px-[36px]
          lg:pb-[0px]

          xl:px-[44px]
          xl:pb-[0px]
        "
      >
        <span
          className="
            block
            max-w-full
            select-none
            overflow-visible
            whitespace-nowrap
            text-center
            opacity-[40%]
            !font-inter
            text-[clamp(53px,16.8vw,220px)]
            font-medium
            uppercase
            max-[768px]:text-[70px]
            max-[401px]:text-[62px]
            max-[349px]:text-[57px]
            leading-[65px]
            tracking-[1%]
            text-white
            lg:!mb-[53px]
            xl:!mb-[53px]
            
          "
        >
          MEAL EATS
        </span>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  return (
    <footer
      id="footer"
      className="
        relative
        w-full
        max-w-full
        overflow-hidden

        bg-[var(--color-primary)]
        text-[var(--color-text)]
      "
    >
      <FooterMain />

      <FooterUtility />

      <FooterBrandArea />
    </footer>
  );
}
