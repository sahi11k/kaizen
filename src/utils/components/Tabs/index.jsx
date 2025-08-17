import React, { useMemo, useCallback } from "react";
import styles from "./style.module.css";

/**
 * Production-ready Tabs component with array-based API
 * Solves minification issues while maintaining clean architecture
 *
 * @param {Object} props - Component props
 * @param {Array} props.tabs - Array of tab objects with {id, label, content}
 * @param {string|number} props.activeTab - Currently active tab ID
 * @param {string|number} props.defaultTab - Default active tab ID
 * @param {Function} props.onTabChange - Callback when tab changes (id) => void
 * @param {string} props.layout - Layout direction: 'vertical' (default) or 'horizontal'
 * @param {string} props.tabsClassName - Additional CSS class for container
 * @param {string} props.tabNavClassName - Additional CSS class for tab navigation
 * @param {string} props.tabPanelClassName - Additional CSS class for content panel
 */
const Tabs = ({
  tabs = [],
  activeTab,
  defaultTab = 0,
  onTabChange,
  layout = "vertical",
  tabsClassName = "",
  tabNavClassName = "",
  tabPanelClassName = "",
}) => {
  // Validate and normalize tabs data
  const validatedTabs = useMemo(() => {
    if (!Array.isArray(tabs) || tabs.length === 0) {
      return [];
    }

    return tabs
      .filter((tab) => tab && typeof tab === "object")
      .map((tab, index) => ({
        id: tab.id ?? tab.key ?? index,
        label: tab.label ?? `Tab ${index + 1}`,
        content: tab.content ?? null,
      }));
  }, [tabs]);

  // Determine current active tab with fallback logic
  const currentActiveTab = useMemo(() => {
    if (validatedTabs.length === 0) return null;

    // Use activeTab if provided and valid
    if (activeTab !== undefined) {
      const found = validatedTabs.find((tab) => tab.id === activeTab);
      if (found) return activeTab;
    }

    // Fallback to defaultTab if valid
    if (defaultTab !== undefined) {
      const found = validatedTabs.find((tab) => tab.id === defaultTab);
      if (found) return defaultTab;
    }

    // Final fallback to first tab
    return validatedTabs[0]?.id ?? null;
  }, [activeTab, defaultTab, validatedTabs]);

  // Find current tab index for content rendering
  const currentTabIndex = useMemo(() => {
    return validatedTabs.findIndex((tab) => tab.id === currentActiveTab);
  }, [validatedTabs, currentActiveTab]);

  // Optimized tab change handler
  const handleTabClick = useCallback(
    (tabId) => {
      if (tabId === currentActiveTab) return;
      onTabChange?.(tabId);
    },
    [currentActiveTab, onTabChange]
  );

  // Generate CSS classes with proper concatenation
  const containerClasses = [
    styles.tabs,
    layout === "horizontal" && styles["tabs--horizontal"],
    tabsClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const navClasses = [
    styles.tab__nav,
    layout === "horizontal" && styles["tab__nav--horizontal"],
    tabNavClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const panelClasses = [styles.tabs__panel, tabPanelClassName]
    .filter(Boolean)
    .join(" ");

  // Early return for no tabs
  if (validatedTabs.length === 0) {
    return (
      <div className={containerClasses}>
        <div className={styles.emptyState}>No tabs available</div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* Tab Navigation */}
      <div className={navClasses}>
        {validatedTabs.map((tab) => {
          const isActive = tab.id === currentActiveTab;
          const buttonClasses = [
            "btn",
            styles.tab__nav__item,
            isActive && styles["tab__nav__item--active"],
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={tab.id}
              className={buttonClasses}
              onClick={() => handleTabClick(tab.id)}
              type="button"
              aria-selected={isActive}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel */}
      <div className={panelClasses}>
        {currentTabIndex >= 0 && validatedTabs[currentTabIndex]?.content}
      </div>
    </div>
  );
};

export default Tabs;
