import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { Sparkles, ArrowRight, Clock, Zap, Target, ClipboardList, BrainCircuit, Lightbulb, Route } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();
  const processSteps = [
    {
      title: "Step 1",
      description: "Take career test",
      icon: ClipboardList,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      shadow: "shadow-blue-500/10",
    },
    {
      title: "Step 2",
      description: "AI analyzes interests & skills",
      icon: BrainCircuit,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/10",
      shadow: "shadow-purple-500/10",
    },
    {
      title: "Step 3",
      description: "System suggests career paths",
      icon: Lightbulb,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/10",
      shadow: "shadow-amber-500/10",
    },
    {
      title: "Step 4",
      description: "Get personalized roadmap",
      icon: Route,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/10",
      shadow: "shadow-emerald-500/10",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative w-full py-16 overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start gap-8 max-w-xl"
          >
            {/* Small Badge - Glassmorphism */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-2xl shadow-blue-500/20 border border-white/10">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/90">Free Assessment</span>
            </div>

            {/* Headlines */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground leading-tight">
                Not Sure Which <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Career Path</span> to Choose?
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed font-medium opacity-80">
                Take our AI-powered assessment to discover suitable career paths based on your interests, skills, and goals.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-col gap-3 w-full">
              {[
                { icon: Clock, text: "10-minute precision test", color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-100/50 dark:bg-blue-900/20" },
                { icon: Zap, text: "Instant AI-powered results", color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-100/50 dark:bg-purple-900/20" },
                { icon: Target, text: "Personalized roadmap guidance", color: "text-indigo-500 dark:text-indigo-400", bg: "bg-indigo-100/50 dark:bg-indigo-900/20" },
              ].map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 bg-white/40 dark:bg-card/40 backdrop-blur-xl p-3.5 rounded-xl border border-border/50 transition-all ring-1 ring-inset ring-black/5 dark:ring-white/10"
                >
                  <div className={`p-2 rounded-lg ${feature.bg} ${feature.color} shadow-inner`}>
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span className="font-black text-foreground/80 tracking-tight text-[10px] uppercase">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <Button 
                onClick={() => navigate("/assessment")}
                size="lg" 
                className="rounded-xl bg-primary hover:bg-primary/95 text-white shadow-2xl shadow-primary/20 h-12 px-8 text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-98 border-0"
              >
                Start Free Assessment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                onClick={() => navigate("/ai-guide")}
                size="lg" 
                variant="outline" 
                className="rounded-xl border-2 border-border/60 bg-white/10 dark:bg-white/5 backdrop-blur-md text-foreground hover:bg-muted/50 h-12 px-8 text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-98 shadow-sm"
              >
                Talk to a Counselor
              </Button>
            </div>
          </motion.div>

          {/* Right Side Visual Process */}
          <div className="relative w-full flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative w-full max-w-lg lg:ml-auto space-y-6">
              
              {/* Vertical connecting line - Animated */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-8 md:left-[2.75rem] top-10 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-emerald-400 dark:from-blue-600 dark:via-purple-600 dark:to-emerald-600 rounded-full z-0 opacity-20 origin-top" 
              />

              {/* Step Cards */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {processSteps.map((step, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    whileHover={{ x: 10, y: -5 }}
                    className={`relative z-10 flex items-center gap-5 p-4 bg-white/60 dark:bg-card/90 backdrop-blur-2xl rounded-[1.5rem] border border-border/50 shadow-2xl ${step.shadow} transition-all duration-300 ring-1 ring-inset ring-black/5 dark:ring-white/10 group`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${step.bgColor} shadow-inner transition-transform group-hover:scale-110 duration-500`}>
                      <step.icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${step.color} mb-1`}>
                        {step.title}
                      </span>
                      <h4 className="text-base md:text-lg font-black text-foreground tracking-tight leading-tight">
                        {step.description}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
