import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";
import {
  BrainCircuit,
  BarChart3,
  ShieldCheck,
  Layers,
  Wand2,
  TrendingUp,
  Map,
  ChevronRight,
  Flame,
} from "lucide-react";

const trendingCareers = [
  {
    id: "ai-engineer",
    title: "AI Engineer",
    icon: BrainCircuit,
    description:
      "Design and build AI models, machine learning pipelines, and intelligent systems that power the next generation of technology.",
    demand: "Explosive",
    demandLevel: 5,
    tags: ["Machine Learning", "Python", "Deep Learning"],
    gradient: "from-violet-500 to-purple-600",
    bgGlow: "bg-violet-500/10 dark:bg-violet-400/10",
    iconBg: "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400",
    badgeColor: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
    route: "/career/engineering",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: BarChart3,
    description:
      "Extract actionable insights from massive datasets using statistical models and data visualization to drive strategic decisions.",
    demand: "Very High",
    demandLevel: 4,
    tags: ["Statistics", "SQL", "Data Visualization"],
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/10 dark:bg-blue-400/10",
    iconBg: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
    badgeColor: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    route: "/career/engineering",
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    icon: ShieldCheck,
    description:
      "Protect organizations from digital threats by monitoring networks, responding to incidents, and building robust security architectures.",
    demand: "High",
    demandLevel: 4,
    tags: ["Network Security", "Ethical Hacking", "Risk Management"],
    gradient: "from-emerald-500 to-teal-500",
    bgGlow: "bg-emerald-500/10 dark:bg-emerald-400/10",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
    badgeColor: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    route: "/career/engineering",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    icon: Layers,
    description:
      "Lead cross-functional teams to define product vision, prioritize features, and deliver solutions that users love and businesses need.",
    demand: "High",
    demandLevel: 4,
    tags: ["Strategy", "Agile", "User Research"],
    gradient: "from-amber-500 to-orange-500",
    bgGlow: "bg-amber-500/10 dark:bg-amber-400/10",
    iconBg: "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",
    badgeColor: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    route: "/career/management",
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    icon: Wand2,
    description:
      "Craft seamless, intuitive digital experiences by combining user research, wireframing, and visual design to delight millions.",
    demand: "Growing",
    demandLevel: 3,
    tags: ["Figma", "User Testing", "Prototyping"],
    gradient: "from-pink-500 to-rose-500",
    bgGlow: "bg-pink-500/10 dark:bg-pink-400/10",
    iconBg: "bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400",
    badgeColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    route: "/career/engineering",
  },
];

const demandDots = (level: number, gradient: string) =>
  Array.from({ length: 5 }, (_, i) => (
    <div
      key={i}
      className={`w-2 h-2 rounded-full transition-all ${
        i < level
          ? `bg-gradient-to-r ${gradient} opacity-100`
          : "bg-muted-foreground/20"
      }`}
    />
  ));

interface TrendingCareersProps {
  /** Show only 3 cards in compact mode (for homepage) */
  compact?: boolean;
}

const TrendingCareers = ({ compact = false }: TrendingCareersProps) => {
  const navigate = useNavigate();
  const displayed = compact ? trendingCareers.slice(0, 3) : trendingCareers;

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-background">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-400/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-5"
        >
          <div className="inline-flex items-center gap-2 bg-orange-50/50 dark:bg-orange-900/10 backdrop-blur-sm text-orange-600 dark:text-orange-400 px-5 py-2.5 rounded-full border border-orange-100/50 dark:border-orange-800/20 shadow-sm">
            <Flame className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-black tracking-widest uppercase">Global Trends</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-tight">
            Trending{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400">
              Career Paths
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            Discover the most sought-after roles shaping the future of work. These careers offer
            exceptional growth, impact, and opportunity.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid gap-8 ${
            compact
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {displayed.map((career) => {
            const Icon = career.icon;
            return (
              <motion.div
                key={career.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white/60 dark:bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2.5rem] overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 ring-1 ring-inset ring-black/5 dark:ring-white/10"
              >
                {/* Gradient top bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${career.gradient} opacity-40`} />

                {/* Glow background blur on hover */}
                <div
                  className={`absolute inset-0 ${career.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col flex-1 p-8 gap-6">
                  {/* Top row: icon + demand badge */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 rounded-2xl ${career.iconBg} flex items-center justify-center shadow-inner transition-transform duration-500`}
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>

                    {/* Demand badge */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${career.badgeColor}`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      {career.demand}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                      {career.title}
                    </h3>

                    {/* Demand dots */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mr-2">
                        Market Demand
                      </span>
                      {demandDots(career.demandLevel, career.gradient)}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium flex-1 opacity-80">
                    {career.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {career.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-black bg-muted/50 border-border/50 text-muted-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => navigate(career.route)}
                    size="lg"
                    className={`w-full h-14 rounded-xl bg-gradient-to-r ${career.gradient} text-white font-black text-sm gap-2 group/btn shadow-xl hover:opacity-90 active:scale-[0.98] transition-all border-0`}
                  >
                    <Map className="w-4 h-4" />
                    View Detailed Roadmap
                    <ChevronRight className="w-4 h-4 ml-auto group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* "See all" link — only in compact homepage mode */}
        {compact && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button
              variant="outline"
              onClick={() => navigate("/career-paths")}
              className="group rounded-full h-14 px-10 text-base font-black border-2 border-border/60 bg-white/10 dark:bg-white/5 backdrop-blur-md text-foreground hover:bg-muted/50 gap-2 transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              Explore All Career Paths
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TrendingCareers;
