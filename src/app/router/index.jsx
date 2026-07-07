import { createBrowserRouter } from "react-router";
import * as Sentry from "@sentry/react";
import { homeRoutes, notFoundRoutes } from "@/features/home/routes";
import authRoutes from "@/features/auth/routes";
import dashboardRoutes from "@/features/dashboard/routes";
import journalsRoutes from "@/features/journals/routes";
import pomodoroRoutes from "@/features/pomodoro/routes";
import bookmarkedRoutes from "@/features/bookmarked/routes";
import settingsRoutes from "@/features/settings/routes";
import {
  AuthLayout,
  HomePageLayout,
  DashboardLayout,
  BaseLayout,
} from "@/app/layouts";
import { RouteErrorBoundary } from "@/shared/ui";

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
        children: homeRoutes,
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: authRoutes,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          ...dashboardRoutes,
          ...journalsRoutes,
          ...pomodoroRoutes,
          ...bookmarkedRoutes,
          ...settingsRoutes,
        ],
      },
      ...notFoundRoutes,
    ],
  },
]);

export default router;
