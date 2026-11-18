import ProtectedRoute from "@/app/router/ProtectedRoute";
import Pomodoro from "@/features/pomodoro/pages/Pomodoro";

const pomodoroRoutes = [
  {
    path: "/dashboard/pomodoro",
    element: (
      <ProtectedRoute>
        <Pomodoro />
      </ProtectedRoute>
    ),
  },
];

export default pomodoroRoutes;
