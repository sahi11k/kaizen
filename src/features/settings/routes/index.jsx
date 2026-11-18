import ProtectedRoute from "@/app/router/ProtectedRoute";
import Settings from "@/features/settings/pages/Settings";

const settingsRoutes = [
  {
    path: "/dashboard/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
];

export default settingsRoutes;
