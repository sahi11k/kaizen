import React from "react";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import HoursInvestedIllustration from "@/assets/illustrations/hours-invested.svg?react";
import useTasksStore from "@/features/pomodoro/store/tasks";
import { Info } from "lucide-react";
import { Tooltip } from "@/shared/ui/tooltip";

const TotalHoursWidget = () => {
  const { tasks } = useTasksStore();
  const totalTimeInvested = getTotalTimeInvested(tasks);

  return (
    <Card className="border-none shadow-none text-foreground">
      <CardContent className="flex items-center justify-center">
        <div className="w-60 h-60">
          <HoursInvestedIllustration />
        </div>
      </CardContent>
      <CardFooter className="flex-col">
        <div className="text-sm text-muted-foreground -mb-1 font-medium flex items-center">
          Total Time Invested
          <Tooltip
            content="Total time invested via pomodoro sessions"
            contentClassName="w-50"
            level="image"
          >
            <Info className="size-3.5 inline-block ml-2" />
          </Tooltip>
        </div>
        <div className="heading-1">
          <strong>{totalTimeInvested.value}</strong>
          <span className="text-muted-foreground heading-2">
            {totalTimeInvested.unit}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

const getTotalTimeInvested = (tasks = []) => {
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

export default TotalHoursWidget;
