import React from "react";
import DashboardGreetingHeader from "../DashboardGreetingHeader";
import NewUserBanner from "../NewUserBanner";
import StatCards from "../StatCards";
import EngagementHeatmap from "../EngagementHeatmap";
import FocusTrendChart from "../FocusTrendChart";
import StaleTasksWidget from "../StaleTasksWidget";
import LatestReflectionWidget from "../LatestReflectionWidget";
import ReadingSnapshotWidget from "../ReadingSnapshotWidget";

const DashboardOverview = () => {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 xl:px-12 pb-6 max-w-[1800px] mx-auto">
      <DashboardGreetingHeader />
      <div className="space-y-6">
        <NewUserBanner />
        <StatCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[3fr_4fr] gap-6 [&>*]:h-64 [&>*]:min-w-0 md:[&>*]:h-80">
          <EngagementHeatmap />
          <FocusTrendChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 [&>*]:h-64 [&>*]:min-w-0">
          <StaleTasksWidget />
          <LatestReflectionWidget />
          <ReadingSnapshotWidget />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
