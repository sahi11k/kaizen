import { supabase } from "@/shared/api/supabase";
import { SUPABASE_TABLES } from "@/shared/constants/db";
import { handleResponse } from "@/shared/api/db";
import {
  transformUserSettingsFromDb,
  transformUserSettingsToDb,
} from "@/features/settings/utils/transformers/userSettings";

export const fetchUserSettings = async (userId) => {
  if (!userId) {
    return { error: "User authentication required" };
  }
  let res = await supabase
    .from(SUPABASE_TABLES.USER_SETTINGS)
    .select("*")
    .eq("user_id", userId)
    .single();
  res = handleResponse({
    response: res,
  });
  return transformUserSettingsFromDb(res.data) || {};
};

export const upsertUserSettings = async (payload = {}, userId) => {
  if (!userId) {
    return { error: "User authentication required", data: null };
  }

  const payloadToUpsert = transformUserSettingsToDb({
    ...payload,
    userId,
  });

  let res = await supabase
    .from(SUPABASE_TABLES.USER_SETTINGS)
    .upsert(payloadToUpsert, {
      onConflict: "user_id",
      ignoreDuplicates: false,
    })
    .select();

  res = handleResponse({
    response: res,
    errorMessage: "Failed to update user settings",
  });

  res.data = transformUserSettingsFromDb(res.data?.[0]) || {};
  return res;
};
