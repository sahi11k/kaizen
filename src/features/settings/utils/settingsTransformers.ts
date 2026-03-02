import { USER_SETTINGS_FIELD_MAPPING } from "@/features/settings/constants";
import { transformKeys, reverseMapping } from "@/shared/lib/transformers";

export const transformUserSettingsFromDb = (
  userSettings: Record<string, unknown>,
): Record<string, unknown> => {
  return transformKeys(userSettings, USER_SETTINGS_FIELD_MAPPING);
};

export const transformUserSettingsToDb = (
  userSettings: Record<string, unknown>,
): Record<string, unknown> => {
  return transformKeys(
    userSettings,
    reverseMapping(USER_SETTINGS_FIELD_MAPPING),
  );
};
