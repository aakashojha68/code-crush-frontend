import { Outlet } from "react-router-dom";
import useTokenValid from "../hooks/useTokenValid";
import Sidebar from "./Sidebar";
import VerticalNavbar from "./VerticalNavbar";
import useSidebar from "../hooks/useSidebar";
import { Loader } from "lucide-react";

const Layout = () => {
  const { loading, isTokenValid } = useTokenValid();
  const { isSidebarOpen } = useSidebar();

  if (loading) return <Loader />;
  if (!isTokenValid) return;

  return (
    <div className="flex flex-row h-screen">
      <VerticalNavbar />
      <Sidebar />

      {/* Chat area */}
      <div
        className={`flex-1 overflow-hidden ${
          isSidebarOpen ? "hidden md:block" : ""
        }`}
      >
        <Outlet />
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
