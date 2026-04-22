import { useState } from "react";
import { LucideIcon, GraduationCap, Wrench, FileText, Briefcase, Rocket, ChevronDown, ChevronUp, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface RoadmapStep {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  badge?: string;
}

export interface SkillItem {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  type: "technical" | "soft";
}

export interface ExamItem {
  name: string;
  fullForm: string;
  purpose: string;
  difficulty: "High" | "Very High" | "Moderate";
  timing: string;
}

export interface InternshipItem {
  role: string;
  where: string;
  duration: string;
  focus: string;
}

export interface JobItem {
  title: string;
  type: "Entry" | "Mid" | "Senior";
  salaryRange: string;
  description: string;
}

export interface CareerRoadmapProps {
  title?: string;
  accentColor?: string;
  steps: RoadmapStep[];
  skills?: SkillItem[];
  exams?: ExamItem[];
  internships?: InternshipItem[];
  jobs?: JobItem[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const levelColor = {
  Beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  Intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  Advanced: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
};

const difficultyColor = {
  Moderate: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  High: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Very High": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

const jobTypeColor = {
  Entry: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  Mid: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 border-violet-200 dark:border-violet-800",
  Senior: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
};

// ─── Sub-section wrapper ──────────────────────────────────────────────────────
function SectionBlock({
  id,
  icon: Icon,
  label,
  description,
  accentBg,
  accentText,
  accentBorder,
  children,
  defaultOpen = true,
}: {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-[2rem] border-2 overflow-hidden transition-all duration-300 ${accentBorder} bg-card shadow-sm`}>
      {/* Header */}
      <button
        className={`w-full flex items-center justify-between px-8 py-6 gap-4 text-left transition-colors hover:bg-muted/40 ${open ? accentBg : ""}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className={`w-12 h-12 rounded-[1rem] ${accentBg} ${accentText} border ${accentBorder} flex items-center justify-center shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className={`font-black text-xl text-foreground leading-tight`}>{label}</div>
            <div className="text-sm text-muted-foreground font-medium mt-0.5 truncate">{description}</div>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-full ${accentBg} ${accentText} border ${accentBorder} flex items-center justify-center shrink-0 transition-transform duration-300`}>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Collapsible content */}
      {open && (
        <div className="px-8 pb-8 pt-2 border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const CareerRoadmap = ({
  title = "Step-by-Step Career Roadmap",
  accentColor = "blue",
  steps,
  skills,
  exams,
  internships,
  jobs,
}: CareerRoadmapProps) => {
  return (
    <section className="space-y-6 py-6">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-2">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground">{title}</h2>
          <p className="text-muted-foreground font-medium mt-1">
            Your complete, stage-by-stage guide from school to your dream career.
          </p>
        </div>
        <div className="h-1 flex-1 bg-gradient-to-r from-primary/30 to-transparent rounded-full hidden md:block" />
      </div>

      {/* ── 1. Education Requirements (timeline) ──────────────────────────── */}
      <SectionBlock
        id="education"
        icon={GraduationCap}
        label="Education Requirements"
        description="Degrees, programs, and academic milestones you must complete."
        accentBg="bg-blue-50 dark:bg-blue-900/20"
        accentText="text-blue-600 dark:text-blue-400"
        accentBorder="border-blue-200 dark:border-blue-800"
        defaultOpen={true}
      >
        <div className="relative mt-6 pb-4">
          {/* Vertical spine */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-blue-200 to-transparent dark:from-blue-700 dark:via-blue-800 rounded-full" />

          <div className="space-y-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === steps.length - 1;
              return (
                <div
                  key={idx}
                  className="relative pl-16 animate-in fade-in slide-in-from-left duration-500"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Step number badge on the spine */}
                  <div
                    className={`absolute left-0 w-10 h-10 rounded-xl ${step.color} flex items-center justify-center z-10 border-2 border-background shadow-md`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Card */}
                  <div className="bg-muted/30 border border-border rounded-2xl p-5 hover:shadow-md transition-all duration-300 group hover:border-blue-200 dark:hover:border-blue-800">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full px-2.5 py-0.5">
                          Step {idx + 1}
                        </span>
                        {step.badge && (
                          <span className="px-3 py-0.5 bg-muted rounded-full text-xs font-bold uppercase tracking-widest text-muted-foreground border border-border">
                            {step.badge}
                          </span>
                        )}
                      </div>
                      {isLast && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Final Goal
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-black text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionBlock>

      {/* ── 2. Skills to Learn ────────────────────────────────────────────── */}
      {skills && skills.length > 0 && (
        <SectionBlock
          id="skills"
          icon={Wrench}
          label="Skills to Learn"
          description="Technical mastery and soft skills that will set you apart."
          accentBg="bg-violet-50 dark:bg-violet-900/20"
          accentText="text-violet-600 dark:text-violet-400"
          accentBorder="border-violet-200 dark:border-violet-800"
          defaultOpen={true}
        >
          <div className="mt-6 space-y-5">
            {/* Technical skills */}
            {skills.filter((s) => s.type === "technical").length > 0 && (
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-violet-400 rounded-full" />
                  Technical Skills
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {skills.filter((s) => s.type === "technical").map((skill, i) => (
                    <div
                      key={i}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-bold ${levelColor[skill.level]}`}
                    >
                      <span>{skill.name}</span>
                      <span className="text-[10px] font-black opacity-70 uppercase">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Soft skills */}
            {skills.filter((s) => s.type === "soft").length > 0 && (
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-violet-400 rounded-full" />
                  Soft Skills
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {skills.filter((s) => s.type === "soft").map((skill, i) => (
                    <div
                      key={i}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-bold ${levelColor[skill.level]}`}
                    >
                      <span>{skill.name}</span>
                      <span className="text-[10px] font-black opacity-70 uppercase">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="flex flex-wrap gap-3 pt-3 border-t border-border">
              <span className="text-xs font-bold text-muted-foreground">Proficiency levels:</span>
              {(["Beginner", "Intermediate", "Advanced"] as const).map((l) => (
                <span key={l} className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${levelColor[l]}`}>{l}</span>
              ))}
            </div>
          </div>
        </SectionBlock>
      )}

      {/* ── 3. Important Exams ────────────────────────────────────────────── */}
      {exams && exams.length > 0 && (
        <SectionBlock
          id="exams"
          icon={FileText}
          label="Important Exams"
          description="Key entrance and licensing examinations at each stage."
          accentBg="bg-amber-50 dark:bg-amber-900/20"
          accentText="text-amber-600 dark:text-amber-400"
          accentBorder="border-amber-200 dark:border-amber-800"
          defaultOpen={true}
        >
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exams.map((exam, i) => (
              <div
                key={i}
                className="relative bg-muted/30 border border-border rounded-2xl p-5 hover:border-amber-200 dark:hover:border-amber-800 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="font-black text-foreground text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {exam.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-0.5">{exam.fullForm}</div>
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${difficultyColor[exam.difficulty]}`}>
                    {exam.difficulty}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{exam.purpose}</p>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted rounded-full px-3 py-1">
                  <Clock className="w-3 h-3" />
                  {exam.timing}
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* ── 4. Internships ────────────────────────────────────────────────── */}
      {internships && internships.length > 0 && (
        <SectionBlock
          id="internships"
          icon={Briefcase}
          label="Internships & Practical Exposure"
          description="Real-world experiences that build your portfolio and network."
          accentBg="bg-teal-50 dark:bg-teal-900/20"
          accentText="text-teal-600 dark:text-teal-400"
          accentBorder="border-teal-200 dark:border-teal-800"
          defaultOpen={true}
        >
          <div className="mt-6 space-y-4">
            {internships.map((intern, i) => (
              <div
                key={i}
                className="flex gap-5 items-start bg-muted/30 border border-border rounded-2xl p-5 hover:border-teal-200 dark:hover:border-teal-800 hover:shadow-md transition-all group"
              >
                {/* Number badge */}
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-black text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {intern.role}
                    </span>
                    <Badge variant="outline" className="rounded-full text-[10px] font-black border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400">
                      {intern.duration}
                    </Badge>
                  </div>
                  <div className="text-xs font-bold text-muted-foreground mb-2">📍 {intern.where}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{intern.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* ── 5. Job Opportunities ──────────────────────────────────────────── */}
      {jobs && jobs.length > 0 && (
        <SectionBlock
          id="jobs"
          icon={Rocket}
          label="Job Opportunities"
          description="Roles you can target at different stages of your career."
          accentBg="bg-emerald-50 dark:bg-emerald-900/20"
          accentText="text-emerald-600 dark:text-emerald-400"
          accentBorder="border-emerald-200 dark:border-emerald-800"
          defaultOpen={true}
        >
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job, i) => (
              <div
                key={i}
                className="bg-muted/30 border border-border rounded-2xl p-5 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="font-black text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                    {job.title}
                  </h4>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${jobTypeColor[job.type]}`}>
                    {job.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{job.description}</p>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full px-3 py-1">
                  💰 {job.salaryRange}
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      )}
    </section>
  );
};

export default CareerRoadmap;
