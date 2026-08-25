import CoreValues from "@/src/components/storefront/about/CoreValues";
import Hero from "@/src/components/storefront/about/Hero";
import MissionVision from "@/src/components/storefront/about/MissionVision";
import OurStory from "@/src/components/storefront/about/OurStory";
import PersonalHealth from "@/src/components/storefront/about/PersonalHealth";
import FAQ from "@/src/components/storefront/landing-page/FAQ";

export default function AboutPage() {
  return (
    <main className="max-w-[1328px]  w-full mx-auto overflow-x-clip bg-primary lg!mt-[0px]">
      {/* =====================================================
          ABOUT PAGE
      ===================================================== */}

      <Hero />

      <OurStory />

      {/* =====================================================
          PERSONAL HEALTH

          The left content inside this section is sticky.
          The right-side cards create the scrolling height.
      ===================================================== */}
      <PersonalHealth />

      <MissionVision />

      <CoreValues />

      <FAQ />
    </main>
  );
}