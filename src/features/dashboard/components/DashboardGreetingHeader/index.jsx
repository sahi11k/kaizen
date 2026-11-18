import { useMemo } from "react";
import { Dot } from "lucide-react";
import { useAuthStore, getUserDisplayName } from "@/features/auth";
import { PageHeader } from "@/shared/ui";
import { getDayKeys, getRangeLabel } from "../../utils/dateRange";
import { getGreeting } from "../../utils/greeting";

const DashboardGreetingHeader = () => {
  const { user } = useAuthStore();
  const userName = getUserDisplayName(user);
  const rangeLabel = useMemo(() => getRangeLabel(getDayKeys()), []);

  return (
    <PageHeader
      title={
        <>
          {getGreeting()}, {userName}
        </>
      }
      subtitle={
        <span className="inline-flex items-center gap-1">
          Your week at a glance
          <Dot className="size-4" aria-hidden />
          {rangeLabel}
        </span>
      }
    />
  );
};

export default DashboardGreetingHeader;
