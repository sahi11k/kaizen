import React, { useState } from "react";
import styles from "./style.module.css";

const Tabs = ({ children, defaultTab = 0, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = React.Children.toArray(children).filter(
    (child) => child.type.name === "Tab"
  );

  const index = tabs.findIndex((tab) => tab.props.tabKey === activeTab);

  const handleTabClick = (key) => {
    if (onTabChange && typeof onTabChange === "function") {
      onTabChange(key);
    }
    setActiveTab(key);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabs__header}>
        {tabs.map((tab) => (
          <button
            key={tab.props.tabKey}
            className={`${styles.tabs__button} ${
              activeTab === tab.props.tabKey
                ? `${styles.tabs__button}--active`
                : ""
            }`}
            onClick={() => handleTabClick(tab.props.tabKey)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className={styles.tabs__content}>{tabs[index]}</div>
    </div>
  );
};

const Tab = ({ children }) => {
  return <div className={styles.tabs__panel}>{children}</div>;
};

Tabs.Tab = Tab;

export default Tabs;
