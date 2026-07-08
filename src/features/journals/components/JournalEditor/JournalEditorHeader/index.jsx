import React from "react";
import {
  DATEPICKER_DATE_FORMAT,
  JOURNAL_DAY_TITLE_PLACEHOLDER,
  JOURNAL_META_ROW_TEXT_CLASS,
} from "@/features/journals/constants";
import { cn } from "@/shared/lib/utils";
import SavingStatus from "@/features/journals/components/SavingStatus";
import { BackButton, DatePicker } from "@/shared/ui";

const JournalEditorHeader = ({
  journal,
  journalDate,
  journalTitle,
  handleTitleChange,
  handleJournalDateChange,
  showSaveStatus,
  saveStatus,
  lastSavedAt,
}) => {
  return (
    <div className="relative py-6 sticky top-0 bg-background z-40">
      <BackButton to="/dashboard/journals" className="absolute -left-20" />
      <label className="sr-only" htmlFor={`journal-day-title-${journal.id}`}>
        Journal title
      </label>
      <input
        id={`journal-day-title-${journal.id}`}
        type="text"
        value={journalTitle}
        onChange={handleTitleChange}
        placeholder={JOURNAL_DAY_TITLE_PLACEHOLDER}
        className="heading-4 border-none outline-none w-full"
        autoComplete="off"
        maxLength={100}
      />
      <div className="flex flex-col items-start gap-y-1 md:flex-row md:flex-wrap md:items-center md:gap-x-4 md:gap-y-2">
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
              className="hidden shrink-0 text-base text-muted-foreground md:block"
              aria-hidden
            >
              ·
            </span>
            <SavingStatus status={saveStatus} updatedAt={lastSavedAt} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default JournalEditorHeader;
