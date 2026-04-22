import { ArrowLeft, Wrench, Settings, SearchCode, Cpu, Zap, GraduationCap, Utensils, PenTool, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { Link } from "react-router-dom";
import DownloadRoadmapButton from "@/components/DownloadRoadmapButton";

const vocationalSteps = [
  { title: "Identify Your Skill Interest", description: "Determine if you are interested in mechanics, electrical work, culinary arts, or IT services. Practical inclination is key.", badge: "Step 1" },
  { title: "Training Institute Selection", description: "Choose an ITI (Industrial Training Institute) or a Polytechnic college offering your chosen trade certification.", badge: "Step 2" },
  { title: "Hands-on Apprenticeship", description: "Complete mandatory field training or apprenticeship in an industrial setting to gain real-world experience.", badge: "Experience" },
  { title: "Certification & License", description: "Clear the trade exams to get a government-recognized certificate and license for professional practice.", badge: "Certification" },
  { title: "Entry into Workforce", description: "Join as a technician, supervisor, or start your own specialized service business.", badge: "Goal" }
];

const VocationalStream = () => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const streamId = "vocal-stream";

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-12 py-8">
        <header>
          <Link to="/careers-after-10th" className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Streams
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 rounded-2xl flex items-center justify-center shadow-sm">
                <Wrench className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Vocational Courses</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <DownloadRoadmapButton 
                careerName="Vocational Stream"
                description="Vocational courses emphasize hands-on, practical training specifically designed to develop specialized technical skills. They provide a direct path into the workforce."
                steps={vocationalSteps}
                skills={["Technical Troubleshooting", "Manual Dexterity", "Safety Protocols", "Tool Proficiency", "Practical Problem Solving"]}
                educationPath={[
                  { title: "ITI Certificate", description: "1-2 year trade training for direct industrial roles like plumbing, electrical, or welding." },
                  { title: "Diploma (Polytechnic)", description: "3-year technical education providing deeper engineering knowledge than ITI." },
                  { title: "Skills Certification", description: "Short-term specialized courses in Hospitality, Beauty, or digital marketing." }
                ]}
                exams={[
                  { title: "State CET", description: "For polytechnic and diploma admission entries." },
                  { title: "Trade Tests", description: "Final assessment for ITI certification and licensing." }
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
                      title: 'Vocational Stream',
                      description: 'Direct skills-based career paths and technical training.',
                      category: 'Vocational',
                      path: '/careers/vocational'
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
            Vocational courses emphasize hands-on, practical training over theoretical studying. They are specifically designed for students who want to develop a highly specialized technical skill and enter the workforce as quickly as possible.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Settings className="text-orange-500 w-6 h-6"/>
            Top Options & Programs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-orange-500">
              <CardHeader className="pb-2">
                <SearchCode className="w-8 h-8 text-orange-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">ITI</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Short-term trade-specific training like mechanics, plumbing, or drafting.</p></CardContent>
            </Card>
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-amber-500">
              <CardHeader className="pb-2">
                <Cpu className="w-8 h-8 text-amber-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">Polytechnic</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">3-year comprehensive technical diploma programs in engineering branches.</p></CardContent>
            </Card>
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-red-500">
              <CardHeader className="pb-2">
                <GraduationCap className="w-8 h-8 text-red-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">Certification</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Direct certifications in culinary arts, fashion, beauty, or IT.</p></CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-card p-8 rounded-3xl border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Wrench className="text-orange-600 dark:text-orange-400 w-6 h-6"/>
            Top Career Roles
          </h2>
          <div className="grid gap-6">
            <div className="flex gap-4 items-center p-6 border border-border bg-card hover:bg-muted/50 rounded-[2rem] transition-all group">
              <div className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 p-4 rounded-2xl group-hover:scale-110 transition-transform"><Zap className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-black text-foreground text-xl">Electrician / Technician</h3>
                <p className="text-muted-foreground font-medium">Managing electrical infrastructure, heavy machinery, or IT hardware setup.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-6 border border-border bg-card hover:bg-muted/50 rounded-[2rem] transition-all group">
              <div className="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 p-4 rounded-2xl group-hover:scale-110 transition-transform"><Wrench className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-black text-foreground text-xl">Mechanic</h3>
                <p className="text-muted-foreground font-medium">Automobile engineering, refrigeration, precision tooling.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-6 border border-border bg-card hover:bg-muted/50 rounded-[2rem] transition-all group">
              <div className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 p-4 rounded-2xl group-hover:scale-110 transition-transform"><Utensils className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-black text-foreground text-xl">Chef / Hospitality Staff</h3>
                <p className="text-muted-foreground font-medium">Culinary arts, hotel management, and guest services.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <PenTool className="text-orange-600 dark:text-orange-400 w-6 h-6"/> Exam & Entry Patterns
          </h2>
          <div className="flex flex-wrap gap-3">
            {["State CET", "ITI Merit", "Skill Assessments"].map((exam) => (
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

export default VocationalStream;
