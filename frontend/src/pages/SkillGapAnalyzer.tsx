import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Zap,
  Stethoscope,
  Scale,
  Briefcase,
  TrendingUp,
  Map,
  Sparkles,
  Target,
  BookOpen,
  ChevronRight,
  RefreshCcw,
  Info,
  Layers,
  BarChart3,
  Search,
  LayoutDashboard
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type SkillCategory = "technical" | "soft" | "academic";
type SkillStatus = "mastered" | "developing" | "gap";

interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  importance: "critical" | "important" | "useful";
  description: string;
  howToLearn: string;
}

interface Career {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  accentText: string;
  route: string;
  skills: Skill[];
}

// ─── Career data ──────────────────────────────────────────────────────────────
const careers: Career[] = [
  {
    id: "engineering",
    title: "Software Engineer",
    subtitle: "Engineering & Technology",
    icon: Zap,
    gradient: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
    accentText: "text-blue-600 dark:text-blue-400",
    route: "/career/engineering",
    skills: [
      { id: "dsa", name: "Data Structures & Algorithms", category: "technical", importance: "critical", description: "Arrays, trees, graphs, sorting, searching, and complexity analysis.", howToLearn: "LeetCode, Codeforces, 'Cracking the Coding Interview' book" },
      { id: "prog", name: "Programming (Python / Java / C++)", category: "technical", importance: "critical", description: "Write clean, maintainable, and efficient code in at least one language.", howToLearn: "freeCodeCamp, CS50, official language documentation" },
      { id: "webdev", name: "Web Development (HTML/CSS/JS)", category: "technical", importance: "important", description: "Build interactive web pages and understand frontend fundamentals.", howToLearn: "MDN Web Docs, The Odin Project, Frontend Mentor" },
      { id: "db", name: "Databases (SQL & NoSQL)", category: "technical", importance: "important", description: "Design schemas, write queries, and understand indexing and transactions.", howToLearn: "SQLZoo, MongoDB University, PostgreSQL Exercises" },
      { id: "git", name: "Version Control (Git & GitHub)", category: "technical", importance: "important", description: "Branching strategies, pull requests, resolving merge conflicts.", howToLearn: "GitHub Learning Lab, 'Pro Git' book (free online)" },
      { id: "sysdesign", name: "System Design Fundamentals", category: "technical", importance: "useful", description: "Load balancing, caching, microservices, and scalability concepts.", howToLearn: "System Design Primer (GitHub), Grokking System Design Course" },
      { id: "math", name: "Discrete Mathematics", category: "academic", importance: "important", description: "Logic, set theory, graph theory and Boolean algebra for CS.", howToLearn: "MIT OpenCourseWare 6.042, Khan Academy" },
      { id: "problem", name: "Problem Solving & Logical Thinking", category: "soft", importance: "critical", description: "Break complex problems into manageable steps and reason systematically.", howToLearn: "Daily coding challenges, puzzles, Advent of Code" },
      { id: "collab", name: "Team Collaboration & Agile", category: "soft", importance: "important", description: "Work in sprints, participate in stand-ups, and use Jira/Trello.", howToLearn: "Scrum guides, open source contributions on GitHub" },
      { id: "comm", name: "Technical Communication", category: "soft", importance: "useful", description: "Write clear documentation and explain complex ideas to non-technical stakeholders.", howToLearn: "Write blogs, contribute to open-source docs, Coursera writing courses" },
    ],
  },
  {
    id: "medical",
    title: "Medical Professional",
    subtitle: "Healthcare & Medicine",
    icon: Stethoscope,
    gradient: "from-teal-500 to-emerald-600",
    iconBg: "bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400",
    accentText: "text-teal-600 dark:text-teal-400",
    route: "/career/medical",
    skills: [
      { id: "bio", name: "Biology & Human Physiology", category: "academic", importance: "critical", description: "Cell biology, organ systems, genetics, and organism function.", howToLearn: "NCERT Biology, Pathfinder for NEET, Guyton and Hall Textbook" },
      { id: "chem", name: "Chemistry (Organic & Biochemistry)", category: "academic", importance: "critical", description: "Reactions, molecular structures, metabolism, and drug mechanisms.", howToLearn: "NCERT Chemistry, Morrison & Boyd, Lippincott's Biochemistry" },
      { id: "anat", name: "Human Anatomy", category: "technical", importance: "critical", description: "Structures of bones, muscles, nerves, and organ systems.", howToLearn: "Gray's Anatomy, Netter's Atlas, 3D anatomy apps (Visible Body)" },
      { id: "pharma", name: "Pharmacology Basics", category: "technical", importance: "important", description: "Drug classes, mechanisms of action, side effects, and contraindications.", howToLearn: "KD Tripathi's Pharmacology, MotherBoard pharmacology notes" },
      { id: "clinical", name: "Clinical Diagnosis Thinking", category: "technical", importance: "important", description: "History-taking, differential diagnosis, and interpreting lab reports.", howToLearn: "Hutchison's Clinical Methods, PBL case studies" },
      { id: "research", name: "Medical Research & Statistics", category: "technical", importance: "useful", description: "Understand RCTs, meta-analyses, p-values, and evidence grading.", howToLearn: "Medscape research guides, Coursera Clinical Research courses" },
      { id: "empathy", name: "Empathy & Compassionate Care", category: "soft", importance: "critical", description: "Listen actively, communicate diagnoses sensitively, support patients emotionally.", howToLearn: "Practice in clinical volunteering, patient interaction workshops" },
      { id: "pressure", name: "Decision-Making Under Pressure", category: "soft", importance: "critical", description: "Stay calm, stabilise patients, and triage in emergency situations.", howToLearn: "BLS/ACLS certifications, simulation labs, emergency rotations" },
      { id: "ethic", name: "Medical Ethics & Law", category: "soft", importance: "important", description: "Informed consent, patient confidentiality, end-of-life decisions.", howToLearn: "Beauchamp & Childress Principles of Biomedical Ethics" },
    ],
  },
  {
    id: "management",
    title: "Business Manager / MBA",
    subtitle: "Management & Strategy",
    icon: Briefcase,
    gradient: "from-purple-500 to-violet-600",
    iconBg: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400",
    accentText: "text-purple-600 dark:text-purple-400",
    route: "/career/management",
    skills: [
      { id: "finance", name: "Financial Literacy & Accounting", category: "technical", importance: "critical", description: "P&L statements, balance sheets, cash flow, and financial ratios.", howToLearn: "Coursera Financial Accounting (Wharton), AccountingCoach.com" },
      { id: "analytics", name: "Business Analytics & Excel", category: "technical", importance: "critical", description: "Data driven decision making, pivot tables, dashboards, Power BI.", howToLearn: "ExcelJet, Google Data Analytics Certificate, Tableau Public tutorials" },
      { id: "mkt", name: "Marketing & Consumer Behaviour", category: "technical", importance: "important", description: "4Ps of marketing, segmentation, targeting, positioning, digital channels.", howToLearn: "Kotler's Principles of Marketing, HubSpot Marketing certifications" },
      { id: "ops", name: "Operations & Supply Chain", category: "technical", importance: "useful", description: "Process optimization, inventory management, vendor negotiation.", howToLearn: "APICS CPIM certification, MIT OpenCourseWare Supply Chain Management" },
      { id: "strategy", name: "Business Strategy & Case Studies", category: "technical", importance: "critical", description: "Porter's Five Forces, BCG matrix, growth frameworks.", howToLearn: "Harvard Business Review cases, Consulting prep platforms (PrepLounge)" },
      { id: "leadership", name: "Leadership & People Management", category: "soft", importance: "critical", description: "Motivate teams, resolve conflicts, delegate effectively, and inspire vision.", howToLearn: "'Drive' by Daniel Pink, Coursera Inspiring Leadership (Case Western)" },
      { id: "negotiate", name: "Negotiation & Persuasion", category: "soft", importance: "critical", description: "BATNA, interest-based negotiation, influence without authority.", howToLearn: "'Getting to Yes' by Fisher, Yale Negotiation MOOC" },
      { id: "speaking", name: "Public Speaking & Presentations", category: "soft", importance: "important", description: "Structure compelling pitches, own the boardroom, handle Q&A.", howToLearn: "Toastmasters, 'Talk Like TED' by Carmine Gallo" },
      { id: "network", name: "Professional Networking", category: "soft", importance: "useful", description: "Build authentic relationships at conferences, LinkedIn, and industry events.", howToLearn: "'Never Eat Alone' by Keith Ferrazzi, LinkedIn Learning" },
    ],
  },
  {
    id: "law",
    title: "Lawyer / Civil Services",
    subtitle: "Law & Governance",
    icon: Scale,
    gradient: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",
    accentText: "text-amber-600 dark:text-amber-400",
    route: "/career/law-civil",
    skills: [
      { id: "const", name: "Constitutional & Criminal Law", category: "technical", importance: "critical", description: "Fundamental rights, directive principles, IPC, CrPC, Indian Evidence Act.", howToLearn: "Bare Acts (legislative.gov.in), Ratanlal & Dhirajlal's Criminal Law" },
      { id: "legalres", name: "Legal Research & Case Analysis", category: "technical", importance: "critical", description: "Reading judgments, finding precedents, and mapping legal arguments.", howToLearn: "Indian Kanoon, SCC Online (free access), law school workshops" },
      { id: "drafting", name: "Contract & Document Drafting", category: "technical", importance: "important", description: "Structure agreements, pleadings, and legal notices clearly.", howToLearn: "Internship practice, 'Negotiating and Drafting Commercial Contracts'" },
      { id: "gk", name: "Current Affairs & Constitutional GK", category: "academic", importance: "critical", description: "Recent SC judgments, amendments, government schemes, international law.", howToLearn: "The Hindu, Indian Express, Yojana magazine, Vision IAS monthly" },
      { id: "polity", name: "Indian Polity & Governance", category: "academic", importance: "critical", description: "Indian administrative structure, federalism, legislative processes.", howToLearn: "M. Laxmikanth's Indian Polity, NCERT Political Science" },
      { id: "ethics", name: "Ethics & Integrity", category: "academic", importance: "important", description: "UPSC GS Paper IV topics — probity, emotional intelligence, case studies.", howToLearn: "Lexicon for Ethics by Chronicle, ARC reports" },
      { id: "advocacy", name: "Oral Advocacy & Court Presence", category: "soft", importance: "critical", description: "Present arguments clearly, cross-examine witnesses, handle judicial pressure.", howToLearn: "Moot court participation, debate competitions, chamber internships" },
      { id: "reasoning", name: "Critical & Analytical Reasoning", category: "soft", importance: "critical", description: "Identify fallacies, build logical argument chains, interpret complex statutes.", howToLearn: "LSAT prep books, CLAT reasoning practice, verbal reasoning tests" },
      { id: "manage", name: "Stakeholder Management", category: "soft", importance: "useful", description: "Manage client expectations, build trust, and handle sensitive situations.", howToLearn: "Law firm internships, client-interaction clinics" },
    ],
  },
];

