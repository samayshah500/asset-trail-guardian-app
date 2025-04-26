
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="bg-slate-800 text-white py-2 px-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-bold">Asset Trail Guardian</div>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/" className="text-white hover:text-slate-300">User Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/admin" className="text-white hover:text-slate-300">Admin Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
