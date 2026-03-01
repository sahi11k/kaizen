import { create } from "zustand";
import { THEME, THEME_STORAGE_KEY } from "@/features/theme/constants";
import { syncPipTheme } from "@/features/pomodoro/helpers/pip";

const getInitialTheme = () => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === THEME.DARK || stored === THEME.LIGHT) return stored;
  return THEME.LIGHT;
};

const applyTheme = (theme) => {
  const isDark = theme === THEME.DARK;
  const root = document.documentElement;
  if (isDark) {
    root.classList.add(THEME.DARK);
  } else {
    root.classList.remove(THEME.DARK);
  }
  syncPipTheme(isDark);
};

const useThemeStore = create((set) => {
  const initial = getInitialTheme();
  applyTheme(initial);

  return {
    theme: initial,
    toggleTheme: () =>
      set((state) => {
        const next = state.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
        localStorage.setItem(THEME_STORAGE_KEY, next);
        applyTheme(next);
        return { theme: next };
      }),
  };
});

export default useThemeStore;
