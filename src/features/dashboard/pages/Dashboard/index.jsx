import { Skeleton } from "@/shared/ui/skeleton";
import { CARD_GRID } from "@/features/dashboard/constants/dashboards";
import { STATUS } from "@/shared/constants/db";
import { TAB_TITLES } from "@/shared/constants/routes";
import { fetchTasks } from "@/features/pomodoro/api/tasks";
import useTabTitle from "@/shared/hooks/useTabTitle";
import { cn } from "@/shared/lib/utils";
import useAuthStore from "@/features/auth/store/auth";
import useTasksStore from "@/features/pomodoro/store/tasks";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useJournalsQuery } from "@/features/journals/services/queries";

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
  const { isLoading: isJournalsLoading } = useJournalsQuery(user?.id);

  useTabTitle(TAB_TITLES.DASHBOARD);

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
    if (tasksFetchStatus === STATUS.FETCHED && !isJournalsLoading) {
      setLoading(false);
    }
  }, [tasksFetchStatus, isJournalsLoading]);

  return (
    <div className="p-6 grid grid-cols-12 gap-6">
      {CARD_GRID.map(({ span, content, key, height }) => (
        <DashboardCard
          className={span}
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
