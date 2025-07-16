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
    createdBy: task.created_by,
  };

  delete transformedTask.completed_sessions;
  delete transformedTask.total_sessions;
  delete transformedTask.created_by;

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
  };

  if (Number.isInteger(task.completedSessions)) {
    transformedTask.completed_sessions = task.completedSessions;
    delete transformedTask.completedSessions;
  }

  if (Number.isInteger(task.totalSessions)) {
    transformedTask.total_sessions = task.totalSessions;
    delete transformedTask.totalSessions;
  }

  if (task.createdBy) {
    transformedTask.created_by = task.createdBy;
    delete transformedTask.createdBy;
  }

  return transformedTask;
};
