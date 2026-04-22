import { GraduationCap, BookOpen, Brain, Briefcase, Rocket, Scale } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function Law() {
  const steps = [
    {
      icon: <GraduationCap size={22} />,
      title: "Complete 10+2",
      description:
        "Complete your 12th standard in any stream. Humanities is often preferred but not mandatory."
    },
    {
      icon: <BookOpen size={22} />,
      title: "Choose Law Degree",
      description:
        "Clear entrance exams like CLAT and pursue a 5-year Integrated LLB or a 3-year LLB after graduation."
    },
    {
      icon: <Brain size={22} />,
      title: "Specialize & Intern",
      description:
        "Intern with law firms or advocates and choose a specialization like Corporate, Criminal, or Civil law."
    },
    {
      icon: <Briefcase size={22} />,
      title: "Enroll with Bar Council",
      description:
        "Clear the All India Bar Examination (AIBE) to get licensed to practice law in courts."
    },
    {
      icon: <Rocket size={22} />,
      title: "Build Your Practice",
      description:
        "Start practicing as an independent advocate, join a law firm, or prepare for judicial services exams."
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scale size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Law & Civil Services Roadmap
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Follow this step-by-step roadmap to excellence in Law and Governance.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-gray-300 dark:border-gray-700 ml-4 md:ml-0">
          {steps.map((step, index) => (
            <div key={index} className="mb-12 ml-8">
              {/* Timeline Icon */}
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-amber-600 text-white rounded-full">
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
