import React, { useEffect, useMemo } from "react";

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
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import useAuthStore from "@/store/auth";
import { getLastWeekTaskSessions } from "@/db/apis/tasks";
import useTasksStore from "@/store/tasks";
import { useShallow } from "zustand/react/shallow";
import { STATUS } from "@/constants/db";
import dayjs from "dayjs";
import { generatePomodoroChartData } from "./data";
import Button from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router";
import EmptyProgressIllustration from "@/assets/illustrations/empty-progress.svg?react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProgressChartWidget = () => {
  const { user } = useAuthStore();
  const {
    setTaskSessions,
    taskSessionsFetchStatus,
    setTaskSessionsFetchStatus,
    taskSessions,
  } = useTasksStore(
    useShallow((state) => ({
      setTaskSessions: state.setTaskSessions,
      taskSessionsFetchStatus: state.taskSessionsFetchStatus,
      setTaskSessionsFetchStatus: state.setTaskSessionsFetchStatus,
      taskSessions: state.taskSessions,
    }))
  );

  useEffect(() => {
    const loadSessions = async () => {
      if (!user?.id) return;
      const tasks = await getLastWeekTaskSessions(
        {
          startDate: dayjs().subtract(7, "day").toISOString(),
          endDate: dayjs().toISOString(),
        },
        user.id
      );
      setTaskSessions(tasks.data);
      setTaskSessionsFetchStatus(STATUS.FETCHED);
    };

    if (taskSessionsFetchStatus === STATUS.LOADING) {
      loadSessions();
    }
  }, [
    setTaskSessions,
    user?.id,
    taskSessionsFetchStatus,
    setTaskSessionsFetchStatus,
  ]);

  const { data, options } = useMemo(() => {
    return generatePomodoroChartData(taskSessions || []);
  }, [taskSessions]);

  return (
    <Card className="border-none shadow-none h-full">
      <CardHeader>
        <CardTitle>Weekly Progress (Last 7 days)</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {taskSessions.length > 0 ? (
          <div className="h-80">
            <Bar data={data} options={options} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-80 gap-6">
            <div className="w-50 h-50">
              <EmptyProgressIllustration className="text-primary fill-current" />
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
