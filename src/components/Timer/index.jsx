import React from "react";
import styles from "./style.module.css";
import PlayIcon from "@/assets/icons/play.svg?react";
import NextIcon from "@/assets/icons/next.svg?react";
import ResetIcon from "@/assets/icons/reset.svg?react";
import Tabs from "@/components/Tabs";
import ClockIcon from "@/assets/icons/clock.svg?react";
import CupIcon from "@/assets/icons/cup.svg?react";

const Timer = () => {
  return (
    <div className={`card`}>
      <div className="card__body">
        <Tabs defaultTab="ongoing">
          <Tabs.Tab
            label={
              <>
                <span className="btn__icon">
                  <ClockIcon />
                </span>
                <span>Ongoing</span>
              </>
            }
            tabKey="ongoing"
            key="ongoing"
          >
            <div className={styles.timer__display}>
              <div className={styles.timer__value}>25:00</div>
              <div className={styles.timer__progressBar}></div>
            </div>
          </Tabs.Tab>
          <Tabs.Tab
            label={
              <>
                <span>Break</span>
                <span className="btn__icon">
                  <CupIcon />
                </span>
              </>
            }
            tabKey="break"
            key="break"
          >
            <div className={styles.timer__display}>
              <div className={styles.timer__value}>05:00</div>
              <div className={styles.timer__progressBar}></div>
            </div>
          </Tabs.Tab>
        </Tabs>
        <div className={styles.currentTask}>
          <span className={styles.currentTask__category}>Reading</span>
          <span className={styles.currentTask__currentSession}>Session 1</span>
          <span className={styles.currentTask__name}>
            Implementing a new feature
          </span>
        </div>
        <div className="card__footer">
          <div className={styles.timerControls}>
            <button className={`btn ${styles.timerControls__item}`}>
              <ResetIcon />
            </button>
            <button className={`btn  ${styles["timerControls__item--play"]}`}>
              <span className="btn__icon">
                <PlayIcon />
              </span>
              <span className="btn__label">Start</span>
            </button>
            <button className={`btn ${styles.timerControls__item}`}>
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
