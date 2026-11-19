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
import useIsMobile from "@/shared/hooks/useIsMobile";

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
  const isMobile = useIsMobile();
  return (
    <div className="sticky top-0 z-30 -mx-6 bg-background px-6 h-25 sm:h-30 flex flex-col justify-center xl:-mx-12 xl:px-12">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="shrink-0">
          <BackButton
            to="/dashboard/journals"
            className="!size-8 md:!size-10 xl:!size-11 [&_svg]:size-4 md:[&_svg]:size-5"
          />
        </div>
        <label className="sr-only" htmlFor={`journal-day-title-${journal.id}`}>
          Journal title
        </label>
        <input
          id={`journal-day-title-${journal.id}`}
          type="text"
          value={journalTitle}
          onChange={handleTitleChange}
          placeholder={JOURNAL_DAY_TITLE_PLACEHOLDER}
          className="heading-4 min-w-0 flex-1 border-none bg-background outline-none"
          autoComplete="off"
          maxLength={100}
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-1 gap-y-1">
        <DatePicker
          defaultDate={journalDate}
          onDateChange={handleJournalDateChange}
          format={isMobile ? "MMM D, YYYY" : DATEPICKER_DATE_FORMAT}
          iconClassName="size-3.5"
          triggerClassName={cn(
            "!p-0 flex border-none !h-auto bg-transparent hover:bg-transparent hover:!text-secondary-foreground focus:!text-secondary-foreground",
            JOURNAL_META_ROW_TEXT_CLASS,
          )}
        />
        {showSaveStatus ? (
          <>
            <Dot
              className="shrink-0 size-4 text-muted-foreground"
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
