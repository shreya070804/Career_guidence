import { useNavigate } from "react-router-dom";
import { Card, CardTitle } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { Atom, Calculator, Palette, Users, ArrowRight } from "lucide-react";

const streams = [
  {
    name: "Science",
    icon: Atom,
    description: "For analytical minds and problem solvers.",
    path: "/careers/science",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Commerce",
    icon: Calculator,
    description: "For business-minded and finance enthusiasts.",
    path: "/careers/commerce",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Arts & Humanities",
    icon: Palette,
    description: "For creative thinkers and social change makers.",
    path: "/careers/arts",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "Vocational",
    icon: Users,
    description: "For hands-on learning and quick employment.",
    path: "/careers/vocational",
    gradient: "from-orange-500 to-amber-600",
  },
];

const StreamOptions = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-5"
        >
          <div className="inline-flex items-center gap-2 bg-muted/40 backdrop-blur-md px-4 py-2 rounded-full border border-border/50 text-[10px] font-black tracking-widest uppercase text-muted-foreground">
            Academic Paths
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Stream</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-medium opacity-80">
            Explore diverse academic paths to confidently take your next big step after 10th grade.
          </p>
        </motion.div>

        {/* Minimal Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {streams.map((stream, index) => {
            const Icon = stream.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <Card
                  onClick={() => navigate(stream.path)}
                  className="group relative h-full bg-white/40 dark:bg-card/40 backdrop-blur-2xl border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden cursor-pointer flex flex-col items-center text-center p-10 ring-1 ring-inset ring-black/5 dark:ring-white/10"
                >
                  {/* Subtle top gradient on hover */}
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${stream.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Large Icon Box */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-24 h-24 rounded-3xl bg-white/60 dark:bg-muted/30 backdrop-blur-md flex items-center justify-center mb-10 shadow-inner border border-white/20 dark:border-white/5 group-hover:bg-primary/5 transition-all duration-500"
                  >
                    <Icon className="w-12 h-12 text-primary/80 group-hover:text-primary transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="space-y-4 mb-8 flex-grow">
                    <CardTitle className="text-[22px] font-black text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {stream.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-80">
                      {stream.description}
                    </p>
                  </div>

                  {/* Arrow Link - Modern SaaS approach */}
                  <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-all duration-300">
                    <span className="group-hover:mr-1 transition-all">Explore Pathways</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
};

export default StreamOptions;
