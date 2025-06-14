export const transformTasksFromDb = (tasks) => {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }

  return tasks.map(transformTaskFromDb);
};

export const transformTaskFromDb = (task) => {
  const transformedTask = {
    ...task,
    completedSessions: task.completed_sessions,
    totalSessions: task.total_sessions,
  };

  delete transformedTask.completed_sessions;
  delete transformedTask.total_sessions;

  return transformedTask;
};

export const transformTasksToDb = (tasks = []) => {
  if (!tasks || !Array.isArray(tasks)) {
    return [];
  }
  return tasks.map(transformTaskToDb);
};

export const transformTaskToDb = (task = {}) => {
  const transformedTask = {
    ...task,
    completed_sessions: task.completedSessions,
    total_sessions: task.totalSessions,
  };

  delete transformedTask.completedSessions;
  delete transformedTask.totalSessions;

  return transformedTask;
};
