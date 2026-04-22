import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const Booking = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>();
  const [sessionType, setSessionType] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const sessionTypes = [
    { value: "career-guidance", label: "Career Guidance" },
    { value: "stream-selection", label: "Stream Selection" },
    { value: "college-admission", label: "College Admission" },
    { value: "exam-preparation", label: "Exam Preparation" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book a session",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!date || !sessionType || !timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const [hours, minutes, period] = timeSlot.match(/(\d+):(\d+)\s*(AM|PM)/)?.slice(1) || [];
      let hour = parseInt(hours);
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      const sessionDate = new Date(date);
      sessionDate.setHours(hour, parseInt(minutes), 0, 0);

      const { error } = await supabase.from("counseling_sessions").insert({
        student_id: user.id,
        session_date: sessionDate.toISOString(),
        session_type: sessionType,
        status: "scheduled",
        duration_minutes: 60,
      });

      if (error) throw error;

      toast({
        title: "Session Booked Successfully!",
        description: "Your counseling session has been scheduled",
      });
      navigate("/student-portal");
    } catch (error) {
      console.error("Error booking session:", error);
      toast({
        title: "Booking Failed",
        description: "Unable to book your session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="flex justify-center items-start">
        <Card className="w-full max-w-2xl border border-border shadow-sm rounded-2xl bg-card overflow-hidden ring-1 ring-inset ring-black/5 dark:ring-white/10">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="flex items-center gap-3 text-3xl font-bold text-card-foreground">
              <CalendarIcon className="w-7 h-7 text-primary" />
              Book a Counseling Session
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground mt-2">
              Schedule a personalized career counseling session with our experts
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 pt-4">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Session Type</Label>
                <Select value={sessionType} onValueChange={setSessionType}>
                  <SelectTrigger className="h-12 rounded-xl border-border text-foreground bg-muted/50">
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-border shadow-lg">
                    {sessionTypes.map((type) => (
                      <SelectItem 
                        key={type.value} 
                        value={type.value}
                        className="py-3 px-4 focus:bg-primary focus:text-primary-foreground cursor-pointer transition-colors"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 flex flex-col items-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-xl border border-border w-full flex justify-center py-4 bg-muted/20"
                  classNames={{
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary",
                    day_today: "bg-muted text-foreground",
                  }}
                />
              </div>

              {date && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <Label className="text-sm font-medium text-foreground">Select Time Slot</Label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger className="h-12 rounded-xl border-border text-foreground bg-muted/50">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border border-border shadow-lg">
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot} className="py-2 cursor-pointer focus:bg-muted">
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base mt-4 shadow-lg shadow-primary/20" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Booking;
