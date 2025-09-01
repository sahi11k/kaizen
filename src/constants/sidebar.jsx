import { LayoutGrid, NotebookPen, Timer } from "lucide-react";

export const SIDEBAR_LINKS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <LayoutGrid />,
  },
  {
    to: "/dashboard/pomodoro",
    label: "Pomodoro",
    icon: <Timer />,
  },
  {
    to: "/dashboard/journals",
    label: "Journals",
    icon: <NotebookPen />,
  },
];
