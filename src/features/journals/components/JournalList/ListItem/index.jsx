import React from "react";
import { Link } from "react-router";
import { Trash2, Dot } from "lucide-react";
import { formatDate } from "@/shared/lib/date";
import { JOURNAL_DEFAULT_BACKEND_TITLE } from "@/features/journals/constants";
import { getJournalPlainText } from "@/features/journals/utils";
import { Button } from "@/shared/ui";

const base = "surface-card relative group rounded-lg p-6 !pt-4 hover:bg-muted";
const TITLE_SNIPPET_LENGTH = 60;

const JournalListItem = ({ journal, onDelete }) => {
  const { id, title, date, content, wordCount } = journal;
  const preview = getJournalPlainText(content);
  const legacyTitle = title?.trim?.() ? String(title).trim() : "";
  const displayTitle =
    legacyTitle && legacyTitle !== JOURNAL_DEFAULT_BACKEND_TITLE
      ? legacyTitle
      : "";
  const titleFromContent = preview
    ? preview.slice(0, TITLE_SNIPPET_LENGTH).trim() +
      (preview.length > TITLE_SNIPPET_LENGTH ? "…" : "")
    : "";
  const primaryLine =
    displayTitle || titleFromContent || JOURNAL_DEFAULT_BACKEND_TITLE;
  const wordCountValue = Number(wordCount) || 0;
  const wordsLabel = `${wordCountValue} ${wordCountValue === 1 ? "word" : "words"}`;

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(id);
  };

  return (
    <Link to={`/dashboard/journals/${id}`}>
      <li className={base}>
        <Button
          variant="icon"
          size="sm"
          className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
          icon={<Trash2 className="size-4" />}
          onClick={handleDelete}
          aria-label="Delete journal"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-1">
              <span className="text-label">
                {formatDate(date, "ddd, MMM D")}
              </span>
              <Dot className="-mx-1 size-4 text-label" aria-hidden />
              <span className="body-description !text-xs">{wordsLabel}</span>
            </div>
            <h6 className="truncate">{primaryLine}</h6>
            {preview ? (
              <p className="body-base !text-sm mt-1 line-clamp-2">{preview}</p>
            ) : null}
          </div>
        </div>
      </li>
    </Link>
  );
};

export default JournalListItem;
