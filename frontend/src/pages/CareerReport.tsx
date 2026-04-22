import React, { useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  ChevronRight, 
  Download, 
  GraduationCap, 
  PieChart, 
  Star, 
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Sparkles,
  Zap,
  Quote
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CareerReport = () => {
  const { user } = useAuth();
  const reportRef = useRef<HTMLDivElement>(null);

  const studentData = {
    name: user?.user_metadata?.full_name || "John Doe",
    grade: "12th Grade (Science)",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    aiSummary: "Based on our AI analysis of your aptitude and technical skills, you exhibit a strong affinity for complex problem-solving and structured logic. Your high scores in technical proficiency combined with a growing aptitude for communication suggest a promising future in leadership roles within the technology sector. We recommend focusing on cross-functional projects that allow you to bridge the gap between technical implementation and business strategy.",
    scores: [
      { label: "Aptitude", value: 85, color: "from-blue-500 to-blue-600" },
      { label: "Technical Skills", value: 92, color: "from-purple-500 to-purple-600" },
      { label: "Communication", value: 78, color: "from-indigo-500 to-indigo-600" },
      { label: "Creativity", value: 88, color: "from-pink-500 to-pink-600" },
    ],
    recommendations: [
      {
        title: "Full-Stack Software Engineer",
        match: "95%",
        description: "Designing end-to-end applications and cloud-native solutions.",
        icon: <Briefcase className="w-5 h-5 text-white" />
      },
      {
        title: "Data Systems Architect",
        match: "88%",
        description: "Building scalable data pipelines and analytical infrastructures.",
        icon: <PieChart className="w-5 h-5 text-white" />
      },
      {
        title: "Product Technology Manager",
        match: "82%",
        description: "Leading technical teams to build user-centric digital products.",
        icon: <TrendingUp className="w-5 h-5 text-white" />
      }
    ],
    skillsBreakdown: {
      strengths: ["Logical Reasoning", "Python Development", "UI/UX Awareness", "Mathematical Modeling", "Cloud Fundamentals"],
      improvements: ["Public Speaking", "Advanced Statistical Analysis", "Project Time Estimation"]
    },
    roadmap: [
      { step: "Higher Secondary Completion", year: "2024 - 2026", details: "Major in PCM with focused study on Advanced Mathematics and Computer Science elective." },
      { step: "B.Tech in Computer Science", year: "2026 - 2030", details: "Admissions in Tier-1 Engineering Institutes. Focus on Algorithm Design and System Architecture." },
      { step: "Professional Certifications", year: "2029 - 2030", details: "Obtain AWS/Google Cloud Architect certifications to enhance industry readiness." },
      { step: "Senior Role Progression", year: "2030+", details: "Entry into top-tier tech firms following by specialized leadership training." }
    ],
    colleges: [
      { name: "Indian Institute of Technology (IIT)", location: "Mumbai, MH", rating: "9.8/10", tag: "Premier" },
      { name: "BITS Pilani", location: "Pilani, RJ", rating: "9.5/10", tag: "Elite" },
      { name: "Vellore Institute of Technology", location: "Vellore, TN", rating: "8.9/10", tag: "Exceptional" },
      { name: "IIIT Hyderabad", location: "Hyderabad, TS", rating: "9.1/10", tag: "Tech-Focused" }
    ]
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`Career_Report_${studentData.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("PDF Export failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 flex flex-col items-center">
      
      {/* Action Bar */}
      <div className="w-[800px] flex justify-end mb-6 no-print">
        <Button 
          onClick={handleDownloadPDF} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg rounded-xl h-12 px-6 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Download className="w-5 h-5" />
          Export as Professional PDF
        </Button>
      </div>

      {/* Main Report Container (800px Width) */}
      <div 
        ref={reportRef}
        className="w-[800px] bg-white shadow-2xl rounded-none md:rounded-3xl overflow-hidden font-sans text-slate-900 border border-slate-200"
      >
        
        {/* 1. COVER PAGE SECTION */}
        <section className="relative h-[480px] bg-gradient-to-br from-indigo-700 via-blue-600 to-purple-700 p-16 text-white overflow-hidden">
          <div className="relative z-20 flex flex-col items-center text-center justify-center h-full space-y-8">
            <div className="bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/20 shadow-2xl">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl font-black uppercase tracking-widest">Career Compass Report</h1>
              <div className="h-1.5 w-24 bg-white/30 mx-auto rounded-full" />
              <p className="text-blue-100 text-xl font-medium tracking-wide">AI-Powered Career Intelligence System</p>
            </div>
            <div className="space-y-2 pt-6">
              <p className="text-blue-200 text-sm uppercase font-bold tracking-[0.3em]">Prepared For</p>
              <h2 className="text-4xl font-bold">{studentData.name}</h2>
              <p className="text-blue-100/80 font-medium">{studentData.grade} • {studentData.date}</p>
            </div>
          </div>
          
          {/* Abstract background graphics */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path fill="#FFFFFF" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.6,-31.3,86.9,-15.6,85.2,-0.9C83.5,13.8,76.7,27.5,68.4,40.1C60.1,52.7,50.3,64.1,38.1,71.7C25.9,79.2,12.9,82.9,-1.1,84.7C-15.1,86.5,-30.2,86.5,-43.3,80.3C-56.4,74.1,-67.5,61.7,-75.4,47.8C-83.3,33.9,-88,16.9,-88.2,0.1C-88.3,-16.7,-84,-33.4,-75.1,-47.5C-66.2,-61.6,-52.7,-73.1,-38.4,-79.8C-24.1,-86.5,-9,-88.4,4.2,-95.7C17.4,-103,31.4,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
        </section>

        <div className="p-12 space-y-16">
          
          {/* 2. AI CAREER SUMMARY SECTION */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-100">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">AI Career Insight Summary</h3>
            </div>
            <Card className="border-none bg-slate-50 shadow-inner rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
                  "{studentData.aiSummary}"
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 3. PERFORMANCE / SKILLS SECTION (2-Column) */}
          <div className="grid grid-cols-2 gap-12">
            
            {/* Performance Bars */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Performance Metrics</h3>
              </div>
              <div className="space-y-8">
                {studentData.scores.map((score, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{score.label}</span>
                      <span className="text-xl font-black text-slate-800">{score.value}%</span>
                    </div>
                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                      <div 
                        className={`h-full bg-gradient-to-r ${score.color} rounded-full transition-all duration-1000 shadow-sm`}
                        style={{ width: `${score.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Breakdown (Strengths & Improvements) */}
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Skills Breakdown</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Key Strengths
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {studentData.skillsBreakdown.strengths.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> Areas for Growth
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {studentData.skillsBreakdown.improvements.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100 shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 4. CAREER RECOMMENDATIONS SECTION */}
          <section className="space-y-8 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-100">
                <Star className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Top Career Recommendations</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {studentData.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-center p-6 border-2 border-slate-50 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all gap-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                    {recommendation.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-bold text-slate-800">{recommendation.title}</h4>
                      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-3 py-1 rounded-full text-xs">
                        {recommendation.match} MATCH
                      </Badge>
                    </div>
                    <p className="text-slate-500 font-medium">{recommendation.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. CAREER ROADMAP SECTION (Vertical Timeline) */}
          <section className="space-y-10 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Strategic Implementation Roadmap</h3>
            </div>
            
            <div className="relative ml-4 space-y-12">
              {/* Vertical line connector */}
              <div className="absolute left-[15px] top-4 bottom-4 w-1 bg-slate-100 rounded-full" />
              
              {studentData.roadmap.map((item, index) => (
                <div key={index} className="relative flex gap-10">
                  <div className="relative z-10 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 border-4 border-white shadow-md">
                    <span className="text-white text-xs font-black">{index + 1}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <h4 className="text-lg font-bold text-slate-800">{item.step}</h4>
                      <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">{item.year}</span>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-[600px]">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. RECOMMENDED COLLEGES SECTION */}
          <section className="space-y-8 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Institutional Recommendations</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {studentData.colleges.map((college, index) => (
                <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-bold text-slate-800 leading-tight pr-4">{college.name}</h4>
                      <Badge variant="outline" className="border-indigo-200 text-indigo-600 font-bold bg-white shrink-0">
                        {college.tag}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {college.location}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 text-amber-500 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-black text-slate-400">RATING {college.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* 8. FOOTER SECTION */}
          <footer className="text-center space-y-8 py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 rounded-full bg-slate-100">
                <Quote className="w-6 h-6 text-slate-400 fill-current opacity-30" />
              </div>
              <p className="text-2xl font-serif text-slate-500 italic max-w-lg mx-auto">
                "The only way to do great work is to love what you do. If you haven't found it yet, keep looking."
              </p>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest pt-2">Steve Jobs</p>
            </div>
            
            <div className="h-px w-full bg-slate-100" />
            
            <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
              <span>Career Compass Intelligent Systems © 2026</span>
              <div className="flex gap-4">
                <span>Verification ID: CC-AI-8923-X</span>
                <span>CONFIDENTIAL</span>
              </div>
            </div>
          </footer>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; }
          .w-[800px] { width: 100% !important; box-shadow: none !important; border: none !important; border-radius: 0 !important; }
          img { -webkit-print-color-adjust: exact; }
          section { page-break-inside: avoid; }
        }
      `}} />
    </div>
  );
};

export default CareerReport;
