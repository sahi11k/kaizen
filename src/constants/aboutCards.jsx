import { AlarmClock, ChartNoAxesCombined, ScrollText } from "lucide-react";

export const ABOUT_CARDS = [
  {
    title: "Focus",
    description:
      "Sharpen your focus with the Pomodoro technique — work in deep, distraction-free sprints, recharge with structured breaks, and stay on top of your goals with built-in task management",
    icon: <AlarmClock />,
    key: "focus",
  },
  {
    title: "Reflect",
    description:
      "Build self-awareness with our journaling tool — capture your thoughts, track your wins and challenges, and reflect on your growth every day",
    icon: <ScrollText />,
    key: "reflect",
  },
  {
    title: "Insights",
    description:
      "Gain clarity with predefined dashboards and key metrics — track your progress, recognize patterns, and celebrate growth with ease",
    icon: <ChartNoAxesCombined />,
    key: "insights",
  },
];
