import { TCP_CHART } from "@/features/dashboard/constants";

export const getCutout = (diameter) => {
  const radius = diameter / 2;
  return `${((radius - TCP_CHART.RING_WIDTH_PX) / radius) * 100}%`;
};

export const getTCP = (tasks = []) => {
  const totalTasks = Array.isArray(tasks) ? tasks.length : 0;
  if (!totalTasks) return 0;
  const completedTasks = tasks.filter((task) => task.completed).length;
  return Math.round((completedTasks / totalTasks) * 100);
};
