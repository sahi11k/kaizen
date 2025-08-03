import React from "react";
import styles from "./style.module.css";

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.about__header}>
        <h2 className={styles.about__title}>Everything You Need to Grow</h2>
        <p className={styles.about__description}>
          Powerful tools designed to support your personal development journey
        </p>
      </div>
      <div className={styles.about__cards}>
        <div className={`card ${styles.about__card}`}>
          <h4 className={styles.about__card__title}>Pomodoro</h4>
          <p className={styles.about__card__description}>
            Boost your focus with proven time management techniques. Work in
            focused sprints with built-in breaks.
          </p>
        </div>
        <div className={`card ${styles.about__card}`}>
          <h4 className={styles.about__card__title}>Journals</h4>
          <p className={styles.about__card__description}>
            Reflect on your progress with guided journaling prompts and daily
            reflections to track your growth.
          </p>
        </div>
        <div className={`card ${styles.about__card}`}>
          <h4 className={styles.about__card__title}>Day Planner</h4>
          <p className={styles.about__card__description}>
            Organize your goals and tasks with an intuitive planner that helps
            you stay on track every day.
          </p>
        </div>
        <div className={`card ${styles.about__card}`}>
          <h4 className={styles.about__card__title}>Analytics</h4>
          <p className={styles.about__card__description}>
            Visualize your progress with detailed insights and metrics that show
            your improvement over time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
