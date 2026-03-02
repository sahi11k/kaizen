import { fetchUserSettings } from "@/features/settings/apis";
import { queryKeys } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";

export const useUserSettingsQuery = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.userSettings.all(userId),
    queryFn: () => fetchUserSettings(userId),
    enabled: !!userId,
  });
};
