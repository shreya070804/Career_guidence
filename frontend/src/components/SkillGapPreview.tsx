import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import {
  BarChart2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Target,
} from "lucide-react";

const mockSkills = [
  { name: "Data Structures", status: "mastered", pct: 85 },
  { name: "System Design", status: "developing", pct: 45 },
  { name: "Cloud Platforms", status: "gap", pct: 15 },
  { name: "Problem Solving", status: "mastered", pct: 90 },
];

const statusConfig = {
  mastered: {
    icon: CheckCircle2,
    color: "text-violet-600 dark:text-violet-400",
    bar: "bg-gradient-to-r from-violet-400 to-indigo-500",
    bg: "bg-violet-50 dark:bg-violet-900/10",
  },
  developing: {
    icon: AlertCircle,
    color: "text-blue-600 dark:text-blue-400",
    bar: "bg-gradient-to-r from-blue-400 to-indigo-400",
    bg: "bg-blue-50 dark:bg-blue-900/10",
  },
  gap: {
    icon: XCircle,
    color: "text-slate-600 dark:text-slate-400",
    bar: "bg-gradient-to-r from-slate-400 to-slate-500",
    bg: "bg-slate-50 dark:bg-slate-900/10",
  },
} as const;

const SkillGapPreview = () => {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-background">
      {/* Background depth */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-violet-400/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 lg:gap-24 items-center">

          {/* Left: Copy Strategy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-violet-50/50 dark:bg-violet-900/10 backdrop-blur-sm text-violet-600 dark:text-violet-400 px-4 py-2 rounded-full border border-violet-100/50 dark:border-violet-800/20 text-[10px] font-black tracking-widest uppercase">
              <Target className="w-3.5 h-3.5" />
              Know Exactly Where You Stand
            </div>

            <div className="space-y-5">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight">
                Find Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400">
                  Skill Gaps
                </span>{" "}
                Instantly
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg font-medium opacity-80">
                Select a career, rate your current skills with a simple slider, and get an instant
                readiness score — with personalized learning recommendations for every gap.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "🎯", label: "Select Career", desc: "Engineering, Medical, Law & more" },
                { icon: "⚡", label: "Rate Skills", desc: "Honest self-assessment sliders" },
                { icon: "📊", label: "See Your Gap", desc: "Instant readiness score + tips" },
              ].map((step) => (
                <motion.div 
                  key={step.label} 
                  whileHover={{ y: -5 }}
                  className="bg-white/40 dark:bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-4 text-center shadow-lg shadow-violet-500/5 transition-all cursor-default"
                >
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <div className="font-black text-foreground text-xs leading-tight mb-1">{step.label}</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">{step.desc}</div>
                </motion.div>
              ))}
            </div>

            <Button
              onClick={() => navigate("/skill-gap")}
              size="lg"
              className="rounded-xl h-14 px-8 text-base font-black bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0 shadow-2xl shadow-violet-500/20 gap-3 transition-all hover:scale-105 active:scale-95"
            >
              Analyze My Skills — Free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Right: Mock UI preview - Refined scaling */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            whileInView={{ opacity: 1, scale: 0.95, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-md mx-auto lg:ml-auto"
          >
            <div className="bg-white/80 dark:bg-card/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden ring-1 ring-inset ring-black/5 dark:ring-white/10 group scale-[0.9] lg:scale-100 origin-center transition-transform hover:scale-[1.02]">
              {/* Mock header */}
              <div className="bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/10">
                  <BarChart2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-black text-sm tracking-tight">Software Engineer</div>
                  <div className="text-white/70 text-[10px] font-black uppercase tracking-widest">Skill readiness: 68%</div>
                </div>
                <div className="ml-auto">
                  <div className="relative w-14 h-14">
                    <svg viewBox="0 0 44 44" className="-rotate-90 w-14 h-14">
                      <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                      <motion.circle 
                        initial={{ strokeDashoffset: 113 }}
                        animate={{ strokeDashoffset: 113 * (1 - 0.68) }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        cx="22" cy="22" r="18" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"
                        strokeDasharray="113"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-black text-xs">68%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mock skill rows */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 space-y-4"
              >
                {mockSkills.map((skill) => {
                  const cfg = statusConfig[skill.status as keyof typeof statusConfig];
                  const Icon = cfg.icon;
                  return (
                    <motion.div 
                      key={skill.name} 
                      variants={itemVariants}
                      className={`rounded-2xl p-4 ${cfg.bg} border border-white/10`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${cfg.color}`} />
                          <span className="text-sm font-black text-foreground tracking-tight">{skill.name}</span>
                        </div>
                        <span className={`text-xs font-black ${cfg.color}`}>{skill.pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted/50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 1.5, delay: 1 }}
                          className={`h-full ${cfg.bar} origin-left rounded-full`} 
                          style={{ width: `${skill.pct}%` }} 
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Mock CTA */}
              <div className="px-6 pb-6">
                <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center gap-2 text-white text-sm font-black shadow-lg shadow-violet-500/10 border-0">
                  <Target className="w-4 h-4" />
                  Apply Skills Insights
                </Button>
              </div>
            </div>

            {/* Floating badges with Micro-animations */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-violet-600 text-white px-5 py-2.5 rounded-full font-black text-xs shadow-2xl shadow-violet-500/30 backdrop-blur-md border border-violet-400/50"
            >
              🚀 3 Skills Mastered
            </motion.div>

            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-card backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900/40 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="pr-2">
                <div className="text-[10px] font-black text-foreground uppercase tracking-wider mb-0.5">Critical Gap</div>
                <div className="text-xs font-bold text-muted-foreground">Cloud Platforms</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillGapPreview;
