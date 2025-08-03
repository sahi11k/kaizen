import React from "react";
import Settings from "@/components/Settings";
import styles from "./style.module.css";

const SettingsPage = () => {
  return (
    <div className={styles.settingsPage}>
      <Settings />
    </div>
  );
};

export default SettingsPage;
