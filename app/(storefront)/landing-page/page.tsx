import TrustedCompanies from "@/src/components/storefront/landing-page/TrustedCompanies";
import Hero from "../../../src/components/storefront/landing-page/Hero";
import HealthFeatures from "@/src/components/storefront/landing-page/HealthFeatures";
import Benefits from "@/src/components/storefront/landing-page/Benefits";
import HowItWorks from "@/src/components/storefront/landing-page/HowItWorks";
import GeneralChatbot from "@/src/components/storefront/landing-page/GeneralChatbot";
import Capabilities from "@/src/components/storefront/landing-page/Capabilities";
import FAQ from "@/src/components/storefront/landing-page/FAQ";
import PopularCategories from "@/src/components/storefront/landing-page/PopularCategories";
import { Testimonials } from "@/src/components/storefront/ai-platform";


export default function LandingPage() {
  return (
    <main className="min-h-screen ">
    

      <Hero />
      <div className="max-[768px]:hidden">
        <TrustedCompanies />
      </div>
      <HealthFeatures />
      <Benefits />
      <HowItWorks />
      <GeneralChatbot />
      <Capabilities />
      <PopularCategories />
      <Testimonials />
      <FAQ />
      

   
    </main>
  );
}