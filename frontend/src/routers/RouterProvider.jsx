import { createBrowserRouter, RouterProvider } from "react-router-dom";;
import HomePage from "../pages/client/HomePage";
import RegisterPage from "../pages/common/RegisterPage";
import adminRoutes from "./adminRoutes";
import LoginPage from "../pages/common/LoginPage";
import LayoutClient from "../layouts/client/LayoutClient";
import AboutPage from "../pages/client/AboutPage";
import NotFoundPage from "../pages/common/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
  adminRoutes,
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;