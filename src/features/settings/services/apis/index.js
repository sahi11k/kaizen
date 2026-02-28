import { supabase } from "@/shared/api/supabase";
import { SUPABASE_TABLES } from "@/shared/constants/db";
import { parseApiResponse, ApiError } from "@/shared/api/db";
import {
  transformUserSettingsFromDb,
  transformUserSettingsToDb,
} from "@/features/settings/utils/transformers/userSettings";

export const fetchUserSettings = async (userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const response = await supabase
    .from(SUPABASE_TABLES.USER_SETTINGS)
    .select("*")
    .eq("user_id", userId)
    .single();

  const res = parseApiResponse({ response });
  return transformUserSettingsFromDb(res.data) || {};
};

export const upsertUserSettings = async (payload = {}, userId) => {
  if (!userId) throw new ApiError("User authentication required");

  const payloadToUpsert = transformUserSettingsToDb({
    ...payload,
    userId,
  });

  const response = await supabase
    .from(SUPABASE_TABLES.USER_SETTINGS)
    .upsert(payloadToUpsert, {
      onConflict: "user_id",
      ignoreDuplicates: false,
    })
    .select();

  const res = parseApiResponse({
    response,
    errorMessage: "Failed to update user settings",
  });
  return transformUserSettingsFromDb(res.data?.[0]) || {};
};
