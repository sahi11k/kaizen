export const getTotalTimeInvested = (tasks = []) => {
  const totalMinutes = Array.isArray(tasks)
    ? tasks.reduce((sum, t) => sum + (Number(t?.timeSpent) || 0), 0)
    : 0;

  let unit = totalMinutes < 60 ? "m" : "h";
  const value = unit === "m" ? totalMinutes : totalMinutes / 60;

  let rounded = Number.isInteger(value) ? value : Math.round(value * 10) / 10;

  return {
    value: rounded === 0 ? "NA" : rounded,
    unit: rounded === 0 ? "" : unit,
  };
};
