import KnowledgeHero from "@/src/components/storefront/knowlwdge-hub/KnowledgeHero";
import KnowledgeRecommendations from "@/src/components/storefront/knowlwdge-hub/KnowledgeRecommendations";
import KnowYourselfBetter from "@/src/components/storefront/knowlwdge-hub/KnowYourselfBetter";
import LearnSomethingToday from "@/src/components/storefront/knowlwdge-hub/LearnSomethingToday";
import QuestionsPeopleAsk from "@/src/components/storefront/knowlwdge-hub/QuestionsPeopleAsk";
import FAQ from "@/src/components/storefront/landing-page/FAQ";


export default function knowlwdgeHub() {
  return (
    <main id="main-content">
      {/* Knowledge Hub Hero */}
      <KnowledgeHero/>
      {/* Go Beyond Recommendations */}
      <KnowledgeRecommendations/>

      {/* Know Yourself Better */}
      <KnowYourselfBetter/>

      {/* Learn Something That Helps You Today */}
      <LearnSomethingToday />
      <QuestionsPeopleAsk />
    </main>
  );
}