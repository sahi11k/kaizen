import { useRef, useCallback } from "react";

interface UseSoundReturn {
  play: (name: string) => void;
}

const useSound = (sounds: Record<string, string>): UseSoundReturn => {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const getAudio = useCallback(
    (name: string): HTMLAudioElement | null => {
      if (!audioRefs.current[name]) {
        const src = sounds[name];
        if (!src) return null;
        audioRefs.current[name] = new Audio(src);
      }
      return audioRefs.current[name];
    },
    [sounds],
  );

  const play = useCallback(
    (name: string): void => {
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
