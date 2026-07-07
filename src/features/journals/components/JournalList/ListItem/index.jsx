import React from "react";
import { Link } from "react-router";
import { formatDate } from "@/shared/lib/date";
import { JOURNAL_DEFAULT_BACKEND_TITLE } from "@/features/journals/constants";
import { getJournalPlainText } from "@/features/journals/utils";

const base = "surface-card rounded-lg p-6 !pt-4 hover:bg-muted";

const JournalListItem = ({ journal }) => {
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
    <Link to={`/dashboard/journals/${id}`}>
      <li className={base}>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="min-w-0">
            <div className="mb-2 flex justify-between items-center gap-2">
              <span className="text-label">
                {formatDate(date, "ddd, MMM D")}
              </span>
              <span className="body-description">{wordsLabel}</span>
            </div>
            <h6 className="truncate">{primaryLine}</h6>
            {preview ? (
              <p className="body-base !text-sm mt-1 line-clamp-3">{preview}</p>
            ) : null}
          </div>
        </div>
      </li>
    </Link>
  );
};

export default JournalListItem;
