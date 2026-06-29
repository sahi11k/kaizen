import React from "react";
import { getDayOfMonth, getDayOfWeek } from "@/shared/lib/date";
import { JOURNAL_DEFAULT_BACKEND_TITLE } from "@/features/journals/constants";
import { getJournalPlainText } from "@/features/journals/utils";
import { MoreOptions } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

const base =
  "group flex min-h-36 cursor-pointer items-stretch gap-4 rounded-lg border border-border bg-background p-4 transition-colors md:gap-5 md:p-5";
const hover = "hover:bg-muted";

const JournalListItem = ({
  journal,
  onClick,
  onRemove,
  onEdit,
  isFirstInSection = false,
}) => {
  const { title, date, content, wordCount } = journal;
  const preview = getJournalPlainText(content);
  const legacyTitle = title?.trim?.() ? String(title).trim() : "";
  const displayTitle =
    legacyTitle && legacyTitle !== JOURNAL_DEFAULT_BACKEND_TITLE
      ? legacyTitle
      : "";
  const primaryLine = displayTitle || JOURNAL_DEFAULT_BACKEND_TITLE;
  const wordsLabel = `${Number(wordCount) || 0} words`;

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " " || e.code === "Space") {
      e.preventDefault();
      onClick?.(e);
    }
  };

  return (
    <li
      className={cn(base, hover, isFirstInSection && "rounded-t-none")}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="option"
      tabIndex={0}
    >
      <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-full bg-secondary text-foreground md:size-16">
        <span className="font-number text-xl font-semibold leading-tight md:text-2xl">
          {getDayOfMonth(date)}
        </span>
        <span className="text-xs font-medium uppercase text-muted-foreground">
          {getDayOfWeek(date)}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="min-w-0 max-w-3xl pr-8">
          <div className="truncate text-lg font-semibold leading-snug md:text-xl">
            {primaryLine}
          </div>
          {preview ? (
            <div className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {preview}
            </div>
          ) : null}
        </div>
        <div className="mt-auto pt-4 text-xs font-medium text-muted-foreground md:text-sm">
          {wordsLabel}
        </div>
      </div>

      <MoreOptions
        align="end"
        triggerClassName="hover:!bg-transparent hover:text-primary"
        items={[
          { label: "Edit", onClick: onEdit },
          {
            label: "Delete",
            onClick: onRemove,
            className: "hover:!bg-destructive/10 !text-destructive",
          },
        ]}
      />
    </li>
  );
};

export default JournalListItem;
