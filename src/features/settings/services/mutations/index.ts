import { upsertUserSettings } from "@/features/settings/services/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpsertUserSettingsMutationPayload = {
  payload: Record<string, unknown>;
  userId: string;
};

export const useUpsertUserSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, userId }: UpsertUserSettingsMutationPayload) =>
      upsertUserSettings(payload, userId),
    onSuccess: (res, variables) => {
      if (res.error) throw new Error(res.error as string);
      queryClient.setQueryData(["userSettings", variables.userId], res.data);
    },
  });
};
