import { create } from "zustand";
import { THEME, THEME_STORAGE_KEY } from "@/features/theme/constants/theme";

const getInitialTheme = () => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === THEME.DARK || stored === THEME.LIGHT) return stored;
  return THEME.LIGHT;
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === THEME.DARK) {
    root.classList.add(THEME.DARK);
    root.setAttribute("data-theme", THEME.DARK);
  } else {
    root.classList.remove(THEME.DARK);
    root.setAttribute("data-theme", THEME.LIGHT);
  }
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
