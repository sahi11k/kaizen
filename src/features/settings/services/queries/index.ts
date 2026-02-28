import { fetchUserSettings } from "@/features/settings/services/apis";
import { useQuery } from "@tanstack/react-query";

export const useUserSettingsQuery = (userId) => {
  return useQuery({
    queryKey: ["userSettings", userId],
    queryFn: () => fetchUserSettings(userId),
    enabled: !!userId,
  });
};
