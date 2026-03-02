import {
  AlarmClock,
  ChartNoAxesCombined,
  Instagram,
  Linkedin,
  Mail,
  ScrollText,
} from "lucide-react";

export const FOOTER_LINKS = [
  {
    label: "Email",
    href: "mailto:sahil511kumar@gmail.com",
    Icon: Mail,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sahi11k",
    Icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sahi11k/",
    Icon: Linkedin,
  },
];

export const ABOUT_CARDS = [
  {
    title: "Focus",
    description:
      "Sharpen your focus with the Pomodoro technique — work in deep, distraction-free sprints, recharge with structured breaks, and stay on top of your goals with built-in task management",
    Icon: AlarmClock,
    key: "focus",
    link: "/dashboard/pomodoro",
  },
  {
    title: "Reflect",
    description:
      "Build self-awareness with our journaling tool — capture your thoughts, track your wins and challenges, and reflect on your growth every day",
    Icon: ScrollText,
    key: "reflect",
    link: "/dashboard/journals",
  },
  {
    title: "Insights",
    description:
      "Gain clarity with predefined dashboards and key metrics — track your progress, recognize patterns, and celebrate growth with ease",
    Icon: ChartNoAxesCombined,
    key: "insights",
    link: "/dashboard",
  },
];
