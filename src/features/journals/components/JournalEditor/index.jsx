import React from "react";
import useJournalsStore from "@/features/journals/store";
import EmptyJournal from "../EmptyJournal";
import {
  DATEPICKER_DATE_FORMAT,
  DEFAULT_JOURNAL_STATE,
  JOURNAL_DAY_TITLE_PLACEHOLDER,
  JOURNAL_EDITOR_BODY_PLACEHOLDER,
} from "@/features/journals/constants";
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
    <div className="flex h-full min-w-0 flex-1 flex-col">
      <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col gap-0 overflow-y-auto py-4">
        <div className="px-8 pt-2 pb-[calc(0.75rem+1rem)] max-[480px]:pb-[calc(0.75rem+0.75rem)] lg:px-16">
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
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <DatePicker
              defaultDate={journalDate}
              onDateChange={handleJournalDateChange}
              format={DATEPICKER_DATE_FORMAT}
              showIcon={false}
              tooltip="Click to edit"
              tooltipContentClassName="block"
              triggerClassName="h-auto min-h-0 border-0 bg-transparent p-0 text-xs font-medium leading-snug text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground/80 focus-visible:ring-0 focus-visible:ring-offset-0 md:h-auto md:p-0 md:px-0 md:py-0 md:text-sm lg:h-auto lg:p-0 lg:px-0 lg:py-0 lg:text-sm"
            />
            {showSaveStatus ? (
              <>
                <span
                  className="h-3 w-px shrink-0 self-center bg-border"
                  aria-hidden
                />
                <SavingStatus status={saveStatus} updatedAt={lastSavedAt} />
              </>
            ) : null}
          </div>
        </div>
        <div className="flex w-full min-w-0 flex-col pt-0">
          <TipTapEditor
            key={currentJournal.id}
            journalId={currentJournal.id}
            initialContent={journalParts.bodyForEditor}
            onPersistentUpdate={handleEditorUpdate}
            showThemeToggle={false}
            bodyPlaceholder={JOURNAL_EDITOR_BODY_PLACEHOLDER}
          />
        </div>
      </div>
    </div>
  );
};

export default JournalEditor;
