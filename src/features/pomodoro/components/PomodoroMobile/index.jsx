import TimerFilled from "@/assets/icons/timer-filled.svg?react";
import TimerOutline from "@/assets/icons/timer-outline.svg?react";
import TaskListContent from "@/features/pomodoro/components/Tasks/TaskListContent";
import TimerContent from "@/features/pomodoro/components/Timer/TimerContent";
import { MobileTabLayout } from "@/app/layouts";
import { useTimerStore } from "@/features/pomodoro/store";
import TimerWarningDialog from "@/features/pomodoro/components/TimerWarningDialog";
import { List } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

const TASKS_TAB = "tasks";
const FOCUS_TAB = "focus";

const PomodoroMobile = () => {
  const [currentTab, setCurrentTab] = useState(TASKS_TAB);
  const [pendingTab, setPendingTab] = useState(null);

  const onItemClick = useCallback(() => {
    setCurrentTab(FOCUS_TAB);
  }, [setCurrentTab]);

  const handleTabChange = useCallback(
    (tab) => {
      if (tab === TASKS_TAB && currentTab === FOCUS_TAB) {
        const { timerStarted } = useTimerStore.getState();
        if (timerStarted) {
          setPendingTab(tab);
          return;
        }
      }
      setCurrentTab(tab);
    },
    [currentTab],
  );

  const confirmTabSwitch = () => {
    if (!pendingTab) return;
    useTimerStore.getState().resetTimer(0);
    setCurrentTab(pendingTab);
    setPendingTab(null);
  };

  const cancelTabSwitch = () => {
    setPendingTab(null);
  };

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
    <>
      <MobileTabLayout
        tabs={TABS}
        currentTab={currentTab}
        onTabChange={handleTabChange}
        contentClassName="p-6"
      />
      <TimerWarningDialog
        open={!!pendingTab}
        onConfirm={confirmTabSwitch}
        onCancel={cancelTabSwitch}
      />
    </>
  );
};

export default PomodoroMobile;
