import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, BrainCircuit, Stethoscope, Code, Palette, Briefcase, Sparkles, Award, CheckCircle2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import heroImage from "@/assets/hero-career.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative w-full min-h-[70vh] flex items-center py-12 md:py-16 px-4 overflow-hidden bg-background bg-gradient-to-b from-blue-50/30 to-background dark:from-blue-950/10 dark:to-background">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[140px]" 
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          
          {/* Left Column: Content Strategy */}
          <div className="flex flex-col items-start gap-8 lg:max-w-xl">
            
            {/* SaaS Badge - Glassmorphism */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group inline-flex items-center gap-2.5 bg-white/60 dark:bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue-500/10 shadow-sm transition-all cursor-default"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-900/60 dark:text-blue-200/60">AI-powered guidance</span>
            </motion.div>

            {/* Typography */}
            <div className="space-y-6">
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.05]"
              >
                Find Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                  True Path
                </span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-lg text-muted-foreground leading-relaxed max-w-lg font-medium opacity-70"
              >
                Stop guessing your future. Our AI analyzes your potential to find the perfect career path tailored to your unique strengths.
              </motion.p>
              
              {/* Feature Points - Added for fullness */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-x-8 gap-y-4 pt-2"
              >
                {[
                  { icon: BrainCircuit, label: "Cognitive Matching" },
                  { icon: Award, label: "Expert Verified" },
                  { icon: CheckCircle2, label: "Real-time Data" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/5 flex items-center justify-center border border-blue-500/10 group-hover:bg-blue-500/10 transition-colors">
                      <feature.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">{feature.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Refined Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
            >
              <Button 
                onClick={() => navigate("/assessment")}
                size="lg" 
                className="group relative overflow-hidden rounded-2xl bg-black dark:bg-white text-white dark:text-black h-16 px-10 text-xs font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] border-0 shadow-2xl shadow-black/20"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                  Start Analysis <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
              <Button 
                onClick={() => navigate("/career-paths")}
                size="lg" 
                variant="ghost" 
                className="group rounded-2xl h-16 px-10 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all"
              >
                Explore Paths
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Visual Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              
              {/* Glassmorphism Frame */}
              <motion.div 
                whileHover={{ rotate: 1 }}
                className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-background bg-card z-10 transition-transform duration-700 ring-1 ring-inset ring-black/5 dark:ring-white/10 group"
              >
                <img 
                  src={heroImage} 
                  alt="Students exploring careers" 
                  className="w-full h-full object-cover aspect-square md:aspect-[4/5] object-center transition-transform duration-[3000ms] group-hover:scale-105"
                />
              </motion.div>

              {/* Floating Cards with Micro-animations */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 bottom-12 bg-white/80 dark:bg-card/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 flex flex-col gap-2 z-30"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col pr-1">
                    <span className="text-[10px] font-black text-foreground">94% Match</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-6 top-8 bg-white/80 dark:bg-card/90 backdrop-blur-xl p-3 px-4 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 flex items-center gap-2 z-30"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black text-foreground">Top Choice</span>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
