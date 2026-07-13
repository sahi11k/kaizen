export const TASK_FILTERS = {
  PENDING: "pending",
  COMPLETED: "completed",
  ALL: "all",
} as const;

export const DEFAULT_TASK_FILTER = TASK_FILTERS.PENDING;

export const TASK_FILTER_LABELS = {
  [TASK_FILTERS.PENDING]: "Pending",
  [TASK_FILTERS.COMPLETED]: "Completed",
  [TASK_FILTERS.ALL]: "All",
} as const;

export const TASK_LIST_EMPTY_STATES = {
  [TASK_FILTERS.PENDING]: {
    title: "Nothing pending",
    description: "You're all caught up for now.",
  },
  [TASK_FILTERS.COMPLETED]: {
    title: "Nothing completed",
    description: "Finished tasks will appear here.",
  },
} as const;

export const TASK_LIST_CLASSES = {
  list: "m-2 flex flex-col gap-3",
  skeletonRow:
    "flex items-center gap-4 rounded-lg border border-border bg-muted/40 px-3 py-3",
  skeletonBlock: "bg-muted-foreground/20",
} as const;

export type TaskFilter = (typeof TASK_FILTERS)[keyof typeof TASK_FILTERS];
