import { createBrowserRouter } from "react-router-dom";
import Root from "./Views/Root";
import Home, { loadAll } from "./Views/Home";
import About from "./Views/About";
import Error from "./Views/Error";
import Genre from "./Views/Genre";
import Details, { getGameDetails } from "./Views/Details";
import Login from "./Views/Login";
import SignIn from "./Views/SignIn";
import Profile from "./Views/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: loadAll,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/genere/:id",
        element: <Genre />,
      },
      {
        path: "/details/:id",
        element: <Details />,
        loader: getGameDetails,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute element={<Profile />} />,
      },
    ],
  },
]);
