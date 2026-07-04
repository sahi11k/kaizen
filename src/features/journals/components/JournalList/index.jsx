import React from "react";
import JournalListItem from "./ListItem";
import useJournalList from "@/features/journals/hooks/useJournalList";
import { SquarePen } from "lucide-react";
import {
  Button,
  FloatingButton,
  EmptyState,
  EmptyStateAction,
  Skeleton,
  Tooltip,
} from "@/shared/ui";

const JournalList = ({
  showHeader,
  headerTitle = "Journals",
  headerButtonLabel = "New",
  headerButtonIcon = <SquarePen className="size-4" />,
}) => {
  const headerStickyTop = "top-3 md:top-5";
  const sectionHeaderStickyTop = showHeader
    ? "top-[6.25rem] md:top-[7.25rem]"
    : "top-0";

  const {
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isEmpty,
    grouped,
    fetchNextPage,
    removeJournal,
    editJournal,
    newJournal,
  } = useJournalList();

  const sections = grouped.map(({ key, label, items }) => ({
    key,
    label,
    content: items.map((journal) => (
      <JournalListItem
        key={journal.id}
        journal={journal}
        onRemove={(e) => {
          e.stopPropagation();
          removeJournal(journal.id);
        }}
        onEdit={(e) => {
          e.stopPropagation();
          editJournal(journal);
        }}
      />
    )),
  }));

  return (
    <>
      {showHeader && (
        <div
          className={`sticky ${headerStickyTop} z-40 bg-background before:absolute before:inset-x-0 before:bottom-full before:h-3 before:bg-background md:before:h-5`}
        >
          <div className="mx-4 flex shrink-0 items-center justify-between pb-4 md:mx-6 md:pb-5">
            <div>
              <h1 className="heading-2">{headerTitle}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Browse and continue your reflections.
              </p>
            </div>
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
          </div>
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-visible">
        {isLoading && isEmpty && (
          <div className="mx-4 mt-5 flex flex-col gap-5 md:mx-6 md:gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-36 w-full rounded-lg bg-card"
              />
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
          />
        )}

        {!isEmpty && (
          <div className="pb-24 md:pb-8">
            {sections.map(({ key, label, content }) => (
              <section key={key} className="mb-6 last:mb-0">
                <div
                  className={`sticky ${sectionHeaderStickyTop} z-20 bg-background before:absolute before:inset-x-0 before:bottom-full before:h-3 before:bg-background md:before:h-5`}
                >
                  <div className="mx-4 pb-2 md:mx-6">
                    <h4 className="label-overline mb-2">{label}</h4>
                  </div>
                </div>
                <ul
                  className="mx-4 mt-1 flex flex-col gap-4 md:mx-6"
                  role="listbox"
                >
                  {content}
                </ul>
              </section>
            ))}
            {hasNextPage && (
              <div className="mx-4 mt-8 flex justify-center md:mx-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border bg-muted text-foreground hover:bg-muted/80 hover:text-foreground"
                  loading={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                >
                  Load more
                </Button>
              </div>
            )}
          </div>
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

export default JournalList;
