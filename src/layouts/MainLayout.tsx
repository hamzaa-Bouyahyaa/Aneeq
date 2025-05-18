import { Outlet } from "react-router-dom";
import LuxuryNavbar from "../components/LuxuryNavbar";
import LuxuryFooter from "../components/LuxuryFooter";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LuxuryNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <LuxuryFooter />
    </div>
  );
};

export default MainLayout;
