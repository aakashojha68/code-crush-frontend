import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import useTokenValid from "../hooks/useTokenValid";
import Sidebar from "./Sidebar";

const Layout = () => {
  const { loading, isTokenValid } = useTokenValid();
  const location = useLocation();

  if (loading) return <h1>Loading...</h1>;
  if (!isTokenValid) return <h1>Loading</h1>;

  console.log(import.meta.env);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {location.pathname !== "/profile" && <Sidebar />}

        {/* Chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
