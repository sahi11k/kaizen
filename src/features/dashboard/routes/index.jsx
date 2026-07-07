import ProtectedRoute from "@/app/router/ProtectedRoute";
import Dashboard from "@/features/dashboard/pages/Dashboard";

const dashboardRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];

export default dashboardRoutes;