const mockSampleResults = [
  { id: "s1", name: "System Architecture", status: "mastered", level: 85, importance: "critical", color: "bg-emerald-500" },
  { id: "s2", name: "Cloud Infrastructure", status: "developing", level: 55, importance: "important", color: "bg-blue-500" },
  { id: "s3", name: "Machine Learning", status: "gap", level: 20, importance: "useful", color: "bg-rose-500" },
];

// ─── Skill level helpers ──────────────────────────────────────────────────────
function getStatus(userLevel: number, importance: string): SkillStatus {
  const threshold = importance === "critical" ? 70 : importance === "important" ? 55 : 40;
  if (userLevel >= threshold) return "mastered";
  if (userLevel >= threshold * 0.5) return "developing";
  return "gap";
}

const statusConfig = {
  mastered: {
    label: "Mastered",
    icon: CheckCircle2,
    textColor: "text-emerald-600 dark:text-emerald-400",
    barColor: "bg-gradient-to-r from-emerald-400 to-teal-500",
    bg: "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30",
  },
  developing: {
    label: "Developing",
    icon: AlertCircle,
    textColor: "text-blue-600 dark:text-blue-400",
    barColor: "bg-gradient-to-r from-blue-400 to-indigo-500",
    bg: "bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/30",
  },
  gap: {
    label: "Skill Gap",
    icon: XCircle,
    textColor: "text-rose-600 dark:text-rose-400",
    barColor: "bg-gradient-to-r from-rose-400 to-pink-500",
    bg: "bg-rose-50/50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-800/30",
  },
};

