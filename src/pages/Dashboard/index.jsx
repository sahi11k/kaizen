import React from "react";
import styles from "./style.module.css";
import HeaderWidget from "@/components/Dashboard/HeaderWidget";
import PomodoroWidget from "@/components/Dashboard/PomodoroWidget";
import JournalsWidget from "@/components/Dashboard/JournalsWidget";
import DailyStreaksWidget from "@/components/Dashboard/DailyStreaksWidget";
import ProgressChartWidget from "@/components/Dashboard/ProgressChartWidget";
import DailyProgressWidget from "@/components/Dashboard/DailyProgressWidget";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <section className={styles.headerSection}>
        <HeaderWidget />
      </section>
      <section className={styles.progressChartSection}>
        <ProgressChartWidget />
      </section>
      <section className={styles.pomodoroSection}>
        <PomodoroWidget />
      </section>
      <section className={styles.dailyStreaksSection}>
        <DailyStreaksWidget />
      </section>
      <section className={styles.dailyProgressSection}>
        <DailyProgressWidget />
      </section>
      <section className={styles.journalsSection}>
        <JournalsWidget />
      </section>
    </div>
  );
};

export default Dashboard;
