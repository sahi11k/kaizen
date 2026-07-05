import { Instagram, Linkedin, Mail } from "lucide-react";

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
    headline: "Deep work, without the drift",
    description:
      "Pomodoro sessions with built-in task management. Work in focused sprints, track what you finish, and see where your time actually goes.",
    key: "focus",
    preview: {
      type: "stats",
      items: [
        { value: "25", label: "Min focus block" },
        { value: "5", label: "Min short break" },
      ],
    },
  },
  {
    title: "Reflect",
    headline: "Write it down, see it clearly",
    description:
      "A private journal for honest self-assessment. No prompts, no streaks, no pressure — just a consistent record of where your head is at.",
    key: "reflect",
    preview: {
      type: "quote",
      text: "Started the week with more clarity than expected. Morning routines are holding…",
      meta: "12-day streak — active",
    },
  },
  {
    title: "Read",
    headline: "Everything worth reading, in one place",
    description:
      "Track what you want to read, what you're reading, and what you've finished — so nothing worth revisiting slips through the cracks.",
    key: "bookmarked",
    preview: {
      type: "stats",
      items: [
        { value: "8", label: "Want to read" },
        { value: "3", label: "Reading" },
        { value: "24", label: "Finished" },
      ],
    },
  },
  {
    title: "Insights",
    headline: "An honest look at your week",
    description:
      "Cross-tool analytics that connect your focus time, journal entries, and reading — showing patterns no single tool could show you.",
    key: "insights",
    preview: {
      type: "stats",
      items: [
        { value: "+18%", label: "Focus hrs vs last wk" },
        { value: "6/7", label: "Days journaled" },
      ],
    },
  },
];

export const METRICS_ITEMS = [
  { value: "4", label: "Integrated tools", key: "tools" },
  { value: "0", label: "Streaks tracked", key: "streaks" },
  { value: "∞", label: "Journal entries", key: "journal" },
  {
    value: "0",
    label: "Distractions by design",
    key: "notifications",
    accent: true,
  },
];

export const PHILOSOPHY_ITEMS = [
  {
    numeral: "I.",
    title: "Calm by design",
    description:
      "No notifications. No streaks designed to make you anxious. No push to do more. Just a clear view of where your time went.",
    key: "calm",
  },
  {
    numeral: "II.",
    title: "Context over counts",
    description:
      "Every number on the dashboard has a comparison. This week vs last. Hours by category, not just total. Age of a task, not just its name.",
    key: "context",
  },
  {
    numeral: "III.",
    title: "Tools that connect",
    description:
      "A journal entry next to your focus hours next to your reading list — because growth is cross-disciplinary and your tools should reflect that.",
    key: "connected",
  },
];
