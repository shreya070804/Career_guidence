import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center overflow-hidden relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 space-y-8 max-w-lg">
        <div className="space-y-2">
          <h1 className="text-[10rem] font-black leading-none tracking-tighter text-foreground/10 select-none">
            404
          </h1>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            Lost in space?
          </h2>
          <p className="text-xl text-muted-foreground font-medium px-4">
            The page you're looking for doesn't exist or has been moved to a new dimension.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="default" className="h-14 rounded-full px-8 font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-14 rounded-full px-8 font-bold text-lg border-2 border-border transition-all hover:scale-105 active:scale-95">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
