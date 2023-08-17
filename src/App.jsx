import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import ParticlesBackground from "./Components/ParticlesBackground";

function App() {
  return (
    <>
      <ParticlesBackground />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
