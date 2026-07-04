import TimerOutline from "@/assets/icons/timer-outline.svg?react";
import TimerFilled from "@/assets/icons/timer-filled.svg?react";
import JournalOutline from "@/assets/icons/edit-doc-outline.svg?react";
import JournalFilled from "@/assets/icons/edit-doc-filled.svg?react";
import BookmarkOutline from "@/assets/icons/bookmark-outline.svg?react";
import BookmarkFilled from "@/assets/icons/bookmark-filled.svg?react";
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
  {
    to: "/dashboard/bookmarked",
    label: "Bookmarked",
    Icon: BookmarkOutline,
    IconFilled: BookmarkFilled,
  },
];

