import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";
import DashboardOverview from "@/features/dashboard/components/Dashboard";

const Dashboard = () => {
  useDocumentTitle(BROWSER_TAB_TITLES.DASHBOARD);
  return <DashboardOverview />;
};

export default Dashboard;
