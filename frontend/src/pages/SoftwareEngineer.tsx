import { GraduationCap, BookOpen, Brain, Briefcase, Rocket } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function SoftwareEngineer() {

  const steps = [
    {
      icon: <GraduationCap size={18} />,
      title: "Choose Science Stream (After 10th)",
      description:
        "Select the Science stream with Mathematics to build a strong foundation for engineering and technology.",
    },
    {
      icon: <BookOpen size={18} />,
      title: "Complete 12th Grade with PCM",
      description:
        "Focus on Physics, Chemistry, and Mathematics to prepare for engineering entrance exams.",
    },
    {
      icon: <Brain size={18} />,
      title: "Learn Programming Fundamentals",
      description:
        "Start learning languages like Python, Java, or C++. Build logical thinking and problem-solving skills.",
    },
    {
      icon: <Briefcase size={18} />,
      title: "Pursue a Computer Science Degree",
      description:
        "Complete a B.Tech/B.E. in Computer Science or a related field from a recognized university.",
    },
    {
      icon: <Rocket size={18} />,
      title: "Build Projects and Gain Experience",
      description:
        "Create real-world projects, contribute to open-source, and complete internships to gain practical skills.",
    },
  ];

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Software Engineer Career Roadmap
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Follow this step-by-step roadmap to become a successful Software Engineer.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-gray-300 dark:border-gray-700">

          {steps.map((step, index) => (
            <div key={index} className="mb-12 ml-8 relative">

              {/* Timeline Icon */}
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full">
                {step.icon}
              </span>

              {/* Content */}
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </PageLayout>
  );
}