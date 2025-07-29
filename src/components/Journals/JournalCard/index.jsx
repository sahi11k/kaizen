import React, { useState } from "react";
import styles from "./style.module.css";
import { formatDate } from "@/utils/utils";
import EditIcon from "@/assets/icons/edit.svg?react";
import DeleteIcon from "@/assets/icons/delete.svg?react";

const WORD_LIMIT = 150;

const JournalCard = ({ journal }) => {
  const { title, date } = journal;
  const [isExpanded, setIsExpanded] = useState(false);

  let content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur assumenda, necessitatibus facere quas similique libero recusandae, quos quasi, eveniet unde deserunt? Quia blanditiis vitae nulla temporibus. Error rerum fugit odio.
      Deleniti iure cum temporibus dicta! Dolorem, ratione perferendis possimus cupiditate rem id provident! Distinctio consequatur ratione eos quae quo pariatur dolor, labore vitae, iusto cupiditate at, fugit neque nemo illo.
      Assumenda veniam nisi praesentium quidem ipsa minus ut repellendus rerum explicabo. Dolore blanditiis rem, ad expedita architecto illo soluta ab officia sunt excepturi eaque magnam sapiente molestias tenetur voluptatem quibusdam?
      Nesciunt voluptatem nihil quibusdam, similique quasi, quae natus cum minima, sint temporibus laborum sed hic? Ipsam corrupti, consequuntur neque, fugiat enim iure maxime eligendi nulla ratione odio, illo adipisci. Nemo.
      Culpa commodi reprehenderit porro, in dolore nihil optio eaque, nemo corporis veritatis sed nobis perspiciatis tempore, unde ex voluptates eum? Unde atque quasi molestiae veritatis tempora officiis, maxime quae qui.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.";
`;

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
          <button className={`btn ${styles.actionItem__edit}`}>Edit</button>
          <button className={`btn ${styles.actionItem__delete}`}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
