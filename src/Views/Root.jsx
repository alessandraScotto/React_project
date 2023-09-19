import { Outlet, ScrollRestoration } from "react-router-dom";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import Authentication from "../Components/Authentication";

export default function Root() {
  return (
    <>
      <ScrollRestoration />
      <Authentication>
        <div className="bg-main-light dark:bg-main-dark min-h-screen text-slate-800 antialiased dark:text-slate-200">
          <Navigation />
          <div className="pt-5">
            <Outlet />
          </div>
          <Footer />
        </div>
      </Authentication>
    </>
  );
}
