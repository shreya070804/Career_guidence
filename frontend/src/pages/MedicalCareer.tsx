import { Link } from "react-router-dom";
import { ArrowLeft, Stethoscope, GraduationCap, PenTool, Briefcase, HeartPulse, Microscope, Activity, BookOpen, Search, Pill, Award, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import CareerRoadmap from "@/components/CareerRoadmap";
import { useBookmarks } from "@/contexts/BookmarkContext";
import DownloadRoadmapButton from "@/components/DownloadRoadmapButton";

const medicalSteps = [
  {
    title: "10+2 Science (PCB Focus)",
    description: "Focus on Biology, Chemistry, and Physics. Deep understanding of biological concepts and laboratory basics is essential for medical foundations.",
    icon: BookOpen,
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400",
    badge: "Foundation"
  },
  {
    title: "NEET UG Entrance Exam",
    description: "Prepare for the National Eligibility cum Entrance Test. It is the single entrance point for medical and dental colleges across India.",
    icon: Search,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
    badge: "National Benchmarking"
  },
  {
    title: "MBBS/BDS Degree",
    description: "Enroll in a 4.5 - 5.5 year professional degree. This includes academic study followed by a mandatory rotating clinical internship.",
    icon: Stethoscope,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
    badge: "Professional Education"
  },
  {
    title: "Clinical Practice & Internship",
    description: "Gain hands-on clinical exposure in hospitals. Rotate through departments like Surgery, Pediatrics, and Gynaecology to understand all medical facets.",
    icon: HeartPulse,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    badge: "Hands-on Experience"
  },
  {
    title: "Post-Graduate Specialization (MD/MS)",
    description: "Choose a specialty like Cardiology, Neurology, or Oncology. This phase defines your expertise and future practice domain.",
    icon: Microscope,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
    badge: "Mastery"
  },
  {
    title: "Professional Certification",
    description: "Register with the Medical Council and obtain your license to practice. You are now ready to serve in hospitals or start your own clinic.",
    icon: Award,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
    badge: "Licensed Doctor"
  }
];

const MedicalCareer = () => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const careerId = "medical-career";
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-16 py-12">
        <header>
          <Link to="/careers-after-12th" className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 rounded-[2rem] flex items-center justify-center shadow-lg ring-1 ring-inset ring-black/5">
                <Stethoscope className="w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase">Medical Career</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <DownloadRoadmapButton 
                careerName="Medical"
                description="A career in medicine is a high-calling dedicated to the study, diagnosis, and treatment of human health. It requires profound scientific knowledge, empathy, and lifelong commitment."
                steps={medicalSteps}
                skills={["Biology", "Anatomy", "Empathy", "Critical Thinking", "Clinical Research", "Surgical Precision"]}
                educationPath={[
                  { title: "MBBS", description: "Bachelor of Medicine & Surgery (5.5 years). The primary path for doctors." },
                  { title: "BDS", description: "Bachelor of Dental Surgery (5 years). Specialized professional path for dental care." },
                  { title: "B.Pharm", description: "Bachelor of Pharmacy (4 years). Focused on pharmaceutical chemistry and drug delivery." },
                  { title: "B.Sc Nursing", description: "Focuses on patient care, hospital management, and supporting clinical operations." }
                ]}
                exams={[
                  { title: "NEET UG", description: "The mandatory national entrance for all government and private medical colleges in India." },
                  { title: "AIIMS / JIPMER", description: "Prestige institutes that now follow the NEET score for their super-specialty intakes." }
                ]}
              />
              <Button
                variant="outline"
                size="lg"
                className={`rounded-full gap-2 font-bold px-8 h-14 border-2 transition-all ${isBookmarked(careerId) ? "text-rose-500 border-rose-200 bg-rose-50" : "hover:border-primary hover:text-primary"}`}
                onClick={() => {
                  if (isBookmarked(careerId)) {
                    removeBookmark(careerId);
                  } else {
                    addBookmark({
                      id: careerId,
                      type: "career",
                      title: "Medical",
                      description: "Step-by-step path to becoming a licensed doctor.",
                      path: "/career/medical",
                      category: "Core Career"
                    });
                  }
                }}
              >
                <Heart className={`w-5 h-5 ${isBookmarked(careerId) ? "fill-current" : ""}`} />
                {isBookmarked(careerId) ? "Saved to Profile" : "Save Pathway"}
              </Button>
            </div>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            A career in medicine is a high-calling dedicated to the study, diagnosis, and treatment of human health. It requires profound scientific knowledge, empathy, and lifelong commitment.
          </p>
        </header>

        <section className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm">
          <h2 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
            <GraduationCap className="text-teal-500 w-8 h-8"/>
            Medical Degrees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-muted/30 border-none rounded-2xl p-6">
              <CardTitle className="text-lg font-bold mb-2">MBBS</CardTitle>
              <p className="text-sm text-muted-foreground">Bachelor of Medicine & Surgery (5.5 years). The primary path for doctors.</p>
            </Card>
            <Card className="bg-muted/30 border-none rounded-2xl p-6">
              <CardTitle className="text-lg font-bold mb-2">BDS</CardTitle>
              <p className="text-sm text-muted-foreground">Bachelor of Dental Surgery (5 years). Specialized professional path for dental care.</p>
            </Card>
            <Card className="bg-muted/30 border-none rounded-2xl p-6">
              <CardTitle className="text-lg font-bold mb-2">B.Pharm</CardTitle>
              <p className="text-sm text-muted-foreground">Bachelor of Pharmacy (4 years). Focused on pharmaceutical chemistry and drug delivery.</p>
            </Card>
            <Card className="bg-muted/30 border-none rounded-2xl p-6">
              <CardTitle className="text-lg font-bold mb-2">B.Sc Nursing</CardTitle>
              <p className="text-sm text-muted-foreground">Focuses on patient care, hospital management, and supporting clinical operations.</p>
            </Card>
          </div>
        </section>

        <CareerRoadmap
          steps={medicalSteps}
          skills={[
            { name: "Human Anatomy & Physiology", level: "Advanced", type: "technical" },
            { name: "Clinical Diagnosis & Examination", level: "Advanced", type: "technical" },
            { name: "Pharmacology & Drug Interactions", level: "Intermediate", type: "technical" },
            { name: "Surgical Techniques & Procedures", level: "Intermediate", type: "technical" },
            { name: "Medical Research & Evidence-Based Medicine", level: "Beginner", type: "technical" },
            { name: "EMR / Hospital Information Systems", level: "Beginner", type: "technical" },
            { name: "Empathy & Compassionate Care", level: "Advanced", type: "soft" },
            { name: "Critical Thinking Under Pressure", level: "Advanced", type: "soft" },
            { name: "Communication & Patient Counselling", level: "Intermediate", type: "soft" },
            { name: "Teamwork in Clinical Settings", level: "Intermediate", type: "soft" },
          ]}
          exams={[
            {
              name: "NEET UG",
              fullForm: "National Eligibility cum Entrance Test — Undergraduate",
              purpose: "The single mandatory gateway for all MBBS, BDS, AYUSH, and BSc Nursing admissions in India.",
              difficulty: "Very High",
              timing: "Class 12 (PCB stream)",
            },
            {
              name: "NEET PG",
              fullForm: "National Eligibility cum Entrance Test — Postgraduate",
              purpose: "Admission to MD / MS / PG Diploma seats in government and private medical colleges.",
              difficulty: "Very High",
              timing: "After MBBS & 1-year internship",
            },
            {
              name: "USMLE (Steps 1–3)",
              fullForm: "United States Medical Licensing Examination",
              purpose: "Required for practicing medicine in the USA. Opens doors to residency programs abroad.",
              difficulty: "Very High",
              timing: "During or after MBBS",
            },
            {
              name: "FMGE / NExT",
              fullForm: "Foreign Medical Graduates Examination / National Exit Test",
              purpose: "Licensing exam for MBBs graduates from foreign universities seeking to practice in India.",
              difficulty: "High",
              timing: "After completing degree abroad",
            },
          ]}
          internships={[
            {
              role: "Rotating Clinical Internship (MBBS)",
              where: "Teaching hospitals attached to medical colleges",
              duration: "12 months (mandatory)",
              focus: "Rotate through Medicine, Surgery, OBG, Pediatrics, Orthopedics, and Community Health departments. Develop clinical decision-making skills.",
            },
            {
              role: "Research Elective / Observership",
              where: "AIIMS, PGI, NIMHANS, or international hospitals",
              duration: "1–3 months",
              focus: "Participate in clinical trials, case studies, and publications. Highly valuable for PG entrance and research fellowships.",
            },
            {
              role: "Rural Health Service / Community Posting",
              where: "PHCs, CHCs, and government district hospitals",
              duration: "2–4 weeks per posting",
              focus: "Primary care delivery, vaccination drives, maternal health, and managing resource-limited settings. Builds adaptability and empathy.",
            },
          ]}
          jobs={[
            {
              title: "Junior Resident / Medical Officer",
              type: "Entry",
              salaryRange: "₹50K–1.2 L/month",
              description: "Work in government hospitals or private clinics after MBBS. Provide OPD/IPD services and assist senior consultants.",
            },
            {
              title: "General Practitioner / Family Physician",
              type: "Entry",
              salaryRange: "₹6–15 LPA",
              description: "Run or join a community clinic managing common illnesses, preventive care, and chronic condition management.",
            },
            {
              title: "Senior Resident / Specialist Consultant",
              type: "Mid",
              salaryRange: "₹15–40 LPA",
              description: "Post-MD/MS specialization role in cardiology, neurology, oncology, or any chosen specialty in a hospital setting.",
            },
            {
              title: "Surgeon (General / Orthopedic / Neuro)",
              type: "Mid",
              salaryRange: "₹20–60 LPA",
              description: "Perform complex surgeries independently. Specialization via MS Surgery opens pathways to high-demand sub-specialties.",
            },
            {
              title: "Department Head / HOD / Director Medical",
              type: "Senior",
              salaryRange: "₹60 L–2 Cr+ LPA",
              description: "Lead entire clinical departments, oversee research, guide resident training, and shape hospital policy.",
            },
          ]}
        />

        <section className="bg-card p-10 rounded-[2.5rem] border border-border shadow-sm">
          <h2 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
            <PenTool className="text-rose-500 w-8 h-8"/>
            Entrance Gateway
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">NEET UG</h3>
              <p className="text-muted-foreground font-medium">The mandatory national entrance for all government and private medical colleges in India.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">AIIMS / JIPMER</h3>
              <p className="text-muted-foreground font-medium">Prestige institutes that now follow the NEET score for their super-specialty intakes.</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
            <Briefcase className="text-teal-500 w-9 h-9"/>
            Specialized Career Paths
          </h2>
          <div className="grid gap-6">
            <div className="flex gap-6 items-center p-8 bg-card border border-border rounded-[2rem] hover:shadow-lg transition-all group">
              <div className="bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 p-5 rounded-2xl group-hover:scale-110 transition-transform"><HeartPulse className="w-8 h-8" /></div>
              <div>
                <h3 className="font-black text-foreground text-2xl mb-2">General Physician</h3>
                <p className="text-muted-foreground font-medium text-lg">Primary care expert managing diverse healthcare needs of the community.</p>
              </div>
            </div>
            <div className="flex gap-6 items-center p-8 bg-card border border-border rounded-[2rem] hover:shadow-lg transition-all group">
              <div className="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 p-5 rounded-2xl group-hover:scale-110 transition-transform"><Activity className="w-8 h-8" /></div>
              <div>
                <h3 className="font-black text-foreground text-2xl mb-2">Trauma Surgeon</h3>
                <p className="text-muted-foreground font-medium text-lg">High-stakes surgical expert specializing in emergency and complex procedures.</p>
              </div>
            </div>
            <div className="flex gap-6 items-center p-8 bg-card border border-border rounded-[2rem] hover:shadow-lg transition-all group">
              <div className="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 p-5 rounded-2xl group-hover:scale-110 transition-transform"><Pill className="w-8 h-8" /></div>
              <div>
                <h3 className="font-black text-foreground text-2xl mb-2">Clinical Researcher</h3>
                <p className="text-muted-foreground font-medium text-lg">Leading the discovery of new drug therapies and clinical protocols.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default MedicalCareer;
