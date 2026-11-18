import ProtectedRoute from "@/app/router/ProtectedRoute";
import Bookmarked from "@/features/bookmarked/pages/Bookmarked";

const bookmarkedRoutes = [
  {
    path: "/dashboard/bookmarked",
    element: (
      <ProtectedRoute>
        <Bookmarked />
      </ProtectedRoute>
    ),
  },
];

export default bookmarkedRoutes;
