import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  Send,
  User,
  Sparkles,
  X,
  TrendingUp,
  Map,
  BookOpen,
  Trophy,
  ArrowRight,
  Target,
  History,
  RotateCcw,
  Layout,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UserProfile {
  stream: string;
  interests: string;
  skills: string;
  goal: string;
}

interface Recommendation {
  career: string;
  match: string;
  growth: string;
  salary?: {
    india: string;
    abroad: string;
  };
}

const STORAGE_KEYS = {
  MESSAGES: "career_ai_messages",
  PROFILE: "career_ai_profile",
};

const MessageContent = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  return (
    <div className="space-y-2">
      {lines.map((line, idx) => {
        const parts = line.split(/(\[.*?\]\(.*?\))/g);
        const renderedParts = parts.map((part, i) => {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            const [, text, url] = match;
            const isExternal = url.startsWith("http");
            if (isExternal) {
              return (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                  {text}
                </a>
              );
            }
            return (
              <Link key={i} to={url} className="text-primary font-bold hover:underline">
                {text}
              </Link>
            );
          }
          const boldParts = part.split(/(\*\*.*?\*\*)/g);
          return boldParts.map((bp, j) => {
            if (bp.startsWith('**') && bp.endsWith('**')) {
              return <strong key={`${i}-${j}`} className="font-black text-foreground underline decoration-primary/30 decoration-2">{bp.slice(2, -2)}</strong>;
            }
            return bp;
          });
        });

        if (line.trim().startsWith('-') || line.trim().startsWith('*') || /^\d+\./.test(line.trim())) {
          return (
            <div key={idx} className="flex gap-2 pl-2">
              <span className="text-primary font-bold">•</span>
              <div className="flex-1 italic">{renderedParts}</div>
            </div>
          );
        }
        return <p key={idx} className="leading-relaxed">{renderedParts}</p>;
      })}
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex items-center gap-3">
    <div className="flex gap-1 py-1 px-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          className="w-1.5 h-1.5 bg-primary/60 rounded-full"
        />
      ))}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground animate-pulse">AI is Thinking...</span>
  </div>
);

