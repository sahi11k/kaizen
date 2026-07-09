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
    <div className="w-full max-w-5xl mx-auto">
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
          className="border border-border"
        >
          {TABS.map(({ key, label }) => (
            <TabsTrigger key={key} value={key}>
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
