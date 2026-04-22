import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Loader2, MessageSquare, Sparkles, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What career should I choose after 12th commerce?",
  "How can I become a data scientist?",
  "Best engineering colleges in India?",
  "Career options in Creative Arts?",
];

const MessageContent = ({ content }: { content: string }) => {
  // Simple regex to detect [Text](Link) and replace with Link component
  const parts = content.split(/(\[.*?\]\(.*?\))/g);
  
  return (
    <p className="whitespace-pre-wrap">
      {parts.map((part, i) => {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [, text, url] = match;
          const isExternal = url.startsWith("http");
          if (isExternal) {
            return (
              <a 
                key={i} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white bg-white/20 px-2 py-0.5 rounded font-bold hover:bg-white/30 underline decoration-2 transition-all inline-flex items-center gap-1"
              >
                {text}
              </a>
            );
          }
          return (
            <Link 
              key={i} 
              to={url} 
              className="font-bold underline decoration-2 hover:text-white transition-all inline-flex items-center gap-0.5 underline-offset-4"
            >
              {text}
              <ChevronRight className="w-3 h-3" />
            </Link>
          );
        }
        return part;
      })}
    </p>
  );
};

const CareerChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/ai/counsel`;

    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage, previousHistory: messages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();
      const assistantMessage = data.response;

      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    await streamChat(userMessage);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        <div className="bg-white dark:bg-zinc-900 px-4 py-2 rounded-2xl shadow-xl border border-border animate-bounce text-xs font-bold text-primary flex items-center gap-2">
          <Sparkles className="w-3 h-3 fill-primary" />
          Need career help?
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full w-16 h-16 shadow-xl hover:shadow-2xl transition-all group relative z-10"
          >
            <Bot className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-[420px] max-w-[calc(100vw-2rem)] animate-in zoom-in-95 duration-300">
      <Card className="shadow-2xl border-border bg-card overflow-hidden rounded-[2rem] ring-1 ring-inset ring-black/5 dark:ring-white/10">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-black tracking-tight leading-none mb-1">Career Guide AI</CardTitle>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] uppercase font-black tracking-widest text-blue-100">Always Online</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-xl h-10 w-10"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[450px] p-6 bg-background/50 backdrop-blur-sm" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                  <Bot className="w-10 h-10 text-primary" />
                </div>
                <h4 className="text-xl font-black text-foreground mb-2 tracking-tight">How can I help you?</h4>
                <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                  I'm your AI counselor. Ask me about career paths, college selection, or entrance exams!
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-8 max-w-sm">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput("");
                        streamChat(q);
                      }}
                      className="text-xs font-bold px-4 py-2 bg-white/50 dark:bg-white/5 border border-primary/20 hover:border-primary hover:bg-primary/5 rounded-full transition-all text-primary"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                   key={index}
                   className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`rounded-[1.25rem] p-4 text-sm font-medium leading-relaxed shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/5 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-md shadow-primary/20"
                        : "bg-muted/80 backdrop-blur-sm text-foreground rounded-tl-none border border-border/50"
                    }`}
                  >
                    <MessageContent content={message.content} />
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-xl bg-indigo-600/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                      <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start items-center">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="rounded-[1.25rem] rounded-tl-none p-4 bg-muted/80 backdrop-blur-sm border border-border/50 shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/5">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-5 border-t border-border/50 bg-card">
            {messages.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                {suggestedQuestions.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInput("");
                      streamChat(q);
                    }}
                    className="whitespace-nowrap text-[10px] font-bold px-3 py-1.5 bg-muted/50 border border-border rounded-lg hover:border-primary/50 transition-all text-muted-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your follow-up questions..."
                disabled={isLoading}
                className="flex-1 rounded-2xl h-12 bg-muted/30 border-border focus:bg-background transition-all"
              />
              <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="rounded-2xl h-12 w-12 bg-primary shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerChatbot;
