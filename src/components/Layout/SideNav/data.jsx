import DocumentIcon from "@/assets/icons/document.svg?react";
import AnalyticsIcon from "@/assets/icons/analytics.svg?react";
import ClockIcon from "@/assets/icons/clock.svg?react";
import DashboardIcon from "@/assets/icons/dashboard.svg?react";

export const navigationLinks = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    to: "/dashboard/pomodoro",
    label: "Pomodoro",
    icon: <ClockIcon />,
  },
  {
    to: "/dashboard/journals",
    label: "Journals",
    icon: <DocumentIcon />,
  },
  // {
  //   to: "/dashboard/analytics",
  //   label: "Analytics",
  //   icon: <AnalyticsIcon />,
  // },
];
