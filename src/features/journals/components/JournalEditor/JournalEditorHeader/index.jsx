import React from "react";
import { Dot } from "lucide-react";
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
      <div className="flex flex-col items-start gap-y-1 md:flex-row md:flex-wrap md:items-center md:gap-x-1 md:gap-y-2">
        <DatePicker
          defaultDate={journalDate}
          onDateChange={handleJournalDateChange}
          format={DATEPICKER_DATE_FORMAT}
          iconClassName="size-3.5"
          triggerClassName={cn(
            "!p-0 flex border-none !h-auto bg-transparent hover:bg-transparent hover:!text-secondary-foreground focus:!text-secondary-foreground",
            JOURNAL_META_ROW_TEXT_CLASS,
          )}
        />
        {showSaveStatus ? (
          <>
            <Dot
              className="hidden shrink-0 size-4 text-muted-foreground md:block"
              aria-hidden
            />
            <SavingStatus status={saveStatus} updatedAt={lastSavedAt} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default JournalEditorHeader;
