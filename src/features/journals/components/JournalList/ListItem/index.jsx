import React from "react";
import { Link } from "react-router";
import { Trash2, Dot } from "lucide-react";
import { formatDate } from "@/shared/lib/date";
import { JOURNAL_DEFAULT_BACKEND_TITLE } from "@/features/journals/constants";
import { getJournalPlainText } from "@/features/journals/utils";
import { Button } from "@/shared/ui";

const base =
  "surface-card relative group rounded-lg transition-colors hover:bg-muted";
const linkBase =
  "block min-w-0 rounded-lg px-3 py-3 pr-12 md:px-4 md:py-4 md:pr-14 xl:px-6 xl:py-6 xl:pr-16";
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
    <li className={base}>
      <Link to={`/dashboard/journals/${id}`} className={linkBase}>
        <div className="mb-2 flex items-center gap-1">
          <span className="text-label">{formatDate(date, "ddd, MMM D")}</span>
          <Dot className="-mx-1 size-4 text-label" aria-hidden />
          <span className="body-description !text-xs">{wordsLabel}</span>
        </div>
        <h6 className="truncate">{primaryLine}</h6>
        {preview ? (
          <p className="body-base !text-sm mt-1 line-clamp-2">{preview}</p>
        ) : null}
      </Link>
      <Button
        variant="icon"
        size="sm"
        className="absolute right-2 top-2 md:right-3 md:top-3 xl:right-4 xl:top-4 transition-opacity hover:text-destructive lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100"
        icon={<Trash2 className="size-4" />}
        onClick={handleDelete}
        aria-label="Delete journal"
      />
    </li>
  );
};

export default JournalListItem;
