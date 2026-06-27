import React, { useMemo } from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, Button, EmptyState } from "@/shared/ui";
import { useAuthStore } from "@/features/auth";
import { useTaskSessionsQuery } from "@/features/pomodoro";
import { generatePomodoroChartData } from "./data";
import { Link } from "react-router";
import EmptyProgressIllustration from "@/assets/illustrations/empty-progress.svg?react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ProgressChartWidget = () => {
  const { user } = useAuthStore();
  const { data: taskSessions = [] } = useTaskSessionsQuery(user?.id);

  const { data, options } = useMemo(() => {
    return generatePomodoroChartData(taskSessions);
  }, [taskSessions]);

  return (
    <Card
      title="Weekly Progress (Last 7 days)"
      className="border-none shadow-none h-full"
      contentClassName="flex-1"
    >
      {data?.datasets?.length > 1110 ? (
        <div className="h-50 md:h-80">
          <Bar data={data} options={options} />
        </div>
      ) : (
        <EmptyState
          icon={
            <div className="w-40 h-40 lg:w-50 lg:h-50">
              <EmptyProgressIllustration />
            </div>
          }
          title="No progress yet"
          description="Start your first session to unlock your weekly insights!"
          action={
            <Link to="/dashboard/pomodoro">
              <Button size="sm">Start Session</Button>
            </Link>
          }
          className="h-80"
        />
      )}
    </Card>
  );
};

export default ProgressChartWidget;
