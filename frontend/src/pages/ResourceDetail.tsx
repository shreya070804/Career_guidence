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

  "How to Become a Software Engineer": {
    overview:
      "Software engineers design and develop applications used in websites, mobile apps, and enterprise systems.",

    skills: [
      "Programming (Python, JavaScript)",
      "Data Structures & Algorithms",
      "Problem Solving",
      "System Design"
    ],

    courses: [
      "B.Tech Computer Science",
      "BCA + MCA",
      "Full Stack Development Bootcamp"
    ],

    exams: [
      "JEE Main",
      "State Engineering Entrance"
    ],

    roles: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Engineer"
    ],

    salary:
      "₹4L – ₹10L (Entry) | ₹12L – ₹30L (Experienced)",

    future:
      "Software engineering remains one of the fastest growing careers due to AI, cloud computing, and digital transformation."
  },

  "How to Become a Doctor": {
    overview:
      "Doctors diagnose and treat illnesses while helping maintain public health.",

    skills: [
      "Medical knowledge",
      "Attention to detail",
      "Empathy and communication"
    ],

    courses: [
      "MBBS",
      "BDS",
      "BAMS / BHMS"
    ],

    exams: [
      "NEET UG"
    ],

    roles: [
      "General Physician",
      "Surgeon",
      "Medical Researcher"
    ],

    salary:
      "₹6L – ₹20L depending on specialization",

    future:
      "Healthcare demand continues to grow globally."
  },

  "JEE Main Preparation Guide": {
    overview:
      "JEE Main is the national entrance exam for engineering colleges including NITs and IIITs.",

    skills: [
      "Physics concepts",
      "Mathematical problem solving",
      "Logical reasoning"
    ],

    courses: [
      "Engineering (B.Tech)",
      "Computer Science",
      "Mechanical Engineering"
    ],

    exams: [
      "JEE Main",
      "JEE Advanced"
    ],

    roles: [
      "Software Engineer",
      "Mechanical Engineer"
    ],

    salary:
      "₹4L – ₹12L for engineering graduates",

    future:
      "Engineering careers continue to grow with technology innovation."
  },

  "NEET Exam Guide": {
    overview:
      "NEET is the national entrance exam for MBBS and other medical courses in India.",

    skills: [
      "Biology knowledge",
      "Chemistry fundamentals",
      "Physics understanding"
    ],

    courses: [
      "MBBS",
      "BDS",
      "BAMS"
    ],

    exams: [
      "NEET UG"
    ],

    roles: [
      "Doctor",
      "Dentist"
    ],

    salary:
      "₹6L – ₹20L depending on specialization",

    future:
      "Medical careers remain highly respected and in demand."
  },

  "CLAT Law Entrance Exam": {
    overview:
      "CLAT is the entrance exam for top law universities in India.",

    skills: [
      "Legal reasoning",
      "Reading comprehension",
      "Logical thinking"
    ],

    courses: [
      "BA LLB",
      "BBA LLB"
    ],

    exams: [
      "CLAT",
      "AILET"
    ],

    roles: [
      "Lawyer",
      "Legal Consultant"
    ],

    salary:
      "₹5L – ₹20L depending on experience",

    future:
      "Legal professionals are required across corporate and government sectors."
  },

  "CA Foundation Exam": {
    overview:
      "CA Foundation is the entry-level exam for becoming a Chartered Accountant.",

    skills: [
      "Accounting knowledge",
      "Financial analysis",
      "Business law understanding"
    ],

    courses: [
      "CA Foundation",
      "CA Intermediate",
      "CA Final"
    ],

    exams: [
      "CA Foundation Exam"
    ],

    roles: [
      "Chartered Accountant",
      "Financial Consultant"
    ],

    salary:
      "₹6L – ₹25L depending on experience",

    future:
      "Finance and accounting professionals are essential in every business sector."
  }
}

/* ---------------- CONTENT MATCH ---------------- */

const getDetailedContent = (title: string) => {
  const lowerTitle = title.toLowerCase()

  const match = Object.keys(contentMap).find(key =>
    key.toLowerCase().includes(lowerTitle)
  )

  return match ? contentMap[match] : contentMap["How to Become a Software Engineer"]
}

/* ---------------- PAGE ---------------- */

const ResourceDetail = () => {

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

  return (
    <PageLayout>

      <div className="max-w-3xl mx-auto space-y-8">

        <Button variant="ghost" onClick={() => navigate("/resources")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Resources
        </Button>

        {/* HEADER */}

        <div className="border rounded-xl p-6 bg-card space-y-4">

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-2 text-primary text-sm font-semibold">
              <BookOpen className="w-4 h-4" />
              {resource.category}
            </div>

            <div className="flex gap-3">

              <DownloadRoadmapButton
                careerName={resource.title}
                description={resource.description}
                skills={content.skills}
                steps={(content.courses || []).map((c: string) => ({
                  title: c,
                  description: "Recommended course or preparation step."
                }))}
                exams={(content.exams || []).map((e: string) => ({
                  title: e,
                  description: "Important entrance exam."
                }))}
                roles={(content.roles || []).map((r: string) => ({
                  title: r,
                  description: "Career role available after completing this path."
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
                    isBookmarked(resource.id) ? "fill-current text-red-500" : ""
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
          <p className="text-muted-foreground">{content.overview}</p>
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

        {content.exams && content.exams.length > 0 && (
          <Card className="p-6 rounded-xl">

            <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              Major Exams
            </h2>

            <div className="flex flex-wrap gap-2">
              {content.exams.map((exam: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-muted rounded-md text-sm">
                  {exam}
                </span>
              ))}
            </div>

          </Card>
        )}

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

        {/* SALARY */}

        {content.salary && (
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

        {/* FUTURE */}

        <div className="bg-primary text-white rounded-xl p-6">

          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <TrendingUp className="w-5 h-5" />
            Future Scope
          </h2>

          <p className="text-sm opacity-90">
            {content.future}
          </p>

        </div>

      </div>

    </PageLayout>
  )
}

export default ResourceDetail