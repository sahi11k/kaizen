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
import { Card, CardHeader, CardContent, CardTitle } from "@/shared/ui/card";
import { useAuthStore } from "@/features/auth";
import { useTaskSessionsQuery } from "@/features/pomodoro";
import { generatePomodoroChartData } from "./data";
import Button from "@/shared/ui/button";
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
    <Card className="border-none shadow-none h-full">
      <CardHeader>
        <CardTitle>Weekly Progress (Last 7 days)</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {data?.datasets?.length > 0 ? (
          <div className="h-50 md:h-80">
            <Bar data={data} options={options} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-80 gap-6">
            <div className="w-40 h-40 lg:w-50 lg:h-50">
              <EmptyProgressIllustration />
            </div>
            <p className="text-center">
              No progress yet — start your first session to unlock your weekly
              insights!
            </p>
            <Link to="/dashboard/pomodoro">
              <Button>Start Session</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressChartWidget;
