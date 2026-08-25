import KnowledgeHero from "./KnowledgeHero";
import KnowledgeRecommendations from "./KnowledgeRecommendations";
import KnowYourselfBetter from "./KnowYourselfBetter";
import LearnSomethingToday from "./LearnSomethingToday";

export const metadata = {
  title: "Knowledge Hub | MealEats",
  description:
    "Understand nutrition, exercise, health decisions, and the reasoning behind personalized MealEats recommendations.",
};

export default function KnowledgeHubPage() {
  return (
    <main id="main-content">
      <KnowledgeHero />
      <KnowledgeRecommendations />
      <KnowYourselfBetter />
      <LearnSomethingToday />
    </main>
  );
}
