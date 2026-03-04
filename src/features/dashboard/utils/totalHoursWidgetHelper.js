export const formatDuration = (totalMinutes = 0) => {
  const minutes = Number(totalMinutes) || 0;

  const unit = minutes < 60 ? "m" : "h";
  const value = unit === "m" ? minutes : minutes / 60;
  const rounded = Number.isInteger(value)
    ? value
    : Math.round(value * 10) / 10;

  return {
    value: rounded === 0 ? "NA" : rounded,
    unit: rounded === 0 ? "" : unit,
  };
};
