import { supabase, SUPABASE_TABLES } from "@/shared/supabase";
import { parseApiResponse, ApiError } from "@/shared/lib/api";
import {
  transformUserSettingsFromDb,
  transformUserSettingsToDb,
} from "@/features/settings/utils";

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
