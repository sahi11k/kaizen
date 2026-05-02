import { createBrowserRouter } from "react-router";
import * as Sentry from "@sentry/react";
import Home from "@/features/home/pages/Home";
import Pomodoro from "@/features/pomodoro/pages/Pomodoro";
import Journal from "@/features/journals/pages/Journal";
import Settings from "@/features/settings/pages/Settings";
import Analytics from "@/features/analytics/pages/Analytics";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";
import NotFound from "@/features/home/pages/NotFound";
import UpdatePassword from "@/features/auth/pages/UpdatePassword";
import {
  AuthLayout,
  HomePageLayout,
  DashboardLayout,
  BaseLayout,
} from "@/app/layouts";
import { RouteErrorBoundary } from "@/shared/ui";
import ProtectedRoute from "./ProtectedRoute";

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouterV7(createBrowserRouter);

const router = sentryCreateBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
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
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
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
    ],
  },
]);

export default router;
