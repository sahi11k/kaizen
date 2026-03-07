export type DefaultTask = {
  category: string;
  completed: boolean;
  completedSessions: number;
  description: string;
  rank: number;
  title: string;
  totalSessions: number;
};

export type Task = DefaultTask & {
  id: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskSession = {
  id: string;
  taskId: string | null;
  duration: number;
  createdBy: string;
  createdAt: string;
};

type CreateTaskMutationPayload = {
  payload: DefaultTask;
  userId?: string;
};

type UpdateTaskMutationPayload = {
  payload: Task;
  userId?: string;
};

type DeleteTaskMutationPayload = {
  taskId: string;
  userId?: string;
};

type SortTasksMutationPayload = {
  payload: Array<Task>;
  userId?: string;
};

type AddTaskSessionMutationPayload = {
  payload: Record<string, unknown>;
  userId?: string;
};

type RecordPomodoroCompletionPayload = {
  task: Task | null;
  userId: string;
  duration: number;
};
