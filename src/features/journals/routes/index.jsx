import ProtectedRoute from "@/app/router/ProtectedRoute";
import JournalList from "@/features/journals/pages/JournalList";
import JournalEditor from "@/features/journals/pages/JournalEditor";

const journalsRoutes = [
  {
    path: "/dashboard/journals",
    element: (
      <ProtectedRoute>
        <JournalList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/journals/new",
    element: (
      <ProtectedRoute>
        <JournalEditor />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/journals/:journalId",
    element: (
      <ProtectedRoute>
        <JournalEditor />
      </ProtectedRoute>
    ),
  },
];

export default journalsRoutes;
