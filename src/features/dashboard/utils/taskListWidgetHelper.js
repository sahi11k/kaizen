export const getPendingTasks = (tasks = []) => {
  let count = 0;
  let filteredTasks = [];
  for (const task of tasks) {
    if (!task.completed) {
      count++;
      filteredTasks.push(task);
    }
    if (count === 5) break;
  }
  return filteredTasks;
};
