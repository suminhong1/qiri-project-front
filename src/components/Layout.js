import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NotifyMessage from "./NotifyMessage";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <NotifyMessage />
      <Outlet />
      <Footer />
    </>
  );
};
export default Layout;
