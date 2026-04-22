import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Search, 
  Map, 
  DollarSign, 
  Zap, 
  Brain, 
  Code, 
  Briefcase, 
  Scale, 
  Stethoscope,
  ChevronRight,
  Sparkles,
  Palette,
  Calculator,
  Heart,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBookmarks } from "@/contexts/BookmarkContext";
import TrendingCareers from "@/components/TrendingCareers";
import { motion } from "framer-motion";

const categories = [
  { name: "All", icon: null },
  { name: "Engineering", icon: Zap },
  { name: "Medical", icon: Stethoscope },
  { name: "Business", icon: Briefcase },
  { name: "Finance", icon: Calculator },
  { name: "Law", icon: Scale },
  { name: "Design", icon: Palette },
];

const careers = [
  {
    title: "Engineer",
    category: "Engineering",
    description: "Design, build, and maintain complex systems, machines, and structures.",
    skills: ["Mathematics", "Problem Solving", "Technical Design"],
    salary: { india: "₹6 LPA – ₹30 LPA", abroad: "$80k – $150k" },
    route: "/career/engineering",
    icon: Zap,
    color: "blue"
  },
  {
    title: "Doctor",
    category: "Medical",
    description: "Diagnose, treat, and prevent illnesses to improve human health.",
    skills: ["Medical Science", "Empathy", "Critical Thinking"],
    salary: { india: "₹12 LPA – ₹50 LPA", abroad: "$200k – $400k" },
    route: "/career/medical",
    icon: Stethoscope,
    color: "teal"
  },
  {
    title: "Lawyer",
    category: "Law",
    description: "Provide legal advice and represent clients in legal proceedings.",
    skills: ["Critical Analysis", "Public Speaking", "Writing"],
    salary: { india: "₹5 LPA – ₹25 LPA", abroad: "$120k – $250k" },
    route: "/career/law-civil",
    icon: Scale,
    color: "amber"
  },
  {
    title: "Data Scientist",
    category: "Engineering",
    description: "Analyze complex data sets to discover patterns and drive decision-making.",
    skills: ["Statistics", "Programming", "Data Mining"],
    salary: { india: "₹8 LPA – ₹35 LPA", abroad: "$110k – $190k" },
    route: "/career/engineering",
    icon: Brain,
    color: "indigo"
  },
  {
    title: "Chartered Accountant (CA)",
    category: "Finance",
    description: "Manage financial records, audits, and provide tax-related advice.",
    skills: ["Accounting", "Taxation", "Financial Law"],
    salary: { india: "₹6 LPA – ₹20 LPA", abroad: "$70k – $160k" },
    route: "/career/management",
    icon: Calculator,
    color: "emerald"
  },
  {
    title: "Designer",
    category: "Design",
    description: "Create visual concepts to communicate ideas that inspire and inform.",
    skills: ["Visual Arts", "Design Software", "Creativity"],
    salary: { india: "₹4 LPA – ₹18 LPA", abroad: "$60k – $130k" },
    route: "/career/arts",
    icon: Palette,
    color: "rose"
  }
];

