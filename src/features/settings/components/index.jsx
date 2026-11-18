import React, { useState } from "react";

import PomodoroSettings from "@/features/settings/components/Pomodoro";
import {
  PageHeader,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";
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

const Settings = () => {
  const [currentTab, setCurrentTab] = useState(TABS[0].key);

  return (
    <div className="w-full max-w-[1800px] mx-auto px-6 xl:px-12">
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences."
      />
      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        className="flex flex-col gap-6 pb-6"
      >
        <TabsList
          aria-label="Settings sections"
          className="sticky top-[6.5rem] md:top-[7rem] xl:top-[7.5rem] z-20 bg-background border-b border-border"
        >
          {TABS.map(({ key, label }) => (
            <TabsTrigger key={key} value={key} className="!p-[1px] mr-6">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map(({ key, content }) => (
          <TabsContent key={key} value={key} className="flex-1">
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Settings;
