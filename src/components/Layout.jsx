import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import useTokenValid from "../hooks/useTokenValid";
import Sidebar from "./Sidebar";
import VerticalNavbar from "./VerticalNavbar";
import useSidebar from "../hooks/useSidebar";

const Layout = () => {
  const { loading, isTokenValid } = useTokenValid();
  const { isSidebarOpen } = useSidebar();

  if (loading) return <h1>Loading...</h1>;
  if (!isTokenValid) return <h1>Loading</h1>;

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