const ProfileSetup = ({ onComplete }: { onComplete: (profile: UserProfile) => void }) => {
  const [profile, setProfile] = useState<UserProfile>({
    stream: "",
    interests: "",
    skills: "",
    goal: "",
  });

  const isComplete = profile.stream && profile.interests && profile.skills && profile.goal;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 p-2">
      <div className="space-y-1">
        <h3 className="text-lg font-black italic tracking-tighter text-foreground text-left">Tell us about yourself</h3>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider text-left">Help me personalize your roadmap</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 block text-left">Current Stream</label>
          <div className="grid grid-cols-3 gap-2">
            {["Science", "Commerce", "Arts"].map((s) => (
              <button
                key={s}
                onClick={() => setProfile({ ...profile, stream: s })}
                className={`py-2 text-[9px] font-black uppercase rounded-xl border transition-all ${
                  profile.stream === s 
                    ? "bg-primary text-white border-primary shadow-lg" 
                    : "bg-muted/30 border-border/50 hover:border-primary/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 block text-left">Major Interests</label>
          <Input 
            value={profile.interests}
            onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
            placeholder="e.g. Coding, Design, Business"
            className="rounded-xl h-11 bg-muted/30 border-border focus:bg-background text-[11px] font-semibold"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 block text-left">Key Skills</label>
          <Input 
            value={profile.skills}
            onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
            placeholder="e.g. Math, Writing, React"
            className="rounded-xl h-11 bg-muted/30 border-border focus:bg-background text-[11px] font-semibold"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 block text-left">Future Goal</label>
          <Input 
            value={profile.goal}
            onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
            placeholder="e.g. Startup, Big Tech, PhD"
            className="rounded-xl h-11 bg-muted/30 border-border focus:bg-background text-[11px] font-semibold"
          />
        </div>
      </div>

      <Button disabled={!isComplete} onClick={() => onComplete(profile)} className="h-12 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90">
        Launch My Analysis
      </Button>
    </motion.div>
  );
};

const RecommendationView = ({ recommendations, onStartChat }: { recommendations: Recommendation[], onStartChat: () => void }) => {
  const [showGlobal, setShowGlobal] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 p-2">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black italic tracking-tighter text-foreground flex items-center gap-2 text-left">
            <Trophy className="w-4 h-4 text-yellow-500" /> Matches Found
          </h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider text-left">Top 3 Career Picks</p>
        </div>
        <button 
          onClick={() => setShowGlobal(!showGlobal)}
          className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary/20 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-3 h-3" />
          {showGlobal ? "Hide Global" : "Show Global"}
        </button>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <motion.div key={rec.career} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="p-4 bg-primary/5 border border-primary/20 rounded-[1.5rem] space-y-3 hover:bg-primary/10 transition-all cursor-default group backdrop-blur-sm text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
               <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            
            <div className="space-y-1">
              <h4 className="font-black text-sm text-primary uppercase tracking-tight">{rec.career}</h4>
              <p className="text-[11px] font-bold text-foreground leading-relaxed italic pr-4">{rec.match}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
               <div className="space-y-0.5">
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">India (LPA)</span>
                  <p className="text-[11px] font-black text-emerald-500">{rec.salary?.india || "₹6L - ₹25L"}</p>
               </div>
               {showGlobal && (
                 <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-0.5">
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Abroad (USD)</span>
                    <p className="text-[11px] font-black text-blue-500">{rec.salary?.abroad || "$80k - $120k"}</p>
                 </motion.div>
               )}
            </div>

            <div className="pt-1 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest opacity-70">
              <Rocket className="w-3 h-3" /> Growth: {rec.growth}
            </div>
          </motion.div>
        ))}
      </div>

      <Button onClick={onStartChat} className="h-12 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-2 group bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
        Start Personalized Session
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};

const CareerChatbot = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : null;
  });

  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    if (userProfile) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
    }
  }, [messages, userProfile]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    toast({ title: "History Cleared", description: "All messages deleted successfully." });
  };

  const streamChat = async (userMessage: string, forceProfile?: UserProfile) => {
    const activeProfile = forceProfile || userProfile;
    if (!activeProfile) return;

    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const API_URL = `${API_BASE_URL}/api/ai/counsel`;

    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, userProfile: activeProfile, previousHistory: messages }),
      });

      if (!response.ok) throw new Error("Server overloaded");

      const data = await response.json();
      const assistantMessage = data.response || data.reply;
      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      toast({ title: "API Linkage Failed", description: "Could not reach the intelligence server.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileComplete = async (profile: UserProfile) => {
    setUserProfile(profile);
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const API_URL = `${API_BASE_URL}/api/ai/counsel`;
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userProfile: profile, type: "recommendation" }),
      });
      const data = await response.json();
      if (data.recommendations) setRecommendations(data.recommendations);
    } catch (error) {
      toast({ title: "Match Engine Failed", description: "Defaulting to general guidance.", variant: "destructive" });
      startChat(profile);
    } finally {
      setIsLoading(false);
    }
  };

  const startChat = (profile?: UserProfile) => {
    const p = profile || userProfile;
    if (!p) return;
    const initialMessage = `Hello! Based on my profile as a ${p.stream} student, help me explore best careers.`;
    streamChat(initialMessage, p);
  };

  const [isResumeMode, setIsResumeMode] = useState(false);

  const analyzeResume = async (text: string) => {
    if (!userProfile) return;
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const API_URL = `${API_BASE_URL}/api/ai/counsel`;

    const displayMessage = "Analyzing your resume... this will take a few seconds.";
    setMessages(prev => [...prev, { role: "user", content: "Analyze my resume text..." }]);
    setIsLoading(true);
    setIsResumeMode(false);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userProfile, 
          type: "resume_analysis", 
          resumeContent: text 
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response || data.reply }]);
    } catch (error) {
      toast({ title: "Analysis Failed", description: "Could not analyze resume text.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");

    if (isResumeMode) {
      await analyzeResume(userMessage);
    } else {
      await streamChat(userMessage);
    }
  };

  if (!isOpen) {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        <div className="bg-white dark:bg-zinc-900 border-primary/20 px-4 py-2 rounded-2xl shadow-xl border animate-bounce text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
          <Sparkles className="w-3 h-3 fill-primary" /> Roadmap Intelligence
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
          <Button onClick={() => setIsOpen(true)} size="lg" className="rounded-full w-16 h-16 shadow-xl hover:shadow-2xl transition-all group relative z-10 bg-primary ring-4 ring-primary/10">
            <Bot className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-[460px] max-w-[calc(100vw-2rem)]">
      <motion.div initial={{ y: 20, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} className="h-[700px] flex flex-col group">
        <Card className="flex-1 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-0 bg-card/95 backdrop-blur-xl overflow-hidden rounded-[2.5rem] flex flex-col relative ring-1 ring-white/10">
          <CardHeader className="bg-gradient-to-br from-zinc-900 via-indigo-950 to-blue-950 text-white p-6 pb-12 relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-2xl group overflow-hidden ring-1 ring-white/20">
                   <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
                    <Bot className="w-7 h-7 text-primary" />
                   </motion.div>
                </div>
                <div>
                  <CardTitle className="text-lg font-black tracking-tighter leading-none mb-1.5 italic text-left text-white flex items-center gap-2">
                    Career Intelligence
                    <span className="text-[9px] bg-primary text-white font-black px-1.5 py-0.5 rounded-full not-italic tracking-widest uppercase">v2.1</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-[9px] uppercase font-black tracking-[0.2em] text-zinc-400">Personalized Engine</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                   <Button variant="ghost" size="icon" onClick={clearChat} className="text-white/40 hover:text-white rounded-xl h-10 w-10 transition-colors">
                    <RotateCcw className="w-5 h-5" />
                   </Button>
                )}
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white rounded-xl h-10 w-10">
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex-1 flex flex-col min-h-0 bg-background/50 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(63,94,251,0.05)_0%,rgba(0,0,0,0)_50%)] pointer-events-none" />
            
            {!userProfile ? (
              <ScrollArea className="flex-1 p-8">
                <ProfileSetup onComplete={handleProfileComplete} />
              </ScrollArea>
            ) : isLoading && !messages.length && !recommendations ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6 text-center">
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center relative ring-1 ring-primary/10">
                   <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-[2.5rem] animate-spin duration-[10000ms]" />
                   <Sparkles className="w-10 h-10 text-primary" />
                </motion.div>
                <div className="space-y-4">
                   <h4 className="text-2xl font-black italic tracking-tighter">Initializing Roadmap Engine</h4>
                   <div className="flex flex-col items-center gap-2">
                     <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest animate-pulse">Running Career Matches</span>
                     <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.5, repeat: Infinity }} className="w-full h-full bg-primary" />
                     </div>
                   </div>
                </div>
              </div>
            ) : recommendations && !messages.length ? (
              <ScrollArea className="flex-1 p-8">
                <RecommendationView recommendations={recommendations} onStartChat={startChat} />
              </ScrollArea>
            ) : (
              <>
                <ScrollArea className="flex-1 px-6 pt-6" ref={scrollRef}>
                  <AnimatePresence mode="popLayout">
                    <div className="space-y-10 pb-10 text-left">
                      {messages.map((message, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-4 p-1 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                          {message.role === "assistant" && (
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg ring-1 ring-white/10">
                              <Bot className="w-6 h-6 text-white" />
                            </div>
                          )}
                          <div className={`max-w-[85%] rounded-[1.5rem] p-4 text-xs font-bold leading-relaxed border relative ${
                              message.role === "user" 
                                ? "bg-indigo-600 text-white rounded-tr-none border-transparent shadow-2xl shadow-indigo-500/10" 
                                : "bg-card text-foreground rounded-tl-none border-border shadow-sm"
                          }`}>
                            <MessageContent content={message.content} />
                          </div>
                          {message.role === "user" && (
                            <div className="w-10 h-10 rounded-2xl bg-zinc-800 flex items-center justify-center flex-shrink-0 shadow-lg ring-1 ring-white/10">
                              <User className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                      {isLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 justify-start items-start p-1">
                          <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0 border border-border text-left">
                            <Bot className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="rounded-[1.75rem] rounded-tl-none p-5 bg-muted/30 border border-border">
                             <TypingIndicator />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </AnimatePresence>
                </ScrollArea>

                <div className="p-6 border-t border-border bg-card shadow-[0_-8px_32px_rgba(0,0,0,0.02)]">
                   {!isLoading && (
                    <div className="flex gap-2 overflow-x-auto pb-5 no-scrollbar -mx-2 px-2">
                        <button onClick={() => { setIsResumeMode(true); setMessages(prev => [...prev, { role: "assistant", content: "Please paste your resume text here! I'll scan it for missing skills and match it with your target careers." }]); }} className="whitespace-nowrap flex items-center gap-2 text-[10px] font-black uppercase tracking-wider px-4 py-2.5 bg-primary/5 text-primary border border-primary/20 rounded-xl hover:bg-primary/10 transition-all font-sans">
                          <History className="w-3.5 h-3.5" /> Resume Analysis
                        </button>
                        <button onClick={() => streamChat("Generate a month-by-month roadmap for Year 1")} className="whitespace-nowrap flex items-center gap-2 text-[10px] font-black uppercase tracking-wider px-4 py-2.5 bg-primary/5 text-primary border border-primary/20 rounded-xl hover:bg-primary/10 transition-all font-sans">
                          <Layout className="w-3.5 h-3.5" /> 3-Year Roadmap
                        </button>
                        <button onClick={() => streamChat("Suggest top IITs, NITs, and Private colleges for this career path. Include fees and location.")} className="whitespace-nowrap flex items-center gap-2 text-[10px] font-black uppercase tracking-wider px-4 py-2.5 bg-primary/5 text-primary border border-primary/20 rounded-xl hover:bg-primary/10 transition-all font-sans">
                          <BookOpen className="w-3.5 h-3.5" /> Recommend Colleges
                        </button>
                        <button onClick={() => streamChat("What coding projects should I build?")} className="whitespace-nowrap flex items-center gap-2 text-[10px] font-black uppercase tracking-wider px-4 py-2.5 bg-primary/5 text-primary border border-primary/20 rounded-xl hover:bg-primary/10 transition-all font-sans">
                          <Rocket className="w-3.5 h-3.5" /> Projects
                        </button>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="flex gap-3 relative">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask for roadmap, skills or projects..."
                      disabled={isLoading}
                      className="flex-1 rounded-[1.25rem] h-14 bg-muted/30 border-border focus:bg-background focus:ring-4 focus:ring-primary/5 transition-all pl-6 pr-14 text-sm font-bold"
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="absolute right-2 top-2 rounded-xl h-10 w-10 bg-primary shadow-xl shadow-primary/20 hover:scale-105 active:scale-95">
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CareerChatbot;
