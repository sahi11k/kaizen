import React, { useState } from "react";
import styles from "./style.module.css";

import Account from "@/components/Settings/Account";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const [currentTab, setCurrentTab] = useState(TABS[0].key);

  const handleTabChange = (tabKey) => {
    setCurrentTab(tabKey);
  };

  return (
    <div className={`card ${styles.tabsContainer}`}>
      <Tabs
        defaultValue={TABS[0].key}
        value={currentTab}
        onValueChange={handleTabChange}
        className="h-full"
      >
        <TabsList className="w-full h-12 cursor-pointer">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="cursor-pointer"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <>
          {TABS.map((tab) => (
            <TabsContent key={tab.key} value={tab.key}>
              {tab.content}
            </TabsContent>
          ))}
        </>
      </Tabs>
    </div>
  );
};

const TABS = [
  {
    key: "account",
    label: "Account",
    content: <Account />,
  },
];

export default Settings;
