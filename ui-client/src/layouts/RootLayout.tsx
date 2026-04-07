import { Link, Outlet } from "react-router";
import { Rocket } from "lucide-react";

import ThemeSelector from "@/components/custom/ThemeSelector";

const Rootlayout = () => {

  return (
    <div className="min-h-screen flex flex-col p-2">
      <nav className="flex items-center justify-between px-4 py-2 border-b mb-4">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Rocket className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold tracking-tight"></span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/all"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Movies
          </Link>
        </div>


        <div className="flex items-center gap-4">
          <ThemeSelector />
        </div>
      </nav>

      {/* <div className="flex flex-1 items-center justify-center"> */}
      <Outlet />
      {/* </div> */}
    </div>
  );
};

export default Rootlayout;
