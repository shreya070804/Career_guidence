import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, GraduationCap, PenTool, TrendingUp, Users, PieChart, Landmark, BookOpen, Search, Target, Globe, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import CareerRoadmap from "@/components/CareerRoadmap";
import { useBookmarks } from "@/contexts/BookmarkContext";
import DownloadRoadmapButton from "@/components/DownloadRoadmapButton";

const managementSteps = [
  {
    title: "10+2 Education (Any Stream)",
    description: "Commerce students often have a head start, but students from Science and Arts streams are equally welcome in top management programs.",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
    badge: "Flexible Start"
  },
  {
    title: "Undergraduate Entrance Exams",
    description: "Appear for IPMAT (IIMs), NPAT (NMIMS), or CUET for prestigious central universities. These test your quantitative and verbal aptitude.",
    icon: Search,
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
    badge: "College Selection"
  },
  {
    title: "BBA / BMS / IPM Degree",
    description: "Pursue a 3-year BBA/BMS or a 5-year Integrated Programme in Management (IPM). Focus on marketing, finance, and human resource modules.",
    icon: GraduationCap,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
    badge: "Business Foundations"
  },
  {
    title: "Skills & Leadership Roles",
    description: "Develop soft skills like public speaking, negotiation, and strategic thinking. Lead student organizations and take up live business projects.",
    icon: Target,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
    badge: "Soft Skills"
  },
  {
    title: "Corporate Internships",
    description: "Secure internships in departments like Sales, HR, or Finance. Understanding organizational workflows is critical for a management career.",
    icon: Briefcase,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
    badge: "Work Experience"
  },
  {
    title: "MBA & Career Advancement",
    description: "Land a role as a Management Trainee or Analyst. Many professionals pursue an MBA (after CAT/GMAT) to accelerate into senior leadership roles.",
    icon: Globe,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
    badge: "Leadership Goal"
  }
];

