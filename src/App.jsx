import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import ParticlesBackground from "./Components/ParticlesBackground";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer />

      <ParticlesBackground />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
