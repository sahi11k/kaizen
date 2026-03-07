import React from "react";
import JournalListItem from "./ListItem";
import useJournalList from "@/features/journals/hooks/useJournalList";
import { FileText, SquarePen } from "lucide-react";
import {
  FloatingButton,
  ListHeader,
  SectionedList,
  EmptyState,
  Skeleton,
} from "@/shared/ui";

const JournalList = ({ onItemClick, showHeader }) => {
  const {
    isLoading,
    isEmpty,
    currentJournal,
    grouped,
    handleJournalClick,
    removeJournal,
    editJournal,
    newJournal,
  } = useJournalList({ onItemClick });

  const sections = grouped.map(({ key, label, items }) => ({
    key,
    label,
    content: items.map((journal) => (
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
    )),
  }));

  return (
    <>
      {showHeader && (
        <ListHeader
          title="Journals"
          buttonProps={{
            label: "New",
            icon: <SquarePen className="size-4" />,
            tooltip: "New Journal",
            onClick: newJournal,
          }}
        />
      )}
      <div className="h-full overflow-y-auto">
        {isLoading && isEmpty && (
          <div className="m-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-16 w-full bg-card mb-2 rounded-lg"
              />
            ))}
          </div>
        )}

        {isEmpty && !isLoading && (
          <EmptyState
            icon={<FileText className="size-8" />}
            title="No Journals"
            description="Write a journal to get started."
          />
        )}

        {!isEmpty && <SectionedList sections={sections} />}
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
