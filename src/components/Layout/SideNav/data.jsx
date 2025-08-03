import LogoutIcon from "@/assets/icons/logout.svg?react";
import SettingsIcon from "@/assets/icons/settings.svg?react";
import DocumentIcon from "@/assets/icons/document.svg?react";
import AnalyticsIcon from "@/assets/icons/analytics.svg?react";
import ClockIcon from "@/assets/icons/clock.svg?react";

export const navigationLinks = [
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
  {
    to: "/dashboard/analytics",
    label: "Analytics",
    icon: <AnalyticsIcon />,
  },
];

export const getProfileDropdownOptions = ({ clickHandlers }) => {
  return [
    {
      label: "Settings",
      value: "settings",
      icon: <SettingsIcon />,
      onClick: clickHandlers.settings,
      styles: optionStyles,
    },
    {
      label: "Logout",
      value: "logout",
      icon: <LogoutIcon />,
      onClick: clickHandlers.logout,
      styles: optionStyles,
    },
  ];
};

const optionStyles = {
  label: {
    fontSize: "1rem",
  },
  icon: {
    width: "1.5rem",
    height: "1.5rem",
  },
};
