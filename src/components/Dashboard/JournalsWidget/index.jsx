import React from "react";
import styles from "./style.module.css";
import widgetStyles from "../styles.module.css";

const JournalsWidget = () => {
  return (
    <div className={`card ${styles.journalsWidget}`}>
      <div className={`card__header ${styles.journalsWidgetHeader}`}>
        <span>Journals</span>
        <span className={widgetStyles.tag}>🔥 10 Days Streak</span>
      </div>

      <div className={`card__body ${styles.journalsWidgetBody}`}>
        <div className={styles.journalItem}>
          <div className={styles.journalItemHeader}>
            <span className={styles.journalItemHeader__title}>
              Self reflections from yesterday • Aug 17 • Happy 😊
            </span>
            <span className={`${styles.journalItemHeader__tags}`}>
              <span className={styles.journalItemHeader__tag}>#Gratitude</span>
              <span className={styles.journalItemHeader__tag}>
                #SelfReflection
              </span>
              <span className={styles.journalItemHeader__tag}>
                #DailyJournal
              </span>
            </span>
          </div>
          <div className={styles.journalItemContent}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet Lorem
            ipsum dolor sit amet consect
          </div>
        </div>
        <div className={styles.addNewJournal}>
          <span> How are you feeling today?</span>
          <button className={`btn ${styles.addNewJournal__btn}`}>
            Write Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalsWidget;
