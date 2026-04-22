import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface Step {
  title: string;
  description: string;
}

interface EducationPath {
  title: string;
  description: string;
}

interface Exam {
  title: string;
  description: string;
}

interface Props {
  studentName?: string;
  careerName: string;
  description: string;
  steps: Step[];
  skills?: string[];
  colleges?: string[];
  educationPath?: EducationPath[];
  exams?: Exam[];
}

const DownloadRoadmapButton = ({
  studentName = "Student",
  careerName,
  description,
  steps,
  skills,
  colleges,
  educationPath,
  exams,
}: Props) => {

  const generatePDF = async () => {
    try {
      const doc = new jsPDF();

      const margin = 15;
      const pageWidth = doc.internal.pageSize.getWidth();
      const centerX = pageWidth / 2;

      let y = 20;

      /* ================= SCORES ================= */
      const scores = {
        Aptitude: 80,
        Technical: 75,
        Communication: 65,
      };

      const aiSummary = `Based on your interests and academic background, ${careerName} is a highly suitable career path. With consistent learning and skill development, you can achieve strong growth in this domain.`;

      /* ================= COVER ================= */

      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, pageWidth, 297, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");

      doc.setFontSize(26);
      doc.text("Career Compass Report", centerX, 80, { align: "center" });

      doc.setFontSize(16);
      doc.text(`Student: ${studentName}`, centerX, 105, { align: "center" });

      doc.setFontSize(20);
      doc.text(careerName, centerX, 130, { align: "center" });

      doc.addPage();
      y = 20;

      /* ================= AI SUMMARY ================= */

      doc.setFillColor(245, 245, 255);
      doc.roundedRect(margin, y - 5, 180, 30, 5, 5, "F");

      doc.setTextColor(79, 70, 229);
      doc.setFontSize(14);
      doc.text("AI Career Insight", margin + 5, y + 5);

      y += 12;

      doc.setTextColor(50);
      doc.setFontSize(11);

      const aiText = doc.splitTextToSize(aiSummary, 170);
      doc.text(aiText, margin + 5, y);

      y += aiText.length * 6 + 10;

      /* ================= PERFORMANCE ================= */

      doc.setTextColor(37, 99, 235);
      doc.setFont("helvetica", "bold");
      doc.text("Performance Overview", centerX, y, { align: "center" });

      y += 10;

      Object.entries(scores).forEach(([key, value]) => {
        doc.setTextColor(0);
        doc.setFontSize(10);

        doc.text(key, margin, y);

        // background bar
        doc.setFillColor(220);
        doc.rect(margin + 40, y - 3, 100, 5, "F");

        // filled bar
        doc.setFillColor(37, 99, 235);
        doc.rect(margin + 40, y - 3, value, 5, "F");

        doc.text(value + "%", margin + 145, y);

        y += 10;
      });

      y += 10;

      /* ================= OVERVIEW ================= */

      doc.setTextColor(37, 99, 235);
      doc.setFont("helvetica", "bold");
      doc.text("Overview", margin, y);

      y += 8;

      doc.setTextColor(0);
      const desc = doc.splitTextToSize(description, 180);
      doc.text(desc, margin, y);

      y += desc.length * 6 + 10;

      /* ================= SKILLS ================= */

      if (skills) {
        doc.setTextColor(22, 163, 74);
        doc.setFont("helvetica", "bold");
        doc.text("Skills", margin, y);

        y += 8;

        doc.setTextColor(0);

        skills.forEach((s) => {
          doc.text("• " + s, margin + 5, y);
          y += 6;
        });

        y += 8;
      }

      /* ================= ROADMAP ================= */

      doc.setTextColor(37, 99, 235);
      doc.setFont("helvetica", "bold");
      doc.text("Career Roadmap", margin, y);

      y += 10;

      steps.forEach((step) => {

        if (y > 260) {
          doc.addPage();
          y = 20;
        }

        // dot
        doc.setFillColor(37, 99, 235);
        doc.circle(margin + 2, y - 2, 2, "F");

        // title
        doc.setFont("helvetica", "bold");
        doc.text(step.title, margin + 10, y);

        y += 6;

        // description
        doc.setFont("helvetica", "normal");
        const txt = doc.splitTextToSize(step.description, 165);
        doc.text(txt, margin + 10, y);

        y += txt.length * 6 + 8;
      });

      /* ================= COLLEGES ================= */

      if (colleges?.length) {
        doc.addPage();
        y = 20;

        doc.setTextColor(79, 70, 229);
        doc.setFont("helvetica", "bold");
        doc.text("Recommended Colleges", centerX, y, { align: "center" });

        y += 12;

        doc.setTextColor(0);

        colleges.forEach((c) => {
          doc.text("• " + c, margin + 10, y);
          y += 6;
        });
      }


      /* ================= FOOTER ================= */

      const pages = doc.internal.pages.length - 1;

      for (let i = 1; i <= pages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Career Compass • Page ${i}`, centerX, 290, { align: "center" });
      }

      doc.save(`${careerName}.pdf`);
      toast.success("✅ Report Generated");

    } catch (err) {
      console.error(err);
      toast.error("PDF failed");
    }
  };

  return (
    <Button onClick={generatePDF} className="flex gap-2">
      <Download className="w-4 h-4" />
      Download Report
    </Button>
  );
};

export default DownloadRoadmapButton;