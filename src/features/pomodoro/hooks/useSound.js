import useSound from "@/shared/hooks/useSound";

import timerStartSound from "@/assets/sounds/timerStart.mp3";
import timerEndSound from "@/assets/sounds/timerEnd.mp3";

const TIMER_SOUNDS = {
  timerStart: timerStartSound,
  timerEnd: timerEndSound,
};

const useTimerSound = () => {
  return useSound(TIMER_SOUNDS);
};

export default useTimerSound;
