import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { GraduationCap, User, LogOut, Moon, Sun, LayoutDashboard, BarChart2, School } from "lucide-react";

const Navigation = () => {
  const { user, isAdmin, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-500">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground">
              Career <span className="text-primary">Compass</span>
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button 
              onClick={() => navigate("/career-paths")}
              variant="ghost" 
              className="hidden md:flex font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl px-4"
            >
              Explore Careers
            </Button>
            <Button 
              onClick={() => navigate("/skill-gap")}
              variant="ghost" 
              className="hidden md:flex font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl px-4"
            >
              <BarChart2 className="w-4 h-4 mr-1.5" />
              Skill Gap
            </Button>
            <Button 
              onClick={() => navigate("/college-finder")}
              variant="ghost" 
              className="hidden md:flex font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl px-4"
            >
              <School className="w-4 h-4 mr-1.5" />
              Find Colleges
            </Button>
            <Button 
              onClick={() => navigate("/resources")}
              variant="ghost" 
              className="hidden md:flex font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl px-4"
            >
              Resources
            </Button>
            <Button 
              onClick={() => navigate("/booking")}
              variant="ghost" 
              className="hidden md:flex font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl px-4"
            >
              Book Session
            </Button>

            <div className="h-6 w-px bg-border/60 mx-2 hidden md:block" />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-full w-10 h-10 hover:bg-muted"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-slate-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </Button>

            {user ? (
              <div className="flex items-center gap-3 ml-2">
                {isAdmin && (
                  <Button 
                    asChild
                    variant="outline" 
                    className="font-bold rounded-xl border-border/60 hover:bg-muted"
                  >
                    <Link to="/admin">
                      <LayoutDashboard className="w-4 h-4 mr-2 text-primary" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button 
                  asChild
                  variant="outline" 
                  className="font-bold rounded-xl border-border/60 hover:bg-muted"
                >
                  <Link to="/student-portal">
                    <User className="w-4 h-4 mr-2 text-primary" />
                    Portal
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl px-4"
                  onClick={signOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                asChild
                className="font-black rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/10 px-6"
              >
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
