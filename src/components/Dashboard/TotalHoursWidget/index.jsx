import React from "react";
import styles from "./style.module.css";
import CircularProgress from "@/utils/components/CircularProgress";

const TotalHoursWidget = () => {
  return (
    <div className={`card ${styles.totalHoursWidget}`}>
      <div className={`card__header ${styles.totalHoursWidgetHeader}`}>
        <span>Total Hours Spent</span>
      </div>
      <div className={`card__body ${styles.totalHoursWidgetBody}`}>
        <CircularProgress
          size={120}
          strokeWidth={20}
          percentage={75}
          color="var(--accent-secondary)"
          trackColor="var(--accent-primary)"
        >
          <div className={styles.progressText}>100H</div>
        </CircularProgress>
        <div className={styles.rank}>
          <span>Current Rank : Shinjin</span>
        </div>
      </div>
    </div>
  );
};

export default TotalHoursWidget;
