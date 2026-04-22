import { GraduationCap, BookOpen, Brain, Briefcase, Rocket, TrendingUp } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function ManagementRoadmap() {
  const steps = [
    {
      icon: <GraduationCap size={22} />,
      title: "Complete 10+2",
      description:
        "Complete your 12th standard in any stream. Commerce is often a natural fit, but Science and Arts students are equally welcome."
    },
    {
      icon: <BookOpen size={22} />,
      title: "Pursue Management Degree",
      description:
        "Enroll in a BBA, BMS, or an Integrated MBA program. Focus on core business principles and organizational behavior."
    },
    {
      icon: <Brain size={22} />,
      title: "Develop Leadership Skills",
      description:
        "Engage in student leadership roles, participate in case study competitions, and improve your communication skills."
    },
    {
      icon: <Briefcase size={22} />,
      title: "Internships & Networking",
      description:
        "Gain practical experience through internships in marketing, finance, or HR. Build a professional network on LinkedIn."
    },
    {
      icon: <Rocket size={22} />,
      title: "Launch Your Business Career",
      description:
        "Start as a Management Trainee or Analyst. Many professionals pursue an MBA after a few years of work experience."
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <TrendingUp size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Management Career Roadmap
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Follow this step-by-step roadmap to become a successful Business Leader.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-gray-300 dark:border-gray-700 ml-4 md:ml-0">
          {steps.map((step, index) => (
            <div key={index} className="mb-12 ml-8">
              {/* Timeline Icon */}
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full">
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
