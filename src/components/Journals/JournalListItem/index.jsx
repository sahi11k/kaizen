import React, { useState } from "react";
import styles from "./style.module.css";
import { formatDate, getDayOfMonth, getDayOfWeek } from "@/utils/utils";

const WORD_LIMIT = 150;

const JournalListItem = ({ journal, onClick }) => {
  const { title, date, content } = journal;
  // const [isExpanded, setIsExpanded] = useState(false);

  // const truncateText = (text, wordLimit) => {
  //   const words = text.split(" ");
  //   if (words.length <= wordLimit) {
  //     return text;
  //   }
  //   return words.slice(0, wordLimit).join(" ") + "...";
  // };

  // const needsTruncation = content.split(" ").length > WORD_LIMIT;
  // const displayContent =
  //   needsTruncation && !isExpanded
  //     ? truncateText(content, WORD_LIMIT)
  //     : content;

  // const toggleExpanded = () => {
  //   setIsExpanded(!isExpanded);
  // };

  return (
    // <div className={`card`}>
    //   <div className={`card__header ${styles.journalCard__header}`}>
    //     <div className={styles.journalCard__title}>{title}</div>
    //   </div>
    //   <div className={`card__body`} style={{ minHeight: 150 }}>
    //     {displayContent}
    //     {needsTruncation && (
    //       <span>
    //         <button
    //           className={`btn ${styles.readMoreBtn}`}
    //           onClick={toggleExpanded}
    //         >
    //           {isExpanded ? " Read less" : " Read more"}
    //         </button>
    //       </span>
    //     )}
    //   </div>
    //   <div className={`card__footer ${styles.journalCard__footer}`}>
    //     <div className={styles.journalCard__date}>{formatDate(date)}</div>
    //   </div>
    // </div>
    <li
      className="flex gap-4 mb-1 px-3 py-2  hover:bg-accent rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <span className="text-2xl text-muted-foreground">
          {getDayOfMonth(date)}
        </span>
        <span className="text-xs text-muted-foreground font-medium">
          {getDayOfWeek(date)}
        </span>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="body-base font-medium">{title}</div>
        <div className="text-sm text-muted-foreground line-clamp-1">
          {content}
        </div>
      </div>
    </li>
  );
};

export default JournalListItem;
