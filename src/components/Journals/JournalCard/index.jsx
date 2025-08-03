import React, { useState } from "react";
import styles from "./style.module.css";
import { formatDate } from "@/utils/utils";

const WORD_LIMIT = 150;

const JournalCard = ({ journal, removeJournal, editJournal }) => {
  const { title, date, content } = journal;
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const needsTruncation = content.split(" ").length > WORD_LIMIT;
  const displayContent =
    needsTruncation && !isExpanded
      ? truncateText(content, WORD_LIMIT)
      : content;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`card`}>
      <div className={`card__header ${styles.journalCard__header}`}>
        <div className={styles.journalCard__title}>{title}</div>
      </div>
      <div className={`card__body`} style={{ minHeight: 150 }}>
        {displayContent}
        {needsTruncation && (
          <span>
            <button
              className={`btn ${styles.readMoreBtn}`}
              onClick={toggleExpanded}
            >
              {isExpanded ? " Read less" : " Read more"}
            </button>
          </span>
        )}
      </div>
      <div className={`card__footer ${styles.journalCard__footer}`}>
        <div className={styles.journalCard__date}>{formatDate(date)}</div>
        <div className={styles.journalCard__actions}>
          <button
            className={`btn ${styles.actionItem__edit}`}
            onClick={() => editJournal(journal)}
          >
            Edit
          </button>
          <button
            className={`btn ${styles.actionItem__delete}`}
            onClick={() => removeJournal(journal.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
