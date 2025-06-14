export const TASK_CATEGORY_ICONS = {
  work: "💼",
  play: "🎮",
  learn: "📚",
  others: "🗂️",
  read: "📖",
  fitness: "🏃‍♂️",
};

export const TASK_CATEGORIES = [
  {
    key: "work",
    name: "Work",
    icon: TASK_CATEGORY_ICONS.work,
  },
  {
    key: "learn",
    name: "Learn",
    icon: TASK_CATEGORY_ICONS.learn,
  },
  {
    key: "fitness",
    name: "Fitness",
    icon: TASK_CATEGORY_ICONS.fitness,
  },
  {
    key: "play",
    name: "Play",
    icon: TASK_CATEGORY_ICONS.play,
  },
  {
    key: "read",
    name: "Read",
    icon: TASK_CATEGORY_ICONS.read,
  },
  {
    key: "others",
    name: "Others",
    icon: TASK_CATEGORY_ICONS.others,
  },
];

export const MAX_SESSIONS = 10;
export const MIN_SESSIONS = 1;

export const TIMER_CONSTANTS = {
  ONGOING_TAB: "ongoing",
  BREAK_TAB: "break",
  TASK_TIME: 25 * 60,
  SHORT_BREAK_TIME: 5 * 60,
  LONG_BREAK_TIME: 15 * 60,
};

export const SUPABASE_TABLES = {
  TASKS: "tasks_master",
};

export const SUCCESS_STATUS_CODES = [200, 201, 202, 204];
