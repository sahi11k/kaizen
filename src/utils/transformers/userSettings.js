import { transformKeys, reverseMapping } from "./common";

// Mapping configuration for snake_case to camelCase transformation
const USER_SETTINGS_FIELD_MAPPING = {
  pomodoro_duration: "pomodoroDuration",
  short_break_duration: "shortBreakDuration",
  long_break_duration: "longBreakDuration",
  long_break_interval: "longBreakInterval",
  user_id: "userId",
  created_at: "createdAt",
  updated_at: "updatedAt",
};

export const transformUserSettingsFromDb = (userSettings) => {
  return transformKeys(userSettings, USER_SETTINGS_FIELD_MAPPING);
};

export const transformUserSettingsToDb = (userSettings) => {
  return transformKeys(
    userSettings,
    reverseMapping(USER_SETTINGS_FIELD_MAPPING)
  );
};
