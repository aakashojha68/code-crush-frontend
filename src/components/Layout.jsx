import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import useTokenValid from "../hooks/useTokenValid";

const Layout = () => {
  const { loading, isTokenValid } = useTokenValid();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!isTokenValid) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
