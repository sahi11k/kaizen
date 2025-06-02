const STORAGE_KEY = "pomodoro-app";

export const setItemInLocalStorage = (value = []) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

export const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const removeDataFromLocalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};
