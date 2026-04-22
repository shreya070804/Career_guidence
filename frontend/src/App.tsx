import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookmarkProvider } from "@/contexts/BookmarkContext";

import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import StudentPortal from "@/pages/StudentPortal";
import AdminDashboard from "@/pages/AdminDashboard";
import Booking from "@/pages/Booking";
import Resources from "@/pages/Resources";
import ResourceDetail from "@/pages/ResourceDetail";
import AIGuide from "@/pages/AIGuide";
import NotFound from "@/pages/NotFound";

import CareersAfter10th from "@/pages/CareersAfter10th";
import CareersAfter12th from "@/pages/CareersAfter12th";

import ScienceStream from "@/pages/ScienceStream";
import CommerceStream from "@/pages/CommerceStream";
import ArtsStream from "@/pages/ArtsStream";
import VocationalStream from "@/pages/VocationalStream";

import EngineeringCareer from "@/pages/EngineeringCareer";
import MedicalCareer from "@/pages/MedicalCareer";
import LawCivilCareer from "@/pages/LawCivilCareer";

import Assessment from "@/pages/Assessment";
import CareerPaths from "@/pages/CareerPaths";
import CollegeDetail from "@/pages/CollegeDetail";
import CollegeFinder from "@/pages/CollegeFinder";
import SkillGapAnalyzer from "@/pages/SkillGapAnalyzer";

import SoftwareEngineer from "@/pages/SoftwareEngineer";
import Doctor from "@/pages/Doctor";
import Law from "@/pages/Law";
import ManagementCareer from "@/pages/ManagementCareer";
import CareerReport from "@/pages/CareerReport";

import ErrorBoundary from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <ScrollToTop />
            <ErrorBoundary>
              <AuthProvider>
                <BookmarkProvider>

                  <Routes>

                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/student-portal" element={<StudentPortal />} />
                    <Route path="/admin" element={<AdminDashboard />} />

                    <Route path="/booking" element={<Booking />} />
                    <Route path="/ai-guide" element={<AIGuide />} />

                    <Route path="/resources" element={<Resources />} />
                    <Route path="/resources/:id" element={<ResourceDetail />} />

                    <Route path="/college-finder" element={<CollegeFinder />} />
                    <Route path="/college/:id" element={<CollegeDetail />} />

                    <Route path="/careers-after-10th" element={<CareersAfter10th />} />
                    <Route path="/careers-after-12th" element={<CareersAfter12th />} />

                    <Route path="/careers/science" element={<ScienceStream />} />
                    <Route path="/careers/commerce" element={<CommerceStream />} />
                    <Route path="/careers/arts" element={<ArtsStream />} />
                    <Route path="/careers/vocational" element={<VocationalStream />} />

                    <Route path="/career/engineering" element={<EngineeringCareer />} />
                    <Route path="/career/medical" element={<MedicalCareer />} />
                    <Route path="/career/doctor" element={<Doctor />} />
                    <Route path="/career/management" element={<ManagementCareer />} />
                    <Route path="/career/law-civil" element={<LawCivilCareer />} />
                    <Route path="/career/law" element={<Law />} />

                    <Route path="/career/software-engineer" element={<SoftwareEngineer />} />

                    <Route path="/assessment" element={<Assessment />} />
                    <Route path="/career-paths" element={<CareerPaths />} />
                    <Route path="/report" element={<CareerReport />} />
                    <Route path="/skill-gap" element={<SkillGapAnalyzer />} />

                    <Route path="*" element={<NotFound />} />

                  </Routes>

                </BookmarkProvider>
              </AuthProvider>
            </ErrorBoundary>
          </BrowserRouter>

        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;