const ManagementCareer = () => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const careerId = "mgmt-career";
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-16 py-12">
        <header>
          <Link to="/careers-after-12th" className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-[2rem] flex items-center justify-center shadow-lg ring-1 ring-inset ring-black/5">
                <Briefcase className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase">Management Career</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <DownloadRoadmapButton 
                careerName="Management"
                description="Management is the craft of leading people and strategic resources to achieve organizational goals. It is a highly versatile and high-growth professional domain."
                steps={managementSteps}
                skills={["Leadership", "Strategic Thinking", "Public Speaking", "Negotiation", "Financial Literacy", "Project Management"]}
                educationPath={[
                  { title: "BBA / BBM", description: "3-year comprehensive business administration or management foundation." },
                  { title: "BMS", description: "3-year core management studies specializing in theoretical frameworks." },
                  { title: "Integrated Programme in Management (IPM)", description: "5-year direct pathway to an MBA from top IIMs (Indore, Rohtak, Ranchi, etc.) right after Class 12." }
                ]}
                exams={[
                  { title: "IPMAT", description: "The premier gateway for IIM Integrated Management programs." },
                  { title: "NPAT", description: "Admission test for the top-ranked NMIMS business school." },
                  { title: "CUET", description: "Common portal for UG management seats in central universities." }
                ]}
              />
              <Button
                variant="outline"
                size="lg"
                className={`rounded-full gap-2 font-bold px-8 h-14 border-2 transition-all ${isBookmarked(careerId) ? "text-rose-500 border-rose-200 bg-rose-50" : "hover:border-primary hover:text-primary"}`}
                onClick={() => {
                  if (isBookmarked(careerId)) {
                    removeBookmark(careerId);
                  } else {
                    addBookmark({
                      id: careerId,
                      type: "career",
                      title: "Management",
                      description: "Step-by-step path to leadership and business roles.",
                      path: "/career/management",
                      category: "Core Career"
                    });
                  }
                }}
              >
                <Heart className={`w-5 h-5 ${isBookmarked(careerId) ? "fill-current" : ""}`} />
                {isBookmarked(careerId) ? "Saved to Profile" : "Save Pathway"}
              </Button>
            </div>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            Management is the craft of leading people and strategic resources to achieve organizational goals. It is a highly versatile and high-growth professional domain.
          </p>
        </header>

        <section className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm">
          <h2 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
            <GraduationCap className="text-purple-500 w-8 h-8"/>
            Academic Pathways
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-muted/30 border-none rounded-2xl p-6">
              <CardTitle className="text-lg font-bold mb-2">BBA / BBM</CardTitle>
              <p className="text-sm text-muted-foreground">3-year comprehensive business administration or management foundation.</p>
            </Card>
            <Card className="bg-muted/30 border-none rounded-2xl p-6">
              <CardTitle className="text-lg font-bold mb-2">BMS</CardTitle>
              <p className="text-sm text-muted-foreground">3-year core management studies specializing in theoretical frameworks.</p>
            </Card>
            <Card className="bg-muted/30 border-none rounded-2xl p-6 md:col-span-2">
              <CardTitle className="text-lg font-bold mb-2">Integrated Programme in Management (IPM)</CardTitle>
              <p className="text-sm text-muted-foreground">5-year direct pathway to an MBA from top IIMs (Indore, Rohtak, Ranchi, etc.) right after Class 12.</p>
            </Card>
          </div>
        </section>

        <CareerRoadmap
          steps={managementSteps}
          skills={[
            { name: "Financial Modelling & Valuation", level: "Advanced", type: "technical" },
            { name: "Business Analytics & Excel / Power BI", level: "Intermediate", type: "technical" },
            { name: "Marketing Strategy & Digital Marketing", level: "Intermediate", type: "technical" },
            { name: "Operations & Supply Chain Management", level: "Beginner", type: "technical" },
            { name: "CRM & ERP Systems (Salesforce / SAP)", level: "Beginner", type: "technical" },
            { name: "Leadership & People Management", level: "Advanced", type: "soft" },
            { name: "Strategic Negotiation", level: "Advanced", type: "soft" },
            { name: "Public Speaking & Presentations", level: "Intermediate", type: "soft" },
            { name: "Cross-Cultural Communication", level: "Intermediate", type: "soft" },
            { name: "Entrepreneurial Mindset", level: "Beginner", type: "soft" },
          ]}
          exams={[
            {
              name: "IPMAT",
              fullForm: "Integrated Programme in Management Aptitude Test",
              purpose: "Admission to the 5-year Integrated MBA at IIMs (Indore, Rohtak, Ranchi, Bodhgaya, Sirmaur).",
              difficulty: "High",
              timing: "After Class 12",
            },
            {
              name: "CAT",
              fullForm: "Common Admission Test",
              purpose: "Flagship MBA entrance for 20 IIMs and 1000+ B-schools. The gold standard of Indian management education.",
              difficulty: "Very High",
              timing: "After graduation (any stream)",
            },
            {
              name: "GMAT",
              fullForm: "Graduate Management Admission Test",
              purpose: "Global MBA admissions (Harvard, Wharton, ISB). Accepted by 7,700+ business programs worldwide.",
              difficulty: "High",
              timing: "After graduation / while working",
            },
            {
              name: "NPAT / CUET",
              fullForm: "NMIMS Programmes After Twelfth / Common University Entrance Test",
              purpose: "Admission to BBA and integrated management programs at top private and central universities.",
              difficulty: "Moderate",
              timing: "After Class 12",
            },
          ]}
          internships={[
            {
              role: "Summer Internship (SIP) — Corporate",
              where: "FMCG, Banking, Consulting & E-commerce firms (P&G, McKinsey, Amazon, HDFC)",
              duration: "2 months",
              focus: "Work on live business problems in Sales, Marketing, Finance, or Operations. SIP converts to a PPO (pre-placement offer) in many cases.",
            },
            {
              role: "Business Development / Sales Intern",
              where: "Startups, SMEs, or venture-funded companies",
              duration: "1–3 months",
              focus: "Lead generation, client pitching, and deal closure. Builds commercial acumen and negotiation confidence.",
            },
            {
              role: "Finance / Investment Banking Intern",
              where: "Banks, NBFCs, PE/VC firms (Kotak, ICICI, Sequoia)",
              duration: "2–4 months",
              focus: "Financial modelling, equity research, DCF analysis, and preparing pitch decks for capital raise or M&A deals.",
            },
          ]}
          jobs={[
            {
              title: "Management Trainee / Business Analyst",
              type: "Entry",
              salaryRange: "₹5–14 LPA",
              description: "Structured rotational program across business verticals. Rapid exposure to operations, sales, marketing, and strategy.",
            },
            {
              title: "Marketing Manager / Brand Manager",
              type: "Mid",
              salaryRange: "₹12–25 LPA",
              description: "Own P&L for a product line, manage campaigns, and drive market-share growth for brands across channels.",
            },
            {
              title: "Strategy Consultant (MBB)",
              type: "Mid",
              salaryRange: "₹18–40 LPA",
              description: "Work with C-suite clients at McKinsey, BCG, or Bain on corporate strategy, market entry, and operational efficiency.",
            },
            {
              title: "Vice President / General Manager",
              type: "Senior",
              salaryRange: "₹35–80 LPA",
              description: "Run entire divisions, manage large budgets, set long-term strategy, and report directly to the CEO or Board.",
            },
            {
              title: "Chief Executive Officer / Founder",
              type: "Senior",
              salaryRange: "₹80 L–5 Cr+ LPA",
              description: "Lead entire organizations or build a venture from scratch. The ultimate aspiration for management professionals.",
            },
          ]}
        />

        <section className="bg-card p-10 rounded-[2.5rem] border border-border shadow-sm">
          <h2 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
            <PenTool className="text-purple-500 w-8 h-8"/>
            Key Entry Exams
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground">IPMAT</h3>
              <p className="text-sm text-muted-foreground">The premier gateway for IIM Integrated Management programs.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground">NPAT</h3>
              <p className="text-sm text-muted-foreground">Admission test for the top-ranked NMIMS business school.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground">CUET</h3>
              <p className="text-sm text-muted-foreground">Common portal for UG management seats in central universities.</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
            <TrendingUp className="text-purple-500 w-9 h-9"/>
            Leadership Trajectories
          </h2>
          <div className="grid gap-6">
            <div className="flex gap-6 items-center p-8 bg-card border border-border rounded-[2rem] hover:shadow-lg transition-all group">
              <div className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 p-5 rounded-2xl group-hover:scale-110 transition-transform"><Users className="w-8 h-8" /></div>
              <div>
                <h3 className="font-black text-foreground text-2xl mb-2">HR Operations Lead</h3>
                <p className="text-muted-foreground font-medium text-lg">Managing global talent, organizational culture, and recruitment strategies.</p>
              </div>
            </div>
            <div className="flex gap-6 items-center p-8 bg-card border border-border rounded-[2rem] hover:shadow-lg transition-all group">
              <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 p-5 rounded-2xl group-hover:scale-110 transition-transform"><PieChart className="w-8 h-8" /></div>
              <div>
                <h3 className="font-black text-foreground text-2xl mb-2">Brand Strategy Manager</h3>
                <p className="text-muted-foreground font-medium text-lg">Crafting market narratives and driving consumer engagement for global brands.</p>
              </div>
            </div>
            <div className="flex gap-6 items-center p-8 bg-card border border-border rounded-[2rem] hover:shadow-lg transition-all group">
              <div className="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 p-5 rounded-2xl group-hover:scale-110 transition-transform"><Landmark className="w-8 h-8" /></div>
              <div>
                <h3 className="font-black text-foreground text-2xl mb-2">Equity Research Analyst</h3>
                <p className="text-muted-foreground font-medium text-lg">Advising businesses on capital investments and complex financial modeling.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default ManagementCareer;
