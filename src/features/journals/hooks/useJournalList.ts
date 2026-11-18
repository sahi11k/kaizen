import { useMemo } from "react";
import useJournalsStore from "@/features/journals/store";
import { useAuthStore } from "@/features/auth";
import { useShallow } from "zustand/react/shallow";
import { DEFAULT_JOURNAL_STATE } from "@/features/journals/constants";
import { groupByMonth } from "@/features/journals/utils";
import { useInfiniteJournalsQuery } from "@/features/journals/queries";
import { useDeleteJournalMutation } from "@/features/journals/mutations";
import { Journal } from "@/features/journals/types";
import { Toast } from "@/shared/ui";
import { useNavigate } from "react-router";

const { toast } = Toast;

const JOURNALS_ROUTE = "/dashboard/journals";

export default function useJournalList() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteJournalsQuery(user.id);
  const deleteJournalMutation = useDeleteJournalMutation();

  const { unsavedJournal, setUnsavedJournal } = useJournalsStore(
    useShallow((state) => ({
      unsavedJournal: state.unsavedJournal,
      setUnsavedJournal: state.setUnsavedJournal,
    })),
  );

  const handleJournalClick = (journal: unknown) => {
    const selectedJournal = journal as Journal;
    navigate(`${JOURNALS_ROUTE}/${selectedJournal.id}`);
  };

  const removeJournal = (journalId: string) => {
    if (unsavedJournal?.id === journalId) {
      setUnsavedJournal(null);
      toast.success("Journal deleted successfully");
      return;
    }

    deleteJournalMutation.mutate(
      { journalId, userId: user.id },
      {
        onSuccess: () => {
          toast.success("Journal deleted successfully");
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const newJournal = () => {
    if (unsavedJournal) {
      navigate(`${JOURNALS_ROUTE}/new`);
      return;
    }
    const journal = {
      ...DEFAULT_JOURNAL_STATE,
      id: crypto.randomUUID(),
    } as Journal;
    setUnsavedJournal(journal);
    navigate(`${JOURNALS_ROUTE}/new`);
  };

  const journals = useMemo(
    () => data?.pages.flatMap((page) => page.journals) ?? [],
    [data],
  );

  const grouped = useMemo(() => groupByMonth(journals), [journals]);

  const isEmpty = journals.length === 0;

  return {
    journals,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isEmpty,
    grouped,
    fetchNextPage,
    handleJournalClick,
    removeJournal,
    newJournal,
  };
}
