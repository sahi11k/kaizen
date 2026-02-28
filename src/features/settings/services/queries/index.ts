import { fetchUserSettings } from "@/features/settings/services/apis";
import { queryKeys } from "@/shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useUserSettingsQuery = (userId) => {
  return useQuery({
    queryKey: queryKeys.userSettings.all(userId),
    queryFn: () => fetchUserSettings(userId),
    enabled: !!userId,
  });
};
