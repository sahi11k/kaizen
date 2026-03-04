import React from "react";
import { Card, Tooltip } from "@/shared/ui";
import HoursInvestedIllustration from "@/assets/illustrations/hours-invested.svg?react";
import { useAuthStore } from "@/features/auth";
import { useTotalSessionDurationQuery } from "@/features/pomodoro";
import { formatDuration } from "@/features/dashboard/utils/totalHoursWidgetHelper";
import { Info } from "lucide-react";

const TotalHoursWidget = () => {
  const { user } = useAuthStore();
  const { data: totalMinutes = 0 } = useTotalSessionDurationQuery(user?.id);
  const totalTimeInvested = formatDuration(totalMinutes);

  return (
    <Card
      className="border-none shadow-none text-foreground"
      contentClassName="flex items-center justify-center"
      footerClassName="flex-col"
      footer={
        <>
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
        </>
      }
    >
      <div className="w-60 h-60">
        <HoursInvestedIllustration />
      </div>
    </Card>
  );
};

export default TotalHoursWidget;