const CareerPaths = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showGlobal, setShowGlobal] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || career.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getColorClasses = (color: string) => {
    const maps: any = {
      blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-100 dark:border-blue-800",
      teal: "bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 border-teal-100 dark:border-teal-800",
      indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800",
      purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 border-purple-100 dark:border-purple-800",
      amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-amber-100 dark:border-amber-800",
      emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800",
      rose: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border-rose-100 dark:border-rose-800",
    };
    return maps[color] || maps.blue;
  };

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Header & Search */}
        <header className="space-y-10 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex justify-start">
            <Button variant="ghost" className="rounded-full gap-2 transition-all hover:bg-muted" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              Explore Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Opportunities</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto opacity-70">
              Discover the professional roadmaps and detailed insights tailored for your aspirations.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search careers..." 
                className="pl-16 h-14 rounded-2xl border-border bg-card/30 backdrop-blur-md focus:border-primary transition-all text-base font-medium shadow-xl"
              />
            </div>

            {/* Filter Chips & Global Toggle */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`
                        inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all font-bold text-sm
                        ${isSelected 
                          ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                          : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5"
                        }
                      `}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {cat.name}
                    </button>
                  );
                })}
              </div>
              
              <div className="h-10 w-[1px] bg-border hidden md:block" />
              
              <button 
                onClick={() => setShowGlobal(!showGlobal)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all font-black text-xs uppercase tracking-widest ${showGlobal ? 'bg-blue-600 border-blue-600 text-white' : 'bg-card border-border text-blue-600'}`}
              >
                <Sparkles className="w-4 h-4" />
                {showGlobal ? "Global Active" : "Show Global Salary"}
              </button>
            </div>
          </div>
        </header>

        {/* Results Grid */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {filteredCareers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCareers.map((career, idx) => {
                const CareerIcon = career.icon;
                const colorClasses = getColorClasses(career.color);
                return (
                  <Card 
                    key={career.title} 
                    className="group relative border-border bg-card rounded-[2.5rem] overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2 flex flex-col ring-1 ring-inset ring-black/5 dark:ring-white/10"
                  >
                    <div className="absolute top-6 right-6 z-10">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full h-12 w-12 bg-background/50 backdrop-blur-md shadow-sm border border-border hover:bg-white hover:text-rose-500 transition-all ${isBookmarked(career.title) ? "text-rose-500 bg-white" : "text-muted-foreground"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isBookmarked(career.title)) {
                            removeBookmark(career.title);
                          } else {
                            addBookmark({
                              id: career.title,
                              type: "career",
                              title: career.title,
                              description: career.description,
                              path: career.route,
                              category: career.category
                            });
                          }
                        }}
                      >
                        <Heart className={`w-6 h-6 ${isBookmarked(career.title) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                    <CardHeader className="p-6 pb-2">
                      <div className={`w-12 h-12 rounded-xl ${colorClasses} border flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                        <CareerIcon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="rounded-full border-primary/20 text-primary uppercase tracking-widest text-[10px] font-black px-3 py-1">
                          {career.category}
                        </Badge>
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-black text-sm">
                            <TrendingUp className="w-4 h-4" />
                            {career.salary.india}
                          </div>
                          {showGlobal && (
                            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-black text-xs">
                              <DollarSign className="w-3.5 h-3.5" />
                              {career.salary.abroad}
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                        {career.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 flex-1">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                        {career.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="rounded-full px-4 py-1.5 font-bold text-xs bg-muted/50 border border-border">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0 mt-auto">
                      <Button 
                        onClick={() => navigate(career.route)}
                        className="w-full h-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-widest gap-2 group/btn shadow-lg shadow-primary/10"
                      >
                        <Map className="w-4 h-4" />
                        Explore
                        <ChevronRight className="w-4 h-4 ml-auto group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-32 space-y-6">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-black text-foreground">No careers found matching your search.</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">Try trying a different search term or category filter.</p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} variant="outline" className="rounded-full">
                Clear all filters
              </Button>
            </div>
          )}
        </section>

        {/* Trending Careers Section */}
        <div className="border-t border-border -mx-6">
          <TrendingCareers />
        </div>

        {/* Floating CTA - Dimmed & Balanced */}
        <section className="py-20">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center text-white space-y-6 shadow-2xl relative overflow-hidden group border border-white/5 ring-1 ring-inset ring-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-1000" />
            
            <div className="relative z-10 space-y-4 max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight italic">Can't decide on a direction?</h2>
              <p className="text-lg text-slate-400 font-medium opacity-80">Take our AI-powered career assessment to find the perfect professional match for your unique personality and skills.</p>
            </div>
            
            <Button 
                onClick={() => navigate("/assessment")}
                size="lg" 
                className="relative z-10 rounded-xl bg-white text-slate-900 hover:bg-slate-100 px-10 h-16 text-xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl border-0"
            >
              Start Free Assessment
              <Sparkles className="ml-3 w-5 h-5" />
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default CareerPaths;
