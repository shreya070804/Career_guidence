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
import { jsPDF } from "jspdf";
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
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        compress: true
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, (pdfHeight - 10) / imgHeight);
      
      const imgFinalWidth = imgWidth * ratio;
      const imgFinalHeight = imgHeight * ratio;
      const xOffset = (pdfWidth - imgFinalWidth) / 2;
      const yOffset = 5; // Slight top margin
      
      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgFinalWidth, imgFinalHeight);
      pdf.save(`Career_Report_${studentData.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("PDF Export failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4 flex flex-col items-center selection:bg-indigo-500/30">
      
      {/* Action Bar */}
      <div className="w-[800px] flex justify-end mb-6 no-print">
        <Button 
          onClick={handleDownloadPDF} 
          className="bg-white hover:bg-slate-100 text-slate-900 shadow-xl rounded-lg h-10 px-6 text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          Export PDF
        </Button>
      </div>

      {/* Main Report Container (800px Width) */}
      <div 
        ref={reportRef}
        className="w-[800px] bg-white shadow-2xl rounded-none md:rounded-3xl overflow-hidden font-sans text-slate-900 border border-slate-200"
      >
        
        <section className="relative h-[480px] bg-[#020617] p-16 text-white overflow-hidden flex flex-col justify-between border-b border-white/5">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -ml-64 -mb-64" />

          {/* Top Logo/Header Area */}
          <div className="relative z-20 flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl">
                <Sparkles className="w-7 h-7 text-indigo-400" />
              </div>
              <div className="pt-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-1 leading-none">Intelligence.v2</p>
                <h3 className="text-sm font-black uppercase tracking-widest text-white leading-none">Career Compass</h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-800 px-3 py-1 rounded-full">Official Assessment</span>
            </div>
          </div>

          {/* Main Title Block */}
          <div className="relative z-20">
            <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-500 mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-slate-800" />
              Comprehensive Academic Analysis
            </p>
            <h1 className="text-6xl font-black tracking-tighter leading-[0.9] uppercase">
              The <span className="text-slate-500">Career</span><br />
              Intelligence<br />
              <span className="text-indigo-400">Report</span>
            </h1>
          </div>

          {/* Footer Metadata Area */}
          <div className="relative z-20 grid grid-cols-3 gap-12 pt-12 border-t border-white/5">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 block">Candidate Identity</span>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <h2 className="text-lg font-black text-white uppercase tracking-tight leading-none">{studentData.name}</h2>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 block">System Authority</span>
              <p className="text-xs font-bold text-slate-300 uppercase tracking-widest leading-none">AI Control Node_04</p>
            </div>
            <div className="space-y-2 text-right">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 block">Evaluation Date</span>
              <p className="text-sm font-black text-white uppercase tracking-tight leading-none">{studentData.date}</p>
            </div>
          </div>
        </section>

        <div className="p-12 space-y-16">
          
          {/* 2. AI CAREER SUMMARY SECTION */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Sparkles className="w-4 h-4 text-slate-400" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI Career Insight Summary</h3>
            </div>
            <Card className="border-none bg-slate-50 shadow-inner rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                  "{studentData.aiSummary}"
                </p>
              </CardContent>
            </Card>
          </section>

          {/* 3. PERFORMANCE / SKILLS SECTION (2-Column) */}
          <div className="grid grid-cols-2 gap-12">
            
            {/* Performance Bars */}
            <section className="space-y-8">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Performance Metrics</h3>
            </div>
              <div className="space-y-8">
                {studentData.scores.map((score, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{score.label}</span>
                      <span className="text-lg font-black text-slate-900">{score.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${score.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${score.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Breakdown (Strengths & Improvements) */}
            <section className="space-y-8">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Zap className="w-4 h-4 text-slate-400" />
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Skills Breakdown</h3>
            </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Key Strengths
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {studentData.skillsBreakdown.strengths.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase tracking-wider rounded-md border border-emerald-100 shadow-sm">
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
                      <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 text-[11px] font-black uppercase tracking-wider rounded-md border border-amber-100 shadow-sm">
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
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Star className="w-4 h-4 text-slate-400" />
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Top Career Recommendations</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {studentData.recommendations.map((recommendation, index) => (
                 <div key={index} className="flex items-center p-4 bg-white border border-slate-100 rounded-xl group hover:border-indigo-100 transition-all gap-6">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                    {recommendation.icon}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{recommendation.title}</h4>
                      <Badge className="bg-indigo-600 text-white border-transparent font-black px-2 py-0.5 rounded text-[9px] uppercase tracking-widest h-5 flex items-center shadow-sm">
                        {recommendation.match} Match
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 font-medium opacity-80 leading-tight">{recommendation.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. CAREER ROADMAP SECTION (Vertical Timeline) */}
          <section className="space-y-10 pt-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Strategic Implementation Roadmap</h3>
            </div>
            
            <div className="relative ml-4 space-y-12">
              {/* Vertical line connector */}
              <div className="absolute left-[15px] top-6 bottom-6 w-[1px] bg-slate-200" />
              
              {studentData.roadmap.map((item, index) => (
                <div key={index} className="relative flex gap-10">
                  <div className="relative z-10 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 border-2 border-white shadow-sm mt-1">
                    <span className="text-white text-[9px] font-black">{index + 1}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 leading-none">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{item.step}</h4>
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{item.year}</span>
                    </div>
                    <p className="text-slate-500 font-medium text-xs leading-relaxed max-w-[600px] opacity-80">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Institutional Recommendations</h3>
            </div>
            <div className="space-y-2">
              {studentData.colleges.map((college, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl group hover:border-indigo-100 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                       <GraduationCap className="w-5 h-5 text-indigo-500/50" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">{college.name}</h4>
                        <span className="text-[10px] font-black uppercase text-indigo-500/40 bg-indigo-50/30 px-1.5 py-0.5 rounded-md border border-indigo-100/30">{college.tag}</span>
                      </div>
                      <p className="text-xs text-slate-400 font-bold flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3 h-3 text-slate-300" /> {college.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end mb-1">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-base font-black text-slate-900 leading-none">{college.rating}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Composite Score</span>
                  </div>
                </div>
              ))}
            </div>
          </section>


          <footer className="pt-16 text-center space-y-12">
            <div className="flex flex-col items-center">
              <div className="w-px h-16 bg-gradient-to-b from-slate-200 to-transparent mb-6" />
              <p className="text-xs font-serif text-slate-400 italic max-w-[320px] mx-auto opacity-80 leading-relaxed">
                "The only way to do great work is to love what you do. if you haven't found it yet, keep looking."
              </p>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-4">— steve jobs</p>
            </div>
            
            <div className="flex justify-between items-center text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] px-4">
              <span>Career Compass Systems © 2026</span>
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
