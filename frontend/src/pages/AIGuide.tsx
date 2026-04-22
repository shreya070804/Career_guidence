import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Zap, 
  Bot, 
  User, 
  PlusCircle, 
  Mic, 
  MoreHorizontal,
  ChevronRight,
  MessageSquarePlus,
  UserCheck,
  BookOpen,
  Briefcase,
  Target,
  CheckCircle2
} from "lucide-react";
import PageLayout from "@/components/PageLayout";

interface RoadmapStep {
  phase: string;
  task: string;
}

interface CareerMatch {
  title: string;
  matchScore: number;
  reason: string;
  skills: string[];
  roadmap: RoadmapStep[];
  salary: string;
}

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  careerMatches?: CareerMatch[];
  followUps?: string[];
}

/**
 * AI Core Logic & Persona (Simulation)
 * Senior Career Mentor - Professional, Action-Oriented, India-Specific
 */
const systemPrompt = `
You are a senior Indian career mentor. 
Rules:
* Always give a complete, direct answer
* Do NOT ask unnecessary questions
* Focus on solving the query directly
* Tone: Friendly, confident, senior guiding a junior
* Use simple language, no jargon
* Do NOT use markdown symbols like ** or # headings
* Response format (Strict):
  1. Top career options (2–4 only)
  2. Why these fit you
  3. Step-by-step action plan (Daily/Weekly focus)
  4. Mistakes to avoid
  5. Real-world tips (India-focused: JEE, NEET, CA, UPSC, etc.)
`;

