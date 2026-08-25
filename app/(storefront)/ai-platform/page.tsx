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
      <EverythingYouNeed />
      <GrowthRecommendations />
      <ProgressTracking />
      <HealthAssistant />
      <WhatMakesUsDifferent />
      <ClinicalCare />
    </main>
  );
}