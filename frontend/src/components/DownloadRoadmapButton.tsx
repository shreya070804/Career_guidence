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
      // Background: Slate 900
      doc.setFillColor(15, 23, 42); 
      doc.rect(0, 0, pageWidth, 297, "F");

      // Background decorative element (Subtle circle)
      doc.setFillColor(30, 41, 59); // Slate 800
      doc.circle(pageWidth, 0, 100, "F");
      doc.circle(0, 297, 60, "F");

      doc.setTextColor(255, 255, 255);
      
      // Top Label
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("OFFICIAL CAREER ROADMAP", centerX, 50, { align: "center" });

      // Title
      doc.setFontSize(48);
      const titleText = careerName.toUpperCase();
      doc.text(titleText, centerX, 120, { align: "center" });
      
      // Subtitle
      doc.setFontSize(16);
      doc.setTextColor(148, 163, 184); // Slate 400
      doc.text("STRATEGIC PATHWAY & SKILL ANALYSIS", centerX, 138, { align: "center" });

      // "Provided by Career Compass"
      doc.setDrawColor(255, 255, 255);
      (doc as any).setGState(new (doc as any).GState({ opacity: 0.3 }));
      doc.line(centerX - 30, 150, centerX + 30, 150);
      (doc as any).setGState(new (doc as any).GState({ opacity: 1.0 }));

      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text("POWERED BY CAREER COMPASS AI", centerX, 160, { align: "center" });

      // Footer Identity Bar
      doc.setFillColor(30, 41, 59); // Slate 800
      doc.rect(0, 250, pageWidth, 47, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text("CANDIDATE NAME", margin + 10, 265);
      doc.setFontSize(12);
      doc.text(studentName.toUpperCase(), margin + 10, 275);

      doc.setFontSize(8);
      doc.text("ISSUE DATE", pageWidth - margin - 50, 265);
      doc.setFontSize(12);
      doc.text(new Date().toLocaleDateString().toUpperCase(), pageWidth - margin - 50, 275);

      doc.addPage();
      y = 25;

      /* ================= AI SUMMARY ================= */
      doc.setFillColor(248, 250, 252); // Slate 50
      doc.roundedRect(margin, y - 5, 180, 30, 3, 3, "F");

      doc.setTextColor(79, 70, 229); // Indigo 600
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("AI CAREER INSIGHT // ANALYSIS", margin + 5, y + 5);

      y += 12;

      doc.setTextColor(51, 65, 85); // Slate 700
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      const aiText = doc.splitTextToSize(aiSummary, 170);
      doc.text(aiText, margin + 5, y);

      y += aiText.length * 6 + 15;

      /* ================= PERFORMANCE ================= */
      doc.setTextColor(15, 23, 42); // Slate 900
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("CORE PERFORMANCE METRICS", margin, y);

      y += 12;

      Object.entries(scores).forEach(([key, value]) => {
        doc.setTextColor(51, 65, 85);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(key.toUpperCase(), margin, y);

        // background bar
        doc.setFillColor(241, 245, 249); // Slate 100
        doc.rect(margin + 40, y - 3, 100, 4, "F");

        // filled bar: Indigo 600
        doc.setFillColor(79, 70, 229);
        doc.rect(margin + 40, y - 3, value, 4, "F");

        doc.setTextColor(15, 23, 42);
        doc.setFontSize(10);
        doc.text(value + "%", margin + 145, y);

        y += 10;
      });

      y += 10;

      /* ================= OVERVIEW ================= */
      doc.setDrawColor(226, 232, 240); // Slate 200
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("PROFESSIONAL SCOPE", margin, y);

      y += 8;

      doc.setTextColor(51, 65, 85);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const desc = doc.splitTextToSize(description, 180);
      doc.text(desc, margin, y);

      y += desc.length * 6 + 15;

      /* ================= SKILLS ================= */
      if (skills) {
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("SKILL ARCHITECTURE", margin, y);

        y += 8;

        doc.setTextColor(51, 65, 85);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        skills.forEach((s) => {
          doc.text("• " + s, margin + 5, y);
          y += 6;
        });

        y += 10;
      }

      /* ================= ROADMAP ================= */
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("EXECUTION ROADMAP", margin, y);

      y += 10;

      steps.forEach((step) => {
        if (y > 260) {
          doc.addPage();
          y = 25;
        }

        // dot: Indigo 600
        doc.setFillColor(79, 70, 229);
        doc.circle(margin + 2, y - 1.5, 1.5, "F");

        // title
        doc.setTextColor(15, 23, 42);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(step.title, margin + 10, y);

        y += 6;

        // description
        doc.setTextColor(71, 85, 105);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const txt = doc.splitTextToSize(step.description, 165);
        doc.text(txt, margin + 10, y);

        y += txt.length * 5 + 8;
      });

      /* ================= FOOTER ================= */
      const totalPages = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(148, 163, 184); // Slate 400
        doc.text(`CAREER COMPASS // PROFESSIONAL IDENTITY // PAGE ${i} OF ${totalPages}`, centerX, 290, { align: "center" });
      }

      doc.save(`${careerName}_Path.pdf`);
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