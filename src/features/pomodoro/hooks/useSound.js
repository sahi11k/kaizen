import { useRef, useCallback } from "react";

import timerStartSound from "@/assets/sounds/timerStart.mp3";
import timerEndSound from "@/assets/sounds/timerEnd.mp3";

const SOUNDS = {
  timerStart: timerStartSound,
  timerEnd: timerEndSound,
};

/**
 * Hook to play timer sounds.
 * Pre-loads audio instances and exposes a `play` function.
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
      // Reset to start so rapid replays work
      audio.currentTime = 0;
      audio.play().catch((err) => {
        // Browsers may block autoplay before user interaction — safe to ignore
        console.warn("Sound playback blocked:", err);
      });
    },
    [getAudio],
  );

  const playLoop = useCallback(
    (name) => {
      const audio = getAudio(name);
      if (!audio) return;
      audio.loop = true;
      audio.currentTime = 0;
      audio.play().catch((err) => {
        console.warn("Sound playback blocked:", err);
      });
    },
    [getAudio],
  );

  const stopLoop = useCallback(
    (name) => {
      const audio = getAudio(name);
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
    },
    [getAudio],
  );

  return { play, playLoop, stopLoop };
};

export default useSound;
