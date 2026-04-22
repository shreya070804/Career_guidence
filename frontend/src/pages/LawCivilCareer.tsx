import { Link } from "react-router-dom";
import { ArrowLeft, Scale, GraduationCap, PenTool, Briefcase, Gavel, Landmark, Globe, BookOpen, Search, ShieldCheck, Award, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import CareerRoadmap from "@/components/CareerRoadmap";
import { useBookmarks } from "@/contexts/BookmarkContext";
import DownloadRoadmapButton from "@/components/DownloadRoadmapButton";

const lawSteps = [
  {
    title: "Secondary & Higher Secondary",
    description: "Students from any stream (Arts, Commerce, or Science) can pursue law. Arts or Humanities are often preferred for their focus on social sciences and logic.",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
    badge: "Open Background"
  },
  {
    title: "Law Entrance Exams",
    description: "Appear for CLAT, AILET, or LSAT. These exams test your logical reasoning, legal aptitude, and general awareness.",
    icon: Search,
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
    badge: "Gatekeeper Exams"
  },
  {
    title: "Integrated LL.B (5 Years)",
    description: "Complete a professional degree like BA LL.B or BBA LL.B. This phase covers core legal subjects, constitutional law, and mock trials (moot courts).",
    icon: GraduationCap,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
    badge: "Professional Degree"
  },
  {
    title: "Internships & Moot Courts",
    description: "Gain practical exposure by interning with law firms, senior advocates, or NGOs. Participating in moot courts is essential for developing advocacy skills.",
    icon: ShieldCheck,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    badge: "Skills Training"
  },
  {
    title: "Bar Council Registration (AIBE)",
    description: "After graduation, clear the All India Bar Examination (AIBE) conducted by the Bar Council of India to obtain your license to practice in courts.",
    icon: Award,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
    badge: "Licensing"
  },
  {
    title: "Litigation, Corporate, or Civil Services",
    description: "Start your practice in courts, join a corporate law firm, or prepare for Judicial Service Exams or the UPSC Civil Services (IAS/IPS).",
    icon: Landmark,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
    badge: "Career Pathways"
  }
];

const LawCivilCareer = () => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const careerId = "law-career";
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-16 py-12">
        <header>
          <Link to="/careers-after-12th" className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-[2rem] flex items-center justify-center shadow-lg ring-1 ring-inset ring-black/5">
                <Scale className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase">Law & Civil Services</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <DownloadRoadmapButton 
                careerName="Law & Civil Services"
                description="Law and Civil Services offer careers centered on justice, governance, and public administration. They are the backbone of a functioning democracy and societal order."
                steps={lawSteps}
                skills={["Analytical Reasoning", "Public Advocacy", "Constitutional Knowledge", "Legal Research", "Communication", "Ethics"]}
                educationPath={[
                  { title: "Integrated LL.B.", description: "5-year professional degree (BA LL.B / BBA LL.B) directly after Class 12." },
                  { title: "3-Year LL.B.", description: "Pursued after completing any undergraduate degree (BA, B.Com, B.Sc)." }
                ]}
                exams={[
                  { title: "CLAT / AILET", description: "Premier admission tests for National Law Universities and top legal institutes." },
                  { title: "UPSC CSE", description: "The prestigious examination for IAS, IPS, and IFS cadres." }
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
                      title: "Law & Civil Services",
                      description: "Step-by-step path to legal and administrative excellence.",
                      path: "/career/law-civil",
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
            Law and Civil Services offer careers centered on justice, governance, and public administration. They are the backbone of a functioning democracy and societal order.
          </p>
        </header>

        <section className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm">
          <h2 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
            <GraduationCap className="text-amber-500 w-8 h-8"/>
            Educational Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-muted/30 border-none rounded-2xl p-6">
              <CardTitle className="text-lg font-bold mb-2">Integrated LL.B.</CardTitle>
              <p className="text-sm text-muted-foreground">5-year professional degree (BA LL.B / BBA LL.B) directly after Class 12.</p>
            </Card>
            <Card className="bg-muted/30 border-none rounded-2xl p-6">
              <CardTitle className="text-lg font-bold mb-2">3-Year LL.B.</CardTitle>
              <p className="text-sm text-muted-foreground">Pursued after completing any undergraduate degree (BA, B.Com, B.Sc).</p>
            </Card>
          </div>
        </section>

        <CareerRoadmap
          steps={lawSteps}
          skills={[
            { name: "Constitutional & Criminal Law", level: "Advanced", type: "technical" },
            { name: "Legal Research & Case Analysis", level: "Advanced", type: "technical" },
            { name: "Contract Drafting & Negotiation", level: "Intermediate", type: "technical" },
            { name: "Corporate & Intellectual Property Law", level: "Intermediate", type: "technical" },
            { name: "Regulatory Compliance & Policy Analysis", level: "Beginner", type: "technical" },
            { name: "Legal Writing & Documentation", level: "Beginner", type: "technical" },
            { name: "Critical & Analytical Reasoning", level: "Advanced", type: "soft" },
            { name: "Oral Advocacy & Courtroom Confidence", level: "Advanced", type: "soft" },
            { name: "Ethical Judgment & Integrity", level: "Intermediate", type: "soft" },
            { name: "Stakeholder Management & Networking", level: "Intermediate", type: "soft" },
          ]}
          exams={[
            {
              name: "CLAT",
              fullForm: "Common Law Admission Test",
              purpose: "Admission to 25 National Law Universities (NLUs) for integrated 5-year BA LL.B programs. Conducted by the NLU Consortium.",
              difficulty: "High",
              timing: "After Class 12",
            },
            {
              name: "AILET",
              fullForm: "All India Law Entrance Test",
              purpose: "Separate entrance for National Law University Delhi — India's most premier NLU.",
              difficulty: "Very High",
              timing: "After Class 12",
            },
            {
              name: "UPSC CSE",
              fullForm: "Union Public Service Commission — Civil Services Examination",
              purpose: "The most prestigious competitive exam in India for IAS, IPS, IFS cadre. Three-stage process: Prelims, Mains, and Interview.",
              difficulty: "Very High",
              timing: "After graduation (any stream)",
            },
            {
              name: "AIBE",
              fullForm: "All India Bar Examination",
              purpose: "Mandatory licensing exam by Bar Council of India for law graduates to practice as advocates in Indian courts.",
              difficulty: "Moderate",
              timing: "After LL.B completion",
            },
          ]}
          internships={[
            {
              role: "Law Firm Internship (Litigation / Corporate)",
              where: "Top-tier firms: AZB & Partners, Cyril Amarchand Mangaldas, Khaitan & Co, Trilegal",
              duration: "1–3 months per internship",
              focus: "Drafting plaints, replies, agreements, and legal memos. Assist advocates in court proceedings, client calls, and due diligence exercises.",
            },
            {
              role: "Chamber Internship with Senior Advocate",
              where: "Supreme Court, High Courts, or District Courts",
              duration: "2–6 months",
              focus: "Observe and assist in live court arguments. Research case law, draft petitions, and understand court procedure from within a litigation chamber.",
            },
            {
              role: "NGO / Human Rights Legal Intern",
              where: "Organizations like HRLN, MANAV, Lawyers Collective",
              duration: "1–2 months",
              focus: "Pro-bono legal aid, PIL drafting, and access-to-justice initiatives. Builds perspective on constitutional rights and public interest law.",
            },
          ]}
          jobs={[
            {
              title: "Junior Associate / Legal Analyst",
              type: "Entry",
              salaryRange: "₹4–12 LPA",
              description: "Research, draft, and review contracts and legal documents at law firms or corporate legal departments.",
            },
            {
              title: "District Magistrate / SDM (UPSC Route)",
              type: "Entry",
              salaryRange: "Government Pay (₹56,100+/month)",
              description: "Administer district government functions, oversee law and order, and manage revenue and welfare schemes.",
            },
            {
              title: "Senior Associate / Advocate",
              type: "Mid",
              salaryRange: "₹10–30 LPA",
              description: "Independently handle cases in High Courts or manage client portfolios in corporate legal teams. Building a track record for partnership.",
            },
            {
              title: "In-House Counsel (MNC/Startup)",
              type: "Mid",
              salaryRange: "₹15–35 LPA",
              description: "Handle all legal matters for a company — contracts, IP, employment law, regulatory filings, and litigation strategy.",
            },
            {
              title: "Senior Partner / IAS Secretary / Judge",
              type: "Senior",
              salaryRange: "₹50 L–2 Cr+ LPA",
              description: "Lead law firm practice groups, head government ministries, or adjudicate cases as a High Court or Supreme Court judge.",
            },
          ]}
        />

        <section className="bg-card p-10 rounded-[2.5rem] border border-border shadow-sm">
          <h2 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
            <PenTool className="text-amber-600 w-8 h-8"/>
            Selection Exams
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">CLAT / AILET</h3>
              <p className="text-muted-foreground font-medium">Premier admission tests for National Law Universities and top legal institutes.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">UPSC CSE</h3>
              <p className="text-muted-foreground font-medium">The prestigious examination for IAS, IPS, and IFS cadres.</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
            <Briefcase className="text-amber-500 w-9 h-9"/>
            Leadership Roles
          </h2>
          <div className="grid gap-6">
            <div className="flex gap-6 items-center p-8 bg-card border border-border rounded-[2rem] hover:shadow-lg transition-all group">
              <div className="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 p-5 rounded-2xl group-hover:scale-110 transition-transform"><Gavel className="w-8 h-8" /></div>
              <div>
                <h3 className="font-black text-foreground text-2xl mb-2">Senior Advocate</h3>
                <p className="text-muted-foreground font-medium text-lg">Leading legal representation and interpreting complex statutes in courts.</p>
              </div>
            </div>
            <div className="flex gap-6 items-center p-8 bg-card border border-border rounded-[2rem] hover:shadow-lg transition-all group">
              <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 p-5 rounded-2xl group-hover:scale-110 transition-transform"><Landmark className="w-8 h-8" /></div>
              <div>
                <h3 className="font-black text-foreground text-2xl mb-2">IAS Officer</h3>
                <p className="text-muted-foreground font-medium text-lg">District administration and implementing broad government policy frameworks.</p>
              </div>
            </div>
            <div className="flex gap-6 items-center p-8 bg-card border border-border rounded-[2rem] hover:shadow-lg transition-all group">
              <div className="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 p-5 rounded-2xl group-hover:scale-110 transition-transform"><Globe className="w-8 h-8" /></div>
              <div>
                <h3 className="font-black text-foreground text-2xl mb-2">International Diplomat</h3>
                <p className="text-muted-foreground font-medium text-lg">Representing national interests in global summits and bilateral relations.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default LawCivilCareer;
