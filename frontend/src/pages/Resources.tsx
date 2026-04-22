import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Loader2, Compass, Building2, Lightbulb, Download, ExternalLink, Heart, Sparkles, Filter, ChevronRight, Zap } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { motion, AnimatePresence } from "framer-motion";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  action_type?: "Read Guide" | "View Details" | "Download PDF";
  is_trending?: boolean;
}

const fallbackResources: Resource[] = [
  { id: "cg1", title: "Careers After 10th", description: "A comprehensive guide on choosing the right stream (Science, Commerce, Arts) after 10th grade based on your interests and strengths.", category: "Career Guides", action_type: "Read Guide", is_trending: true },
  { id: "cg2", title: "Careers After 12th Science", description: "Explore the vast opportunities waiting for you after completing 12th Science, from Engineering to Research and Medical fields.", category: "Career Guides", action_type: "Read Guide" },
  { id: "cg3", title: "Careers After 12th Commerce", description: "Discover traditional and new-age career paths after 12th Commerce, including CA, CS, Finance, and Business Management.", category: "Career Guides", action_type: "Read Guide", is_trending: true },
  { id: "cg4", title: "Careers After 12th Arts", description: "Uncover creative and impactful careers in Humanities, Law, Design, Journalism, and Civil Services.", category: "Career Guides", action_type: "Read Guide" },
  { id: "cg5", title: "How to Become a Software Engineer", description: "Step-by-step roadmap to building a successful career in software engineering, from learning code to landing your first job.", category: "Career Guides", action_type: "View Details", is_trending: true },
  { id: "cg6", title: "How to Become a Doctor", description: "Detailed timeline and requirements to become a medical professional, including NEET preparation and MBBS admission.", category: "Career Guides", action_type: "View Details" },
  { id: "ee1", title: "JEE Main Preparation Guide", description: "Essential tips, syllabus breakdown, and study strategies to ace the JEE Main and secure top engineering institutes.", category: "Entrance Exams", action_type: "Download PDF", is_trending: true },
  { id: "ee2", title: "NEET Exam Guide", description: "Complete study material overview and strategic planning guide to help you crack the NEET medical entrance.", category: "Entrance Exams", action_type: "Download PDF" },
  { id: "ee3", title: "CLAT Law Entrance Exam", description: "Everything you need to know to prepare for the Common Law Admission Test and enter top National Law Universities.", category: "Entrance Exams", action_type: "Read Guide" },
  { id: "ee4", title: "CA Foundation Exam", description: "Your starter kit for the Chartered Accountancy course, including syllabus structure and passing strategies.", category: "Entrance Exams", action_type: "Download PDF" },
  { id: "ci1", title: "Top Engineering Colleges in India", description: "A curated list of IITs, NITs, and top private engineering colleges with admission criteria and placement records.", category: "College Information", action_type: "View Details", is_trending: true },
  { id: "ci2", title: "Top Medical Colleges in India", description: "Discover the best AIIMS, AFMC, and top state medical colleges along with their cutoffs and fee structures.", category: "College Information", action_type: "View Details" },
  { id: "ci3", title: "Best Commerce Colleges", description: "Explore top colleges for B.Com (Hons), Economics, and BBA across major universities like DU, NMIMS, and Christ.", category: "College Information", action_type: "View Details" },
  { id: "ci4", title: "Top Design Institutes", description: "Insights into NIFT, NID, and IIT-IDC for students aspiring to build a career in Fashion, Product, or Industrial Design.", category: "College Information", action_type: "View Details" },
  { id: "sd1", title: "Programming Skills for Beginners", description: "Start your coding journey with basic Python and JavaScript concepts tailored for absolute beginners.", category: "Skill Development", action_type: "Read Guide", is_trending: true },
  { id: "sd2", title: "Communication Skills for Students", description: "Enhance your public speaking, writing, and interpersonal skills crucial for interviews and group discussions.", category: "Skill Development", action_type: "View Details" },
  { id: "sd3", title: "AI and Data Science Skills", description: "Learn which tools and technologies you need to master to enter the booming field of Artificial Intelligence.", category: "Skill Development", action_type: "Read Guide" },
  { id: "sd4", title: "Digital Marketing Basics", description: "Understand SEO, social media marketing, and content creation to build a versatile skill profile alongside your degree.", category: "Skill Development", action_type: "Read Guide" },
];

