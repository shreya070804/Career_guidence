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
        <header className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 p-8 md:p-12 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-bold tracking-wide uppercase">Dashboard Overview</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Welcome back, <br className="md:hidden" />
                <span className="text-blue-100">{user?.user_metadata?.full_name || "Student"}</span> 👋
              </h2>
              <p className="text-blue-100/80 text-lg md:text-xl font-medium max-w-xl">
                Your personalized gateway to career excellence. Manage your sessions, resources, and growth roadmap in one place.
              </p>
            </div>
            <Button 
              onClick={() => navigate("/booking")} 
              className="bg-white text-indigo-600 hover:bg-blue-50 shadow-xl shadow-black/10 rounded-2xl px-10 h-16 text-lg font-bold transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Book a Session
            </Button>
          </div>
          
          {/* Ambient Background Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-400 opacity-20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-400 opacity-20 blur-[100px] rounded-full" />
        </header>

        <Tabs defaultValue="dashboard" className="space-y-10">
          <TabsList className="bg-muted/50 border border-border p-1.5 flex w-full max-w-xl rounded-2xl shadow-sm overflow-x-auto no-scrollbar backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="rounded-xl flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all py-3 font-semibold">
              <User className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="sessions" className="rounded-xl flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all py-3 font-semibold">
              <Calendar className="w-4 h-4 mr-2" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="chat" className="rounded-xl flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all py-3 font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Guide
            </TabsTrigger>
            <TabsTrigger value="resources" className="rounded-xl flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all py-3 font-semibold">
              <BookOpen className="w-4 h-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="rounded-xl flex-1 data-[state=active]:bg-background data-[state=active]:text-rose-500 data-[state=active]:shadow-sm transition-all py-3 font-semibold">
              <Heart className="w-4 h-4 mr-2" />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-none shadow-sm rounded-[2rem] bg-white dark:bg-slate-900 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-blue-500">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Upcoming Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">
                    {sessions.filter(s => s.status === 'scheduled').length}
                  </div>
                  <p className="text-sm text-slate-500 font-medium">Active appointments</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[2rem] bg-white dark:bg-slate-900 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-emerald-500">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Learning Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">12+</div>
                  <Button variant="link" className="p-0 h-auto text-emerald-600 dark:text-emerald-400 font-bold hover:no-underline flex items-center group/btn" onClick={() => navigate("/resources")}>
                    Browse Library <ArrowRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[2rem] bg-white dark:bg-slate-900 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-purple-500">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">AI Career Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-1">Active</div>
                  <Button variant="link" className="p-0 h-auto text-purple-600 dark:text-purple-400 font-bold hover:no-underline flex items-center group/btn" onClick={() => {
                    const tabsRoot = document.querySelector('[role="tablist"]');
                    const aiTab = tabsRoot?.querySelector('[value="chat"]') as HTMLButtonElement | null;
                    aiTab?.click();
                  }}>
                    Ask AI Counselor <ArrowRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[2rem] bg-white dark:bg-slate-900 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-amber-500">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Career Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">PRO</div>
                  <Button variant="link" className="p-0 h-auto text-amber-600 dark:text-amber-400 font-bold hover:no-underline flex items-center group/btn" onClick={() => navigate("/report")}>
                    View Report <ArrowRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Your Progress Section */}
            <div className="grid gap-6 md:grid-cols-1">
              <Card className="border-none shadow-lg rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden relative group">
                <CardHeader className="p-8 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-800 dark:text-white uppercase">
                      <Target className="w-6 h-6 text-indigo-500" />
                      Your Journey Progress
                    </CardTitle>
                    <Badge variant="secondary" className="rounded-full px-4 py-1.5 font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 border-none">
                      75% Overall
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-4 grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Career Assessment
                      </span>
                      <span className="text-lg font-black text-slate-900 dark:text-white">100%</span>
                    </div>
                    <Progress value={100} className="h-3 bg-slate-100 dark:bg-slate-800" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" /> Skill Development
                      </span>
                      <span className="text-lg font-black text-slate-900 dark:text-white">45%</span>
                    </div>
                    <Progress value={45} className="h-3 bg-slate-100 dark:bg-slate-800" />
                  </div>
                </CardContent>
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />
              </Card>
            </div>

            {/* Next Steps List */}
            <Card className="border-none shadow-lg rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden group">
              <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-8">
                <CardTitle className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-800 dark:text-white uppercase">
                  <Layers className="w-6 h-6 text-indigo-500" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-8 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group/item">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 border-2 border-indigo-100 dark:border-indigo-800 shadow-sm group-hover/item:scale-110 transition-transform">
                      <span className="text-indigo-600 dark:text-indigo-400 font-black text-2xl">1</span>
                    </div>
                    <div className="flex-1 text-center sm:text-left space-y-2">
                      <h4 className="font-black text-slate-800 dark:text-white text-xl leading-tight">Complete AI Career Assessment</h4>
                      <p className="text-slate-500 font-medium text-base max-w-lg">Unlock your potential with our clinical-grade interest mapping tool.</p>
                    </div>
                    <Button 
                      variant="default" 
                      className="sm:ml-auto rounded-2xl px-8 h-12 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 font-bold text-white transition-all hover:scale-105 active:scale-95" 
                      onClick={() => navigate("/")}
                    >
                      Launch Test
                    </Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-8 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group/item">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border-2 border-slate-200 dark:border-slate-700 shadow-sm group-hover/item:scale-110 transition-transform">
                      <span className="text-slate-500 dark:text-slate-400 font-black text-2xl">2</span>
                    </div>
                    <div className="flex-1 text-center sm:text-left space-y-2">
                      <h4 className="font-black text-slate-800 dark:text-white text-xl leading-tight">Strategy Consultation</h4>
                      <p className="text-slate-500 font-medium text-base max-w-lg">Meet with a career architect to build your industry-aligned roadmap.</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="sm:ml-auto rounded-2xl px-8 h-12 border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 transition-all hover:scale-105 active:scale-95" 
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

          <TabsContent value="chat" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="border-border shadow-xl rounded-[2.5rem] overflow-hidden bg-card transition-all duration-500 ring-1 ring-inset ring-black/5 dark:ring-white/10">
              <CardHeader className="bg-muted/30 border-b border-border p-8">
                <CardTitle className="flex items-center gap-4 text-3xl font-extrabold tracking-tight">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  AI Career Counselor
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground/80 mt-2">
                  Ask questions and get instant career guidance from our AI assistant
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-0 flex flex-col h-[650px]">
                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-muted/10 custom-scrollbar">
                  <div className="flex items-start gap-4 max-w-[85%] animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                      <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="bg-card border border-border p-6 rounded-[2rem] rounded-tl-none shadow-sm text-card-foreground text-lg leading-relaxed ring-1 ring-inset ring-black/5 dark:ring-white/5">
                      Hello! I'm your AI Career Counselor. How can I help you explore your future today? You can ask me about streams, specific careers, or necessary skills.
                    </div>
                  </div>

                  <div className="flex items-start justify-end gap-4 w-full animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="bg-primary text-primary-foreground p-6 rounded-[2rem] rounded-tr-none shadow-lg shadow-primary/10 text-lg leading-relaxed max-w-[85%] font-medium">
                      What are the best career options if I take Science after 10th?
                    </div>
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex items-start gap-4 max-w-[85%] animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                      <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="bg-card border border-border p-6 rounded-[2rem] rounded-tl-none shadow-sm text-card-foreground text-lg leading-relaxed space-y-4 ring-1 ring-inset ring-black/5 dark:ring-white/5">
                      <p>If you choose the Science stream (PCM or PCB), you have many excellent options:</p>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary" /> <strong>Engineering:</strong> Software, Mechanical, or Civil.</li>
                        <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary" /> <strong>Medical:</strong> Doctor (MBBS), BDS, Nursing.</li>
                        <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary" /> <strong>Research:</strong> Astrophysics, Biotechnology.</li>
                        <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary" /> <strong>Tech & AI:</strong> Data Scientist, AI Engineer.</li>
                      </ul>
                      <p className="pt-2 text-muted-foreground italic">Would you like to explore any of these specific paths?</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-card border-t border-border mt-auto shadow-2xl">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Careers after 10th", "Careers after 12th", "Engineering paths", "Medical fields", "Top Skills"].map((suggestion, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="bg-muted hover:bg-muted/80 text-muted-foreground font-semibold px-4 py-2 cursor-pointer rounded-full transition-all hover:scale-105 active:scale-95 border border-border"
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>

                  <div className="relative flex items-center group">
                    <input 
                      type="text" 
                      placeholder="Ask about careers, streams, or skills..." 
                      className="w-full h-16 pl-8 pr-16 rounded-full border-2 border-border bg-muted/30 focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-lg font-medium"
                    />
                    <button className="absolute right-3 w-12 h-12 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-110 active:scale-95 group-focus-within:rotate-12">
                      <Send className="w-5 h-5 ml-0.5" />
                    </button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground/60 mt-4 tracking-tight">
                    AI can make mistakes. Always verify important career information with human experts.
                  </p>
                </div>
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