const AIGuide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Namaste! I am your Senior Career Mentor. I provide direct, practical guidance for Indian students. Ask me about your career path, entrance exams, or college strategy. I'll give you a clear action plan without the fluff.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Software Engineering roadmap in India?",
    "High paying careers in Commerce?",
    "Best design colleges in India?",
    "How to clear NEET in 1st attempt?",
  ];

  // Handle incoming queries from assessment or path cards
  useEffect(() => {
    if (location.state?.query) {
      handleSend(location.state.query);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateAIResponse = (userInput: string): Message => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const id = Date.now() + 1;
    const query = userInput.toLowerCase();
    
    let content = "";
    let careerMatches: CareerMatch[] = [];

    // CASE 1: NEET / Medical
    if (query.includes("neet") || query.includes("medical") || query.includes("doctor")) {
      content = `Listen closely. Here is your strategic war-plan for a Medical career in India:

1. Top Career Options:
- MBBS (Clinical Practice): Mainstream medical path.
- BDS (Dental Surgery): Alternative clinical route.
- BPT (Physiotherapy): High demand in sports and rehab.

2. Why these fit you:
- Strong base in Biology and a drive to save lives.
- High resilience for long-term study cycles (5.5 - 10 years).

3. Step-by-step action plan (Daily/Weekly):
- Daily (8-10 Hours): Spend 4 hours on Biology (NCERT), 3 hours on Chemistry, and 3 hours on Physics solving (100+ MCQs).
- Weekly: Take one full-length NEET mock test every Sunday. Analyze your 'silly mistakes' immediately.
- Monthly: Re-read the entire NCERT Biology once to maintain memory.

4. Mistakes to avoid:
- Underestimating Physics: It determines your rank.
- Buying 20 different books: Stick to NCERT + 1 good MCQ book (e.g., MTG Fingerprints).

5. Real-world tips (India-focused):
- Target 620+ marks for a safe Govt seat. 
- Use 'Mnemonics' for tricky Biology chapters like Plant Kingdom.
- Stay updated on NTA notifications via their official site only.`;
      
      careerMatches = [{
        title: "Medical Professional (MBBS)",
        matchScore: 95,
        reason: "Strategic response for medical inquiry.",
        skills: ["Clinical Knowledge", "Resilience", "Analytical Focus"],
        roadmap: [
          { phase: "Learn Basics", task: "Master NCERT Class 11/12 Biology and Chemistry as your bible." },
          { phase: "Build Core Skills", task: "Solve 10+ years of NEET previous year questions (PYQs) repeatedly." },
          { phase: "Experience", task: "Practice 3-hour mock tests under real exam conditions every week." },
          { phase: "Career Launch", task: "Clear NEET-UG with 600+ and secure a Govt Medical College (GMC)." }
        ],
        salary: "₹8L - ₹15L (Initial Govt Junior Resident)"
      }];
    } 
    // CASE 2: Software / Tech
    else if (query.includes("software") || query.includes("eng") || query.includes("tech") || query.includes("code")) {
      content = `Alright, let's get you into Tech. Indian software market is competitive but rewards the skilled.

1. Top Career Options:
- Full Stack Developer (MERN/Java): Building end-to-end apps.
- Data Engineer: Handling massive Indian data pipelines.
- Cloud Architect: Managing AWS/Azure infrastructure for global firms.

2. Why these fit you:
- Love for logic and building 'real' products.
- Prefer high-growth, remote-friendly, and globally-scaled roles.

3. Step-by-step action plan (Daily/Weekly):
- Daily (4-6 Hours): 2 hours coding (solving 2-3 LeetCode problems), 2 hours learning a framework (e.g., React), 1 hour documentation.
- Weekly: Build one small functional feature (e.g., a login page with Auth). 
- Monthly: Publish one technical blog or a GitHub repo of a finished project.

4. Mistakes to avoid:
- Tutorial Hell: Watching 100 videos without writing a single line of code.
- Ignoring Basics: Master HTML/CSS/JS before jumping into React.

5. Real-world tips (India-focused):
- Target 'Tier-1' product companies (Google, Microsoft, Zomato) via LinkedIn referrals. 
- Master DSA (Data Structures & Algorithms) — it's the mandatory gatekeeper in India.`;

      careerMatches = [{
        title: "Software Engineer",
        matchScore: 92,
        reason: "Matches technical inquiry.",
        skills: ["DSA mastery", "System Design", "JS/Modern Stack"],
        roadmap: [
          { phase: "Learn Basics", task: "Master a core language (Java/C++) and basic logic." },
          { phase: "Build Core Skills", task: "Depth in DSA and a modern framework like React or Node.js." },
          { phase: "Experience", task: "Build 3 full-stack projects and secure a local startup internship." },
          { phase: "Career Launch", task: "Optimize LinkedIn and target off-campus product companies." }
        ],
        salary: "₹12L - ₹45L (Avg Tier-1 range)"
      }];
    }
    // DEFAULT CASE: General Advice
    else {
      content = `I’ve analyzed your query. Here is a high-value roadmap for your professional ascent:

1. Top Career Options:
- High-Growth Corporate: Management, Finance, and Strategy.
- Emerging Tech: AI, Cybersecurity, and Product Management.
- Civil Services: UPSC/State PSC (if you seek social power/impact).

2. Why these fit you:
- Generalist leadership potential with high career ROI.
- Opportunity to shape large organizations or public policy.

3. Step-by-step action plan (Daily/Weekly):
- Daily: Read 30 mins of business/tech news (e.g., The Ken, MoneyControl).
- Weekly: Update your 'Skill Log' — what one new thing did you learn?
- Monthly: Connect with 2 professionals on LinkedIn in your goal field.

4. Mistakes to avoid:
- FOMO (Fear of Missing Out): Don't jump into every new trend you see on Reels.
- Zero Soft Skills: Indian employers value 'Communication' as much as technical skill.

5. Real-world tips (India-focused):
- Aim for entrance exams like CAT (for IIMs) early.
- Build a 'Personal Brand' on LinkedIn to bypass standard HR filters.`;

      careerMatches = [{
        title: "Strategic Leader",
        matchScore: 85,
        reason: "General professional excellence match.",
        skills: ["Strategic Analysis", "EQ", "Networking", "Industry Knowledge"],
        roadmap: [
          { phase: "Learn Basics", task: "Understand market dynamics and build high-level communication." },
          { phase: "Build Core Skills", task: "Master specific tools like Excel, SQL, or Design principles." },
          { phase: "Experience", task: "Work in client-facing roles or lead college societies." },
          { phase: "Career Launch", task: "Prepare for CAT/GMAT or target management trainee roles." }
        ],
        salary: "₹10L - ₹25L (Starting range)"
      }];
    }

    return {
      id,
      role: "assistant",
      timestamp: time,
      content: content,
      careerMatches: careerMatches,
      followUps: ["Tell me about required exams?", "Best colleges for this?", "How to prepare?"]
    };
  };

  const handleSend = (textInput?: string) => {
    const finalInput = textInput || input;
    if (!finalInput.trim()) return;
    
    // 1. Clear input and show user message immediately
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: finalInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // 2. Mock AI process logic
    const fullResponse = generateAIResponse(finalInput);
    
    // 3. Small "thinking" delay for realism
    setTimeout(() => {
        // 4. Create the empty placeholder for the AI response
        const assistantId = fullResponse.id;
        const assistantMessage: Message = {
          id: assistantId,
          role: "assistant",
          content: "", // Initial empty state
          timestamp: fullResponse.timestamp
        };
        
        setMessages(prev => [...prev, assistantMessage]);

        // 5. Accumulate text using an interval (Buffering effect)
        const textToStream = fullResponse.content;
        let charIndex = 0;
        let accumulatedText = "";

        const streamInterval = setInterval(() => {
          if (charIndex < textToStream.length) {
            // Take chunks for smoother performance than character-by-character
            const chunkSize = Math.random() > 0.8 ? 5 : 2; 
            accumulatedText += textToStream.slice(charIndex, charIndex + chunkSize);
            charIndex += chunkSize;

            // functional setState update to target specific message ID
            setMessages(prev => prev.map(msg => 
              msg.id === assistantId 
                ? { ...msg, content: accumulatedText } 
                : msg
            ));
          } else {
            // Stream complete
            clearInterval(streamInterval);
            setMessages(prev => prev.map(msg => 
              msg.id === assistantId 
                ? { ...msg, content: textToStream, careerMatches: fullResponse.careerMatches, followUps: fullResponse.followUps } 
                : msg
            ));
            setIsTyping(false);
          }
        }, 30); // Fast, fluid updates
    }, 800);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const messageVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <PageLayout>
      <div className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center py-12 px-4">
        {/* Advanced Background depth */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/[0.03] dark:bg-blue-500/[0.05] rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[800px] h-[800px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05] rounded-full blur-[140px]" />
        </div>

        <div className="w-full max-w-5xl z-10 space-y-10">
          
          {/* Header Section - Refined Typography */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <Badge variant="outline" className="px-5 py-2 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2 mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              Intelligence Core v2.0
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-4">
              Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Career Architect</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto opacity-70 leading-relaxed">
              Experience the future of guidance. Real-time insights, personalized roadmaps, and expert data at your fingertips.
            </p>
          </motion.div>

          {/* Chat Container - Premium Glassmorphism */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative flex flex-col h-[750px] w-full bg-white/40 dark:bg-[#0c0c0e]/40 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden ring-1 ring-inset ring-black/5 dark:ring-white/5"
          >
            {/* Chat Header - Integrated & Clean */}
            <div className="flex items-center justify-between px-10 py-8 border-b border-border/20 bg-white/30 dark:bg-white/[0.02] backdrop-blur-md relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] -mr-16 -mt-16 pointer-events-none" />
               <div className="flex items-center gap-5 relative z-10">
                <div className="relative group">
                  <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/30 group-hover:scale-105 transition-transform duration-500">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} 
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-[3px] border-white dark:border-[#0c0c0e] shadow-lg shadow-emerald-500/20" 
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight mb-1">Career Agent</h3>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/60">System Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors">
                  <MoreHorizontal className="w-6 h-6 text-muted-foreground/60" />
                </Button>
                <div className="h-8 w-[1px] bg-border/20 mx-1" />
                <Button className="hidden sm:flex items-center gap-3 rounded-2xl h-12 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted/20 border-0 hover:bg-muted/30 transition-all">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Secured
                </Button>
              </div>
            </div>

            {/* Messages Area - Immersive Scrolling */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-10 space-y-10 scroll-smooth no-scrollbar"
            >
              <div className="flex flex-col gap-10">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-5 max-w-[90%] sm:max-w-2xl ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 ${
                          msg.role === "user" 
                            ? "bg-black dark:bg-white text-white dark:text-black mt-2" 
                            : "bg-white dark:bg-[#1a1a1e] border border-border/50 text-primary mt-2"
                        }`}>
                          {msg.role === "user" ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                          <div className={`p-6 rounded-[2rem] shadow-sm text-[15px] font-medium leading-[1.65] relative group/msg ${
                            msg.role === "user" 
                              ? "bg-gradient-to-tr from-indigo-600 to-blue-600 text-white rounded-tr-none shadow-indigo-600/10" 
                              : "bg-white dark:bg-[#1a1a1e] border border-border/50 text-foreground rounded-tl-none ring-1 ring-inset ring-black/[0.02] dark:ring-white/[0.04] shadow-xl shadow-black/[0.02]"
                          }`}>
                            {msg.content}
                            
                            {/* Structured Career Matches */}
                            {msg.careerMatches && (
                              <div className="mt-8 space-y-6">
                                {msg.careerMatches.map((match, mi) => (
                                  <motion.div 
                                    key={mi}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-muted/30 dark:bg-black/20 rounded-3xl p-6 border border-border/20 space-y-4"
                                  >
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <h4 className="text-lg font-black text-primary mb-1">{match.title}</h4>
                                        <p className="text-xs text-muted-foreground opacity-80">{match.reason}</p>
                                      </div>
                                      <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black tracking-widest border border-emerald-500/20">
                                        {match.matchScore}% FIT
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Skills Needed</span>
                                        <div className="flex flex-wrap gap-1">
                                          {match.skills.map((s, si) => (
                                            <span key={si} className="text-[10px] bg-primary/5 px-2 py-0.5 rounded-md font-medium">{s}</span>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="space-y-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">India Salary (Avg)</span>
                                        <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">{match.salary}</p>
                                      </div>
                                    </div>
                                    <div className="pt-6 border-t border-border/10 space-y-6">
                                      <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-primary/10">
                                          <Sparkles className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-primary/80">Smart Roadmap Generator</span>
                                      </div>

                                      <div className="space-y-0 relative pl-4 border-l-2 border-dashed border-primary/20 ml-2">
                                        {match.roadmap.map((step, spi) => (
                                          <div key={spi} className="relative pb-8 last:pb-0">
                                            {/* Step Icon Node */}
                                            <div className="absolute -left-[25px] top-0 w-10 h-10 rounded-xl bg-background border-2 border-primary/20 flex items-center justify-center shadow-lg z-10 group-hover:border-primary transition-colors">
                                              {spi === 0 && <BookOpen className="w-4 h-4 text-primary" />}
                                              {spi === 1 && <Zap className="w-4 h-4 text-amber-500" />}
                                              {spi === 2 && <Briefcase className="w-4 h-4 text-blue-500" />}
                                              {spi === 3 && <Target className="w-4 h-4 text-emerald-500" />}
                                            </div>

                                            <div className="pl-8 space-y-1">
                                              <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Step {spi + 1}</span>
                                                <Badge variant="secondary" className="bg-primary/5 text-primary text-[9px] px-2 py-0 border-none font-bold">
                                                  {step.phase}
                                                </Badge>
                                              </div>
                                              <p className="text-[13px] font-bold text-foreground leading-snug">{step.task}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {/* Follow-up Chips */}
                            {msg.followUps && (
                              <div className="mt-8 flex flex-wrap gap-2">
                                {msg.followUps.map((f, fi) => (
                                  <button
                                    key={fi}
                                    onClick={() => handleSend(f)}
                                    className="px-4 py-2 bg-primary/5 hover:bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-primary/20"
                                  >
                                    {f}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-3 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div 
                      key="typing"
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex gap-5 items-center">
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1a1a1e] border border-border/50 text-primary flex items-center justify-center shadow-lg">
                          <Bot className="w-6 h-6" />
                        </div>
                        <div className="bg-white dark:bg-[#1a1a1e] px-6 py-5 rounded-[1.5rem] rounded-tl-none border border-border/50 flex gap-2 shadow-xl shadow-black/[0.02] ring-1 ring-inset ring-black/[0.02] dark:ring-white/[0.04]">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
                              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                              className="w-2 h-2 bg-primary/30 dark:bg-primary/50 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer / Smart Input - Integrated & Floating */}
            <div className="relative p-10 mt-auto bg-white/20 dark:bg-white/[0.02] backdrop-blur-xl border-t border-border/20">
               <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
              
              {/* Suggested Questions - Premium Filter style */}
              <div className="flex flex-wrap gap-3 mb-8 relative z-10 no-scrollbar overflow-x-auto pb-2">
                <AnimatePresence>
                  {suggestedQuestions.map((q, i) => (
                    <motion.button 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -4, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                      onClick={() => setInput(q)}
                      className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/60 dark:bg-[#1a1a1e]/60 backdrop-blur-md border border-border/50 rounded-2xl text-[11px] font-black uppercase tracking-widest text-muted-foreground/80 hover:text-primary transition-all shadow-sm hover:shadow-lg hover:shadow-primary/5 group whitespace-nowrap"
                    >
                      <Zap className="w-4 h-4 text-amber-500 opacity-60 group-hover:opacity-100" />
                      {q}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>

              {/* Chat Input Bar - Elevated & Modern */}
              <div className="relative z-10 group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <PlusCircle className="w-7 h-7 text-muted-foreground/30 group-focus-within:text-primary transition-colors duration-500" />
                </div>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask your career guru anything..."
                  className="w-full h-20 bg-white dark:bg-[#1a1a1e]/80 border border-border/60 dark:border-white/10 rounded-[1.75rem] pl-16 pr-44 font-medium text-lg text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-[6px] focus:ring-primary/10 focus:border-primary transition-all shadow-2xl shadow-indigo-500/[0.05] group-hover:border-primary/40"
                />
                <div className="absolute inset-y-0 right-3 flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl text-muted-foreground/40 hover:bg-muted/50 hidden sm:flex hover:text-primary transition-all">
                    <Mic className="w-6 h-6" />
                  </Button>
                  <Button 
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className="h-14 px-8 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all border-0 disabled:opacity-50 disabled:grayscale relative group/btn overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center gap-3">
                      SEND
                      <Send className="w-4 h-4" />
                    </span>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-muted/30 rounded-full border border-border/30">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                    AI Insights verified by expert data
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Grid - Enhanced Visuals */}
          <div className="grid md:grid-cols-3 gap-8 pt-10 pb-20">
            {[
              { icon: Zap, title: "Real-time Intelligence", desc: "Syncing with live academic & market trends.", color: "text-amber-500" },
              { icon: Brain, title: "Cognitive Matching", desc: "Expert algorithms find your ideal career fit.", color: "text-blue-500" },
              { icon: ShieldCheck, title: "Expert Guardrails", desc: "Verified suggestions from career veterans.", color: "text-emerald-500" }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="group p-8 bg-white/40 dark:bg-[#0c0c0e]/40 backdrop-blur-2xl border border-white/20 dark:border-white/5 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 ring-1 ring-inset ring-black/[0.02] dark:ring-white/[0.04]"
              >
                <div className={`w-14 h-14 rounded-[1.25rem] bg-muted/50 dark:bg-muted/10 flex items-center justify-center ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </PageLayout>

  );
};

export default AIGuide;
