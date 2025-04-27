
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <div className="nav-container bg-gradient-to-r from-primary/90 to-primary shadow-lg">
      <div className="nav-content max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="nav-brand flex items-center space-x-2">
            <Users className="h-6 w-6 text-primary-foreground" />
            <span className="text-xl font-bold text-primary-foreground">Asset Trail Guardian</span>
          </div>
          <div className="nav-links flex space-x-4">
            <Button
              variant={location.pathname === "/" ? "secondary" : "ghost"}
              asChild
              className="text-primary-foreground hover:text-primary-foreground hover:bg-white/20 transition-all duration-200"
              size="sm"
            >
              <Link to="/" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                User Dashboard
              </Link>
            </Button>
            <Button
              variant={location.pathname === "/admin" ? "secondary" : "ghost"}
              asChild
              className="text-primary-foreground hover:text-primary-foreground hover:bg-white/20 transition-all duration-200"
              size="sm"
            >
              <Link to="/admin" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Admin Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
