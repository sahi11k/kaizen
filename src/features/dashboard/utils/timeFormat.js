export function minutesToHours(mins) {
  return (mins / 60).toFixed(1);
}

export function formatTimeFocused(mins) {
  if (mins === 0) return { value: "0", unit: "h" };
  if (mins < 60) return { value: `${Math.round(mins)}m`, unit: "" };
  return { value: (mins / 60).toFixed(1), unit: "h" };
}

export function formatDaysAgo(days) {
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}
