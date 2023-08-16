import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Root() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased dark:bg-slate-900 dark:text-slate-500">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