const categoryStyles: Record<string, { icon: any, gradient: string, color: string, shadow: string }> = {
  "Career Guides": { 
    icon: Compass, 
    gradient: "from-indigo-600 to-blue-600",
    color: "text-indigo-600 dark:text-indigo-400",
    shadow: "shadow-indigo-500/10"
  },
  "Entrance Exams": { 
    icon: BookOpen, 
    gradient: "from-indigo-600 to-blue-600",
    color: "text-indigo-600 dark:text-indigo-400",
    shadow: "shadow-indigo-500/10"
  },
  "College Information": { 
    icon: Building2, 
    gradient: "from-indigo-600 to-blue-600",
    color: "text-indigo-600 dark:text-indigo-400",
    shadow: "shadow-indigo-500/10"
  },
  "Skill Development": { 
    icon: Lightbulb, 
    gradient: "from-indigo-600 to-blue-600",
    color: "text-indigo-600 dark:text-indigo-400",
    shadow: "shadow-indigo-500/10"
  },
  "default": { 
    icon: BookOpen, 
    gradient: "from-indigo-600 to-blue-600",
    color: "text-indigo-600 dark:text-indigo-400",
    shadow: "shadow-indigo-500/10"
  }
};

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Resources");
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const navigate = useNavigate();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();

  const categories = ["All Resources", "Career Guides", "Entrance Exams", "College Information", "Skill Development"];

  useEffect(() => {
    loadResources();
  }, []);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 4);
      setIsLoading(false);
    }, 600);
  };

  useEffect(() => {
    let filtered = resources;

    if (selectedCategory !== "All Resources") {
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  }, [searchQuery, selectedCategory, resources]);

  const loadResources = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("resources")
      .select("id, title, description, category")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      const formattedData = data.map(item => ({
        ...item,
        action_type: "Read Guide"
      })) as Resource[];
      setResources([...formattedData, ...fallbackResources]);
    } else {
      setResources(fallbackResources);
    }
    setIsLoading(false);
  };

  const handleAction = (resource: Resource) => {
    if (resource.action_type === "Download PDF") {
      const link = document.createElement("a");
      link.href = "#"; 
      link.download = `${resource.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (resource.category === "College Information") {
      navigate(`/college/${resource.id}`, { state: { resource } });
      return;
    }

    navigate(`/resources/${resource.id}`, { state: { resource } });
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-background pb-20 overflow-hidden relative">
        {/* Background blobs for depth */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
          {/* Header Section */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 max-w-3xl mx-auto space-y-6"
          >
            <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Expert Knowledge Base
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
              Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">Potential</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium opacity-80">
              Access curated high-impact guides, entrance papers, and skill roadmaps. 
              Designed to take you from a curious student to an industry professional.
            </p>
          </motion.header>

          {/* Filters and Search - Premium Glassmorphism */}
          <div className="sticky top-24 z-30 mb-16">
            <div className="max-w-4xl mx-auto rounded-[2.5rem] p-3 bg-white/40 dark:bg-card/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/5 ring-1 ring-inset ring-black/5 dark:ring-white/5">
              <div className="flex flex-col md:flex-row gap-3 items-center">
                
                <div className="relative w-full md:max-w-md shrink-0">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <Input
                    placeholder="Search resources, topics, exams..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(8);
                    }}
                    className="pl-14 h-14 rounded-[1.75rem] border-0 bg-white dark:bg-card shadow-inner-sm focus-visible:ring-primary/20 text-sm font-semibold placeholder:text-muted-foreground/30"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar w-full py-1 px-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setVisibleCount(8);
                      }}
                      className={`px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 relative group overflow-hidden ${
                        selectedCategory === category
                          ? "bg-black dark:bg-white text-white dark:text-black shadow-xl"
                          : "bg-white/50 dark:bg-card/50 text-muted-foreground hover:text-foreground border border-black/5 dark:border-white/5"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resource Grid */}
          <div className="space-y-12">
            {isLoading && resources.length === 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-[380px] rounded-[2.5rem] bg-muted/40 animate-pulse border border-border/50" />
                ))}
              </div>
            ) : filteredResources.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40">
                <div className="w-24 h-24 bg-muted/50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground/20" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3">No matching modules</h3>
                <p className="text-muted-foreground font-medium max-w-xs mx-auto opacity-60">Try refining your keywords or switching categories.</p>
              </motion.div>
            ) : (
              <div className="space-y-16">
                <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  <AnimatePresence mode="popLayout">
                    {filteredResources.slice(0, visibleCount).map((resource, i) => {
                      const style = categoryStyles[resource.category] || categoryStyles["default"];
                      const Icon = style.icon;
                      
                      return (
                        <motion.div
                          key={resource.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, delay: i * 0.05 }}
                          whileHover={{ y: -10 }}
                          className="group relative flex flex-col h-full"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 rounded-[3rem] blur-3xl -z-10`} />
                          
                          <Card className="bg-white/80 dark:bg-card/50 backdrop-blur-3xl border border-black/[0.03] dark:border-white/[0.05] rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 flex flex-col h-full overflow-hidden group">
                            {/* Trending Indicator - Softened */}
                            {resource.is_trending && (
                              <div className="absolute top-6 right-6 z-20">
                                <div className="bg-indigo-50/80 dark:bg-indigo-900/20 backdrop-blur-md text-indigo-600 dark:text-indigo-400 font-black text-[8px] uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-indigo-100/50 dark:border-indigo-800/20 shadow-sm">
                                  <Zap className="w-2.5 h-2.5 fill-current" />
                                  Featured
                                </div>
                              </div>
                            )}

                            <CardHeader className="p-8 pb-4 relative z-10">
                              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${style.gradient} p-4 mb-6 transition-transform duration-700 ease-out flex items-center justify-center relative shadow-lg shadow-indigo-500/10`}>
                                 <Icon className="w-full h-full text-white" />
                              </div>
                              
                              <Badge variant="secondary" className="w-fit mb-4 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border-0 bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                                {resource.category}
                              </Badge>
                              
                              <CardTitle className="text-xl font-black text-foreground leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                {resource.title}
                              </CardTitle>
                            </CardHeader>

                            <CardContent className="p-8 pt-0 flex flex-col flex-1 relative z-10">
                              <CardDescription className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 flex-1 line-clamp-3 opacity-70 group-hover:opacity-100 transition-opacity">
                                {resource.description}
                              </CardDescription>
                              
                              <Button 
                                onClick={() => handleAction(resource)}
                                className="w-full h-12 rounded-xl bg-black dark:bg-white text-white dark:text-black font-black text-[9px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all border-0 shadow-xl flex items-center justify-center gap-3"
                              >
                                {resource.action_type || "Read Guide"}
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination / Load More */}
                {visibleCount < filteredResources.length && (
                  <div className="flex flex-col items-center pt-10 pb-20">
                    <Button 
                      onClick={loadMore}
                      disabled={isLoading}
                      variant="outline"
                      className="rounded-full h-16 px-12 border-2 border-border/50 font-black text-[10px] uppercase tracking-[0.2em] gap-3 bg-white/50 dark:bg-card/50 backdrop-blur-3xl hover:border-primary hover:text-primary transition-all group shadow-xl"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Discover More Modules
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                    <p className="mt-6 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">
                      Displaying {Math.min(visibleCount, filteredResources.length)} of {filteredResources.length} Assets
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Resources;
