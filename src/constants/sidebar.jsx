import TimerOutline from "@/assets/icons/timer-outline.svg?react";
import TimerFilled from "@/assets/icons/timer-filled.svg?react";
import JournalOutline from "@/assets/icons/journal-outline.svg?react";
import JournalFilled from "@/assets/icons/journal.filled.svg?react";

export const SIDEBAR_LINKS = [
  // {
  //   to: "/dashboard",
  //   label: "Dashboard",
  //   icon: <LayoutGrid />,
  // },
  {
    to: "/dashboard/pomodoro",
    label: "Pomodoro",
    icon: <TimerOutline fill="currentColor" />,
    iconFilled: <TimerFilled fill="currentColor" />,
  },
  {
    to: "/dashboard/journals",
    label: "Journals",
    icon: <JournalOutline fill="currentColor" />,
    iconFilled: <JournalFilled fill="currentColor" />,
  },
];
