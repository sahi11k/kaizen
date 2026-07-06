import { useMemo } from "react";
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
      subtitle={<>Your week at a glance · {rangeLabel}</>}
      titleClassName="heading-4"
    />
  );
};

export default DashboardGreetingHeader;
