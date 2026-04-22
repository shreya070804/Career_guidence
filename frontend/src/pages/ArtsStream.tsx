import { Link } from "react-router-dom";
import { ArrowLeft, Palette, BookOpen, Globe, Brain, Scale, Newspaper, GraduationCap, Gavel, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import { useBookmarks } from "@/contexts/BookmarkContext";
import DownloadRoadmapButton from "@/components/DownloadRoadmapButton";

const artsSteps = [
  { title: "Choose Arts in 10+2", description: "Select subjects like History, Political Science, Psychology, or Sociology. Focus on developing a broad understanding of social dynamics.", badge: "Foundation" },
  { title: "Develop Core Skills", description: "Focus on communication, critical thinking, creative writing, and research methodologies.", badge: "Skill Building" },
  { title: "Entrance Preparation", description: "Prepare for CUET (Central Universities), CLAT (Law), or specialized design entrance exams like NID/NIFT.", badge: "Competitive" },
  { title: "Undergraduate Degree", description: "Pursue BA, BA LL.B, or B.Des in your chosen specialization.", badge: "Higher Ed" },
  { title: "Professional Portfolio", description: "Build a strong creative or research portfolio through internships and projects.", badge: "Career Ready" }
];

const ArtsStream = () => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const streamId = "arts-stream";

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-12 py-8">
        <header>
          <Link to="/careers-after-10th" className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-blue-300 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Streams
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-2xl flex items-center justify-center shadow-sm">
                <Palette className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-extrabold text-foreground tracking-tight leading-tight">Arts & Humanities</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <DownloadRoadmapButton 
                careerName="Arts & Humanities"
                description="The Arts and Humanities stream is incredibly diverse, offering deep insights into human society, culture, behavior, and creativity. It is perfect for students with strong communication skills and analytical thinking."
                steps={artsSteps}
                skills={["Critical Thinking", "Effective Communication", "Research & Analysis", "Creative Expression", "Social Awareness", "Problem Solving"]}
                educationPath={[
                  { title: "Liberal Arts (BA)", description: "Broad-based education in humanities, social sciences, or performing arts." },
                  { title: "Integrated Law (BA LL.B)", description: "5-year program for aspiring legal professionals." },
                  { title: "Design (B.Des)", description: "4-year professional course in Fashion, Product, or Communication Design." }
                ]}
                exams={[
                  { title: "CLAT / AILET", description: "For Law programs in NLUs." },
                  { title: "NIFT / NID", description: "For Fashion and Product Design institutes." },
                  { title: "CUET", description: "Entrance for Liberal Arts in top central universities." }
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
                      title: 'Arts & Humanities',
                      description: 'Diverse opportunities in social sciences, design, and governance.',
                      category: 'Arts & Humanities',
                      path: '/careers/arts'
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
            The Arts and Humanities stream is incredibly diverse, offering deep insights into human society, culture, behavior, and creativity. It is perfect for students with strong communication skills, analytical thinking, and a passion for arts.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <GraduationCap className="text-purple-500 w-6 h-6"/>
            Core Subjects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-purple-500">
              <CardHeader className="pb-2">
                <BookOpen className="w-8 h-8 text-purple-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">History</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">The study of past events, civilizations, and historical context.</p></CardContent>
            </Card>
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-fuchsia-500">
              <CardHeader className="pb-2">
                <Globe className="w-8 h-8 text-fuchsia-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">Political Science</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Analysis of political activity, thoughts, and government systems.</p></CardContent>
            </Card>
            <Card className="bg-card border-border shadow-sm border-t-4 border-t-pink-500">
              <CardHeader className="pb-2">
                <Brain className="w-8 h-8 text-pink-500 mb-2" />
                <CardTitle className="text-lg font-bold text-card-foreground">Psychology</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">The scientific study of the human mind and behavior.</p></CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-card p-8 rounded-3xl border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Palette className="text-purple-600 dark:text-purple-400 w-6 h-6"/>
            Top Career Options
          </h2>
          <div className="grid gap-6">
            <div className="flex gap-4 items-center p-6 border border-border bg-card hover:bg-muted/50 rounded-[2rem] transition-all group">
              <div className="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 p-4 rounded-2xl group-hover:scale-110 transition-transform"><Scale className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-black text-foreground text-xl">Lawyer / Legal Professional</h3>
                <p className="text-muted-foreground font-medium">Advocacy, corporate law, public defense, and judiciary roles.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-6 border border-border bg-card hover:bg-muted/50 rounded-[2rem] transition-all group">
              <div className="bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-400 p-4 rounded-2xl group-hover:scale-110 transition-transform"><Newspaper className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-black text-foreground text-xl">Journalist / Mass Media</h3>
                <p className="text-muted-foreground font-medium">Reporting, editing, broadcasting, and content creation.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-6 border border-border bg-card hover:bg-muted/50 rounded-[2rem] transition-all group">
              <div className="bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 p-4 rounded-2xl group-hover:scale-110 transition-transform"><Palette className="w-8 h-8" /></div>
              <div className="flex-1">
                <h3 className="font-black text-foreground text-xl">Designer</h3>
                <p className="text-muted-foreground font-medium">Fashion design, interior design, graphic design, and UI/UX.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Gavel className="text-purple-600 dark:text-purple-400 w-6 h-6"/> Popular Entrance Exams
          </h2>
          <div className="flex flex-wrap gap-3">
            {["CLAT / AILET", "NIFT / NID", "CUET"].map((exam) => (
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

export default ArtsStream;
