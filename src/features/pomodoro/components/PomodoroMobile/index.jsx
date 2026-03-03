import TimerFilled from "@/assets/icons/timer-filled.svg?react";
import TimerOutline from "@/assets/icons/timer-outline.svg?react";
import TaskListContent from "@/features/pomodoro/components/Tasks/TaskListContent";
import TimerContent from "@/features/pomodoro/components/Timer/TimerContent";
import { MobileTabLayout } from "@/app/layouts";
import { List } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

const TASKS_TAB = "tasks";
const FOCUS_TAB = "focus";

const PomodoroMobile = () => {
  const [currentTab, setCurrentTab] = useState(TASKS_TAB);

  const onItemClick = useCallback(() => {
    setCurrentTab(FOCUS_TAB);
  }, [setCurrentTab]);

  const TABS = useMemo(
    () => [
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
    ],
    [onItemClick],
  );

  return (
    <MobileTabLayout
      tabs={TABS}
      currentTab={currentTab}
      onTabChange={setCurrentTab}
      contentClassName="p-6"
    />
  );
};

export default PomodoroMobile;
