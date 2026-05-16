import React, { useState } from "react";

import Account from "@/features/settings/components/Account";
import Preferences from "@/features/settings/components/Preferences";
import { cn } from "@/shared/lib/utils";

const TABS = [
  {
    key: "account",
    label: "Account",
    content: <Account />,
  },
  {
    key: "pomodoro",
    label: "Pomodoro",
    content: <Preferences section="pomodoro" />,
  },
];

const Settings = () => {
  const [currentTab, setCurrentTab] = useState(TABS[0].key);
  const activeTab = TABS.find((tab) => tab.key === currentTab) || TABS[0];

  return (
    <div className="flex h-full flex-col overflow-hidden md:flex-row">
      <aside className="flex flex-none flex-col border-b border-border md:w-72 md:border-b-0 md:border-r xl:w-92">
        <div className="flex h-20 items-center px-6">
          <h1 className="heading-3 text-foreground">Settings</h1>
        </div>

        <nav
          aria-label="Settings sections"
          className="flex flex-nowrap gap-6 overflow-x-auto px-3 pb-0 md:flex-col md:gap-1 md:overflow-visible md:px-3"
        >
          {TABS.map(({ key, label }) => {
            const isActive = key === currentTab;

            return (
              <button
                key={key}
                type="button"
                aria-selected={isActive}
                onClick={() => setCurrentTab(key)}
                className={cn(
                  "inline-flex shrink-0 items-center border-b-2 border-transparent px-4 py-3 text-left text-base font-medium transition-colors md:w-full md:min-w-36 md:rounded-lg md:border-b-0",
                  isActive
                    ? "border-primary text-primary-container-foreground md:bg-primary-container"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <span className="whitespace-nowrap">{label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 p-6 md:p-8 xl:p-10">
          <h2 className="heading-2 text-foreground">{activeTab.label}</h2>
          {activeTab.content}
        </div>
      </main>
    </div>
  );
};

export default Settings;
