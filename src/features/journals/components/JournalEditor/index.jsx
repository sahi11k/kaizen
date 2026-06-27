import React from "react";
import { ArrowLeft } from "lucide-react";
import {
  DATEPICKER_DATE_FORMAT,
  JOURNAL_DAY_TITLE_PLACEHOLDER,
  JOURNAL_EDITOR_BODY_PLACEHOLDER,
  JOURNAL_META_ROW_TEXT_CLASS,
} from "@/features/journals/constants";
import { cn } from "@/shared/lib/utils";
import SavingStatus from "@/features/journals/components/SavingStatus";
import { TipTapEditor } from "@/shared/ui/tiptap-editor";
import { Button, DatePicker } from "@/shared/ui";
import { useJournalPersistence } from "@/features/journals/hooks/use-journal-persistence";

const JournalEditor = ({ journal, onBack, onNewJournalSaved }) => {
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
  } = useJournalPersistence(journal, { onNewJournalSaved });

  return (
    <div className="flex min-w-0 w-full flex-col [--journal-toolbar-sticky-top:5.75rem] max-[480px]:[--journal-toolbar-sticky-top:6.25rem] md:[--journal-toolbar-sticky-top:6.75rem]">
      <div
        className={cn(
          "sticky top-3 z-40 shrink-0 bg-background md:top-5",
          "before:absolute before:inset-x-0 before:bottom-full before:h-3 before:bg-background md:before:h-5",
        )}
      >
        <div className="relative mx-4 pt-2 pb-3 max-[480px]:pt-1 max-[480px]:pb-3 md:mx-6 md:pt-1 md:pb-4">
          {typeof onBack === "function" ? (
            <Button
              variant="icon"
              size="sm"
              icon={<ArrowLeft className="size-4" />}
              onClick={onBack}
              aria-label="Back to journals"
              className="mb-3 size-10 items-center justify-center rounded-full border border-card-border !bg-[#262626] !text-[#a3a3a3] hover:!bg-[#262626] hover:!text-primary md:absolute md:top-1 md:left-0 md:mb-0 md:-translate-x-[calc(100%+2rem)]"
            />
          ) : null}
          <label
            className="sr-only"
            htmlFor={`journal-day-title-${journal.id}`}
          >
            Journal title
          </label>
          <input
            id={`journal-day-title-${journal.id}`}
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
      </div>
      <div className="flex min-w-0 flex-col">
        <TipTapEditor
          key={journal.id}
          journalId={journal.id}
          initialContent={journalParts.bodyForEditor}
          onPersistentUpdate={handleEditorUpdate}
          showThemeToggle={false}
          bodyPlaceholder={JOURNAL_EDITOR_BODY_PLACEHOLDER}
        />
      </div>
    </div>
  );
};

export default JournalEditor;
