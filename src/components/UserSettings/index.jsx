import React from "react";
import styles from "./style.module.css";

const UserSettings = () => {
  return (
    <section className={`card ${styles.userSettings}`}>
      <div className={`card__header ${styles.userSettings__header}`}>
        <div className={styles.userSettings__header__title}>User Settings</div>
      </div>
    </section>
  );
};

export default UserSettings;
