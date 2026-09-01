import {
  AIPlatformHero,
  EverythingYouNeed,
  GrowthRecommendations,
  ProgressTracking,
  HealthAssistant,
  WhatMakesUsDifferent,
  ClinicalCare,
  Testimonials,
} from "@/src/components/storefront/ai-platform";

export default function AIPlatformPage() {
  return (
    <main>
      <AIPlatformHero />
      <div className="max-[767px]:bg-[#1674010A] max-[767px]:pt-[21px] max-[767px]:pb-[39px]">
        <EverythingYouNeed />
      <GrowthRecommendations />
      <ProgressTracking />
      </div>
      <HealthAssistant />
      <WhatMakesUsDifferent />
      <ClinicalCare />
    </main>
  );
}