import React from "react";
import JournalListItem from "./ListItem";
import useJournalList from "@/features/journals/hooks/useJournalList";
import { SquarePen } from "lucide-react";
import EmptyJournalIllustration from "@/assets/illustrations/empty-journal.svg?react";
import {
  Button,
  FloatingButton,
  EmptyState,
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
    ? "top-[5.25rem] md:top-[6.25rem]"
    : "top-0";

  const {
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    isEmpty,
    grouped,
    fetchNextPage,
    handleJournalClick,
    removeJournal,
    editJournal,
    newJournal,
  } = useJournalList();

  const sections = grouped.map(({ key, label, items }) => ({
    key,
    label,
    content: items.map((journal, index) => (
      <JournalListItem
        key={journal.id}
        journal={journal}
        isFirstInSection={index === 0}
        onClick={(e) => {
          e.stopPropagation();
          handleJournalClick(journal);
        }}
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
          className={`sticky ${headerStickyTop} z-30 bg-background before:absolute before:inset-x-0 before:bottom-full before:h-3 before:bg-background md:before:h-5`}
        >
          <div className="mx-4 flex shrink-0 items-center justify-between pb-4 md:mx-6 md:pb-5">
            <div>
              <h1 className="text-2xl font-semibold leading-tight text-foreground md:text-3xl">
                {headerTitle}
              </h1>
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
            icon={
              <div className="w-72 md:w-96">
                <EmptyJournalIllustration />
              </div>
            }
            title="No journals yet"
            description="Write a journal to get started."
            action={
              <Button
                icon={headerButtonIcon}
                onClick={newJournal}
                className="mt-2"
                size="sm"
              >
                {headerButtonLabel}
              </Button>
            }
          />
        )}

        {!isEmpty && (
          <div className="pt-3 pb-24 md:pt-4 md:pb-8">
            {sections.map(({ key, label, content }) => (
              <section key={key} className="mb-7 last:mb-0 md:mb-9">
                <div className={`sticky ${sectionHeaderStickyTop} z-20`}>
                  <div className="mx-4 rounded-t-lg bg-muted px-4 py-3 md:mx-6 md:px-6">
                    <h4 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                      {label}
                    </h4>
                  </div>
                </div>
                <ul
                  className="mx-4 flex flex-col gap-5 md:mx-6 md:gap-6"
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
