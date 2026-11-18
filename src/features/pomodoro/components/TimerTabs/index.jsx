import TimerDisplay from "@/features/pomodoro/components/TimerDisplay";
import { POMODORO_TABS, TIMER_CONSTANTS } from "@/features/pomodoro/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";

const { POMODORO_TAB } = TIMER_CONSTANTS;

const TimerTabs = ({
  currentTab,
  currentTask,
  duration,
  onTabChange,
  timerValue,
}) => (
  <Tabs
    defaultValue={POMODORO_TAB}
    value={currentTab}
    onValueChange={onTabChange}
    className="flex min-h-0 flex-1 flex-col"
  >
    <TabsList className="h-12 sm:h-14 !w-full shrink-0 border-b border-overlay-field-border">
      {POMODORO_TABS.map((tab) => (
        <TabsTrigger key={tab.key} value={tab.key} className="cursor-pointer !text-sm sm:!text-base">
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>

    {POMODORO_TABS.map((tab) => (
      <TabsContent
        key={tab.key}
        value={tab.key}
        className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 py-6 sm:py-8 md:gap-6 lg:py-0 xl:gap-8"
      >
        <TimerDisplay
          timerValue={timerValue}
          duration={duration}
          currentTab={currentTab}
          currentTask={currentTask}
        />
      </TabsContent>
    ))}
  </Tabs>
);

export default TimerTabs;
