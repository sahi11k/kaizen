import { deleteJournal, saveJournal } from "@/features/journals/services/apis";
import { DefaultJournalState, Journal } from "@/features/journals/types";
import { deleteById, upsertById } from "@/shared/utils/jsUtils";
import { ApiResponse } from "@/types/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SaveJournalMutationPayload = {
  payload: Record<string, DefaultJournalState>;
  userId?: string;
};

type DeleteJournalMutationPayload = {
  journalId: string;
  userId?: string;
};

export const useSaveJournalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, userId }: SaveJournalMutationPayload) =>
      saveJournal(payload, userId),
    onSuccess: (res: ApiResponse<Journal[]>, variables) => {
      if (res.error) throw new Error(res.error);

      const updatedJournal = res.data?.[0];
      if (!updatedJournal) return;

      queryClient.setQueryData<Journal[]>(
        ["journals", variables.userId],
        (old) => upsertById(old, updatedJournal),
      );
    },
    onError: (error: Error, variables) => {
      console.error({ error, variables });
    },
  });
};

export const useDeleteJournalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ journalId, userId }: DeleteJournalMutationPayload) =>
      deleteJournal(journalId, userId),
    onSuccess: (res: ApiResponse<Journal[]>, variables) => {
      if (res.error) throw new Error(res.error);

      queryClient.setQueryData<Journal[]>(
        ["journals", variables.userId],
        (old) => deleteById(old ?? [], variables.journalId),
      );
    },
    onError: (error: Error, variables) => {
      console.error({ error, variables });
    },
  });
};
