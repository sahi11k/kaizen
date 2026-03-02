import { Skeleton } from "@/shared/ui/skeleton";
import { WIDGET_GRID } from "@/features/dashboard/constants";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useTabTitle from "@/shared/hooks/useTabTitle";
import { cn } from "@/shared/lib/utils";
import { useAuthStore } from "@/features/auth";
import { useTasksQuery } from "@/features/pomodoro";
import { useJournalsQuery } from "@/features/journals";

const Dashboard = () => {
  const { user } = useAuthStore();

  const { isLoading: isTasksLoading } = useTasksQuery(user?.id);
  const { isLoading: isJournalsLoading } = useJournalsQuery(user?.id);

  useTabTitle(BROWSER_TAB_TITLES.DASHBOARD);

  const loading = isTasksLoading || isJournalsLoading;

  return (
    <div className="p-6 grid grid-cols-12 gap-6">
      {WIDGET_GRID.map(({ span, Content, key, height }) => (
        <DashboardCard
          className={span}
          key={key}
          loading={loading}
          height={height}
        >
          <Content />
        </DashboardCard>
      ))}
    </div>
  );
};

const DashboardCard = ({ children, className, loading, height }) => {
  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden border border-border",
        className,
      )}
    >
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
