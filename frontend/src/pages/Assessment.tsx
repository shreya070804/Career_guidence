import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Lightbulb,
  BookOpen,
  Sparkles,
  Zap,
  Target,
  Heart,
  BrainCircuit,
  Stethoscope,
  Scale,
  Briefcase,
  BarChart3,
  ShieldCheck,
  Layers,
  Wand2,
  Palette,
  Calculator,
  Map,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  RefreshCcw,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { useBookmarks } from "@/contexts/BookmarkContext";

// ─── Types ───────────────────────────────────────────────────────────────────
type ScoreMap = Partial<Record<string, number>>;

interface QuizOption {
  label: string;
  emoji: string;
  score: ScoreMap;
}

interface Question {
  id: number;
  phase: "interests" | "skills" | "subjects";
  text: string;
  hint: string;
}

// ─── Questions (Scenario-based) ─────────────────────────────────────────────
const questions: (Question & { options: QuizOption[] })[] = [
  // ── Phase 1: Interests (Scenarios) ─────────────────────────────────────────
  {
    id: 1,
    phase: "interests",
    text: "You're at a tech exhibition. Where do you spend most of your time?",
    hint: "Think about which booth would actually pull you in.",
    options: [
      { label: "The robotics arena watching machines solve complex puzzles", emoji: "🤖", score: { engineering: 4, tech: 3, research: 2 } },
      { label: "The medical lab booth exploring DNA sequencing and surgeries", emoji: "🧬", score: { medical: 4, science: 3, research: 2 } },
      { label: "The courtroom simulation discussing ethics and public policy", emoji: "⚖️", score: { law: 4, journalism: 2, management: 2 } },
      { label: "The digital art gallery analyzing UX and creative storytelling", emoji: "🎨", score: { arts: 4, design: 4, tech: 2 } },
    ],
  },
  {
    id: 2,
    phase: "interests",
    text: "A local business is struggling with low sales. How would you help?",
    hint: "Your approach reveals your natural problem-solving style.",
    options: [
      { label: "Analyze their data and build an automated inventory system", emoji: "📊", score: { tech: 4, engineering: 2, commerce: 2 } },
      { label: "Redesign their branding and create a viral social campaign", emoji: "✨", score: { design: 4, arts: 3, management: 2 } },
      { label: "Investigate their financial statements and suggest new investments", emoji: "📈", score: { finance: 4, commerce: 4, management: 2 } },
      { label: "Interview customers to understand their emotional needs and pain points", emoji: "🤝", score: { social: 4, psychology: 3, journalism: 2 } },
    ],
  },
  {
    id: 3,
    phase: "interests",
    text: "If you were to write a blog post today, what would it be about?",
    hint: "What topics do you find yourself defending in arguments?",
    options: [
      { label: "The impact of Artifical Intelligence on the future of labor", emoji: "💻", score: { tech: 4, research: 3, management: 2 } },
      { label: "A breakdown of a recent legal verdict or human rights issue", emoji: "🏛️", score: { law: 4, social: 3, journalism: 3 } },
      { label: "Breakthroughs in climate science and renewable energy tech", emoji: "🌱", score: { science: 4, engineering: 3, research: 3 } },
      { label: "The psychological traits of successful entrepreneurs", emoji: "🧠", score: { psychology: 4, management: 3, commerce: 2 } },
    ],
  },
  {
    id: 4,
    phase: "interests",
    text: "Your friend asks you to help them with a weekend project. You choose:",
    hint: "No right answer — pick what feels like play, not work.",
    options: [
      { label: "Setting up a smart-home system or repairing an engine", emoji: "🛠️", score: { engineering: 4, tech: 3, design: 1 } },
      { label: "Drafting a formal petition for a community improvement project", emoji: "📝", score: { law: 4, social: 3, management: 2 } },
      { label: "Creating a series of short films or a digital lookbook", emoji: "🎬", score: { arts: 4, design: 3, journalism: 2 } },
      { label: "Planning a charity fundraiser and managing the budget", emoji: "💰", score: { commerce: 4, finance: 3, management: 4 } },
    ],
  },

  // ── Phase 2: Skills ────────────────────────────────────────────────────────
  {
    id: 5,
    phase: "skills",
    text: "When facing a complex math problem, you tend to:",
    hint: "Focus on your internal process, not just the result.",
    options: [
      { label: "Break it down into logical, sequential steps instantly", emoji: "🔢", score: { engineering: 4, tech: 4, finance: 3 } },
      { label: "Look for patterns and visualize the solution geometrically", emoji: "📐", score: { design: 4, engineering: 2, science: 3 } },
      { label: "Write out the logic and explain it to someone else first", emoji: "🗣️", score: { management: 4, law: 2, social: 4 } },
      { label: "Try multiple creative ways to arrive at the same answer", emoji: "💡", score: { design: 4, tech: 2, arts: 3 } },
    ],
  },
  {
    id: 6,
    phase: "skills",
    text: "In a group project, you are naturally the person who:",
    hint: "Your 'autopilot' role is your greatest skill indicator.",
    options: [
      { label: "Delegates tasks and keeps everyone on a strict timeline", emoji: "⏱️", score: { management: 4, commerce: 3, law: 2 } },
      { label: "Does the heavy research and ensures all data is accurate", emoji: "🔎", score: { science: 3, research: 4, medical: 3 } },
      { label: "Makes the final presentation look visually stunning", emoji: "🎨", score: { design: 4, arts: 3, tech: 1 } },
      { label: "Mediates conflicts and keeps the team spirit high", emoji: "🕊️", score: { social: 4, psychology: 3, management: 2 } },
    ],
  },
  {
    id: 7,
    phase: "skills",
    text: "How do you handle 'ambiguity' or lack of clear instructions?",
    hint: "Your comfort with chaos defines your career fit.",
    options: [
      { label: "I create my own structure and logical framework", emoji: "🏗️", score: { management: 4, engineering: 4, law: 4 } },
      { label: "I am experimental and iterate until I find what works", emoji: "🧪", score: { research: 4, tech: 4, science: 3 } },
      { label: "I seek consensus from experts and stakeholders", emoji: "👥", score: { medical: 4, social: 3, commerce: 2 } },
      { label: "I follow my gut and use a creative 'blue-sky' approach", emoji: "🌌", score: { arts: 4, design: 4, journalism: 2 } },
    ],
  },
  {
    id: 8,
    phase: "skills",
    text: "Your strongest mental muscle is:",
    hint: "What comes easiest to you?",
    options: [
      { label: "Abstract logical reasoning (systems, code, proofs)", emoji: "🔗", score: { tech: 4, engineering: 4, research: 2 } },
      { label: "Verbal persuasion and structural writing", emoji: "🖋️", score: { law: 4, journalism: 4, social: 2 } },
      { label: "Visual-spatial awareness and aesthetic theory", emoji: "🖼️", score: { design: 4, arts: 4, engineering: 1 } },
      { label: "Empathy, active listening, and intuition", emoji: "👂", score: { psychology: 4, medical: 4, social: 4 } },
    ],
  },

  // ── Phase 3: Subjects ──────────────────────────────────────────────────────
  {
    id: 9,
    phase: "subjects",
    text: "If you had to redo a high school exam, you'd choose:",
    hint: "Which subject felt like exploring a new world?",
    options: [
      { label: "Physics – the laws that govern the universe", emoji: "⚛️", score: { science: 4, engineering: 4, research: 2 } },
      { label: "History – the stories of how we got here", emoji: "📜", score: { law: 3, journalism: 3, social: 4 } },
      { label: "Fine Arts – the expression of human emotion", emoji: "🎭", score: { arts: 4, design: 3 } },
      { label: "Economics – how the world's resources moving", emoji: "💹", score: { commerce: 4, finance: 4, management: 3 } },
    ],
  },
  {
    id: 10,
    phase: "subjects",
    text: "If you could win a Nobel Prize, which would it be?",
    hint: "Your aspirations are your guiding light.",
    options: [
      { label: "Physics or Chemistry", emoji: "⚛️", score: { science: 4, engineering: 4, research: 4 } },
      { label: "Medicine or Physiology", emoji: "💉", score: { medical: 4, science: 3, research: 3 } },
      { label: "Peace or Literature", emoji: "🕊️", score: { law: 4, social: 4, journalism: 3 } },
      { label: "Economic Sciences", emoji: "🏦", score: { commerce: 4, finance: 4, management: 4 } },
    ],
  },
  {
    id: 11,
    phase: "subjects",
    text: "In a library, which section do you go to first?",
    hint: "What you read for fun is what you should work in.",
    options: [
      { label: "Science & Technology", emoji: "🚀", score: { tech: 4, engineering: 4, research: 2 } },
      { label: "Crime, Law & True Stories", emoji: "🕵️", score: { law: 4, journalism: 3, social: 3 } },
      { label: "Entrepreneurship & Investing", emoji: "📈", score: { management: 4, commerce: 4, finance: 4 } },
      { label: "Graphic Novels & World History", emoji: "🎞️", score: { arts: 4, design: 3, journalism: 3 } },
    ],
  },
  {
    id: 12,
    phase: "subjects",
    text: "Which elective course sounds most appealing?",
    hint: "What would you study just for fun?",
    options: [
      { label: "Digital Innovation and Cryptography", emoji: "🛡️", score: { tech: 4, engineering: 2 } },
      { label: "International Law and Global Ethics", emoji: "🌎", score: { law: 4, social: 4, journalism: 3 } },
      { label: "UX Research and Brand Identity", emoji: "🎨", score: { design: 4, arts: 3, management: 4 } },
      { label: "Behavioral Economics and Marketing", emoji: "⚖️", score: { psychology: 3, commerce: 4, management: 4 } },
    ],
  },
];

