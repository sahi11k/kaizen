import dayjs from "dayjs";

export function buildDayMap(items, getDate) {
  const map = {};
  items.forEach((item) => {
    const key = dayjs(getDate(item)).format("YYYY-MM-DD");
    map[key] = (map[key] || 0) + 1;
  });
  return map;
}

export function heatmapLevel(map, key) {
  const count = map[key] || 0;
  return count > 0 ? "active" : "none";
}