const importanceConfig = {
  critical: { label: "Critical", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800" },
  important: { label: "Important", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800" },
  useful: { label: "Useful", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
};

const categoryLabels: Record<SkillCategory, string> = {
  technical: "Technical",
  soft: "Soft Skill",
  academic: "Academic",
};

// ─── Animated progress bar ────────────────────────────────────────────────────
function AnimatedBar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay + 100);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color} transition-all duration-700 ease-out`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const SkillGapAnalyzer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselect = searchParams.get("career");

  const [selectedCareerId, setSelectedCareerId] = useState<string>(
    preselect && careers.find((c) => c.id === preselect) ? preselect : ""
  );
  const [skillLevels, setSkillLevels] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<SkillCategory | "all">("all");
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const selectedCareer = careers.find((c) => c.id === selectedCareerId);

  // Reset skill levels when career changes
  useEffect(() => {
    if (selectedCareer) {
      const defaults: Record<string, number> = {};
      selectedCareer.skills.forEach((s) => (defaults[s.id] = 30)); // Start at 30% for realistic look
      setSkillLevels(defaults);
      setShowResults(false);
      setExpandedSkill(null);
    }
  }, [selectedCareerId]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setShowResults(true);
      setIsAnalyzing(false);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }, 1500);
  };

  const results = useMemo(() => {
    if (!selectedCareer) return [];
    return selectedCareer.skills.map(s => ({
      ...s,
      level: skillLevels[s.id] ?? 30,
      status: getStatus(skillLevels[s.id] ?? 30, s.importance)
    }));
  }, [selectedCareer, skillLevels]);

  const readinessScore = useMemo(() => {
    if (results.length === 0) return 0;
    const totalWeight = results.reduce((acc, r) => acc + (r.importance === "critical" ? 3 : r.importance === "important" ? 2 : 1), 0);
    const weightedSum = results.reduce((acc, r) => acc + (r.level * (r.importance === "critical" ? 3 : r.importance === "important" ? 2 : 1)), 0);
    return Math.round(weightedSum / totalWeight);
  }, [results]);

  const masteredCount = useMemo(() => results.filter((r) => r.status === "mastered").length, [results]);
  const developingCount = useMemo(() => results.filter((r) => r.status === "developing").length, [results]);
  const gapCount = useMemo(() => results.filter((r) => r.status === "gap").length, [results]);
  const totalSkills = results.length;

  const readinessLabel =
    readinessScore >= 75 ? "Career Ready" : readinessScore >= 50 ? "On Track" : readinessScore >= 25 ? "Building Up" : "Just Starting";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const readinessColor =
    readinessScore >= 75
      ? "from-emerald-500 to-teal-500"
      : readinessScore >= 50
      ? "from-blue-500 to-indigo-500"
      : readinessScore >= 25
      ? "from-amber-500 to-orange-500"
      : "from-rose-500 to-pink-500";

  // Group results by category
  const byCategory = (cat: SkillCategory) => results.filter((r) => r.category === cat);

  return (
    <PageLayout>
      <div className="min-h-screen bg-background pb-20 overflow-hidden relative">
        {/* Background depth */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10 space-y-12">
          {/* Header */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="space-y-4">
              <Button
                variant="ghost"
                className="rounded-full gap-2 -ml-3 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all font-black"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="w-4 h-4" />
                DASHBOARD
              </Button>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                Skill Gap <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">Analyzer</span>
              </h1>
              <p className="text-lg text-muted-foreground font-medium max-w-2xl opacity-80">
                A data-driven approach to map your current proficiency against industry benchmarks. 
                Get actionable insights and bridge the gap to your dream career.
              </p>
            </div>
            {!selectedCareerId && (
              <Button size="lg" className="rounded-2xl h-14 px-8 bg-black dark:bg-white text-white dark:text-black font-black text-sm uppercase tracking-widest gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all">
                <Sparkles className="w-4 h-4" />
                Select a Career to Start
              </Button>
            )}
          </motion.header>

          <div className="grid lg:grid-cols-[1fr,380px] gap-10 items-start">
            {/* Main Section */}
            <div className="space-y-10">
              
              {/* Step 1: Career Selection Cards */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center font-black">01</div>
                  <h2 className="text-xl font-black tracking-tight">Select Target Domain</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {careers.map((career) => {
                    const Icon = career.icon;
                    const isSelected = selectedCareerId === career.id;
                    return (
                      <motion.button
                        key={career.id}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCareerId(career.id)}
                        className={`group relative p-6 rounded-[2rem] border-2 text-left transition-all overflow-hidden ${
                          isSelected
                            ? "border-violet-600 bg-violet-50/50 dark:bg-violet-900/10 shadow-xl shadow-violet-500/10"
                            : "border-border bg-white dark:bg-card/50 hover:border-violet-400/50 hover:shadow-lg"
                        }`}
                      >
                        <div className="flex items-start gap-4 relative z-10">
                          <div className={`w-14 h-14 rounded-2xl ${career.iconBg} flex items-center justify-center shrink-0`}>
                            <Icon className="w-7 h-7" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-lg text-foreground mb-1 leading-tight group-hover:text-violet-600 transition-colors text-ellipsis overflow-hidden whitespace-nowrap">{career.title}</h3>
                            <p className="text-xs text-muted-foreground font-medium truncate opacity-70">{career.subtitle}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <Badge variant="secondary" className="bg-muted/50 text-[10px] font-black uppercase tracking-wider px-2 py-0.5">{career.skills.length} Core Skills</Badge>
                              {isSelected && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1.5 text-violet-600 dark:text-violet-400 font-black text-[10px] uppercase tracking-wider">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Active Path
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600 opacity-5 blur-[40px]" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </section>

              {/* Assessment Area */}
              <AnimatePresence mode="wait">
                {selectedCareer ? (
                  <motion.section
                    key="assessment"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-8"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">02</div>
                        <h2 className="text-xl font-black tracking-tight">Self-Assessment Sliders</h2>
                      </div>
                      <div className="flex p-1 bg-muted rounded-xl gap-1">
                        {(["all", "technical", "soft", "academic"] as const).map(tab => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                              activeTab === tab ? "bg-white dark:bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {results.filter(r => activeTab === "all" || r.category === activeTab).map((skill, i) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                          className="bg-white/80 dark:bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 transition-all hover:border-primary/30 group"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${
                                  skill.importance === "critical" ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]" : "bg-blue-400"
                                }`} />
                                <h4 className="font-black text-foreground text-sm tracking-tight">{skill.name}</h4>
                                <Badge variant="outline" className={`text-[9px] font-black uppercase tracking-widest border-border/50 ${
                                  skill.importance === "critical" ? "text-rose-600" : "text-muted-foreground"
                                }`}>
                                  {skill.importance}
                                </Badge>
                              </div>
                              <div className="relative pt-2">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  step="5"
                                  value={skillLevels[skill.id] || 0}
                                  onChange={(e) => setSkillLevels(prev => ({ ...prev, [skill.id]: Number(e.target.value) }))}
                                  className="w-full h-2 bg-muted rounded-full cursor-pointer appearance-none transition-all accent-primary focus-visible:outline-none"
                                />
                                <div className="flex justify-between mt-2 px-1">
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-40">Beginner</span>
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-40">Expert</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                              <div className="text-right">
                                <span className="text-2xl font-black text-primary tabular-nums">{(skillLevels[skill.id] || 0)}%</span>
                                <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">Proficiency</div>
                              </div>
                              <div className="h-10 w-[1px] bg-border mx-2 hidden sm:block" />
                              <button 
                                onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
                                className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
                              >
                                <Info className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          {expandedSkill === skill.id && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-4 pt-4 border-t border-border/50">
                               <p className="text-xs text-muted-foreground font-medium leading-relaxed">{skill.description}</p>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-col items-center pt-8 border-t border-border gap-4">
                      <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        size="lg"
                        className="h-16 px-12 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-black text-lg gap-3 shadow-2xl shadow-violet-500/20 hover:scale-[1.03] active:scale-95 transition-all border-0 disabled:opacity-70 group"
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCcw className="w-6 h-6 animate-spin" />
                            Mapping Your Path...
                          </>
                        ) : (
                          <>
                            <BarChart3 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                            Generate Full Skill Insight
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.section>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedCareerId("engineering")}
                  >
                    <div className="relative bg-white/40 dark:bg-card/40 backdrop-blur-3xl border border-dashed border-border rounded-[3rem] p-16 text-center space-y-8 overflow-hidden grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                      <div className="space-y-10 pointer-events-none">
                        <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                          Preview Mode - Select a domain above
                        </div>
                        <div className="max-w-md mx-auto space-y-4">
                          <h3 className="text-2xl font-black text-foreground">See how you measure up</h3>
                          <p className="text-sm font-medium text-muted-foreground">Select one of the domains above to start your assessment. We'll break down the requirements and show your gaps.</p>
                        </div>
                        <div className="grid gap-4 max-w-lg mx-auto">
                          {mockSampleResults.map((s, i) => (
                            <div key={s.id} className="bg-white dark:bg-card/50 rounded-2xl p-4 border border-border flex items-center justify-between shadow-sm">
                              <div className="flex-1 text-left">
                                <div className="text-sm font-black mb-2">{s.name}</div>
                                <div className="w-full h-1.5 bg-muted rounded-full">
                                  <motion.div 
                                    animate={{ width: `${s.level}%` }} 
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: i * 0.5 }}
                                    className={`h-full ${s.color} rounded-full`} 
                                  />
                                </div>
                              </div>
                              <div className="pl-6 text-right">
                                <div className="text-xl font-black opacity-20">{s.level}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4">
                          <Button variant="outline" className="rounded-xl border-dashed px-8 font-black gap-2">
                             Start Your Assessment
                             <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar Dashboard Stats */}
            <aside className="space-y-8 sticky top-32">
              <AnimatePresence>
                {showResults && selectedCareer ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    {/* Real Score Card */}
                    <div className={`p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-2xl relative overflow-hidden`}>
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                       <div className="relative z-10 text-center space-y-4">
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Readiness Score</div>
                          <div className="text-6xl font-black tabular-nums">{readinessScore}%</div>
                          <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider inline-block">
                             {readinessLabel}
                          </div>
                          <p className="text-white/70 text-xs font-medium leading-relaxed mt-4">
                             {readinessScore > 70 ? "Excellent alignment. You're ready for high-impact roles in this domain." : "Solid foundation. Some key gaps exist in critical areas."}
                          </p>
                       </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white/40 dark:bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-5">
                          <div className="text-2xl font-black text-emerald-500">{masteredCount}</div>
                          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Mastered</div>
                       </div>
                       <div className="bg-white/40 dark:bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-5">
                          <div className="text-2xl font-black text-rose-500">{gapCount}</div>
                          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Skill Gaps</div>
                       </div>
                    </div>

                    <Button 
                      onClick={() => navigate(selectedCareer.route)}
                      className="w-full h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 border-0"
                    >
                      Unlock Full Roadmap
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <div className="space-y-6 opacity-40">
                    <div className="bg-white/40 dark:bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-8 space-y-6">
                       <div className="w-20 h-20 bg-muted rounded-full mx-auto" />
                       <div className="space-y-2">
                          <div className="h-2 w-3/4 bg-muted rounded mx-auto" />
                          <div className="h-2 w-1/2 bg-muted rounded mx-auto" />
                       </div>
                       <div className="pt-4">
                          <div className="grid grid-cols-2 gap-2">
                             <div className="h-8 bg-muted rounded-lg" />
                             <div className="h-8 bg-muted rounded-lg" />
                          </div>
                       </div>
                    </div>
                    <div className="p-6 border border-border border-dashed rounded-[2rem] text-center italic text-xs text-muted-foreground">
                       Your insights report will appear here once the assessment is complete
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </aside>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SkillGapAnalyzer;
