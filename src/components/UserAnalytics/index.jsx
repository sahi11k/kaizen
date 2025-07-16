import React from "react";
import styles from "./style.module.css";

const UserAnalytics = () => {
  return (
    <section className={`card ${styles.userAnalytics}`}>
      <div className={`card__header ${styles.userAnalytics__header}`}>
        <div className={styles.userAnalytics__header__title}>
          User Analytics
        </div>
      </div>
    </section>
  );
};

export default UserAnalytics;
