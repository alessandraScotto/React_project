import { createBrowserRouter } from "react-router-dom";
import Root from "./Views/Root";
import Home from "./Views/Home";
import About from "./Views/About";
import Error from "./Views/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
