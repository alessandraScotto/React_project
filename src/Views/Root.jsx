import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Root() {
  return (
    <div className="bg-main-light dark:bg-main-dark min-h-screen text-slate-800 antialiased dark:text-slate-500">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
