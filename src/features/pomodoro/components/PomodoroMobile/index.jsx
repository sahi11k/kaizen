import TimerFilled from "@/assets/icons/timer-filled.svg?react";
import TimerOutline from "@/assets/icons/timer-outline.svg?react";
import TaskListContent from "@/features/pomodoro/components/Tasks/TaskListContent";
import TimerContent from "@/features/pomodoro/components/Timer/TimerContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { List } from "lucide-react";
import { useState } from "react";

const TASKS_TAB = "tasks";
const FOCUS_TAB = "focus";

const PomodoroMobile = () => {
  const [currentTab, setCurrentTab] = useState(TASKS_TAB);

  const handleTabChange = (tabKey) => {
    setCurrentTab(tabKey);
  };

  const onItemClick = () => {
    setCurrentTab(FOCUS_TAB);
  };

  const TABS = [
    {
      key: TASKS_TAB,
      label: "Tasks",
      icon: <List />,
      iconFilled: <List />,
      content: <TaskListContent onItemClick={onItemClick} />,
    },
    {
      key: FOCUS_TAB,
      label: "Focus",
      icon: <TimerOutline fill="currentColor" />,
      iconFilled: <TimerFilled fill="currentColor" />,
      content: <TimerContent />,
    },
  ];

  return (
    <div className="md:hidden h-[calc(100vh-64px)]">
      <Tabs
        defaultValue={TASKS_TAB}
        value={currentTab}
        onValueChange={handleTabChange}
        className="gap-0 h-full"
      >
        {TABS.map((tab) => (
          <TabsContent
            key={tab.key}
            value={tab.key}
            className="flex flex-col min-h-0 p-6"
          >
            {tab.content}
          </TabsContent>
        ))}
        <TabsList className="w-full rounded-none p-0 h-16">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className={`rounded-none !bg-muted !shadow-none cursor-pointer ${
                currentTab === tab.key ? "!text-primary " : ""
              } `}
            >
              <span
                className={`rounded-full py-2 px-4 flex items-center justify-center [&>svg]:!size-5 ${
                  currentTab === tab.key ? "bg-primary-light" : ""
                }`}
              >
                {currentTab === tab.key ? tab.iconFilled : tab.icon}{" "}
                <span className="ml-2">{tab.label}</span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PomodoroMobile;
