import React from "react";
import JournalListItem from "./ListItem";
import useJournalList from "@/features/journals/hooks/useJournalList";
import { SquarePen } from "lucide-react";
import {
  Button,
  FloatingButton,
  EmptyState,
  EmptyStateAction,
  PageHeader,
  Skeleton,
  Tooltip,
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
  } = useJournalList();

  const sections = grouped.map(({ key, label, items }) => ({
    key,
    label,
    content: items.map((journal) => (
      <JournalListItem key={journal.id} journal={journal} />
    )),
  }));

  return (
    <>
      {showHeader && (
        <PageHeader
          title={headerTitle}
          subtitle="Browse and continue your reflections."
          action={
            <Tooltip content="New Journal">
              <Button
                icon={headerButtonIcon}
                onClick={newJournal}
                className="hidden sm:inline-flex"
                size="sm"
              >
                {headerButtonLabel}
              </Button>
            </Tooltip>
          }
        />
      )}

      {isLoading && isEmpty && (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-36 w-full" />
          ))}
        </div>
      )}

      {isEmpty && !isLoading && (
        <EmptyState
          title="No entries yet."
          description="Your journal is empty. Start writing when you're ready."
          action={
            <EmptyStateAction onClick={newJournal}>
              New entry →
            </EmptyStateAction>
          }
          className="flex-1 flex items-center justify-center"
        />
      )}

      {!isEmpty && (
        <>
          {sections.map(({ key, label, content }) => (
            <section key={key} className="mb-6">
              <h4 className="text-label mb-2 pb-2 sticky top-[6.5rem] md:top-[7.5rem] bg-background">
                {label}
              </h4>
              <ul className="flex flex-col gap-6" role="listbox">
                {content}
              </ul>
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
        </>
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
