import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, School, Search, ChevronRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";
import colleges from "../data/maharashtra_colleges.json";

const CollegeFinderCTA = () => {
  const navigate = useNavigate();

  // show first 3 colleges from dataset
  const featuredColleges = colleges.slice(0, 3);

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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 px-6 overflow-hidden relative bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/40 dark:bg-card/40 backdrop-blur-2xl border-2 border-border/50 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group ring-1 ring-inset ring-black/5 dark:ring-white/10"
        >
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-125" />

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">

            {/* LEFT SIDE */}
            <div className="space-y-8">

              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20 backdrop-blur-md">
                <School className="w-3.5 h-3.5" />
                Maharashtra Colleges
              </div>

              <div className="space-y-5">
                <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
                  Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">College</span> Finder
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg font-medium opacity-80">
                  Discover top colleges across Maharashtra. Filter institutions by district,
                  type, and courses to find the best place to build your future.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <Search className="w-4 h-4" />, text: "Search by District" },
                  { icon: <Building2 className="w-4 h-4" />, text: "Filter by Type" },
                  { icon: <MapPin className="w-4 h-4" />, text: "Maharashtra-wide" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2.5 px-4 py-2 bg-white/50 dark:bg-muted/30 backdrop-blur-md rounded-xl text-xs font-black border border-border/50 shadow-sm"
                  >
                    <span className="text-primary">{item.icon}</span>
                    <span className="opacity-80 uppercase tracking-tight">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <Button
                size="lg"
                className="h-14 px-10 rounded-xl bg-primary hover:bg-primary/90 text-white font-black text-base gap-3 shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 border-0"
                onClick={() => navigate("/college-finder")}
              >
                Launch Finder App
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1" />
              </Button>

            </div>

            {/* RIGHT SIDE */}
            <div className="relative">
              <div className="bg-white/40 dark:bg-muted/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/20 dark:border-white/10 shadow-inner overflow-hidden min-h-[420px]">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-5"
                >

                  {featuredColleges.map((college, i) => (
                    <motion.div
                      key={college.id}
                      variants={itemVariants}
                      whileHover={{ x: 8 }}
                      className={`p-6 bg-white/80 dark:bg-card/90 backdrop-blur-md border border-border/50 rounded-2xl shadow-xl flex items-center justify-between transition-all duration-500 cursor-default ${
                        i === 0 ? "opacity-100" : i === 1 ? "opacity-90 scale-95 origin-top" : "opacity-80 scale-90 origin-top"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-white flex items-center justify-center font-black shadow-lg">
                          {college.name[0]}
                        </div>

                        <div>
                          <div className="font-black text-foreground text-sm tracking-tight mb-0.5">
                            {college.name}
                          </div>

                          <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-1.5 opacity-60">
                            <MapPin className="w-3 h-3 text-primary" /> {college.city}
                          </div>
                        </div>
                      </div>

                      <Badge
                        className="bg-primary/10 text-primary border-primary/20 font-black uppercase text-[10px] tracking-widest"
                      >
                        {college.type}
                      </Badge>
                    </motion.div>
                  ))}

                </motion.div>
              </div>

              {/* Floating counter with SaaS feel */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -right-8 bg-emerald-500 text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center border-4 border-white dark:border-slate-900 group"
              >
                <div className="text-3xl font-black italic tracking-tighter transition-transform group-hover:scale-110">{colleges.length}+</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-80 whitespace-nowrap">
                  Approved Institutions
                </div>
              </motion.div>

            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollegeFinderCTA;