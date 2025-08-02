import React from "react";
import UserProfile from "@/components/UserProfile";
import PomodoroSettings from "@/components/PomodoroSettings";
import styles from "./style.module.css";

const Settings = () => {
  return (
    <div className={styles.profile}>
      <UserProfile />
      <PomodoroSettings />
    </div>
  );
};

export default Settings;
