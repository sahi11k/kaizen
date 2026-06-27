export const queryKeys = {
  tasks: {
    all: (userId: string) => ["tasks", userId] as const,
  },
  taskSessions: {
    all: (userId: string) => ["taskSessions", userId] as const,
    byRange: (userId: string, startDate: string, endDate: string) =>
      ["taskSessions", userId, "range", startDate, endDate] as const,
    ranges: (userId: string) => ["taskSessions", userId, "range"] as const,
    totalDuration: (userId: string) =>
      ["taskSessions", userId, "totalDuration"] as const,
    totalCount: (userId: string) =>
      ["taskSessions", userId, "totalCount"] as const,
  },
  userSettings: {
    all: (userId: string) => ["userSettings", userId] as const,
  },
  journals: {
    all: (userId: string) => ["journals", userId] as const,
    list: (userId: string) => ["journals", userId, "list"] as const,
    detail: (userId: string, journalId: string) =>
      ["journals", userId, "detail", journalId] as const,
  },
  bookmarked: {
    all: (userId: string) => ["bookmarked", userId] as const,
  },
};
