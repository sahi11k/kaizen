import dayjs from "dayjs";

/** Monday of the current calendar week (dayjs weekday 0=Sun..6=Sat, so Mon offset = (day+6)%7). */
export function getWeekStart(reference = dayjs()) {
  const date = dayjs(reference);
  const mondayOffset = (date.day() + 6) % 7;
  return date.subtract(mondayOffset, "day").startOf("day");
}

export function getDayKeys(reference = dayjs()) {
  const start = getWeekStart(reference);
  return Array.from({ length: 7 }, (_, i) => start.add(i, "day").format("YYYY-MM-DD"));
}

export function getRangeLabel(dayKeys) {
  const start = dayjs(dayKeys[0]);
  const end = dayjs(dayKeys[dayKeys.length - 1]);
  return `${start.format("MMM D")} – ${end.format("MMM D")}`;
}
