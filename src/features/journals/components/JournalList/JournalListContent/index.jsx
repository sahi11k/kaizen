import React, { useMemo } from "react";
import JournalListItem from "@/features/journals/components/JournalListItem";
import useJournalsStore from "@/features/journals/store";
import { useAuthStore } from "@/features/auth";
import { FileText, SquarePen } from "lucide-react";
import { EmptyState } from "@/shared/ui/empty-state";
import { FloatingButton } from "@/shared/ui/floating-button";
import { Skeleton } from "@/shared/ui/skeleton";
import Button from "@/shared/ui/button";
import { Tooltip } from "@/shared/ui/tooltip";
import { useShallow } from "zustand/react/shallow";
import { Toast } from "@/shared/ui/toast";
import { DEFAULT_JOURNAL_STATE } from "@/features/journals/constants";
import { groupByMonth } from "@/features/journals/utils";
import { useJournalsQuery } from "@/features/journals/queries";
import { useDeleteJournalMutation } from "@/features/journals/mutations";

const { toast } = Toast;

const JournalListContent = ({ onItemClick }) => {
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

  const handleJournalClick = (journal) => {
    if (currentJournal?.id === journal.id) return;
    setCurrentJournal(journal);
    moveToDetail();
  };

  const removeJournal = (journalId) => {
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
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const editJournal = (journal) => {
    setCurrentJournal(journal);
    moveToDetail();
  };

  const newJournal = () => {
    if (unsavedJournal) {
      setCurrentJournal(unsavedJournal);
      moveToDetail();
      return;
    }
    const journal = { ...DEFAULT_JOURNAL_STATE, id: crypto.randomUUID() };
    setUnsavedJournal(journal);
    setCurrentJournal(journal);
    moveToDetail();
  };

  const grouped = useMemo(() => groupByMonth(allJournals), [allJournals]);

  return (
    <>
      <div className="mt-4 xl:mt-6 pb-2 xl:pb-4 flex items-center justify-between hidden md:flex">
        <div>
          <span className="heading-3 mr-1">Journals</span>
        </div>
        <Tooltip content="New Journal">
          <Button
            icon={<SquarePen className="size-4" />}
            size="sm"
            onClick={newJournal}
          >
            New
          </Button>
        </Tooltip>
      </div>
      <div className="h-full overflow-y-auto scrollbar-thin  md:-mx-4 xl:-mx-6">
        <div className="">
          {grouped.map(({ key, label, items }) => (
            <section key={key} className="mb-2">
              <div className="sticky top-0 z-10 px-4 py-2 bg-muted">
                <h4 className="px-0 xl:px-2 text-xs font-semibold text-muted-foreground">
                  {label}
                </h4>
              </div>
              <ul className="mt-2 space-y-2 mx-2 xl:mx-4" role="listbox">
                {items.map((journal) => (
                  <JournalListItem
                    key={journal.id}
                    journal={journal}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJournalClick(journal);
                    }}
                    isActive={currentJournal?.id === journal.id}
                    onRemove={(e) => {
                      e.stopPropagation();
                      removeJournal(journal.id);
                    }}
                    onEdit={(e) => {
                      e.stopPropagation();
                      editJournal(journal);
                    }}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="mx-2 md:mx-4 xl:mx-6">
          {isLoading &&
            allJournals.length === 0 &&
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-16 w-full bg-card mb-2 rounded-lg"
              />
            ))}
        </div>
        {allJournals.length === 0 && !isLoading && (
          <EmptyState
            icon={<FileText className="size-8" />}
            title="No Journals"
            description="Write a journal to get started."
          />
        )}
      </div>

      <FloatingButton
        onClick={newJournal}
        icon={<SquarePen className="size-4" color="currentColor" />}
        className="md:hidden"
        label="New"
      />
    </>
  );
};

export default JournalListContent;
