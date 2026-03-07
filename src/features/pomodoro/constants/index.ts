export const MAX_SESSIONS = 10;
export const MIN_SESSIONS = 1;

export const TIMER_CONSTANTS = {
  POMODORO_TAB: "pomodoro",
  SHORT_BREAK_TAB: "short_break",
  LONG_BREAK_TAB: "long_break",
  TASK_TIME: 1500,
  SHORT_BREAK_TIME: 300,
  LONG_BREAK_TIME: 900,
};

export const POMODORO_TABS = [
  {
    key: TIMER_CONSTANTS.POMODORO_TAB,
    label: "Pomodoro",
    icon: "hourglass-filled",
  },
  {
    key: TIMER_CONSTANTS.SHORT_BREAK_TAB,
    label: "Short Break",
    icon: "hourglass-half",
  },
  {
    key: TIMER_CONSTANTS.LONG_BREAK_TAB,
    label: "Long Break",
    icon: "hourglass-outline",
  },
] as const;

export const TASK_FIELD_MAPPING = {
  completed_sessions: "completedSessions",
  total_sessions: "totalSessions",
  created_by: "createdBy",
  created_at: "createdAt",
  updated_at: "updatedAt",
};

export const TIMER_WARNING = {
  TITLE: "Timer in Progress",
  DESCRIPTION:
    "You have a timer running. This action will stop it and your current session progress will be lost.",
  CANCEL_LABEL: "Keep Working",
  CONFIRM_LABEL: "Continue Anyway",
};

export const TASK_SESSION_FIELD_MAPPING = {
  task_id: "taskId",
  created_by: "createdBy",
  created_at: "createdAt",
};
