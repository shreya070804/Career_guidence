import { Link } from "react-router-dom";
import { ArrowLeft, Cpu, GraduationCap, PenTool, Briefcase, Settings, Code, Zap, BookOpen, Search, Code2, Globe, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import CareerRoadmap from "@/components/CareerRoadmap";
import { useBookmarks } from "@/contexts/BookmarkContext";
import DownloadRoadmapButton from "@/components/DownloadRoadmapButton";

const engineeringSteps = [
  {
    title: "Higher Secondary Education",
    description: "Complete your 10+2 with a focus on Physics, Chemistry, and Mathematics (PCM). Maintaining a strong percentage is crucial for university admissions.",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    badge: "Class 11-12"
  },
  {
    title: "Entrance Examinations",
    description: "Prepare and appear for national level exams like JEE Main/Advanced, or private institute exams like BITSAT and VITEEE.",
    icon: Search,
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
    badge: "Competitive Phase"
  },
  {
    title: "Bachelor's Degree (B.Tech/BE)",
    description: "Pursue a 4-year undergraduate degree in your chosen specialization (Computer Science, Mechanical, Civil, etc.) from a recognized university.",
    icon: GraduationCap,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
    badge: "Undergraduate"
  },
  {
    title: "Technical Skills & Projects",
    description: "Build a strong portfolio by learning industry-relevant skills like Coding, CAD modeling, or System Design. Participate in hackathons and build real-world projects.",
    icon: Code2,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
    badge: "Skill Development"
  },
  {
    title: "Internships & Specialization",
    description: "Gain work experience through internships at tech companies or research labs. This is the time to decide if you want to pursue Core Engineering or Software.",
    icon: Briefcase,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
    badge: "Industry Exposure"
  },
  {
    title: "Career & Higher Education",
    description: "Land a job role as a Junior Engineer, Software Developer, or Analyst. Alternatively, prepare for GATE/GRE to pursue a Master's (M.Tech/MS) or an MBA.",
    icon: Globe,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
    badge: "Final Goal"
  }
];

const EngineeringCareer = () => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const careerId = "eng-career";
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-16 py-12">
        <header>
          <Link to="/careers-after-12th" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl flex items-center justify-center shadow-lg ring-1 ring-inset ring-black/5">
                <Cpu className="w-6 h-6" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight uppercase">Engineering Career</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <DownloadRoadmapButton 
                careerName="Engineering"
                description="Engineering is the application of scientific and mathematical principles to design, build, and maintain structures, machines, systems, and processes. It's a field for innovators who want to shape the future."
                steps={engineeringSteps}
                skills={["Mathematics", "Physics", "Coding", "Problem Solving", "System Design", "Analytical Thinking"]}
                educationPath={[
                  { title: "B.Tech / B.E.", description: "Bachelor of Technology or Engineering (4 years). The primary entry degree for all technical domains." },
                  { title: "Integrated M.Tech", description: "A 5-year dual-degree program combining Bachelor's and Master's education." }
                ]}
                exams={[
                  { title: "JEE Main & Advanced", description: "The gateway to prestige: IITs, NITs, and IIITs." },
                  { title: "BITSAT", description: "For admission to BITS Pilani's top-tier global campuses." },
                  { title: "VITEEE", description: "Premier private university entrance for VIT Vellore/Chennai." },
                  { title: "State & Regional CETs", description: "Local state-level portals for government and private colleges." }
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
                      title: "Engineering",
                      description: "Structured path to becoming a professional engineer.",
                      path: "/career/engineering",
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
          <p className="text-base text-muted-foreground leading-relaxed font-medium opacity-80 mt-4">
            Engineering is the application of scientific and mathematical principles to design, build, and maintain structures, machines, systems, and processes.
          </p>
        </header>

        <section className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm">
          <h2 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
            <GraduationCap className="text-blue-500 w-8 h-8"/>
            Academic Entry Points
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-muted/30 border-none rounded-3xl p-6">
              <CardTitle className="text-xl font-bold mb-3">B.Tech / B.E.</CardTitle>
              <p className="text-muted-foreground font-medium">Bachelor of Technology or Engineering (4 years). The primary entry degree for all technical domains.</p>
            </Card>
            <Card className="bg-muted/30 border-none rounded-3xl p-6">
              <CardTitle className="text-xl font-bold mb-3">Integrated M.Tech</CardTitle>
              <p className="text-muted-foreground font-medium">A 5-year dual-degree program combining Bachelor's and Master's education.</p>
            </Card>
          </div>
        </section>

        <CareerRoadmap
          steps={engineeringSteps}
          skills={[
            { name: "Data Structures & Algorithms", level: "Advanced", type: "technical" },
            { name: "Programming (Python / C++ / Java)", level: "Advanced", type: "technical" },
            { name: "System Design", level: "Intermediate", type: "technical" },
            { name: "Version Control (Git)", level: "Intermediate", type: "technical" },
            { name: "Cloud Platforms (AWS / GCP / Azure)", level: "Intermediate", type: "technical" },
            { name: "Database Management (SQL / NoSQL)", level: "Intermediate", type: "technical" },
            { name: "CAD & Simulation Tools", level: "Beginner", type: "technical" },
            { name: "Problem Solving", level: "Advanced", type: "soft" },
            { name: "Team Collaboration", level: "Intermediate", type: "soft" },
            { name: "Technical Communication", level: "Intermediate", type: "soft" },
            { name: "Project Management", level: "Beginner", type: "soft" },
          ]}
          exams={[
            {
              name: "JEE Main",
              fullForm: "Joint Entrance Examination — Main",
              purpose: "Gateway to NITs, IIITs, and GFTIs. First stage of the two-tier JEE process.",
              difficulty: "High",
              timing: "Class 12 / After 10+2",
            },
            {
              name: "JEE Advanced",
              fullForm: "Joint Entrance Examination — Advanced",
              purpose: "Premier exam for 23 IITs. Only top 2.5 lakh JEE Main qualifiers are eligible.",
              difficulty: "Very High",
              timing: "After clearing JEE Main",
            },
            {
              name: "BITSAT",
              fullForm: "Birla Institute of Technology & Science Admission Test",
              purpose: "Admission to BITS Pilani, Goa, and Hyderabad campuses.",
              difficulty: "High",
              timing: "Class 12 / After 10+2",
            },
            {
              name: "GATE",
              fullForm: "Graduate Aptitude Test in Engineering",
              purpose: "M.Tech admissions and PSU recruitment. Benchmark for higher engineering studies.",
              difficulty: "Very High",
              timing: "After B.Tech / B.E.",
            },
          ]}
          internships={[
            {
              role: "Software Development Intern",
              where: "Tech startups, MNCs (Google, Microsoft, Infosys), or product companies",
              duration: "2–6 months",
              focus: "Build real features in a production codebase. Learn agile workflows, code reviews, and deployment pipelines.",
            },
            {
              role: "Research Intern",
              where: "IITs, IISc, or international research labs (DAAD, MITACS programs)",
              duration: "2–3 months",
              focus: "Literature review, data collection, and contributing to published research. Highly valuable for MS/PhD aspirants.",
            },
            {
              role: "Core Engineering Intern",
              where: "Manufacturing firms, R&D departments, PSUs like DRDO or ISRO",
              duration: "4–8 months",
              focus: "Hands-on design, testing, and prototyping of physical systems. CAD modeling and lab work.",
            },
          ]}
          jobs={[
            {
              title: "Junior Software Engineer",
              type: "Entry",
              salaryRange: "₹5–12 LPA",
              description: "Write production code, fix bugs, and implement features under senior guidance. Roles at service firms, startups, or product companies.",
            },
            {
              title: "Embedded Systems Engineer",
              type: "Entry",
              salaryRange: "₹4–9 LPA",
              description: "Develop firmware for hardware devices. Involves C programming, microcontrollers, and real-time OS concepts.",
            },
            {
              title: "Senior Software Engineer / Tech Lead",
              type: "Mid",
              salaryRange: "₹18–40 LPA",
              description: "Design system architecture, lead small teams, and own the delivery of major product features.",
            },
            {
              title: "Machine Learning Engineer",
              type: "Mid",
              salaryRange: "₹15–35 LPA",
              description: "Build, train, and deploy ML models at scale. Combines statistical modelling with robust software engineering.",
            },
            {
              title: "Engineering Manager / Principal Engineer",
              type: "Senior",
              salaryRange: "₹40–1 Cr+ LPA",
              description: "Oversee engineering teams, set technical direction, and align engineering goals with business strategy.",
            },
          ]}
        />

        <section className="bg-slate-900 p-8 md:p-10 rounded-[2rem] text-white shadow-xl relative overflow-hidden border border-white/5 ring-1 ring-inset ring-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full blur-[80px] -mr-20 -mt-20" />
          <h2 className="text-xl font-black mb-6 flex items-center gap-2 relative z-10 uppercase tracking-widest">
            <PenTool className="w-5 h-5 text-primary"/>
            Key Entrance Exams
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-2">
              <h3 className="text-base font-black text-white/90">JEE Main & Advanced</h3>
              <p className="text-slate-400 text-sm font-medium">The gateway to prestige: IITs, NITs, and IIITs.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-black text-white/90">BITSAT</h3>
              <p className="text-slate-400 text-sm font-medium">For admission to BITS Pilani campuses.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-black text-white/90">VITEEE</h3>
              <p className="text-slate-400 text-sm font-medium">Premier private university entrance.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-black text-white/90">Regional CETs</h3>
              <p className="text-slate-400 text-sm font-medium">Local state-level portals.</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
            <Briefcase className="text-emerald-500 w-9 h-9"/>
            Dominant Industry Roles
          </h2>
          <div className="grid gap-4">
            <div className="flex gap-4 items-center p-6 bg-card border border-border/50 rounded-2xl hover:shadow-lg transition-all group">
              <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 p-4 rounded-xl group-hover:scale-110 transition-transform"><Code className="w-6 h-6" /></div>
              <div>
                <h3 className="font-black text-foreground text-lg mb-1 leading-tight">Software Engineer</h3>
                <p className="text-muted-foreground font-medium text-xs opacity-70">Creating the future through distributed systems.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-6 bg-card border border-border/50 rounded-2xl hover:shadow-lg transition-all group">
              <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 p-4 rounded-xl group-hover:scale-110 transition-transform"><Settings className="w-6 h-6" /></div>
              <div>
                <h3 className="font-black text-foreground text-lg mb-1 leading-tight">Systems Architect</h3>
                <p className="text-muted-foreground font-medium text-xs opacity-70">Structural design for next-gen machinery.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-6 bg-card border border-border/50 rounded-2xl hover:shadow-lg transition-all group">
              <div className="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 p-4 rounded-xl group-hover:scale-110 transition-transform"><Zap className="w-6 h-6" /></div>
              <div>
                <h3 className="font-black text-foreground text-lg mb-1 leading-tight">Energy Engineer</h3>
                <p className="text-muted-foreground font-medium text-xs opacity-70">Harnessing smart grids for a greener planet.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default EngineeringCareer;
