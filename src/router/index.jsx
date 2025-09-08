import { createBrowserRouter, Navigate } from "react-router";
import Home from "@/pages/Home";
import Pomodoro from "@/pages/Pomodoro";
import Journal from "@/pages/Journal";
import Settings from "@/pages/Settings";
import Analytics from "@/pages/Analytics";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";
import UpdatePassword from "@/pages/UpdatePassword";
import { AuthLayout, HomePageLayout, DashboardLayout } from "@/layouts";
import ProtectedRoute from "./ProtectedRoute";
import { DEFAULT_NAV_ROUTE } from "@/constants/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
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
        path: "/dashboard",
        element: (
          // <ProtectedRoute>
          //   <Dashboard />
          // </ProtectedRoute>
          <Navigate to={DEFAULT_NAV_ROUTE} replace />
        ),
      },
      {
        path: "/dashboard/journals",
        element: (
          <ProtectedRoute>
            <Journal />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/pomodoro",
        element: (
          <ProtectedRoute>
            <Pomodoro />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/analytics",
        element: (
          <ProtectedRoute>
            <Analytics />
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
