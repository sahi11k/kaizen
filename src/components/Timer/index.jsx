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
    <div className={`card ${styles.timer}`}>
      <div className="card__body">
        <Tabs defaultTab="ongoing">
          <Tabs.Tab
            label={
              <>
                <span>
                  <ClockIcon />
                </span>
                <span>Ongoing</span>
              </>
            }
            tabKey="ongoing"
            key="ongoing"
          >
            <div className="timer">
              <div className="timer__value">25:00</div>
              <div className="timer__progress-bar"></div>
            </div>
          </Tabs.Tab>
          <Tabs.Tab
            label={
              <>
                <span>Break</span>
                <span>
                  <CupIcon />
                </span>
              </>
            }
            tabKey="break"
            key="break"
          >
            <div className="timer">
              <div className="timer__value">05:00</div>
              <div className="timer__progress-bar"></div>
            </div>
          </Tabs.Tab>
        </Tabs>
        <div className="current-task">
          <span className="current-task__category">Coding</span>
          <span className="current-task__current-session">Session 1</span>
          <span className="current-task__name">Implementing a new feature</span>
        </div>
        <div className="card__footer">
          <div className="timer-controls">
            <button
              className="btn btn--icon timer-controls__item"
              data-action="reset"
            >
              <ResetIcon />
            </button>
            <button className="btn timer-controls__item" data-action="start">
              <span className="btn__icon">
                <PlayIcon />
              </span>
              <span className="btn__label">Start</span>
            </button>
            <button
              className="btn btn--icon timer-controls__item"
              data-action="next"
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
