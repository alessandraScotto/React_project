import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import ParticlesBackground from "./Components/ParticlesBackground";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
function App() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>ReHack</title>
        </Helmet>

        <ToastContainer />
        <ParticlesBackground />
        <RouterProvider router={router}></RouterProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
