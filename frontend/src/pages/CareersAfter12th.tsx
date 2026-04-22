import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, Stethoscope, Briefcase, Scale, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import { useNavigate } from "react-router-dom";
const paths = [
  {
    title: "Engineering",
    description: "Software, Mechanical, Civil",
    icon: Cpu,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    route: "/career/engineering",
  },
  {
    title: "Medical",
    description: "Doctor, Dentist, Pharmacist",
    icon: Stethoscope,
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    route: "/career/medical",
  },
  {
    title: "Management",
    description: "Business Administration, HR, Consultant",
    icon: Briefcase,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    route: "/career/management",
  },
  {
    title: "Law & Civil Services",
    description: "Advocate, IAS Officer, Judge",
    icon: Scale,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    route: "/career/law-civil",
  }
];

const CareersAfter12th = () => {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        <header>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Careers After 12th Standard
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Discover higher education opportunities and specialized career tracks to build your future.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
          {paths.map((path, idx) => {
            const Icon = path.icon;
            return (
              <Card 
                key={idx} 
                onClick={() => navigate(path.route)}
                className="bg-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden ring-1 ring-inset ring-black/5 dark:ring-white/10 h-full flex flex-col cursor-pointer"
              >
                <CardHeader className="p-8 pb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${path.bgColor} ${path.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-card-foreground">{path.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-4 flex-grow">
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {path.description}
                  </CardDescription>
                </CardContent>
                <div className="px-8 pb-8">
                  <Button 
                    onClick={() => navigate(path.route)}
                    className="w-full justify-between bg-primary hover:bg-primary/90 text-white font-bold rounded-xl group"
                  >
                    View Career Roadmap
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </section>
      </div>
    </PageLayout>
  );
};

export default CareersAfter12th;
