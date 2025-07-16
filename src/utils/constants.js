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
    value: "work",
    label: "Work",
    icon: TASK_CATEGORY_ICONS.work,
  },
  {
    value: "learn",
    label: "Learn",
    icon: TASK_CATEGORY_ICONS.learn,
  },
  {
    value: "fitness",
    label: "Fitness",
    icon: TASK_CATEGORY_ICONS.fitness,
  },
  {
    value: "play",
    label: "Play",
    icon: TASK_CATEGORY_ICONS.play,
  },
  {
    value: "read",
    label: "Read",
    icon: TASK_CATEGORY_ICONS.read,
  },
  {
    value: "others",
    label: "Others",
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

export const EDIT = "edit";
export const CREATE = "create";

export const EMAIL_NOT_VERIFIED_ERROR = "email_not_confirmed";

export const STATUS = {
  LOADING: "loading",
  FETCHED: "fetched",
};
