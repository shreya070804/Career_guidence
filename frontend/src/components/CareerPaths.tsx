import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  TrendingUp,
  Atom,
  Calculator,
  Palette,
  Wrench,
  Cpu,
  Stethoscope,
  Briefcase,
  Scale
} from "lucide-react";

const paths = [
  {
    title: "After 10th Standard",
    description: "Choose the right stream and foundation for your career.",
    icon: BookOpen,
    color: "blue",
    route: "/careers-after-10th",
    options: [
      { name: "Science Stream", desc: "For technical and medical fields", careers: "Engineer • Doctor • Scientist", icon: Atom, path: "/careers/science" },
      { name: "Commerce Stream", desc: "For business and finance", careers: "CA • Banker • Analyst", icon: Calculator, path: "/careers/commerce" },
      { name: "Arts & Humanities", desc: "For creative and social roles", careers: "Lawyer • Journalist • Designer", icon: Palette, path: "/careers/arts" },
      { name: "Vocational Courses", desc: "For hands-on practical skills", careers: "Technician • Chef • Electrician", icon: Wrench, path: "/careers/vocational" },
    ],
  },
  {
    title: "After 12th Standard",
    description: "Step into higher education and professional courses.",
    icon: GraduationCap,
    color: "indigo",
    route: "/careers-after-12th",
    options: [
      { name: "Engineering", desc: "B.Tech, B.E specializations", careers: "Software • Mechanical • Civil", icon: Cpu, path: "/career/engineering" },
      { name: "Medical", desc: "MBBS, BDS, Pharmacy", careers: "Surgeon • Dentist • Pharmacist", icon: Stethoscope, path: "/career/medical" },
      { name: "Management", desc: "BBA, Business administration", careers: "Manager • Consultant • HR", icon: Briefcase, path: "/career/management" },
      { name: "Law & Civil Services", desc: "LLB, UPSC preparation", careers: "Advocate • IAS Officer • Judge", icon: Scale, path: "/career/law-civil" },
    ],
  },
];

const CareerPaths = () => {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-background/50 transition-colors duration-500 overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50/50 dark:bg-blue-900/10 backdrop-blur-sm text-blue-700 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/20 px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-black tracking-widest uppercase">Career Pathways</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-foreground tracking-tight leading-tight">
            Your Journey Starts Here
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
            Explore tailored career options based on your current academic stage.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
        >
          {paths.map((path, index) => {
            const HeaderIcon = path.icon;
            const iconBg = path.color === "blue" 
              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" 
              : "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400";
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="flex"
              >
                <Card className="bg-white/60 dark:bg-card/40 backdrop-blur-xl border-border/50 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 rounded-[2.5rem] overflow-hidden flex flex-col w-full ring-1 ring-inset ring-black/5 dark:ring-white/10 group/card">
                  <CardHeader className="p-8 pb-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-6 shadow-inner`}
                    >
                      <HeaderIcon className="w-7 h-7" />
                    </motion.div>
                    <CardTitle className="text-3xl font-black text-foreground mb-2 tracking-tight">
                      {path.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-lg font-medium opacity-80">
                      {path.description}
                    </p>
                  </CardHeader>
                  <CardContent className="p-8 pt-2 flex flex-col flex-1">
                    <div className="space-y-0 text-left w-full mb-8">
                      {path.options.map((option, idx) => {
                        const OptionIcon = option.icon;
                        return (
                          <motion.div 
                            key={idx} 
                            whileHover={{ x: 4 }}
                            className="group"
                          >
                            <div 
                              onClick={() => navigate(option.path)}
                              className="flex gap-4 py-5 transition-all duration-300 cursor-pointer"
                            >
                              <div className="w-10 h-10 rounded-full bg-muted/50 text-muted-foreground flex items-center justify-center shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all shadow-sm">
                                <OptionIcon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-black text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                                  {option.name}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-1.5 font-medium">
                                  {option.desc}
                                </p>
                                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground/40">
                                  {option.careers}
                                </p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all self-center" />
                            </div>
                            {idx < path.options.length - 1 && (
                              <hr className="border-border/40" />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* Clean CTA Link */}
                    <div className="mt-auto">
                      <Link to={path.route} className="group cursor-pointer inline-flex items-center gap-2 font-black text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        <span className="text-lg">Explore All Tracks</span>
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4 group-hover:scale-110" />
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CareerPaths;
