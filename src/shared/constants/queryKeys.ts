export const queryKeys = {
  tasks: {
    all: (userId: string) => ["tasks", userId] as const,
  },
  taskSessions: {
    all: (userId: string) => ["taskSessions", userId] as const,
    totalDuration: (userId: string) =>
      ["taskSessions", userId, "totalDuration"] as const,
  },
  userSettings: {
    all: (userId: string) => ["userSettings", userId] as const,
  },
  journals: {
    all: (userId: string) => ["journals", userId] as const,
  },
  moods: {
    today: (userId: string, dateKey: string) =>
      ["moods", "today", userId, dateKey] as const,
  },
  habits: {
    all: (userId: string, lifecycleFilter = "active") =>
      ["habits", userId, lifecycleFilter] as const,
  },
  habitEntries: {
    byDate: (userId: string, dateKey: string) =>
      ["habitEntries", "byDate", userId, dateKey] as const,
    ranges: (userId: string) => ["habitEntries", "range", userId] as const,
    byRange: (
      userId: string,
      habitId: string,
      startDate: string,
      endDate: string,
    ) =>
      ["habitEntries", "range", userId, habitId, startDate, endDate] as const,
    today: (userId: string, dateKey: string) =>
      ["habitEntries", "byDate", userId, dateKey] as const,
  },
};
