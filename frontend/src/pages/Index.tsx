import Hero from "@/components/Hero";
import CareerPaths from "@/components/CareerPaths";
import StreamOptions from "@/components/StreamOptions";
import StudentForm from "@/components/StudentForm";
import CTASection from "@/components/CTASection";
import PageLayout from "@/components/PageLayout";
import TrendingCareers from "@/components/TrendingCareers";
import SkillGapPreview from "@/components/SkillGapPreview";
import CollegeFinderCTA from "@/components/CollegeFinderCTA";

const Index = () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-12 md:gap-16 lg:gap-20 pb-16">
        <Hero />
        <CareerPaths />
        <TrendingCareers compact />
        <SkillGapPreview />
        <CollegeFinderCTA />
        <StreamOptions />
        <StudentForm />
        <CTASection />
      </div>
    </PageLayout>
  );
};

export default Index;
