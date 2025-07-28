import React, { useState } from "react";
import styles from "./style.module.css";

const WORD_LIMIT = 150;

const JournalCard = ({ title = "Journal Title", content = "" }) => {
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
      <div className={`card__header`}>{title}</div>
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
    </div>
  );
};

export default JournalCard;
