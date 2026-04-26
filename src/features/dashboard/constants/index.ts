import GreetingsWidget from "@/features/dashboard/components/GreetingsWidget";
import JournalsWidget from "@/features/dashboard/components/JournalsWidget";
import ProgressChartWidget from "@/features/dashboard/components/ProgressChartWidget";
import TaskListWidget from "@/features/dashboard/components/TaskListWidget";
import TCPWidget from "@/features/dashboard/components/TCPWidget";
import TotalHoursWidget from "@/features/dashboard/components/TotalHoursWidget";
import TimerOutline from "@/assets/icons/timer-outline.svg?react";
import TimerFilled from "@/assets/icons/timer-filled.svg?react";
import JournalOutline from "@/assets/icons/journal-outline.svg?react";
import JournalFilled from "@/assets/icons/journal-filled.svg?react";
import GridOutline from "@/assets/icons/grid-outline.svg?react";
import GridFilled from "@/assets/icons/grid-filled.svg?react";

export const TCP_CHART = {
  RING_WIDTH_PX: 16,
  SIZE_MOBILE: 216,
  SIZE_DESKTOP: 280,
} as const;

export const SIDEBAR_LINKS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    Icon: GridOutline,
    IconFilled: GridFilled,
  },
  {
    to: "/dashboard/pomodoro",
    label: "Pomodoro",
    Icon: TimerOutline,
    IconFilled: TimerFilled,
  },
  {
    to: "/dashboard/journals",
    label: "Journals",
    Icon: JournalOutline,
    IconFilled: JournalFilled,
  },
];

export const WIDGET_GRID = [
  {
    span: "col-span-12",
    Content: GreetingsWidget,
    key: "greet",
    height: "h-40",
    img: true,
  },
  {
    span: "col-span-12 lg:col-span-4",
    Content: TotalHoursWidget,
    key: "total-hours",
    height: "min-h-100",
    img: false,
  },
  {
    span: "col-span-12 md:col-span-6 lg:col-span-4",
    Content: JournalsWidget,
    key: "journals",
    height: "min-h-100",
    img: false,
  },
  {
    span: "col-span-12 md:col-span-6 lg:col-span-4",
    Content: TaskListWidget,
    key: "tasks",
    height: "min-h-100",
    img: false,
  },
  {
    span: "col-span-12 lg:col-span-8",
    Content: ProgressChartWidget,
    key: "progress",
    height: "min-h-100",
    img: false,
  },
  {
    span: "col-span-12 lg:col-span-4",
    Content: TCPWidget,
    key: "taskCompletionPercentage",
    height: "min-h-100",
    img: false,
  },
];
