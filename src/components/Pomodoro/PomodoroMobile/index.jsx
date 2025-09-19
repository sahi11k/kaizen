import TimerFilled from "@/assets/icons/timer-filled.svg?react";
import TimerOutline from "@/assets/icons/timer-outline.svg?react";
import TaskListContent from "@/components/Pomodoro/Tasks/TaskListContent";
import TimerContent from "@/components/Pomodoro/Timer/TimerContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      content: (
        <div className="h-full">
          <TaskListContent onItemClick={onItemClick} />
        </div>
      ),
    },
    {
      key: FOCUS_TAB,
      label: "Focus",
      icon: <TimerOutline fill="currentColor" />,
      iconFilled: <TimerFilled fill="currentColor" />,
      content: (
        <div className="flex flex-col h-full py-4">
          <TimerContent />
        </div>
      ),
    },
  ];

  return (
    <div className="md:hidden h-[calc(100vh-64px)]">
      <Tabs
        defaultValue={TASKS_TAB}
        value={currentTab}
        onValueChange={handleTabChange}
        className="h-full gap-0"
      >
        {TABS.map((tab) => (
          <TabsContent
            key={tab.key}
            value={tab.key}
            className="flex-1 overflow-hidden px-6"
          >
            {tab.content}
          </TabsContent>
        ))}
        <TabsList className="sticky right-0 bottom-0 left-0 w-full rounded-none p-0 h-16">
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