// ─── Career catalogue ─────────────────────────────────────────────────────────
const careerCatalogue: Record<
  string,
  {
    title: string;
    subtitle: string;
    desc: string;
    path: string;
    icon: React.ElementType;
    gradient: string;
    iconBg: string;
    tags: string[];
  }
> = {
  engineering: {
    title: "Software / Hardware Engineer",
    subtitle: "Engineering",
    desc: "Design, build, and scale systems that power everything from smartphones to spacecraft. One of the most versatile and future-proof careers globally.",
    path: "/career/engineering",
    icon: Zap,
    gradient: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
    tags: ["Problem Solving", "Mathematics", "Systems Design"],
  },
  tech: {
    title: "AI / Data Scientist",
    subtitle: "Technology",
    desc: "Harness machine learning and massive datasets to build intelligent systems and extract insights that reshape entire industries.",
    path: "/career/engineering",
    icon: BrainCircuit,
    gradient: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400",
    tags: ["Python", "Statistics", "Deep Learning"],
  },
  medical: {
    title: "Medical Professional",
    subtitle: "Healthcare",
    desc: "Diagnose, treat, and prevent illness — saving lives and elevating health standards for communities around the world.",
    path: "/career/medical",
    icon: Stethoscope,
    gradient: "from-teal-500 to-emerald-600",
    iconBg: "bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400",
    tags: ["Empathy", "Critical Thinking", "Biology"],
  },
  law: {
    title: "Legal Consultant / Lawyer",
    subtitle: "Law & Civil Services",
    desc: "Champion justice, navigate complex legislation, and represent clients in high-stakes legal battles that shape policy and society.",
    path: "/career/law-civil",
    icon: Scale,
    gradient: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",
    tags: ["Critical Analysis", "Public Speaking", "Writing"],
  },
  management: {
    title: "Business Manager / Executive",
    subtitle: "Management",
    desc: "Lead cross-functional teams, craft strategy, and steer organisations toward growth in an ever-changing competitive landscape.",
    path: "/career/management",
    icon: Briefcase,
    gradient: "from-sky-500 to-cyan-600",
    iconBg: "bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400",
    tags: ["Leadership", "Strategy", "Communication"],
  },
  finance: {
    title: "Investment Banker / CA",
    subtitle: "Finance",
    desc: "Navigate capital markets, structure deals worth millions, and guide organisations through complex financial landscapes.",
    path: "/career/management",
    icon: Calculator,
    gradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
    tags: ["Accounting", "Risk Analysis", "Financial Law"],
  },
  commerce: {
    title: "Entrepreneur / Business Analyst",
    subtitle: "Commerce",
    desc: "Identify market gaps, build sustainable business models, and turn bold ideas into profitable ventures that create real value.",
    path: "/career/management",
    icon: BarChart3,
    gradient: "from-orange-500 to-red-500",
    iconBg: "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400",
    tags: ["Business Acumen", "Analytics", "Strategy"],
  },
  design: {
    title: "UX Designer / Creative Director",
    subtitle: "Design",
    desc: "Blend aesthetics with usability to craft digital products that millions love — from mobile apps to brand identities.",
    path: "/career/engineering",
    icon: Wand2,
    gradient: "from-pink-500 to-rose-600",
    iconBg: "bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400",
    tags: ["Figma", "User Testing", "Visual Design"],
  },
  arts: {
    title: "Media & Arts Professional",
    subtitle: "Arts",
    desc: "Create compelling content across film, journalism, illustration, or music that stirs emotions and sparks cultural conversations.",
    path: "/careers/arts",
    icon: Palette,
    gradient: "from-fuchsia-500 to-purple-600",
    iconBg: "bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-600 dark:text-fuchsia-400",
    tags: ["Creativity", "Storytelling", "Visual Arts"],
  },
  social: {
    title: "Social Worker / Counsellor",
    subtitle: "Social Sciences",
    desc: "Empower individuals and communities by providing guidance, advocacy, and support across education, mental health, and welfare.",
    path: "/careers/arts",
    icon: Heart,
    gradient: "from-rose-500 to-pink-600",
    iconBg: "bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400",
    tags: ["Empathy", "Active Listening", "Psychology"],
  },
  journalism: {
    title: "Journalist / Content Strategist",
    subtitle: "Media",
    desc: "Investigate stories, shape narratives, and inform the public through powerful writing, digital media, and investigative reporting.",
    path: "/careers/arts",
    icon: BookOpen,
    gradient: "from-cyan-500 to-sky-600",
    iconBg: "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400",
    tags: ["Writing", "Research", "Communication"],
  },
  marketing: {
    title: "Digital Marketer / Brand Strategist",
    subtitle: "Marketing",
    desc: "Build and grow brands by creating data-driven campaigns that connect products with the people who need them most.",
    path: "/career/management",
    icon: Layers,
    gradient: "from-indigo-500 to-violet-600",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400",
    tags: ["SEO", "Social Media", "Analytics"],
  },
  research: {
    title: "Research Scientist",
    subtitle: "Research",
    desc: "Push the boundaries of human knowledge through rigorous experimentation, peer-reviewed publication, and cross-disciplinary collaboration.",
    path: "/careers/science",
    icon: ShieldCheck,
    gradient: "from-lime-500 to-green-600",
    iconBg: "bg-lime-100 dark:bg-lime-900/40 text-lime-600 dark:text-lime-400",
    tags: ["Scientific Method", "Data Analysis", "Problem Solving"],
  },
  science: {
    title: "Pure Science & Research",
    subtitle: "Science",
    desc: "Explore the fundamental laws of nature, from quantum physics to molecular biology, and contribute to the next generation of human discovery.",
    path: "/careers/science",
    icon: Sparkles,
    gradient: "from-emerald-600 to-green-700",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
    tags: ["Experimental Lab", "Theoretical Physics", "Data Modeling"],
  },
};

