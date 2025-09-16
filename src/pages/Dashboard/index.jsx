import { Skeleton } from "@/components/ui/skeleton";
import { CARD_GRID } from "@/constants/dashboards";
import { STATUS } from "@/constants/db";
import { TAB_TITLES } from "@/constants/routes";
import { fetchJournals } from "@/db/apis/journals";
import { fetchTasks } from "@/db/apis/tasks";
import useTabTitle from "@/hooks/useTabTitle";
import { cn } from "@/lib/utils";
import useAuthStore from "@/store/auth";
import useJournalsStore from "@/store/journals";
import useTasksStore from "@/store/tasks";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

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
