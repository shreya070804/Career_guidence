import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Loader2, UserPlus, CheckCircle, Sparkles, Navigation, Target, BrainCircuit, ArrowRight, ArrowLeft } from "lucide-react";
import { z } from "zod";

const studentSchema = z.object({
  full_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().regex(/^(\+91)?[0-9]{10}$/, "Phone must be 10 digits").optional().or(z.literal("")),
  current_grade: z.enum(["10th", "12th"], { required_error: "Please select your grade" }),
  stream: z.string().optional(),
  city: z.string().trim().max(100).optional(),
  state: z.string().trim().max(100).optional(),
  interests: z.string().trim().max(500).optional(),
  career_goals: z.string().trim().max(500).optional(),
  additional_notes: z.string().trim().max(1000).optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

const StudentForm = () => {
  const [formData, setFormData] = useState<Partial<StudentFormData>>({
    current_grade: undefined,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [careerSuggestions, setCareerSuggestions] = useState<string>("");
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { toast } = useToast();

  const totalSteps = 3;

  const handleNext = () => {
    // Basic validation before moving to next step
    if (currentStep === 1) {
      if (!formData.full_name || !formData.email || !formData.current_grade) {
        toast({
          title: "Missing fields",
          description: "Please fill out all required fields marked with *",
          variant: "destructive",
        });
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== totalSteps) {
      handleNext();
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = studentSchema.parse(formData);

      // Insert into database
      const { error } = await supabase.from("students").insert([{
        full_name: validatedData.full_name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        current_grade: validatedData.current_grade,
        stream: validatedData.stream || null,
        city: validatedData.city || null,
        state: validatedData.state || null,
        interests: validatedData.interests || null,
        career_goals: validatedData.career_goals || null,
        additional_notes: validatedData.additional_notes || null,
      }]);

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Success! 🎉",
        description: "Generating personalized career suggestions...",
      });

      // Generate career suggestions using local AI Backend
      setIsLoadingSuggestions(true);
      try {
        const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_BASE}/api/ai/counsel`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stream: validatedData.stream || (validatedData.current_grade === "10th" ? "School Level" : "General"),
            interests: validatedData.interests || "General careers",
            skills: "Student level",
            goal: validatedData.career_goals || "Professional growth",
            mode: "general",
            history: [] // New session
          })
        });

        if (!response.ok) throw new Error("AI Backend failed");
        
        const suggestionsData = await response.json();
        setCareerSuggestions(suggestionsData.response);
      } catch (suggestionError) {
        console.error("Error generating suggestions:", suggestionError);
        toast({
          title: "AI Analysis Relaxing",
          description: "Registration success! But our AI is taking a quick break. Feel free to chat with it later.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingSuggestions(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        console.error("Error submitting form:", error);
        toast({
          title: "Submission Failed",
          description: "Unable to submit your information. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stepVariants: Variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  if (isSuccess) {
    return (
      <section className="py-20 bg-background flex items-center justify-center min-h-[600px]">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="container px-4 mx-auto"
        >
          <Card className="max-w-4xl mx-auto border border-primary/20 bg-white/40 dark:bg-card/40 backdrop-blur-3xl shadow-2xl rounded-[3rem] overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center mb-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
                >
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </motion.div>
                <h3 className="text-4xl font-black mb-4 text-foreground tracking-tighter">Registration Successful!</h3>
                <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                  Your information has been submitted. Our team will review your profile and get back to you shortly.
                </p>
              </div>

              {isLoadingSuggestions ? (
                <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-[2rem] border border-border/50 backdrop-blur-sm">
                  <Loader2 className="w-14 h-14 text-primary animate-spin mb-6" />
                  <p className="text-muted-foreground font-black text-xs uppercase tracking-widest animate-pulse">Consulting AI Oracle...</p>
                </div>
              ) : careerSuggestions ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/60 dark:bg-card/60 backdrop-blur-xl rounded-[2.5rem] p-10 border border-primary/10 shadow-inner"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-2xl shadow-sm">
                      <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-3xl font-black text-foreground tracking-tight">Your AI-Generated Career Roadmap</h4>
                  </div>
                  <div className="prose prose-blue dark:prose-invert max-w-none text-foreground/80 whitespace-pre-wrap leading-relaxed font-medium text-lg">
                    {careerSuggestions}
                  </div>
                </motion.div>
              ) : null}

              <div className="flex justify-center mt-12">
                <Button
                  onClick={() => {
                    setFormData({ current_grade: undefined });
                    setIsSuccess(false);
                    setCareerSuggestions("");
                    setCurrentStep(1);
                  }}
                  className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/20 h-16 px-10 text-lg font-black transition-all hover:scale-105 active:scale-95 border-0"
                >
                  Return to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50/50 dark:bg-blue-900/10 backdrop-blur-sm text-blue-700 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/20 px-5 py-2.5 rounded-full mb-6 shadow-sm">
            <UserPlus className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Registration Open</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-foreground tracking-tighter leading-none">
            Register for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Counseling</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium opacity-80">
            Share your details and our expert counselors will provide personalized career guidance tailored to your goals.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-10">
          
          {/* Left Side Information Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border border-white/5 shadow-2xl rounded-[2rem] overflow-hidden bg-slate-900 text-white h-fit hidden lg:block sticky top-28 ring-1 ring-inset ring-white/5 backdrop-blur-sm">
              <div className="p-8 relative">
                <h3 className="text-2xl font-black mb-2 tracking-tight">Why Counseling?</h3>
                <p className="text-slate-400 mb-6 text-base font-medium leading-normal">
                  Get clarity on your future with our data-driven approach and expert guidance.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: Navigation, title: "Personalized guidance", desc: "Tailored advice based on your strengths." },
                    { icon: Target, title: "Expert counselors", desc: "Connect with industry veterans." },
                    { icon: BrainCircuit, title: "AI Assessment", desc: "Discover hidden opportunities." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="bg-white/10 p-3 rounded-xl h-fit backdrop-blur-sm border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-black text-base mb-0.5 tracking-tight">{item.title}</h4>
                        <p className="text-slate-500 text-[11px] leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-white/5 rounded-[1.5rem] backdrop-blur-md border border-white/5 shadow-inner">
                  <p className="text-sm italic text-slate-100 font-medium leading-relaxed">
                    "The counseling session changed my entire perspective."
                  </p>
                  <p className="text-[8px] font-black mt-3 text-slate-500 tracking-widest uppercase">— Rahul S.</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Side Multistep Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-border/50 shadow-2xl rounded-[3rem] overflow-hidden bg-white/60 dark:bg-card/40 backdrop-blur-3xl ring-1 ring-inset ring-black/5 dark:ring-white/10 h-min transition-all duration-500">
              <CardHeader className="bg-white/40 dark:bg-muted/30 border-b border-border/50 px-10 py-10">
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Step {currentStep} / {totalSteps}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      {currentStep === 1 && "Personal Info"}
                      {currentStep === 2 && "Academic Details"}
                      {currentStep === 3 && "Interests & Goals"}
                    </span>
                  </div>
                  <div className="w-full bg-muted/60 dark:bg-muted/20 rounded-full h-2 overflow-hidden shadow-inner">
                    <motion.div 
                      className="bg-primary h-full rounded-full transition-all duration-700 ease-in-out shadow-sm" 
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-foreground tracking-tight mb-2">
                  {currentStep === 1 && "Start Your Journey"}
                  {currentStep === 2 && "Tell Us About Your Studies"}
                  {currentStep === 3 && "Your Ambitions & Goals"}
                </h3>
                <p className="text-muted-foreground font-medium opacity-80">
                  {currentStep === 1 && "Start by providing your basic contact details."}
                  {currentStep === 2 && "Tell us about your current academic standing."}
                  {currentStep === 3 && "Share your hobbies, interests, and aspirations."}
                </p>
              </CardHeader>
              <CardContent className="p-10">
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-8"
                    >
                      {currentStep === 1 && (
                        <div className="space-y-8">
                          <div className="grid gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                              <Label htmlFor="full_name" className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1">
                                Full Name <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="full_name"
                                placeholder="Shreya Sharma"
                                value={formData.full_name || ""}
                                onChange={(e) => handleInputChange("full_name", e.target.value)}
                                className="rounded-2xl h-14 bg-white/50 dark:bg-card/50 border-border/50 focus:bg-white dark:focus:bg-card transition-all font-black text-sm px-6"
                                required
                              />
                            </div>

                            <div className="space-y-3">
                              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1">
                                Email Address <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="you@university.edu"
                                value={formData.email || ""}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="rounded-2xl h-14 bg-white/50 dark:bg-card/50 border-border/50 focus:bg-white dark:focus:bg-card transition-all font-black text-sm px-6"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                              <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1">Phone Number</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+91 10-digit number"
                                maxLength={13}
                                value={formData.phone || ""}
                                onChange={(e) => handleInputChange("phone", e.target.value.replace(/[^\d+]/g, ""))}
                                className="rounded-2xl h-14 bg-white/50 dark:bg-card/50 border-border/50 focus:bg-white dark:focus:bg-card transition-all font-black text-sm px-6"
                              />
                            </div>

                            <div className="space-y-3">
                              <Label htmlFor="current_grade" className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1">
                                Current Grade <span className="text-red-500">*</span>
                              </Label>
                              <Select value={formData.current_grade} onValueChange={(value) => handleInputChange("current_grade", value)}>
                                <SelectTrigger id="current_grade" className="rounded-2xl h-14 bg-white/50 dark:bg-card/50 border-border/50 focus:bg-white dark:focus:bg-card transition-all font-black text-sm px-6">
                                  <SelectValue placeholder="Select Grade" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-border shadow-2xl backdrop-blur-3xl">
                                  <SelectItem value="10th" className="cursor-pointer py-3 font-black text-xs uppercase tracking-widest">10th Standard</SelectItem>
                                  <SelectItem value="12th" className="cursor-pointer py-3 font-black text-xs uppercase tracking-widest">12th Standard</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-8">
                          <div className="space-y-3">
                            <Label htmlFor="stream" className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1">Stream (12th only)</Label>
                            <Input
                              id="stream"
                              placeholder="e.g., Computer Science, Commerce..."
                              value={formData.stream || ""}
                              onChange={(e) => handleInputChange("stream", e.target.value)}
                              className="rounded-2xl h-14 bg-white/50 dark:bg-card/50 border-border/50 focus:bg-white dark:focus:bg-card transition-all font-black text-sm px-6"
                            />
                          </div>

                          <div className="grid gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                              <Label htmlFor="city" className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1">City</Label>
                              <Input
                                id="city"
                                placeholder="Your City"
                                value={formData.city || ""}
                                onChange={(e) => handleInputChange("city", e.target.value)}
                                className="rounded-2xl h-14 bg-white/50 dark:bg-card/50 border-border/50 focus:bg-white dark:focus:bg-card transition-all font-black text-sm px-6"
                              />
                            </div>

                            <div className="space-y-3">
                              <Label htmlFor="state" className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1">State</Label>
                              <Input
                                id="state"
                                placeholder="Your State"
                                value={formData.state || ""}
                                onChange={(e) => handleInputChange("state", e.target.value)}
                                className="rounded-2xl h-14 bg-white/50 dark:bg-card/50 border-border/50 focus:bg-white dark:focus:bg-card transition-all font-black text-sm px-6"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="space-y-8">
                          <div className="space-y-3">
                            <Label htmlFor="interests" className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1">Core Interests & Hobbies</Label>
                            <Textarea
                              id="interests"
                              placeholder="Coding, Painting, Solving Math puzzles..."
                              value={formData.interests || ""}
                              onChange={(e) => handleInputChange("interests", e.target.value)}
                              rows={3}
                              className="rounded-2xl bg-white/50 dark:bg-card/50 border-border/50 focus:bg-white dark:focus:bg-card transition-all font-black text-xs px-6 py-4 resize-none"
                            />
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="career_goals" className="text-[10px] font-black uppercase tracking-widest opacity-60 ml-1">Future Career Aspirations</Label>
                            <Textarea
                              id="career_goals"
                              placeholder="I want to build AI systems, or manage a bank..."
                              value={formData.career_goals || ""}
                              onChange={(e) => handleInputChange("career_goals", e.target.value)}
                              rows={3}
                              className="rounded-2xl bg-white/50 dark:bg-card/50 border-border/50 focus:bg-white dark:focus:bg-card transition-all font-black text-xs px-6 py-4 resize-none"
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="pt-10 flex items-center justify-between border-t border-border/50 mt-12">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handlePrev}
                      className={`rounded-xl px-8 h-12 font-black text-[10px] uppercase tracking-widest transition-all hover:bg-muted ${currentStep === 1 ? 'invisible' : ''}`}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    
                    {currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="rounded-xl bg-primary hover:bg-primary/90 text-white h-14 px-10 text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 border-0"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white h-14 px-10 text-xs font-black uppercase tracking-widest shadow-2xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95 border-0" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="mr-3 w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Submit App
                            <CheckCircle className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudentForm;
