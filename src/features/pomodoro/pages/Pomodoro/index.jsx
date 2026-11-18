import PomodoroDesktop from "@/features/pomodoro/components/PomodoroDesktop";
import PomodoroMobile from "@/features/pomodoro/components/PomodoroMobile";
import TimerNavigationGuard from "@/features/pomodoro/components/NavigationGuard";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import { PageHeader } from "@/shared/ui";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

const Pomodoro = () => {
  useDocumentTitle(BROWSER_TAB_TITLES.POMODORO);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1800px] flex-col px-6 lg:h-full xl:px-12">
      <PageHeader
        title="Pomodoro"
        subtitle="Stay focused, one session at a time."
      />
      <PomodoroDesktop />
      <PomodoroMobile />
      <TimerNavigationGuard />
    </div>
  );
};

export default Pomodoro;
