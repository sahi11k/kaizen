import React, { useState } from "react";
import styles from "./style.module.css";
import Tabs from "@/utils/components/Tabs";
import Account from "@/components/Settings/Account";
import Pomodoro from "@/components/Settings/Pomodoro";

const Settings = () => {
  const [currentTab, setCurrentTab] = useState(TABS[0].key);

  const handleTabChange = (tabKey) => {
    setCurrentTab(tabKey);
  };

  return (
    <div className={`card ${styles.tabsContainer}`}>
      <Tabs
        defaultTab={TABS[0].key}
        activeTab={currentTab}
        onTabChange={handleTabChange}
        layout="horizontal"
        tabsClassName={styles.settingsTabs}
        tabNavClassName={styles.settingsTabNav}
        tabPanelClassName={styles.settingsTabPanel}
        tabs={TABS}
      />
    </div>
  );
};

const TABS = [
  {
    key: "account",
    label: "Account",
    content: <Account />,
  },
  {
    key: "pomodoro",
    label: "Pomodoro",
    content: <Pomodoro />,
  },
];

export default Settings;
