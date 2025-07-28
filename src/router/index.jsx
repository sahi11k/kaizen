import { createBrowserRouter } from "react-router";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Pomodoro from "@/pages/Pomodoro";
import Journal from "@/pages/Journal";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import UpdatePassword from "@/pages/UpdatePassword";
import DashboardLayout from "@/components/Layout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pomodoro",
        element: (
          <ProtectedRoute>
            <Pomodoro />
          </ProtectedRoute>
        ),
      },

      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <Layout.Auth />,
    children: [
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/signup",
        element: <Signup />,
      },
      {
        path: "auth/update-password",
        element: <UpdatePassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/journal",
        element: (
          <ProtectedRoute>
            <Journal />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
