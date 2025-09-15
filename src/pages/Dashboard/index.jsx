import React, { useEffect, useState } from "react";
import GreetingsWidget from "@/components/Dashboard/GreetingsWidget";
import JournalsWidget from "@/components/Dashboard/JournalsWidget";
import ProgressChartWidget from "@/components/Dashboard/ProgressChartWidget";
import TotalHoursWidget from "@/components/Dashboard/TotalHoursWidget";
import TaskListWidget from "@/components/Dashboard/TaskListWidget";
import TCPWidget from "@/components/Dashboard/TCPWidget";
import { cn } from "@/lib/utils";
import useTasksStore from "@/store/tasks";
import { useShallow } from "zustand/react/shallow";
import useAuthStore from "@/store/auth";
import { fetchTasks } from "@/db/apis/tasks";
import { STATUS } from "@/constants/db";
import { fetchJournals } from "@/db/apis/journals";
import useJournalsStore from "@/store/journals";
import useTabTitle from "@/hooks/useTabTitle";
import { TAB_TITLES } from "@/constants/routes";
import { Skeleton } from "@/components/ui/skeleton";

const SPAN_CLASS = {
  12: "col-span-12",
  8: "col-span-8",
  4: "col-span-4",
};

const CARD_GRID = [
  {
    span: 12,
    content: <GreetingsWidget key="greet" />,
    key: "greet",
    height: "h-40",
  },
  {
    span: 4,
    content: <TotalHoursWidget key="total-hours" />,
    key: "total-hours",
    height: "h-100",
  },
  {
    span: 4,
    content: <JournalsWidget key="journal" />,
    key: "journals",
    height: "h-100",
  },
  {
    span: 4,
    content: <TaskListWidget key="tasks" />,
    key: "tasks",
    height: "h-100",
  },
  {
    span: 8,
    content: <ProgressChartWidget key="progress" />,
    key: "progress",
    height: "h-100",
  },
  {
    span: 4,
    content: <TCPWidget key="taskCompletionPercentage" />,
    key: "taskCompletionPercentage",
    height: "h-100",
  },
];

const Dashboard = () => {
  const { user } = useAuthStore();
  const { setTasks, tasksFetchStatus, setTasksFetchStatus } = useTasksStore(
    useShallow((state) => ({
      setTasks: state.setTasks,
      tasksFetchStatus: state.tasksFetchStatus,
      setTasksFetchStatus: state.setTasksFetchStatus,
    }))
  );

  const [loading, setLoading] = useState(true);

  useTabTitle(TAB_TITLES.DASHBOARD);

  const { setJournals, journalsFetchStatus, setJournalsFetchStatus } =
    useJournalsStore(
      useShallow((state) => ({
        setJournals: state.setJournals,
        journalsFetchStatus: state.journalsFetchStatus,
        setJournalsFetchStatus: state.setJournalsFetchStatus,
      }))
    );

  useEffect(() => {
    const loadTasks = async () => {
      if (!user?.id) return;
      const data = await fetchTasks(user.id);
      setTasks(data);
      setTasksFetchStatus(STATUS.FETCHED);
    };

    if (tasksFetchStatus === STATUS.LOADING) {
      loadTasks();
    }
  }, [setTasks, user?.id, tasksFetchStatus, setTasksFetchStatus]);

  useEffect(() => {
    const loadJournals = async () => {
      if (!user?.id) return;
      const response = await fetchJournals(user.id);
      setJournals(response.data);
      setJournalsFetchStatus(STATUS.FETCHED);
    };

    if (journalsFetchStatus === STATUS.LOADING) {
      loadJournals();
    }
  }, [setJournals, user?.id, journalsFetchStatus, setJournalsFetchStatus]);

  useEffect(() => {
    if (
      tasksFetchStatus === STATUS.FETCHED &&
      journalsFetchStatus === STATUS.FETCHED
    ) {
      setLoading(false);
    }
  }, [tasksFetchStatus, journalsFetchStatus]);

  return (
    <div className="p-6 grid grid-cols-12 gap-6">
      {CARD_GRID.map(({ span, content, key, height }) => (
        <DashboardCard
          className={SPAN_CLASS[span]}
          key={key}
          loading={loading}
          height={height}
        >
          {content}
        </DashboardCard>
      ))}
    </div>
  );
};

const DashboardCard = ({ children, className, loading, height }) => {
  return (
    <div className={cn("rounded-lg overflow-hidden", className)}>
      {loading ? (
        <Skeleton
          className={cn("border-none shadow-none rounded-lg", height)}
        />
      ) : (
        children
      )}
    </div>
  );
};

export default Dashboard;
