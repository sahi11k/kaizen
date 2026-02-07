import { useRef, useCallback } from "react";

import timerStartSound from "@/assets/sounds/timerStart.mp3";
import timerEndSound from "@/assets/sounds/timerEnd.mp3";

const SOUNDS = {
  timerStart: timerStartSound,
  timerEnd: timerEndSound,
};

/**
 * Hook to play timer sounds.
 * Lazily creates and caches Audio instances per sound name.
 */
const useSound = () => {
  const audioRefs = useRef({});

  const getAudio = useCallback((name) => {
    if (!audioRefs.current[name]) {
      const src = SOUNDS[name];
      if (!src) return null;
      audioRefs.current[name] = new Audio(src);
    }
    return audioRefs.current[name];
  }, []);

  const play = useCallback(
    (name) => {
      const audio = getAudio(name);
      if (!audio) return;
      audio.currentTime = 0;
      audio.play().catch((err) => {
        console.warn("Sound playback blocked:", err);
      });
    },
    [getAudio],
  );

  return { play };
};

export default useSound;
