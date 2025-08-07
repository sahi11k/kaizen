import { supabase } from "@/db/supabase";
import { SUPABASE_TABLES } from "@/utils/constants";
import { handleResponse } from "@/utils/utils";
import {
  transformUserSettingsFromDb,
  transformUserSettingsToDb,
} from "@/utils/transformers/userSettings";

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
    return { error: "User authentication required" };
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
