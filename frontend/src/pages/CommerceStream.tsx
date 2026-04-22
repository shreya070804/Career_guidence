import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, LineChart, Building2, Briefcase, GraduationCap, Banknote, PenTool, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import { useBookmarks } from "@/contexts/BookmarkContext";
import DownloadRoadmapButton from "@/components/DownloadRoadmapButton";

const commerceSteps = [
  { title: "Choose Commerce in 10+2", description: "Focus on Accountancy, Economics, and Business Studies in Class 11 & 12. Selecting Mathematics as an elective is highly recommended for finance careers.", badge: "Foundation" },
  { title: "Undergraduate Degree", description: "Enroll in B.Com (Hons), BBA, or BMS to build core business knowledge.", badge: "Undergraduate" },
  { title: "Professional Certifications", description: "Register for CA, CS, or CMA if pursuing professional accounting or secretarial roles.", badge: "Certification" },
  { title: "Corporate Exposure", description: "Gain internships in finance, audit, or marketing departments to understand corporate workflows.", badge: "Industry" },
  { title: "Specialization", description: "Pursue an MBA or CFA to accelerate into senior management and high finance roles.", badge: "Goal" }
];

const CommerceStream = () => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const streamId = "commerce-stream";

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-12 py-8">
        <header>
          <Link to="/careers-after-10th" className="inline-flex items-center text-sm font-semibold text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Streams
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-2xl flex items-center justify-center shadow-sm">
                <Calculator className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-extrabold text-foreground tracking-tight leading-tight">Commerce Stream</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <DownloadRoadmapButton 
                careerName="Commerce Stream"
                description="The Commerce stream builds a strong foundation in finance, economics, business management, and accounting. It is most suitable for students interested in the corporate world, banking, and financial markets."
                steps={commerceSteps}
                skills={["Numerical Ability", "Economic Reasoning", "Financial Analysis", "Business Communication", "Attention to Detail", "Commercial Awareness"]}
                educationPath={[
                  { title: "B.Com / B.Com (Hons)", description: "The most popular 3-year degree focused on accounting and finance." },
                  { title: "BBA / BMS", description: "3-year management degrees for aspiring business leaders." },
                  { title: "Eco (Hons)", description: "A prestigious 3-year quantitative degree focused on economic policy and statistics." }
                ]}
                exams={[
                  { title: "CA Foundation", description: "The entry point for Chartered Accountancy." },
                  { title: "CUET", description: "Common University Entrance Test for top central universities." },
                  { title: "IPMAT", description: "Entrance for Integrated Management programs at IIMs." }
                ]}
              />
              <Button
                variant="outline"
                size="lg"
                className={`rounded-full gap-2 font-bold h-14 px-8 border-2 transition-all ${isBookmarked(streamId) ? "text-rose-500 border-rose-200 bg-rose-50" : "hover:border-primary hover:text-primary"}`}
                onClick={() => {
                  if (isBookmarked(streamId)) {
                    removeBookmark(streamId);
                  } else {
                    addBookmark({
                      id: streamId,
                      type: 'career',
                      title: 'Commerce Stream',
                      description: 'Insights into finance, business, and corporate career paths.',
                      category: 'Commerce Stream',
                      path: '/careers/commerce'
                    });
                  }
                }}
              >
                <Heart className={`w-5 h-5 ${isBookmarked(streamId) ? "fill-current" : ""}`} />
                {isBookmarked(streamId) ? "Saved" : "Save Stream"}
              </Button>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Commerce stream is the gateway to the corporate world. It builds a strong foundation in finance, economics, business management, and accounting, paving the way for lucrative and dynamic careers in global markets.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <GraduationCap className="text-green-500 w-6 h-6"/>
            Core Subjects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-green-500">
              <CardHeader className="pb-2">
                <Calculator className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">Accountancy</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">The art of recording, classifying, and summarizing financial transactions.</p></CardContent>
            </Card>
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-teal-500">
              <CardHeader className="pb-2">
                <LineChart className="w-8 h-8 text-teal-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">Economics</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Understanding production, consumption, and wealth transfer.</p></CardContent>
            </Card>
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-emerald-500">
              <CardHeader className="pb-2">
                <Building2 className="w-8 h-8 text-emerald-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">Business Studies</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Principles of management, marketing, and corporate organization.</p></CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-card p-8 rounded-3xl border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Briefcase className="text-green-600 dark:text-green-400 w-6 h-6"/>
            Top Career Options
          </h2>
          <div className="grid gap-6">
            <div className="flex gap-4 items-center p-6 border border-border bg-card hover:bg-muted/50 rounded-[2rem] transition-all group">
              <div className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 p-4 rounded-2xl group-hover:scale-110 transition-transform"><Calculator className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-black text-foreground text-xl">Chartered Accountant (CA)</h3>
                <p className="text-muted-foreground font-medium">Expert in auditing, taxation, financial advising, and corporate accounting.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-6 border border-border bg-card hover:bg-muted/50 rounded-[2rem] transition-all group">
              <div className="bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 p-4 rounded-2xl group-hover:scale-110 transition-transform"><Banknote className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-black text-foreground text-xl">Banker / Investment Banker</h3>
                <p className="text-muted-foreground font-medium">Managing financial portfolios, banking operations, and capital raising.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-6 border border-border bg-card hover:bg-muted/50 rounded-[2rem] transition-all group">
              <div className="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 p-4 rounded-2xl group-hover:scale-110 transition-transform"><LineChart className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-black text-foreground text-xl">Business Analyst / Consultant</h3>
                <p className="text-muted-foreground font-medium">Evaluating business models, market trends, and strategic planning.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <PenTool className="text-green-600 dark:text-green-400 w-6 h-6"/> Key Professional Exams
          </h2>
          <div className="flex flex-wrap gap-3">
            {["CA Foundation", "CS", "CMA", "CUET", "IPMAT"].map((exam) => (
              <span key={exam} className="px-6 py-3 bg-muted text-foreground rounded-full font-semibold shadow-sm border border-border">
                {exam}
              </span>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default CommerceStream;
