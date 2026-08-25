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
import SmartFoodPlanning from "@/src/components/storefront/landing-page/SmartFoodPlanning";
import MealPlanShoppingList from "@/src/components/storefront/landing-page/MealPlanShoppingList";
import LessGuessingSection from "@/src/components/storefront/landing-page/LessGuessingSection";
import FoodDecisionCTA from "@/src/components/storefront/landing-page/FoodDecisionCTA";
import MoreWeUnderstand from "@/src/components/storefront/landing-page/MoreWeUnderstand";


export default function LandingPage() {
  return (
    <main className="min-h-screen ">
    

      <Hero />
      <HealthFeatures />
      <Benefits />
      <HowItWorks />
      <GeneralChatbot />
      <Capabilities />
      <PopularCategories />
      <SmartFoodPlanning />
      <MealPlanShoppingList/>
      <LessGuessingSection />

      <MoreWeUnderstand />
      <FoodDecisionCTA />
      <FAQ />
      

   
    </main>
  );
}