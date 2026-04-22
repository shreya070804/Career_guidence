import {
  ArrowLeft,
  BookOpen,
  Clock,
  Briefcase,
  GraduationCap,
  TrendingUp,
  DollarSign,
  Target,
  Lightbulb,
  CheckCircle2,
  Heart
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PageLayout from "@/components/PageLayout"
import { useBookmarks } from "@/contexts/BookmarkContext"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import DownloadRoadmapButton from "@/components/DownloadRoadmapButton"

/* ---------------- CONTENT MAP ---------------- */

const contentMap: Record<string, any> = {

  "Careers After 10th": {
    overview:
      "After completing 10th grade, students can choose different paths depending on their interests. They may continue with Science, Commerce, or Arts streams, or choose skill-based diploma and vocational programs.",

    skills: [
      "Decision making",
      "Basic analytical thinking",
      "Communication skills",
      "Adaptability",
      "Time management"
    ],

    courses: [
      "Science Stream (PCM / PCB)",
      "Commerce Stream",
      "Arts / Humanities Stream",
      "Polytechnic Diploma",
      "ITI (Industrial Training Institute)"
    ],

    exams: [
      "Polytechnic Entrance Exams",
      "ITI Admissions",
      "State Board 11th Admissions"
    ],

    roles: [
      "Diploma Engineer",
      "Technical Assistant",
      "Graphic Designer",
      "Business Assistant",
      "Skilled Technician"
    ],

    future:
      "Choosing the right path after 10th builds the foundation for your future career. Students can later pursue engineering, medicine, business, design, or technical professions."
  },

  "Software Engineer": {
    overview:
      "Software engineers design and develop applications that power websites, mobile apps, AI systems and enterprise software.",

    skills: [
      "Programming (Python / Java / JS)",
      "Data Structures",
      "System Design",
      "Problem Solving",
      "Version Control (Git)"
    ],

    courses: [
      "B.Tech Computer Science",
      "BCA + MCA",
      "B.Sc Computer Science",
      "Full Stack Bootcamps"
    ],

    exams: [
      "JEE Main",
      "BITSAT",
      "VITEEE",
      "State Engineering Entrance"
    ],

    roles: [
      "Frontend Developer",
      "Backend Engineer",
      "Full-Stack Developer",
      "DevOps Engineer",
      "Software Architect"
    ],

    salary:
      "₹4L – ₹10L (Entry) | ₹12L – ₹30L (Mid) | ₹35L+ (Senior)",

    future:
      "Demand for software engineers continues to grow rapidly due to AI, cloud computing, and digital transformation across industries."
  },

  default: {
    overview:
      "This guide explores everything you need to know about this career path and provides practical steps to plan your future.",

    skills: [
      "Analytical thinking",
      "Communication",
      "Problem solving",
      "Adaptability"
    ],

    courses: [
      "Bachelor's Degree",
      "Master's Specialization",
      "Professional Certifications"
    ],

    exams: [
      "University Entrance Exams",
      "National Aptitude Tests"
    ],

    roles: [
      "Entry-level Specialist",
      "Consultant",
      "Manager"
    ],

    salary:
      "₹3L – ₹5L (Entry) | ₹8L – ₹15L (Mid)",

    future:
      "Industry growth and technological advancements are increasing demand for skilled professionals."
  }
}

const getDetailedContent = (title: string) => {
  const lowerTitle = title.toLowerCase()

  const match = Object.keys(contentMap).find(key =>
    key.toLowerCase().includes(lowerTitle)
  )

  return match ? contentMap[match] : contentMap.default
}

/* ---------------- PAGE ---------------- */

const CareersAfter10th = () => {

  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()

  const resource = location.state?.resource || {
    id: id || "default",
    title: "Career Guide",
    description: "Step-by-step roadmap for this career path.",
    category: "Career Guides"
  }

  const content = getDetailedContent(resource.title)

  const hideSalary = resource.title.includes("10th")

  return (
    <PageLayout>

      <div className="max-w-3xl mx-auto space-y-8">

        {/* BACK BUTTON */}

        <Button
          variant="ghost"
          onClick={() => navigate("/resources")}
          className="text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Resources
        </Button>

        {/* HEADER */}

        <div className="border rounded-xl p-6 bg-card space-y-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2 text-primary text-sm font-semibold">
              <BookOpen className="w-4 h-4" />
              {resource.category}
            </div>

            <div className="flex gap-3">

              <DownloadRoadmapButton
                careerName={resource.title}
                description={resource.description}
                skills={content.skills}
                steps={(content.steps || content.courses || []).map((s: any) => ({
                  title: typeof s === "string" ? s : s.title,
                  description: typeof s === "string" ? "Recommended course or path." : s.description
                }))}
                exams={(content.exams || []).map((e: string) => ({
                  title: e,
                  description: "Key examination for this path."
                }))}
                roles={(content.roles || []).map((r: string) => ({
                  title: r,
                  description: "Professional role in this industry."
                }))}
              />

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (isBookmarked(resource.id)) {
                    removeBookmark(resource.id)
                  } else {
                    addBookmark({
                      ...resource,
                      type: "guide"
                    })
                  }
                }}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${
                    isBookmarked(resource.id)
                      ? "fill-current text-red-500"
                      : ""
                  }`}
                />

                {isBookmarked(resource.id) ? "Saved" : "Save"}
              </Button>

            </div>

          </div>

          <h1 className="text-2xl md:text-3xl font-bold">
            {resource.title}
          </h1>

          <p className="text-muted-foreground">
            {resource.description}
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            10 min read
          </div>

        </div>

        {/* OVERVIEW */}

        <Card className="p-6 rounded-xl">

          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <Lightbulb className="w-5 h-5 text-primary" />
            Overview
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            {content.overview}
          </p>

        </Card>

        {/* SKILLS */}

        <Card className="p-6 rounded-xl">

          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Target className="w-5 h-5 text-primary" />
            Key Skills
          </h2>

          <ul className="space-y-2">

            {content.skills.map((skill: string, i: number) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {skill}
              </li>
            ))}

          </ul>

        </Card>

        {/* COURSES */}

        <Card className="p-6 rounded-xl">

          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <GraduationCap className="w-5 h-5 text-primary" />
            Courses & Degrees
          </h2>

          <ul className="space-y-2 text-muted-foreground">

            {content.courses.map((course: string, i: number) => (
              <li key={i}>• {course}</li>
            ))}

          </ul>

        </Card>

        {/* EXAMS */}

        <Card className="p-6 rounded-xl">

          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            Major Entrance Exams
          </h2>

          <div className="flex flex-wrap gap-2">

            {content.exams.map((exam: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-muted rounded-md text-sm">
                {exam}
              </span>
            ))}

          </div>

        </Card>

        {/* ROLES */}

        <Card className="p-6 rounded-xl">

          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Briefcase className="w-5 h-5 text-primary" />
            Career Opportunities
          </h2>

          <ul className="space-y-2">

            {content.roles.map((role: string, i: number) => (
              <li key={i}>• {role}</li>
            ))}

          </ul>

        </Card>

        {/* SALARY (Hidden for After 10th) */}

        {!hideSalary && content.salary && (
          <Card className="p-6 rounded-xl text-center">

            <h2 className="flex justify-center items-center gap-2 text-lg font-semibold mb-3">
              <DollarSign className="w-5 h-5 text-primary" />
              Expected Salary
            </h2>

            <p className="text-xl font-semibold text-green-600">
              {content.salary}
            </p>

          </Card>
        )}

        {/* FUTURE SCOPE */}

        <div className="bg-primary text-white rounded-xl p-6">

          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <TrendingUp className="w-5 h-5" />
            Future Scope
          </h2>

          <p className="text-sm opacity-90 leading-relaxed">
            {content.future}
          </p>

        </div>

      </div>

    </PageLayout>
  )
}

export default CareersAfter10th