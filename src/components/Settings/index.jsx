import React, { useState } from "react";
import styles from "./style.module.css";
import Tabs from "@/utils/components/Tabs";
import General from "@/components/Settings/General";
import Personalization from "@/components/Settings/Personalization";
import Account from "@/components/Settings/Account";

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
        tabsClassName={styles.settingsTabs}
        tabNavClassName={styles.settingsTabNav}
        tabPanelClassName={styles.settingsTabPanel}
      >
        {TABS.map((tab) => (
          <Tabs.Tab
            key={tab.key}
            label={tab.label}
            tabKey={tab.key}
            className={tab.className}
          >
            {tab.content}
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
};

const TABS = [
  {
    key: "general",
    label: "General",
    content: <General />,
  },
  {
    key: "personalization",
    label: "Personalization",
    content: <Personalization />,
  },
  {
    key: "account",
    label: "Account",
    content: <Account />,
  },
];

export default Settings;
