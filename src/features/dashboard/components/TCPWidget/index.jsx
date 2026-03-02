import { useAuthStore } from "@/features/auth";
import { useTasksQuery } from "@/features/pomodoro";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, ChartTooltip, Legend);

import { TCP_CHART } from "@/features/dashboard/constants";

const getCutout = (diameter) => {
  const radius = diameter / 2;
  return `${((radius - TCP_CHART.RING_WIDTH_PX) / radius) * 100}%`;
};

const TCPWidget = () => {
  const { user } = useAuthStore();
  const { data: tasks = [] } = useTasksQuery(user?.id);
  const tcp = getTCP(tasks);
  const completed = Math.max(0, Math.min(100, tcp));
  const remaining = 100 - completed;

  const isMobile = window.innerWidth < 768;

  const styles = getComputedStyle(document.documentElement);

  const pomodoroFilled = styles.getPropertyValue("--pomodoro-filled").trim();
  const pomodoroUnfilled = styles
    .getPropertyValue("--pomodoro-unfilled")
    .trim();

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completed, remaining],
        backgroundColor: [pomodoroFilled, pomodoroUnfilled],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: getCutout(
      isMobile ? TCP_CHART.SIZE_MOBILE : TCP_CHART.SIZE_DESKTOP,
    ),
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <Card className="border-none shadow-none h-full">
      <CardHeader>
        <CardTitle>Task Completion Percentage</CardTitle>
      </CardHeader>
      <CardContent className="py-6">
        <div className="relative w-54 h-54 md:w-70 md:h-70 mx-auto">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="font-semibold leading-tight">
              <strong className="text-foreground text-4xl md:text-5xl xl:text-6xl">
                {completed}
              </strong>
              <span className="text-3xl lg:text-5xl">%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const getTCP = (tasks = []) => {
  const totalTasks = Array.isArray(tasks) ? tasks.length : 0;
  if (!totalTasks) return 0;
  const completedTasks = tasks.filter((task) => task.completed).length;
  return Math.round((completedTasks / totalTasks) * 100);
};

export default TCPWidget;
