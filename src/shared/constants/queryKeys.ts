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
};
