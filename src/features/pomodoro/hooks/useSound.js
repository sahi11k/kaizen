import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useSound from "@/shared/hooks/useSound";
import { useAuthStore } from "@/features/auth";
import { queryKeys } from "@/shared/constants/queryKeys";

import timerStartSound from "@/assets/sounds/timerStart.mp3";
import timerEndSound from "@/assets/sounds/timerEnd.mp3";

const TIMER_SOUNDS = {
  timerStart: timerStartSound,
  timerEnd: timerEndSound,
};

const isSoundEnabled = (queryClient) => {
  const userId = useAuthStore.getState().user?.id;
  if (!userId) return false;
  const settings = queryClient.getQueryData(queryKeys.userSettings.all(userId));
  return settings?.soundEnabled ?? false;
};

const useTimerSound = () => {
  const { play: rawPlay } = useSound(TIMER_SOUNDS);
  const queryClient = useQueryClient();

  const play = useCallback(
    (name) => {
      if (!isSoundEnabled(queryClient)) return;
      rawPlay(name);
    },
    [rawPlay, queryClient],
  );

  return { play };
};

export default useTimerSound;
