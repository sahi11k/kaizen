import { useMemo } from "react";
import useJournalsStore from "@/features/journals/store";
import { useAuthStore } from "@/features/auth";
import { useShallow } from "zustand/react/shallow";
import { DEFAULT_JOURNAL_STATE } from "@/features/journals/constants";
import { groupByMonth } from "@/features/journals/utils";
import { useJournalsQuery } from "@/features/journals/queries";
import { useDeleteJournalMutation } from "@/features/journals/mutations";
import { Journal } from "@/features/journals/types";
import { Toast } from "@/shared/ui";

const { toast } = Toast;

interface UseJournalListOptions {
  onItemClick?: () => void;
}

export default function useJournalList({
  onItemClick,
}: UseJournalListOptions = {}) {
  const { user } = useAuthStore();
  const { data: journals = [], isLoading } = useJournalsQuery(user.id);
  const deleteJournalMutation = useDeleteJournalMutation();

  const {
    unsavedJournal,
    setUnsavedJournal,
    currentJournal,
    setCurrentJournal,
  } = useJournalsStore(
    useShallow((state) => ({
      unsavedJournal: state.unsavedJournal,
      setUnsavedJournal: state.setUnsavedJournal,
      setCurrentJournal: state.setCurrentJournal,
      currentJournal: state.currentJournal,
    })),
  );

  const allJournals = useMemo(
    () => (unsavedJournal ? [unsavedJournal, ...journals] : journals),
    [journals, unsavedJournal],
  );

  const moveToDetail = () => {
    if (typeof onItemClick === "function") {
      onItemClick();
    }
  };

  const handleJournalClick = (journal: unknown) => {
    if (currentJournal?.id === (journal as { id: string }).id) return;
    setCurrentJournal(journal as typeof currentJournal);
    moveToDetail();
  };

  const removeJournal = (journalId: string) => {
    if (unsavedJournal?.id === journalId) {
      setUnsavedJournal(null);
      setCurrentJournal(null);
      toast.success("Journal deleted successfully");
      return;
    }

    deleteJournalMutation.mutate(
      { journalId, userId: user.id },
      {
        onSuccess: () => {
          setCurrentJournal(null);
          toast.success("Journal deleted successfully");
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const editJournal = (journal: unknown) => {
    setCurrentJournal(journal as typeof currentJournal);
    moveToDetail();
  };

  const newJournal = () => {
    if (unsavedJournal) {
      setCurrentJournal(unsavedJournal);
      moveToDetail();
      return;
    }
    const journal = { ...DEFAULT_JOURNAL_STATE, id: crypto.randomUUID() } as Journal;
    setUnsavedJournal(journal);
    setCurrentJournal(journal);
    moveToDetail();
  };

  const grouped = useMemo(() => groupByMonth(allJournals), [allJournals]);

  const isEmpty = allJournals.length === 0;

  return {
    journals: allJournals,
    isLoading,
    isEmpty,
    currentJournal,
    grouped,
    handleJournalClick,
    removeJournal,
    editJournal,
    newJournal,
  };
}
