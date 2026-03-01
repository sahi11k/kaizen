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

export const TASK_FIELD_MAPPING = {
  completed_sessions: "completedSessions",
  total_sessions: "totalSessions",
  created_by: "createdBy",
  time_spent: "timeSpent",
  created_at: "createdAt",
  updated_at: "updatedAt",
  deleted_at: "deletedAt",
};

export const TASK_SESSION_FIELD_MAPPING = {
  task_id: "taskId",
  created_by: "createdBy",
  created_at: "createdAt",
};
