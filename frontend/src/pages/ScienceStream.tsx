import { Link } from "react-router-dom";
import { ArrowLeft, Atom, TestTube, Calculator, Microscope, HardHat, HeartPulse, Microscope as LabIcon, GraduationCap, PenTool, Heart, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import { useBookmarks } from "@/contexts/BookmarkContext";
import DownloadRoadmapButton from "@/components/DownloadRoadmapButton";

const scienceSteps = [
  { title: "Class 11-12 Selection", description: "Choose PMC (Physics, Chemistry, Maths) or PCB (Physics, Chemistry, Biology) based on your interest in Engineering or Medicine.", badge: "Foundation" },
  { title: "Entrance Preparation", description: "Start preparing for competitive exams like JEE, NEET, or BITSAT during high school.", badge: "Competitive" },
  { title: "Undergraduate Degree", description: "Pursue B.Tech, MBBS, B.Sc, or Integrated Master's programs in your chosen field.", badge: "Higher Ed" },
  { title: "Specialization", description: "Gain skills through projects, internships, and advanced certifications.", badge: "Professional" }
];

const ScienceStream = () => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const streamId = "science-stream";

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-12 py-8">
        <header>
          <Link to="/careers-after-10th" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Streams
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-sm">
                <Atom className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-extrabold text-foreground tracking-tight leading-tight">Science Stream</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <DownloadRoadmapButton 
                careerName="Science Stream"
                description="The Science stream is an exciting pathway for students interested in technology, research, healthcare, and understanding the universe. It opens doors to some of the most sought-after careers in engineering, medicine, and pure sciences."
                steps={scienceSteps}
                skills={["Analytical Skills", "Mathematics", "Scientific Reasoning", "Problem Solving", "Attention to Detail"]}
                educationPath={[
                  { title: "PCM (Physics, Chemistry, Maths)", description: "Best for Engineering, Architecture, and Pure Sciences." },
                  { title: "PCB (Physics, Chemistry, Biology)", description: "Best for Medicine, Biology, and Biotechnology." }
                ]}
                exams={[
                  { title: "JEE Main/Advanced", description: "For Engineering (IITs, NITs)." },
                  { title: "NEET", description: "For Medical and Dental sciences." },
                  { title: "BITSAT", description: "For BITS Pilani campuses." }
                ]}
              />
              <Button
                variant="outline"
                size="lg"
                className={`rounded-full gap-2 font-bold h-14 px-8 border-2 transition-all ${isBookmarked(streamId) ? "text-rose-500 border-rose-200 bg-rose-50" : "hover:border-primary hover:text-primary"}`}
                onClick={() => {
                  if (isBookmarked(streamId)) {
                    removeBookmark(streamId);
                  } else {
                    addBookmark({
                      id: streamId,
                      type: 'career',
                      title: 'Science Stream',
                      description: 'Overview of engineering, medical and research opportunities.',
                      category: 'Science Stream',
                      path: '/careers/science'
                    });
                  }
                }}
              >
                <Heart className={`w-5 h-5 ${isBookmarked(streamId) ? "fill-current" : ""}`} />
                {isBookmarked(streamId) ? "Saved" : "Save Stream"}
              </Button>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Science stream is an exciting pathway for students interested in technology, research, healthcare, and understanding the universe. It opens doors to some of the most sought-after careers in engineering, medicine, and pure sciences.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <GraduationCap className="text-blue-500 w-6 h-6"/>
            Core Subjects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-blue-500">
              <CardHeader className="pb-2">
                <TestTube className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">Physics</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Study of matter, energy, and the fundamental laws of nature.</p></CardContent>
            </Card>
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-indigo-500">
              <CardHeader className="pb-2">
                <Microscope className="w-8 h-8 text-indigo-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">Chemistry</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Exploration of elements, compounds, and chemical reactions.</p></CardContent>
            </Card>
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-emerald-500">
              <CardHeader className="pb-2">
                <Calculator className="w-8 h-8 text-emerald-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">Mathematics</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">The language of science—calculus, algebra, and statistics.</p></CardContent>
            </Card>
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-rose-500">
              <CardHeader className="pb-2">
                <HeartPulse className="w-8 h-8 text-rose-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">Biology</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Study of living organisms, ecology, and human anatomy.</p></CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-card p-8 rounded-3xl border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <LabIcon className="text-indigo-500 w-6 h-6"/>
            Top Career Options
          </h2>
          <div className="grid gap-6">
            <Link to="/career/engineering" className="flex gap-4 items-center p-6 border border-border bg-card hover:bg-muted/50 rounded-[2rem] transition-all group">
              <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 p-4 rounded-2xl group-hover:scale-110 transition-transform"><HardHat className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-black text-foreground text-xl">Engineer</h3>
                <p className="text-muted-foreground font-medium">Software, Mechanical, Civil, Electrical, Aerospace, etc.</p>
              </div>
            </Link>
            <Link to="/career/medical" className="flex gap-4 items-center p-6 border border-border bg-card hover:bg-muted/50 rounded-[2rem] transition-all group">
              <div className="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 p-4 rounded-2xl group-hover:scale-110 transition-transform"><HeartPulse className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-black text-foreground text-xl">Doctor / Medical Professional</h3>
                <p className="text-muted-foreground font-medium">Physician, Surgeon, Dentist, Pharmacist, Veterinarian.</p>
              </div>
            </Link>
            <div className="flex gap-4 items-center p-6 border border-border bg-card hover:bg-muted/50 rounded-[2rem] transition-all group">
              <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 p-4 rounded-2xl group-hover:scale-110 transition-transform"><LabIcon className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-black text-foreground text-xl">Scientist / Researcher</h3>
                <p className="text-muted-foreground font-medium">Data Scientist, Biochemist, Physicist, Astrophysicist.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <PenTool className="text-blue-600 w-6 h-6"/> Key Entrance Exams
          </h2>
          <div className="flex flex-wrap gap-3">
            {["IIT-JEE", "NEET", "BITSAT", "NDA"].map((exam) => (
              <span key={exam} className="px-6 py-3 bg-muted text-foreground rounded-full font-semibold shadow-sm border border-border">
                {exam}
              </span>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default ScienceStream;
