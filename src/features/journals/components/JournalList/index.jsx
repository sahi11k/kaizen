import React from "react";
import JournalListItem from "./ListItem";
import JournalListSkeleton from "./JournalListSkeleton";
import useJournalList from "@/features/journals/hooks/useJournalList";
import { Plus } from "lucide-react";
import {
  Button,
  EmptyState,
  EmptyStateAction,
  PageHeader,
} from "@/shared/ui";

const JournalList = ({
  showHeader,
  headerTitle = "Journals",
  headerButtonLabel = "New",
  headerButtonIcon = <Plus className="size-4" />,
}) => {
  const {
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isEmpty,
    grouped,
    fetchNextPage,
    newJournal,
    removeJournal,
  } = useJournalList();

  const sections = grouped.map(({ key, label, items }) => ({
    key,
    label,
    content: items.map((journal) => (
      <JournalListItem
        key={journal.id}
        journal={journal}
        onDelete={removeJournal}
      />
    )),
  }));

  return (
    <>
      {showHeader && (
        <PageHeader
          title={headerTitle}
          subtitle="Browse and continue your reflections."
          action={
            <Button
              icon={headerButtonIcon}
              onClick={newJournal}
              size="sm"
            >
              {headerButtonLabel}
            </Button>
          }
        />
      )}

      {isLoading && isEmpty && <JournalListSkeleton />}

      {isEmpty && !isLoading && (
        <EmptyState
          title="No entries"
          description="Your journal is empty. Start writing when you're ready."
          action={
            <EmptyStateAction onClick={newJournal} className="gap-1.5">
              <Plus className="size-4" />
              New
            </EmptyStateAction>
          }
          className="flex-1 flex items-center justify-center"
        />
      )}

      {!isEmpty && (
        <div className="flex flex-col gap-6 pb-6">
          {sections.map(({ key, label, content }) => (
            <section key={key} aria-label={label}>
              <h4 className="sticky top-[6.5rem] max-[425px]:top-[8rem] md:top-[7rem] xl:top-[7.5rem] z-20 bg-background text-label !text-primary py-2 mb-1">
                {label}
              </h4>
              <ul className="flex flex-col gap-3">{content}</ul>
            </section>
          ))}
          {hasNextPage && (
            <div className="text-center">
              <Button
                variant="secondary"
                loading={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default JournalList;
