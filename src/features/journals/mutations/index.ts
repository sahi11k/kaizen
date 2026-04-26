import { deleteJournal, saveJournal } from "@/features/journals/apis";
import useJournalsStore from "@/features/journals/store";
import { DefaultJournalState, Journal } from "@/features/journals/types";
import { queryKeys } from "@/shared/constants";
import { deleteById, upsertById } from "@/shared/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function logJournalMutationError(
  mutationName: string,
  error: Error,
  variables: unknown,
) {
  console.error(`[${mutationName}]`, { error, variables });
}

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
    onSuccess: (data: Journal[], variables) => {
      const updatedJournal = data?.[0];
      if (!updatedJournal) return;

      queryClient.setQueryData<Journal[]>(
        queryKeys.journals.all(variables.userId),
        (old) => upsertById(old, updatedJournal),
      );

      const { currentJournal, setCurrentJournal } = useJournalsStore.getState();
      if (currentJournal?.id === updatedJournal.id) {
        setCurrentJournal({ ...currentJournal, ...updatedJournal });
      }
    },
    onError: (error: Error, variables) => {
      logJournalMutationError("useSaveJournalMutation", error, variables);
    },
  });
};

export const useDeleteJournalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ journalId, userId }: DeleteJournalMutationPayload) =>
      deleteJournal(journalId, userId),
    onSuccess: (_res, variables) => {
      queryClient.setQueryData<Journal[]>(
        queryKeys.journals.all(variables.userId),
        (old) => deleteById(old ?? [], variables.journalId),
      );
    },
    onError: (error: Error, variables) => {
      logJournalMutationError("useDeleteJournalMutation", error, variables);
    },
  });
};
