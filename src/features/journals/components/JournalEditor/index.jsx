import React from "react";
import useJournalsStore from "@/features/journals/store";
import EmptyJournal from "../EmptyJournal";
import {
  DATEPICKER_DATE_FORMAT,
  DEFAULT_JOURNAL_STATE,
  JOURNAL_DAY_TITLE_PLACEHOLDER,
  JOURNAL_EDITOR_BODY_PLACEHOLDER,
  JOURNAL_META_ROW_TEXT_CLASS,
} from "@/features/journals/constants";
import { cn } from "@/shared/lib/utils";
import SavingStatus from "@/features/journals/components/SavingStatus";
import { TipTapEditor } from "@/shared/ui/tiptap-editor";
import { DatePicker } from "@/shared/ui";
import { useJournalPersistence } from "@/features/journals/hooks/use-journal-persistence";

const JournalEditor = () => {
  const {
    unsavedJournal,
    setUnsavedJournal,
    currentJournal,
    setCurrentJournal,
  } = useJournalsStore();

  const {
    journalParts,
    journalDate,
    journalTitle,
    handleEditorUpdate,
    handleTitleChange,
    handleJournalDateChange,
    showSaveStatus,
    saveStatus,
    lastSavedAt,
  } = useJournalPersistence();

  const handleNewJournalClick = () => {
    if (unsavedJournal) {
      setCurrentJournal(unsavedJournal);
      return;
    }
    const journal = { ...DEFAULT_JOURNAL_STATE, id: crypto.randomUUID() };
    setUnsavedJournal(journal);
    setCurrentJournal(journal);
  };

  if (!currentJournal) {
    return <EmptyJournal onClick={handleNewJournalClick} />;
  }

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-y-auto pt-4 pb-4 md:overflow-hidden md:pt-0 md:pb-0">
      <div
        className={cn(
          "shrink-0 bg-background md:sticky md:top-0 md:z-10",
          "px-8 pt-5 pb-2 max-[480px]:pt-4 max-[480px]:pb-2 md:pt-6 md:pb-2.5 lg:px-16",
        )}
      >
        <label className="sr-only" htmlFor={`journal-day-title-${currentJournal.id}`}>
          Journal title
        </label>
        <input
          id={`journal-day-title-${currentJournal.id}`}
          type="text"
          value={journalTitle}
          onChange={handleTitleChange}
          placeholder={JOURNAL_DAY_TITLE_PLACEHOLDER}
          className="w-full border-0 bg-transparent p-0 text-2xl font-semibold leading-tight tracking-tight text-foreground placeholder:text-muted-foreground/55 focus:outline-none focus-visible:ring-0 md:text-3xl"
          autoComplete="off"
          maxLength={200}
        />
        <div className="mt-1.5 flex flex-col items-start gap-y-1 md:flex-row md:flex-wrap md:items-center md:gap-x-4 md:gap-y-2">
          <DatePicker
            defaultDate={journalDate}
            onDateChange={handleJournalDateChange}
            format={DATEPICKER_DATE_FORMAT}
            showIcon={false}
            tooltip="Click to edit"
            tooltipContentClassName="block"
            triggerClassName={cn(
              "h-auto min-h-0 border-0 bg-transparent p-0 shadow-none hover:bg-transparent hover:text-foreground/80 focus-visible:ring-0 focus-visible:ring-offset-0 md:h-auto md:p-0 md:px-0 md:py-0 lg:h-auto lg:p-0 lg:px-0 lg:py-0",
              JOURNAL_META_ROW_TEXT_CLASS,
            )}
          />
          {showSaveStatus ? (
            <>
              <span
                className="hidden h-3 w-px shrink-0 self-center bg-border md:block"
                aria-hidden
              />
              <SavingStatus status={saveStatus} updatedAt={lastSavedAt} />
            </>
          ) : null}
        </div>
      </div>
      <TipTapEditor
        key={currentJournal.id}
        journalId={currentJournal.id}
        initialContent={journalParts.bodyForEditor}
        onPersistentUpdate={handleEditorUpdate}
        showThemeToggle={false}
        bodyPlaceholder={JOURNAL_EDITOR_BODY_PLACEHOLDER}
      />
    </div>
  );
};

export default JournalEditor;
