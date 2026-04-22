import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, GraduationCap } from "lucide-react";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Name must be at least 2 characters").optional(),
});

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validated = authSchema.parse(formData);

      // Call login from context to set the mock user
      await login(validated.email);

      // Mock successful sign up for now since Supabase is removed
      toast({
        title: "Account created successfully!",
        description: "Welcome to Career Counseling Platform",
      });
      navigate("/student-portal");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else if (error instanceof Error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validated = authSchema.omit({ fullName: true }).parse(formData);

      // Call login from context to set the mock user
      await login(validated.email);

      toast({
        title: "Welcome back!",
        description: "Successfully signed in to your account",
      });
      navigate("/student-portal");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else if (error instanceof Error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
      <Card className="w-full max-w-md shadow-2xl rounded-[2rem] border-border bg-card relative z-10 ring-1 ring-inset ring-black/5 dark:ring-white/10">
        <CardHeader className="text-center pb-8 pt-10">
          <div className="mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 ring-8 ring-primary/5">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight text-foreground">Career Compass</CardTitle>
          <CardDescription className="text-base text-muted-foreground mt-2">Sign in to access your personalized career guidance</CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <Tabs defaultValue="signin" className="w-full space-y-8">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 rounded-xl">
              <TabsTrigger value="signin" className="rounded-lg font-bold data-[state=active]:bg-background transition-all">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg font-bold data-[state=active]:bg-background transition-all">Sign Up</TabsTrigger>
            </TabsList>
  
            <TabsContent value="signin" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-sm font-bold ml-1">Email Address</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 rounded-xl bg-muted/20 border-border focus-visible:ring-primary/20 focus-visible:border-primary transition-all pr-4 pl-4 font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" id="signin-password-label" className="text-sm font-bold ml-1">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-12 rounded-xl bg-muted/20 border-border focus-visible:ring-primary/20 focus-visible:border-primary transition-all pr-4 pl-4 font-medium"
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 text-base" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>
  
            <TabsContent value="signup" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <form onSubmit={handleSignUp} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-bold ml-1">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="h-12 rounded-xl bg-muted/20 border-border focus-visible:ring-primary/20 focus-visible:border-primary transition-all pr-4 pl-4 font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-bold ml-1">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 rounded-xl bg-muted/20 border-border focus-visible:ring-primary/20 focus-visible:border-primary transition-all pr-4 pl-4 font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" id="signup-password-label" className="text-sm font-bold ml-1">Create Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-12 rounded-xl bg-muted/20 border-border focus-visible:ring-primary/20 focus-visible:border-primary transition-all pr-4 pl-4 font-medium"
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 text-base" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="fixed bottom-8 text-center w-full text-muted-foreground/60 text-sm font-medium">
        © 2024 Career Compass. All rights reserved.
      </div>
    </div>
  );
};

export default Auth;
