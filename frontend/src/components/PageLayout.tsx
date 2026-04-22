import Navigation from "./Navigation";
import Footer from "./Footer";
import CareerChatbot from "./CareerChatbot";

interface PageLayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
}

const PageLayout = ({ children, showNavigation = true, showFooter = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {showNavigation && <Navigation />}
      <main className="container mx-auto px-4 py-12 md:py-16 space-y-12 md:space-y-20">
        {children}
      </main>
      {showFooter && <Footer />}
      <CareerChatbot />
    </div>
  );
};

export default PageLayout;
