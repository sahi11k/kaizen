import { Clock3, Gauge, ListChecks } from "lucide-react";
import { usePomodoroMetrics } from "@/features/pomodoro/hooks";
import PomodoroMetricCard from "@/features/pomodoro/components/PomodoroMetrics/PomodoroMetricCard";

const PomodoroMetrics = () => {
  const {
    totalTimeInvested,
    sessionCompletionRate,
    sessionsCompletedToday,
    timeComparison,
    sessionsTodayComparison,
  } = usePomodoroMetrics();

  const metrics = [
    {
      icon: <Clock3 className="size-4" />,
      label: "Total Time Invested",
      value: totalTimeInvested.value,
      unit: totalTimeInvested.unit,
      comparison: timeComparison,
    },
    {
      icon: <Gauge className="size-4" />,
      label: "Session Completion Rate",
      value: sessionCompletionRate,
      unit: sessionCompletionRate === null ? "" : "%",
      comparison: null,
    },
    {
      icon: <ListChecks className="size-4" />,
      label: "Sessions Completed Today",
      value: sessionsCompletedToday,
      unit: "",
      comparison: sessionsTodayComparison,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-5 xl:gap-6">
      {metrics.map((metric) => (
        <PomodoroMetricCard key={metric.label} {...metric} />
      ))}
    </div>
  );
};

export default PomodoroMetrics;
