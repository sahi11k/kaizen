import React, { useState } from "react";

import PomodoroSettings from "@/features/settings/components/Pomodoro";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import GeneralSettings from "@/features/settings/components/General";
import SecuritySettings from "@/features/settings/components/Security";

const TABS = [
  {
    key: "general",
    label: "General",
    content: <GeneralSettings />,
  },
  {
    key: "security",
    label: "Security",
    content: <SecuritySettings />,
  },
  {
    key: "pomodoro",
    label: "Pomodoro",
    content: <PomodoroSettings />,
  },
];

const HEADER_STICKY_TOP = "top-3 md:top-5";
const CONTENT_SPACING = "mx-4 min-w-0 pt-3 pb-24 md:mx-6 md:pt-4 md:pb-8";

const Settings = () => {
  const [currentTab, setCurrentTab] = useState(TABS[0].key);

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      className="min-h-0 w-full gap-0 overflow-visible"
    >
      <div
        className={`sticky ${HEADER_STICKY_TOP} z-30 shrink-0 bg-background before:absolute before:inset-x-0 before:bottom-full before:h-3 before:bg-background md:before:h-5`}
      >
        <div className="mx-4 pb-4 md:mx-6 md:pb-5">
          <div className="flex min-w-0 flex-col gap-4">
            <h1 className="text-2xl font-semibold leading-tight text-foreground md:text-3xl">
              Settings
            </h1>
            <TabsList
              aria-label="Settings sections"
              className="h-auto max-w-full justify-start overflow-x-auto border border-border bg-card"
            >
              {TABS.map(({ key, label }) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="h-11 flex-none rounded-none border-x-0 border-t-0 bg-transparent px-5 pb-3 pt-2 text-base cursor-pointer first:rounded-none last:rounded-none data-[state=active]:border-b-primary"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
      </div>

      {TABS.map(({ key, content }) => (
        <TabsContent key={key} value={key} className="mt-0 flex-none">
          <div className={CONTENT_SPACING}>{content}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Settings;
