import React from "react";
import { Link } from "react-router";
import { formatDate } from "@/shared/lib/date";
import { JOURNAL_DEFAULT_BACKEND_TITLE } from "@/features/journals/constants";
import { getJournalPlainText } from "@/features/journals/utils";
import { MoreOptions } from "@/shared/ui";

const base =
  "surface-card group relative flex items-stretch gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-muted md:gap-5 md:px-5 md:py-4";

const JournalListItem = ({ journal, onRemove, onEdit }) => {
  const { id, title, date, content, wordCount } = journal;
  const preview = getJournalPlainText(content);
  const legacyTitle = title?.trim?.() ? String(title).trim() : "";
  const displayTitle =
    legacyTitle && legacyTitle !== JOURNAL_DEFAULT_BACKEND_TITLE
      ? legacyTitle
      : "";
  const primaryLine = displayTitle || JOURNAL_DEFAULT_BACKEND_TITLE;
  const wordCountValue = Number(wordCount) || 0;
  const wordsLabel = `${wordCountValue} ${wordCountValue === 1 ? "word" : "words"}`;

  return (
    <li className={base}>
      <Link
        to={`/dashboard/journals/${id}`}
        className="absolute inset-0 rounded-lg"
        aria-label={`Open journal: ${primaryLine}`}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <div className="label-overline flex items-center gap-2 !text-[11px] text-muted-foreground">
              <span>{formatDate(date, "ddd, MMM D")}</span>
              <span aria-hidden="true">·</span>
              <span className="normal-case">{wordsLabel}</span>
            </div>
            <MoreOptions
              align="end"
              triggerClassName="relative z-10 !p-0 w-0 overflow-hidden opacity-0 group-hover:w-8 group-hover:opacity-100 data-[state=open]:w-8 data-[state=open]:opacity-100 hover:!bg-transparent hover:text-primary !h-8 shrink-0"
              items={[
                { label: "Edit", onClick: onEdit },
                {
                  label: "Delete",
                  onClick: onRemove,
                  className: "hover:!bg-destructive/10 !text-destructive",
                },
              ]}
            />
          </div>
          <div className="truncate text-base font-medium font-sans leading-snug">
            {primaryLine}
          </div>
          {preview ? (
            <div className="mt-1 mb-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground md:text-sm">
              {preview}
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default JournalListItem;
