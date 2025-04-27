
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <div className="nav-container">
      <div className="nav-content">
        <div className="nav-brand">Asset Trail Guardian</div>
        <div className="nav-links">
          <Button
            variant={location.pathname === "/" ? "secondary" : "ghost"}
            asChild
            className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Link to="/">User Dashboard</Link>
          </Button>
          <Button
            variant={location.pathname === "/admin" ? "secondary" : "ghost"}
            asChild
            className="text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Link to="/admin">Admin Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
