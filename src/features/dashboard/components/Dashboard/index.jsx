import React, { useMemo } from "react";
import { Link } from "react-router";
import { useAuthStore, getUserDisplayName } from "@/features/auth";
import { useTasksQuery } from "@/features/pomodoro";
import { useJournalsQuery } from "@/features/journals";
import { useBookmarkedQuery } from "@/features/bookmarked";
import { getDayKeys, getRangeLabel } from "../../utils/dateRange";
import StatCards from "../StatCards";
import EngagementHeatmap from "../EngagementHeatmap";
import CategoryChart from "../CategoryChart";
import StaleTasksWidget from "../StaleTasksWidget";
import LatestReflectionWidget from "../LatestReflectionWidget";
import ReadingSnapshotWidget from "../ReadingSnapshotWidget";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

const DashboardOverview = () => {
  const { user } = useAuthStore();
  const userName = getUserDisplayName(user);
  const rangeLabel = useMemo(() => getRangeLabel(getDayKeys()), []);

  const { data: tasks = [], isLoading: tasksLoading } = useTasksQuery(user?.id);
  const { data: journals = [], isLoading: journalsLoading } = useJournalsQuery(user?.id);
  const { data: bookmarkedItems = [], isLoading: bookmarkedLoading } = useBookmarkedQuery(user?.id);
  const isCheckingHistory = tasksLoading || journalsLoading || bookmarkedLoading;
  const isBrandNewUser =
    !isCheckingHistory &&
    tasks.length === 0 &&
    journals.length === 0 &&
    bookmarkedItems.length === 0;

  return (
    <div className="min-h-screen bg-background text-foreground p-5 xl:p-6 max-w-[1800px] md:mx-auto">
      <div className="sticky top-3 md:top-5 z-40 bg-background before:absolute before:inset-x-0 before:bottom-full before:h-3 before:bg-background md:before:h-5 pb-4 md:pb-5">
        <h1 className="heading-2">
          {getGreeting()}, {userName}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Your week at a glance · {rangeLabel}
        </p>
      </div>

      <div className="space-y-5 xl:space-y-6">
        {isBrandNewUser && (
          <div className="px-1 text-sm text-subtle-foreground">
            Nothing tracked this week yet — start with{" "}
            <Link to="/dashboard/pomodoro" className="text-muted-foreground underline">
              Pomodoro
            </Link>
            ,{" "}
            <Link to="/dashboard/journals/new" className="text-muted-foreground underline">
              Journals
            </Link>
            , or{" "}
            <Link to="/dashboard/bookmarked" className="text-muted-foreground underline">
              Bookmarked
            </Link>
            .
          </div>
        )}

        <StatCards />

        <div className="grid grid-cols-[1fr_1.4fr] gap-5 xl:gap-6 [&>*]:h-80">
          <EngagementHeatmap />
          <CategoryChart />
        </div>

        <div className="grid grid-cols-3 gap-5 xl:gap-6 [&>*]:h-64">
          <StaleTasksWidget />
          <LatestReflectionWidget />
          <ReadingSnapshotWidget />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
