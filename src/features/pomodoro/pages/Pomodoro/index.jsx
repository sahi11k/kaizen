import PomodoroDesktop from "@/features/pomodoro/components/PomodoroDesktop";
import PomodoroMobile from "@/features/pomodoro/components/PomodoroMobile";
import TimerNavigationGuard from "@/features/pomodoro/components/NavigationGuard";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

const Pomodoro = () => {
  useDocumentTitle(BROWSER_TAB_TITLES.POMODORO);

  return (
    <>
      <PomodoroDesktop />
      <PomodoroMobile />
      <TimerNavigationGuard />
    </>
  );
};

export default Pomodoro;