// ─── Phase metadata ───────────────────────────────────────────────────────────
const phases = [
  {
    key: "interests",
    label: "Interests",
    icon: Lightbulb,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
    description: "What naturally excites you?",
  },
  {
    key: "skills",
    label: "Skills",
    icon: Brain,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    description: "What are you naturally good at?",
  },
  {
    key: "subjects",
    label: "Subjects",
    icon: BookOpen,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800",
    description: "What do you enjoy learning?",
  },
] as const;

// ─── Score calculation ────────────────────────────────────────────────────────
function calculateResults(responses: ScoreMap[]) {
  const totals: Record<string, number> = {};
  const maxPossible: Record<string, number> = {};

  // Accumulate actual scores
  responses.forEach((response) => {
    Object.entries(response).forEach(([field, value]) => {
      totals[field] = (totals[field] || 0) + (value as number);
    });
  });

  // Calculate max achievable score per field across all questions
  questions.forEach((q) => {
    q.options.forEach((opt) => {
      Object.entries(opt.score).forEach(([field, value]) => {
        maxPossible[field] = Math.max(maxPossible[field] || 0, value as number);
      });
    });
  });

  // For each field, compute theoretical max if you always picked the best option
  const fieldMaxTotal: Record<string, number> = {};
  questions.forEach((q) => {
    const bestPerField: Record<string, number> = {};
    q.options.forEach((opt) => {
      Object.entries(opt.score).forEach(([field, value]) => {
        if (!bestPerField[field] || (value as number) > bestPerField[field]) {
          bestPerField[field] = value as number;
        }
      });
    });
    Object.entries(bestPerField).forEach(([field, value]) => {
      fieldMaxTotal[field] = (fieldMaxTotal[field] || 0) + value;
    });
  });

  const results = Object.entries(totals)
    .map(([field, score]) => {
      const theoreticalMax = fieldMaxTotal[field] || 1;
      // Scale to 40–97 range for realism (nobody gets 100%)
      const raw = (score / theoreticalMax) * 100;
      const percentage = Math.min(Math.max(Math.round(40 + raw * 0.57), 40), 97);
      return {
        id: field,
        ...careerCatalogue[field],
        match: percentage,
        rawScore: score,
      };
    })
    .filter((r) => r.title) // only careers in catalogue
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);

  // Ensure top result is meaningfully higher
  if (results.length > 0 && results[0].match < 85) results[0].match = Math.min(results[0].match + 8, 97);

  return results;
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return <>{current}</>;
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Assessment = () => {
  const [stage, setStage] = useState<"intro" | "quiz" | "results">("intro");
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<ScoreMap[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const currentQuestion = questions[currentStep];
  const totalQuestions = questions.length;
  const progress = ((currentStep) / totalQuestions) * 100;

  const currentPhaseIndex = phases.findIndex((p) => p.key === currentQuestion?.phase);
  const currentPhase = phases[currentPhaseIndex];

  // Questions per phase
  const phaseProgress = currentQuestion
    ? questions.filter((q, i) => i <= currentStep && q.phase === currentQuestion.phase).length
    : 0;
  const phaseTotal = questions.filter((q) => q.phase === currentQuestion?.phase).length;

  const handleOptionSelect = (optionIdx: number) => {
    if (isAnimating) return;
    setSelectedOption(optionIdx);

    setTimeout(() => {
      const score = currentQuestion.options[optionIdx].score;
      const updatedResponses = [...responses, score];
      setResponses(updatedResponses);
      setSelectedOption(null);

      if (currentStep < totalQuestions - 1) {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setIsAnimating(false);
        }, 300);
      } else {
        setStage("results");
      }
    }, 400);
  };

  const resetAssessment = () => {
    setStage("intro");
    setCurrentStep(0);
    setResponses([]);
    setSelectedOption(null);
    setIsAnimating(false);
  };

  // ── Intro Screen ─────────────────────────────────────────────────────────
  if (stage === "intro") {
    return (
      <PageLayout>
        <div className="max-w-3xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Back button */}
          <Button variant="ghost" className="rounded-full gap-2 -ml-4 hover:bg-muted mb-8" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>

          {/* Hero */}
          <div className="text-center space-y-6 mb-12">
            <div className="relative inline-flex">
              <div className="w-20 h-20 rounded-[1.75rem] bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 mx-auto">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-800 text-xs font-bold tracking-tight">
                <Zap className="w-3.5 h-3.5" />
                AI-Powered Career Matching
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
                Discover Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  Perfect Career
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
                Answer 12 carefully crafted questions across 3 dimensions — your interests, skills, and
                favourite subjects — and get a personalised career match report.
              </p>
            </div>
          </div>

          {/* Phase overview cards */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <div
                  key={phase.key}
                  className={`relative p-5 rounded-2xl border ${phase.border} ${phase.bg} flex flex-col items-center gap-3 text-center`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-white dark:bg-card border border-border flex items-center justify-center shadow-sm`}>
                    <Icon className={`w-5 h-5 ${phase.color}`} />
                  </div>
                  <div>
                    <div className="font-black text-foreground text-sm">{phase.label}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{phase.description}</div>
                  </div>
                  <div className={`absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-foreground text-background text-xs font-black flex items-center justify-center`}>
                    {idx * 4 + 4}Q
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12 pt-8 border-t border-border">
            {[
              { value: "12", label: "Questions" },
              { value: "~5", label: "Minutes" },
              { value: "Top 3", label: "Career Matches" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-foreground">{s.value}</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setStage("quiz")}
            size="lg"
            className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-black text-lg gap-3 shadow-2xl shadow-blue-500/30 transition-all hover:scale-[1.02] border-0"
          >
            Start My Career Assessment
            <ArrowRight className="w-5 h-5" />
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4 font-medium">
            Free • No sign-up required • Instant results
          </p>
        </div>
      </PageLayout>
    );
  }

  // ── Results Screen ────────────────────────────────────────────────────────
  if (stage === "results") {
    const topMatches = calculateResults(responses);

    return (
      <PageLayout>
        <div className="max-w-5xl mx-auto py-12 px-6 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Header */}
          <header className="text-center space-y-4">
            <div className="relative inline-flex mx-auto mb-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30 mx-auto">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                Your Personalised Results Are Ready
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight">
                Your Career DNA Report
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
                Based on your answers across interests, skills, and subjects, here are your top 3 recommended career paths ranked by compatibility.
              </p>
            </div>
          </header>

          {/* Result cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {topMatches.map((career, idx) => {
              const Icon = career.icon;
              const rankLabels = ["🥇 Best Match", "🥈 Strong Fit", "🥉 Great Option"];
              const rankColors = [
                "border-primary ring-4 ring-primary/10",
                "border-border",
                "border-border",
              ];

              return (
                <div
                  key={career.id}
                  className={`relative bg-card border-2 rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10 ${rankColors[idx]} ${idx === 0 ? "md:-translate-y-3 shadow-xl" : ""}`}
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Gradient top strip */}
                  <div className={`h-2 w-full bg-gradient-to-r ${career.gradient}`} />

                  {/* Rank badge */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-background/90 backdrop-blur-sm border border-border rounded-full px-3 py-1 text-xs font-black text-foreground shadow-sm">
                      {rankLabels[idx]}
                    </span>
                  </div>

                  {/* Bookmark */}
                  <div className="absolute top-5 right-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full h-9 w-9 bg-background/70 backdrop-blur-md border border-border hover:text-rose-500 transition-all ${isBookmarked(career.title) ? "text-rose-500" : "text-muted-foreground"}`}
                      onClick={() => {
                        if (isBookmarked(career.title)) {
                          removeBookmark(career.title);
                        } else {
                          addBookmark({
                            id: career.title,
                            type: "career",
                            title: career.title,
                            description: career.desc,
                            path: career.path,
                            category: "Assessment Result",
                          });
                        }
                      }}
                    >
                      <Heart className={`w-4 h-4 ${isBookmarked(career.title) ? "fill-current" : ""}`} />
                    </Button>
                  </div>

                  <div className="flex flex-col flex-1 p-7 pt-12 gap-5">
                    {/* Icon + match % */}
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-[1.25rem] ${career.iconBg} flex items-center justify-center shadow-sm`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="text-right">
                        <div className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${career.gradient}`}>
                          <CountUp target={career.match} duration={900 + idx * 200} />%
                        </div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          Match
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1.5">
                      <div className={`h-2.5 w-full rounded-full bg-muted overflow-hidden`}>
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${career.gradient} transition-all duration-1000`}
                          style={{
                            width: `${career.match}%`,
                            transitionDelay: `${idx * 200 + 400}ms`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Title & subtitle */}
                    <div>
                      <Badge variant="outline" className="rounded-full text-[10px] font-black uppercase tracking-widest border-primary/20 text-primary mb-2">
                        {career.subtitle}
                      </Badge>
                      <h3 className="text-xl font-black text-foreground leading-tight">{career.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{career.desc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {career.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-muted/60 border border-border text-xs font-bold text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button
                      onClick={() => navigate(career.path)}
                      className={`w-full h-12 rounded-xl bg-gradient-to-r ${career.gradient} text-white font-black text-sm gap-2 group/btn shadow-lg hover:opacity-90 transition-all border-0`}
                    >
                      <Map className="w-4 h-4" />
                      Explore This Career
                      <ChevronRight className="w-4 h-4 ml-auto group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed AI Analysis - Premium Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full bg-gradient-to-br from-white/80 via-white/40 to-white/60 dark:from-white/[0.05] dark:via-transparent dark:to-white/[0.02] backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[3.5rem] p-8 md:p-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden relative"
          >
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none opacity-50" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none opacity-30" />
            
            <div className="relative z-10 flex flex-col gap-14">
              {/* Header Section: Title + Score Ring */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-10 pb-10 border-b border-border/40">
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 max-w-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-violet-600 flex items-center justify-center shadow-xl shadow-primary/20">
                      <BrainCircuit className="w-7 h-7 text-white" />
                    </div>
                    <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/30 text-primary dark:text-primary-foreground bg-primary/5 text-[10px] font-black uppercase tracking-[0.2em]">
                      AI Career Analysis v2.5
                    </Badge>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-loose">
                    Your Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600">Career Strategy</span>
                  </h3>
                  <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                    Based on your unique combination of interests and cognitive strengths, our algorithm identifies your peak potential in the following areas.
                  </p>
                </div>

                {/* Match Score Radial Indicator */}
                <div className="relative flex items-center justify-center">
                  <svg className="w-48 h-48 md:w-56 md:h-56 transform -rotate-90">
                    <circle
                      cx="50%" cy="50%" r="45%"
                      className="stroke-muted/10 fill-none"
                      strokeWidth="12"
                    />
                    <motion.circle
                      initial={{ strokeDasharray: "0, 1000" }}
                      animate={{ strokeDasharray: `${2 * Math.PI * 45 * (topMatches[0]?.match || 0) / 100}, 1000` }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                      cx="50%" cy="50%" r="45%"
                      className="stroke-primary fill-none line-cap-round"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-foreground tracking-tight">{topMatches[0]?.match}%</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Match Accuracy</span>
                  </div>
                  {/* Subtle Glow */}
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10" />
                </div>
              </div>

              {/* Insights Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Expert AI Quote Box */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="lg:col-span-1 p-8 rounded-[2.5rem] bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="w-20 h-20 text-primary" />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="w-12 h-1 bg-primary rounded-full" />
                    <p className="text-lg font-bold text-foreground leading-relaxed italic">
                      "Your cognitive profile is remarkably balanced. You possess the analytical rigor of an engineer combined with the visionary aesthetic of a designer. This 'Hybrid-Creative' archetype is highly sought after in modern tech ecosystems."
                    </p>
                    <div className="flex items-center gap-3 pt-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                        <UserCheck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-foreground uppercase tracking-widest">AI Counselor</div>
                        <div className="text-[10px] font-bold text-muted-foreground">Expert Mode Active</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Analysis Cards */}
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
                  {/* Why it Fits Card */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-[2.5rem] bg-white/50 dark:bg-white/[0.02] border border-white/50 dark:border-white/10 shadow-xl shadow-black/[0.02] space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50">
                        <Target className="w-6 h-6" />
                      </div>
                      <h4 className="font-black text-foreground text-sm uppercase tracking-[0.15em]">Core Alignment</h4>
                    </div>
                    <div className="space-y-4">
                      {[
                        { text: "Analytical System Mastery", icon: BarChart3 },
                        { text: "Creative Spatial Awareness", icon: Palette },
                        { text: "Solution-Oriented Growth Mindset", icon: Lightbulb }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-colors border border-transparent hover:border-border/40 group/item">
                          <item.icon className="w-5 h-5 text-muted-foreground group-hover/item:text-primary transition-colors" />
                          <span className="text-sm font-bold text-muted-foreground group-hover/item:text-foreground transition-colors">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Roadmap Card */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-[2.5rem] bg-white/50 dark:bg-white/[0.02] border border-white/50 dark:border-white/10 shadow-xl shadow-black/[0.02] space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                        <Zap className="w-6 h-6" />
                      </div>
                      <h4 className="font-black text-foreground text-sm uppercase tracking-[0.15em]">Next-Gen Steps</h4>
                    </div>
                    <div className="space-y-3">
                      {[
                        "Audit Top Global Universities",
                        "Build Your First Portfolio Project",
                        "Connect with Indstry Mentors"
                      ].map((step, i) => (
                        <Button 
                          key={i} 
                          variant="ghost" 
                          className="w-full justify-start h-14 rounded-2xl px-5 text-sm font-bold gap-4 hover:bg-primary/5 hover:text-primary group/step border border-transparent hover:border-primary/20"
                        >
                          <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-[10px] font-black group-hover/step:bg-primary group-hover/step:text-white transition-all">
                            {i + 1}
                          </div>
                          {step}
                          <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover/step:opacity-100 group-hover/step:translate-x-1 transition-all" />
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Interactive Refinement Bar */}
            <div className="mt-14 pt-12 border-t border-border/40 relative z-10 flex flex-col items-center gap-8">
              <div className="flex items-center gap-4 bg-muted/30 px-6 py-2 rounded-full border border-border/50">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Want to dive deeper? Refine with AI</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "What skills should I learn first?",
                  "Best colleges in India for this path",
                  "Average starting salary insights",
                  "Day in the life of a professional"
                ].map(q => (
                  <Button 
                    key={q}
                    variant="ghost"
                    onClick={() => navigate("/ai-guide", { state: { query: q } })}
                    className="rounded-2xl px-6 py-6 border border-border/50 hover:bg-white dark:hover:bg-white/5 hover:border-primary/40 hover:text-primary transition-all text-sm font-bold bg-muted/10 shadow-sm"
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Secondary actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 pb-20">
            <Button
              variant="outline"
              onClick={resetAssessment}
              className="rounded-2xl h-16 px-12 font-black border-2 gap-3 hover:bg-muted/50 hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <RefreshCcw className="w-5 h-5" />
              Retake Assessment
            </Button>
            <Button
              onClick={() => navigate("/career-paths")}
              className="rounded-2xl h-16 px-12 font-black gap-3 bg-black dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 overflow-hidden relative group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                Browse All Careers
                <ChevronRight className="w-5 h-5" />
              </span>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  // ── Quiz Screen ───────────────────────────────────────────────────────────
  return (
    <PageLayout>
      <div className={`max-w-2xl mx-auto py-10 px-6 space-y-8 transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>

        {/* Header */}
        <header className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="rounded-full gap-2 -ml-4 hover:bg-muted text-muted-foreground" onClick={resetAssessment}>
              <ArrowLeft className="w-4 h-4" />
              Exit
            </Button>
            <span className="text-sm font-bold text-muted-foreground">
              {currentStep + 1} / {totalQuestions}
            </span>
          </div>

          {/* Phase pills */}
          <div className="flex gap-2 flex-wrap">
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              const phaseQuestions = questions.filter((q) => q.phase === phase.key);
              const phaseStart = questions.findIndex((q) => q.phase === phase.key);
              const isDone = currentStep >= phaseStart + phaseQuestions.length;
              const isActive = phase.key === currentQuestion?.phase;

              return (
                <div
                  key={phase.key}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                    isActive
                      ? `${phase.bg} ${phase.border} ${phase.color}`
                      : isDone
                      ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
                      : "bg-muted border-border text-muted-foreground"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                  {phase.label}
                </div>
              );
            })}
          </div>

          {/* Progress bars */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <span className={currentPhase?.color}>{currentPhase?.label} — Q{phaseProgress} of {phaseTotal}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2.5 rounded-full bg-muted shadow-inner" />
          </div>
        </header>

        {/* Question card */}
        <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-xl ring-1 ring-inset ring-black/5 dark:ring-white/10">
          {/* Card top strip with phase color */}
          <div
            className={`px-8 py-5 border-b border-border flex items-center gap-4 ${currentPhase?.bg}`}
          >
            {(() => {
              const Icon = currentPhase?.icon;
              return Icon ? (
                <div className={`w-10 h-10 rounded-xl bg-white dark:bg-card border border-border flex items-center justify-center shadow-sm shrink-0`}>
                  <Icon className={`w-5 h-5 ${currentPhase?.color}`} />
                </div>
              ) : null;
            })()}
            <div>
              <div className={`text-xs font-black uppercase tracking-widest ${currentPhase?.color}`}>
                {currentPhase?.label} • Question {phaseProgress}
              </div>
              <h2 className="text-xl md:text-2xl font-black text-foreground leading-tight mt-0.5">
                {currentQuestion.text}
              </h2>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Hint */}
            <p className="text-sm text-muted-foreground font-medium mb-6 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 shrink-0 text-amber-500" />
              {currentQuestion.hint}
            </p>

            {/* Options */}
            <div className="grid gap-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 group flex items-center gap-4 shadow-sm ${
                      isSelected
                        ? "border-primary bg-primary/5 scale-[0.99]"
                        : "border-border hover:border-primary/60 hover:bg-primary/5 hover:shadow-md"
                    } ${selectedOption !== null && !isSelected ? "opacity-50" : ""}`}
                  >
                    {/* Emoji */}
                    <span className="text-2xl shrink-0 w-10 text-center">{option.emoji}</span>

                    {/* Label */}
                    <span className={`text-base font-bold flex-1 transition-colors ${isSelected ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                      {option.label}
                    </span>

                    {/* Arrow / check */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground scale-110"
                          : "bg-muted group-hover:bg-primary group-hover:text-primary-foreground"
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-1.5 flex-wrap px-4">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i < currentStep
                  ? "w-2.5 h-2.5 bg-primary"
                  : i === currentStep
                  ? "w-6 h-2.5 bg-primary"
                  : "w-2.5 h-2.5 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Assessment;
