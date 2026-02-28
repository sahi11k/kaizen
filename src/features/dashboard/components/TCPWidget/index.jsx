import useAuthStore from "@/features/auth/store/auth";
import { useTasksQuery } from "@/features/pomodoro/services/queries";
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

const TCPWidget = () => {
  const { user } = useAuthStore();
  const { data: tasks = [] } = useTasksQuery(user?.id);
  const tcp = getTCP(tasks);
  const completed = Math.max(0, Math.min(100, tcp));
  const remaining = 100 - completed;

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
    cutout: "85%",
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
        <div className="relative w-70 h-70 mx-auto">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="heading-1">
              <strong className="text-foreground">{completed}</strong>
              <span className="heading-2">%</span>
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
