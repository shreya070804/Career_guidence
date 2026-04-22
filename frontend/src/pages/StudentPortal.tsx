import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageSquare, BookOpen, User, Loader2, Sparkles, Send, Clock, ArrowRight, TrendingUp, Heart, Trash2, ExternalLink, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import PageLayout from "@/components/PageLayout";
import { useBookmarks } from "@/contexts/BookmarkContext";
    import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Zap, 
  Layers, 
  Target, 
  LayoutDashboard 
} from "lucide-react";


interface Session {
  id: string;
  session_date: string;
  session_type: string;
  status: string;
  counselor_name: string;
  duration_minutes: number;
}

const StudentPortal = () => {
  const { user, isLoading: authLoading, signOut } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { bookmarks, removeBookmark } = useBookmarks();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadSessions();
    }
  }, [user]);

  const loadSessions = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("counseling_sessions")
      .select("*")
      .eq("student_id", user.id)
      .order("session_date", { ascending: true });

    if (!error && data) {
      setSessions(data);
    }
    setIsLoading(false);
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <PageLayout showFooter={false}>
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 md:p-10 text-white shadow-2xl border border-white/5 ring-1 ring-inset ring-white/5">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black tracking-widest uppercase opacity-80">Dashboard Overview</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                Welcome back, <br className="md:hidden" />
                <span className="text-primary">{user?.user_metadata?.full_name || "Student"}</span> 👋
              </h2>
              <p className="text-slate-400 text-base font-medium max-w-xl">
                Your personalized gateway to career excellence. 
              </p>
            </div>
            <Button 
              onClick={() => navigate("/booking")} 
              className="bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 rounded-xl px-8 h-14 text-sm font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Book a Session
            </Button>
          </div>
          
          {/* Ambient Background Elements - Dimmed */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary opacity-5 blur-[100px] rounded-full" />
        </header>

        <Tabs defaultValue="dashboard" className="space-y-10">
          <TabsList className="bg-muted/30 border border-border/50 p-1 flex w-full max-w-xl rounded-xl shadow-sm no-scrollbar backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="rounded-lg flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all py-2 font-black uppercase text-[10px] tracking-widest">
              Overview
            </TabsTrigger>
            <TabsTrigger value="sessions" className="rounded-lg flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all py-2 font-black uppercase text-[10px] tracking-widest">
              Sessions
            </TabsTrigger>
            <TabsTrigger value="resources" className="rounded-lg flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all py-2 font-black uppercase text-[10px] tracking-widest">
              Resources
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="rounded-lg flex-1 data-[state=active]:bg-background data-[state=active]:text-rose-500 data-[state=active]:shadow-sm transition-all py-2 font-black uppercase text-[10px] tracking-widest">
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border border-border/50 shadow-sm rounded-2xl bg-white dark:bg-card/40 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-1 p-4">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Upcoming</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                    {sessions.filter(s => s.status === 'scheduled').length}
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase opacity-60 mt-1">Appointments</p>
                </CardContent>
              </Card>

              <Card className="border border-border/50 shadow-sm rounded-2xl bg-white dark:bg-card/40 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-1 p-4">
                  <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Resources</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-black text-slate-800 dark:text-white leading-tight">12+</div>
                  <Button variant="link" className="p-0 h-auto text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase hover:no-underline flex items-center group/btn mt-1" onClick={() => navigate("/resources")}>
                    Browse <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-border/50 shadow-sm rounded-2xl bg-white dark:bg-card/40 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-1 p-4">
                  <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <User className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Strategy</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-black text-slate-800 dark:text-white leading-tight">Expert</div>
                  <Button variant="link" className="p-0 h-auto text-purple-600 dark:text-purple-400 font-bold text-[10px] uppercase hover:no-underline flex items-center group/btn mt-1" onClick={() => navigate("/booking")}>
                    Consult <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-border/50 shadow-sm rounded-2xl bg-white dark:bg-card/40 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-1 p-4">
                  <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Report</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-black text-slate-800 dark:text-white leading-tight">PRO</div>
                  <Button variant="link" className="p-0 h-auto text-amber-600 dark:text-amber-400 font-bold text-[10px] uppercase hover:no-underline flex items-center group/btn mt-1" onClick={() => navigate("/report")}>
                    View <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Your Progress Section */}
            <div className="grid gap-4 md:grid-cols-1">
              <Card className="border border-border/50 shadow-sm rounded-2xl bg-white dark:bg-card/30 overflow-hidden relative group">
                <CardHeader className="p-6 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base font-black tracking-tight text-slate-800 dark:text-white uppercase">
                      <Target className="w-5 h-5 text-indigo-500" />
                      Journey Progress
                    </CardTitle>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] font-black uppercase bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 border-none">
                      75% Complete
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-2 grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Assessment
                      </span>
                      <span className="text-sm font-black text-slate-800 dark:text-white">100%</span>
                    </div>
                    <Progress value={100} className="h-1.5 bg-slate-100 dark:bg-slate-800" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-500" /> Skills
                      </span>
                      <span className="text-sm font-black text-slate-800 dark:text-white">45%</span>
                    </div>
                    <Progress value={45} className="h-1.5 bg-slate-100 dark:bg-slate-800" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Steps List */}
            <Card className="border border-border/50 shadow-sm rounded-2xl bg-white dark:bg-card/40 overflow-hidden group">
              <CardHeader className="bg-slate-50 dark:bg-slate-800/20 border-b border-slate-100 dark:border-slate-800/50 p-6">
                <CardTitle className="flex items-center gap-2 text-base font-black tracking-tight text-slate-800 dark:text-white uppercase">
                  <Layers className="w-5 h-5 text-indigo-500" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-6 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group/item">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-800 shadow-sm group-hover/item:scale-110 transition-transform">
                      <span className="text-indigo-600 dark:text-indigo-400 font-black text-lg">1</span>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="font-black text-slate-800 dark:text-white text-base leading-tight">Complete Career Assessment</h4>
                      <p className="text-slate-500 font-medium text-xs opacity-70">Unlock your potential with our interest mapping tool.</p>
                    </div>
                    <Button 
                      variant="default" 
                      className="sm:ml-auto rounded-lg px-6 h-10 bg-primary hover:bg-primary/90 shadow-md font-black text-[10px] uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95" 
                      onClick={() => navigate("/")}
                    >
                      Launch
                    </Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-6 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group/item">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm group-hover/item:scale-110 transition-transform">
                      <span className="text-slate-500 dark:text-slate-400 font-black text-lg">2</span>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="font-black text-slate-800 dark:text-white text-base leading-tight">Strategy Consultation</h4>
                      <p className="text-slate-500 font-medium text-xs opacity-70">Meet with a career architect to build your roadmap.</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="sm:ml-auto rounded-lg px-6 h-10 border-slate-200 dark:border-slate-700 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 text-slate-500" 
                      onClick={() => navigate("/booking")}
                    >
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="border-border shadow-sm rounded-3xl bg-card overflow-hidden ring-1 ring-inset ring-black/5 dark:ring-white/10">
              <CardHeader className="bg-muted/30 border-b border-border p-8">
                <CardTitle className="text-2xl text-card-foreground font-extrabold mb-2">My Counseling Sessions</CardTitle>
                <CardDescription className="text-base text-muted-foreground">View and manage your scheduled sessions</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                {sessions.length === 0 ? (
                  <div className="text-center py-20 px-4">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-primary/5">
                      <Calendar className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground mb-3">No sessions scheduled</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto mb-10 text-lg">
                      You haven't booked any career counseling sessions yet. Get started on your journey today.
                    </p>
                    <Button onClick={() => navigate("/booking")} className="bg-primary hover:bg-primary/90 rounded-full px-10 h-14 text-base font-bold shadow-lg shadow-primary/20">
                      Book Your First Session
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {sessions.map((session) => (
                      <div key={session.id} className="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl border border-border hover:border-primary/50 hover:bg-muted/20 transition-all shadow-sm group">
                        <div className="w-16 h-16 bg-card border border-border shadow-sm rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Clock className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-bold text-card-foreground text-xl capitalize">{session.session_type.replace('-', ' ')}</h3>
                            <Badge variant={session.status === 'scheduled' ? 'default' : 'secondary'} className="rounded-full px-4 py-1 font-bold tracking-tight">
                              {session.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-base font-medium">
                            {format(new Date(session.session_date), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                          </p>
                        </div>
                        <div className="border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8 pl-0 md:text-right min-w-[180px]">
                          <p className="text-xs uppercase tracking-widest font-black text-muted-foreground/60 mb-2">Counselor</p>
                          <p className="text-base font-bold text-card-foreground">{session.counselor_name || "To be assigned"}</p>
                          <p className="text-sm text-muted-foreground mt-2 flex items-center md:justify-end gap-1.5 font-medium">
                            <Clock className="w-4 h-4" /> {session.duration_minutes} min
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="resources" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="border-border shadow-sm rounded-3xl bg-card overflow-hidden ring-1 ring-inset ring-black/5 dark:ring-white/10">
              <CardHeader className="bg-muted/30 border-b border-border p-10">
                <CardTitle className="text-3xl text-card-foreground font-black tracking-tighter mb-2">Learning Resources</CardTitle>
                <CardDescription className="text-lg text-muted-foreground/80 font-medium">Access curated career guides and preparation materials</CardDescription>
              </CardHeader>
              <CardContent className="p-16">
                <div className="text-center">
                  <div className="w-28 h-28 bg-emerald-100 dark:bg-emerald-900/30 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner rotate-3">
                    <BookOpen className="w-12 h-12 text-emerald-600 dark:text-emerald-400 -rotate-3" />
                  </div>
                  <h3 className="text-2xl font-black text-card-foreground mb-4">Master your future with our library</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-10 text-lg leading-relaxed">
                    Discover thousands of articles, videos, and professional roadmaps to guide your unique journey.
                  </p>
                  <Button onClick={() => navigate("/resources")} className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-full px-12 h-14 text-lg font-bold shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 text-white">
                    Explore All Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="bookmarks" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-8">
                    <div>
                        <h3 className="text-3xl font-black text-foreground">Saved Items</h3>
                        <p className="text-muted-foreground font-medium text-lg">Your curated collection of career paths and educational resources.</p>
                    </div>
                    <Badge variant="secondary" className="rounded-full px-6 py-2 font-black text-xl bg-primary/10 text-primary border-none w-fit">
                        {bookmarks.length} Items
                    </Badge>
                </div>

                {bookmarks.length === 0 ? (
                    <div className="text-center py-32 bg-muted/20 rounded-[4rem] border-2 border-dashed border-border/50 flex flex-col items-center gap-8">
                        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center ring-8 ring-muted/30">
                            <Heart className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-3xl font-black text-foreground tracking-tight">Your collection is empty</h4>
                            <p className="text-muted-foreground font-medium text-xl max-w-md mx-auto">Explore our career roadmaps and resource library to start saving items of interest.</p>
                        </div>
                        <Button onClick={() => navigate("/career-paths")} className="rounded-full px-10 h-16 font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
                            Discover Careers
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2">
                        {bookmarks.map((item) => (
                            <Card key={item.id} className="group relative border-border bg-card rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col ring-1 ring-inset ring-black/5 dark:ring-white/10">
                                <CardHeader className="p-10 pb-6 relative">
                                    <button 
                                      onClick={() => removeBookmark(item.id)}
                                      className="absolute top-8 right-8 p-3 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-all transform hover:scale-110 active:scale-95 shadow-sm"
                                      title="Remove from bookmarks"
                                    >
                                        <Heart className="w-6 h-6 fill-current" />
                                    </button>
                                    <Badge className="w-fit mb-6 uppercase tracking-widest text-[10px] font-black px-4 py-1.5 rounded-full bg-primary/10 text-primary border-none">
                                        {item.type}
                                    </Badge>
                                    <CardTitle className="text-3xl font-black text-foreground group-hover:text-primary transition-colors pr-12 leading-tight">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-10 pt-0 flex-1">
                                    <p className="text-muted-foreground font-medium text-lg leading-relaxed line-clamp-3">
                                        {item.description}
                                    </p>
                                    {item.category && (
                                        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-muted-foreground">
                                            <TrendingUp className="w-4 h-4 text-primary" />
                                            {item.category}
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="p-10 pt-0 flex gap-4">
                                    <Button 
                                        onClick={() => item.path ? navigate(item.path) : navigate("/resources")}
                                        className="flex-1 rounded-2xl font-black text-lg h-16 shadow-lg shadow-primary/10 transition-all hover:scale-[1.02]"
                                    >
                                        Open Resource
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                     <Button 
                                        variant="outline"
                                        onClick={() => removeBookmark(item.id)}
                                        className="rounded-2xl font-black text-lg h-16 w-16 px-0 text-rose-500 border-rose-200 hover:bg-rose-50 hover:text-rose-600 transition-all"
                                        title="Delete Bookmark"
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default StudentPortal;
