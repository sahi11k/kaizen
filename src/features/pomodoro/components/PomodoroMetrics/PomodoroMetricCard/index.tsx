import ComparisonBadge from "./ComparisonBadge";

const PomodoroMetricCard = ({ icon, label, value, unit, comparison }) => {
  const hasValue = value !== null && value !== undefined && value !== "";

  return (
    <div className="surface-card flex min-h-40 flex-col justify-between rounded-2xl p-5">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <span className="shrink-0">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="flex items-start gap-2">
        <div className="flex items-end gap-1">
          {hasValue && (
            <span className="font-number text-5xl leading-none tracking-normal text-foreground">
              {value}
            </span>
          )}
          {hasValue && unit && (
            <span className="pb-1 text-2xl font-medium leading-none text-muted-foreground">
              {unit}
            </span>
          )}
        </div>
        <ComparisonBadge comparison={comparison} />
      </div>
    </div>
  );
};

export default PomodoroMetricCard;
