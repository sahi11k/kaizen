import React from "react";
import JournalListItem from "./ListItem";
import JournalListSkeleton from "./JournalListSkeleton";
import useJournalList from "@/features/journals/hooks/useJournalList";
import { SquarePen } from "lucide-react";
import {
  Button,
  FloatingButton,
  EmptyState,
  EmptyStateAction,
  PageHeader,
} from "@/shared/ui";

const JournalList = ({
  showHeader,
  headerTitle = "Journals",
  headerButtonLabel = "New",
  headerButtonIcon = <SquarePen className="size-4" />,
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
              className="hidden sm:inline-flex"
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
            <EmptyStateAction onClick={newJournal}>
              New Journal
            </EmptyStateAction>
          }
          className="flex-1 flex items-center justify-center"
        />
      )}

      {!isEmpty && (
        <div className="flex flex-col gap-6 pb-6">
          {sections.map(({ key, label, content }) => (
            <ul key={key} className="flex flex-col gap-3" role="listbox">
              <h4 className="sticky top-[7.5rem] z-20 bg-background text-label py-2">
                {label}
              </h4>
              {content}
            </ul>
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

      <FloatingButton
        onClick={newJournal}
        icon={<SquarePen className="size-4" color="currentColor" />}
        className="md:hidden"
        label="New"
      />
    </>
  );
};

export default JournalList;
