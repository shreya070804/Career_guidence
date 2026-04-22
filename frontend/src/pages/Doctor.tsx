import { GraduationCap, BookOpen, Brain, Briefcase, Rocket, Stethoscope } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function Doctor() {
  const steps = [
    {
      icon: <GraduationCap size={22} />,
      title: "Choose Stream After 10th",
      description:
        "Select the Science stream with Physics, Chemistry, and Biology (PCB) to qualify for medical entrance exams."
    },
    {
      icon: <BookOpen size={22} />,
      title: "Clear Entrance Exam & Degree",
      description:
        "Clear exams like NEET and pursue an MBBS degree (Bachelor of Medicine, Bachelor of Surgery)."
    },
    {
      icon: <Brain size={22} />,
      title: "Gain Clinical Knowledge",
      description:
        "Focus on medical subjects, pathology, pharmacology, and participate in clinical rotations."
    },
    {
      icon: <Briefcase size={22} />,
      title: "Internship & Residency",
      description:
        "Complete a mandatory one-year internship followed by a residency program in your chosen specialization."
    },
    {
      icon: <Rocket size={22} />,
      title: "Start Your Practice",
      description:
        "Register with the Medical Council, start practicing in hospitals or clinics, or pursue further specialization (MD/MS)."
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Stethoscope size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Doctor Career Roadmap
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Follow this step-by-step roadmap to become a successful Medical Doctor.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-gray-300 dark:border-gray-700 ml-4 md:ml-0">
          {steps.map((step, index) => (
            <div key={index} className="mb-12 ml-8">
              {/* Timeline Icon */}
              <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-teal-600 text-white rounded-full">
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
