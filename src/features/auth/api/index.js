import { supabase } from "@/shared/supabase";
import { EMAIL_NOT_VERIFIED_ERROR } from "@/features/auth/constants";
import { parseApiResponse } from "@/shared/lib/api";
import { APP_URL } from "@/shared/constants";

const PROFILE_AVATARS_STORAGE_BUCKET = "profile-avatars";
const PROFILE_AVATAR_MIME_TO_EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${APP_URL}dashboard`,
    },
  });
  if (error) throw error;
}

export async function signUpNewUser(payload) {
  let res = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        display_name: payload.name,
      },
    },
  });
  if (res.data?.user?.identities?.length === 0) {
    throw new Error(
      "An account with this email already exists. Please login instead.",
    );
  }
  const status = res.error ? 400 : 200;
  res = parseApiResponse({
    response: {
      ...res,
      status,
    },
    errorMessage: res.error?.message,
    successMessage: null,
  });
  return res;
}

export async function verifyOTP(payload) {
  let res = await supabase.auth.verifyOtp({
    email: payload.email,
    token: payload.token,
    type: "email",
  });
  const status = res.error ? 400 : 200;
  res = parseApiResponse({
    response: {
      ...res,
      status,
    },
    errorMessage: res.error?.message,
    successMessage: null,
  });
  return res;
}

export async function resendOTP(payload) {
  let res = await supabase.auth.resend({
    type: "signup",
    email: payload.email,
  });
  const status = res.error ? 400 : 200;
  res = parseApiResponse({
    response: {
      ...res,
      status,
    },
    errorMessage: res.error?.message,
    successMessage: null,
  });
  return res;
}

export async function loginWithEmail(payload) {
  let res = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  const status = res.error ? 400 : 200;
  res = parseApiResponse({
    response: {
      ...res,
      status,
    },
    errorMessage:
      res.error?.code === EMAIL_NOT_VERIFIED_ERROR // handle specific error for unverified email while login
        ? EMAIL_NOT_VERIFIED_ERROR
        : res.error?.message,
    successMessage: null,
  });
  return res;
}

export async function signOut() {
  let res = await supabase.auth.signOut();
  const status = res.error ? 400 : 200;
  res = parseApiResponse({
    response: {
      ...res,
      status,
    },
    errorMessage: res.error?.message || "Something went wrong",
    successMessage: null,
  });
  return res;
}

export async function getUserSession() {
  let res = await supabase.auth.getSession();
  const status = res.error ? 400 : 200;
  res = parseApiResponse({
    response: {
      ...res,
      status,
    },
    errorMessage: res.error?.message,
    successMessage: null,
  });
  return res;
}

export async function resetPassword(payload) {
  let res = await supabase.auth.resetPasswordForEmail(payload.email, {
    redirectTo: `${APP_URL}auth/update-password`,
  });

  const status = res.error ? 400 : 200;
  res = parseApiResponse({
    response: {
      ...res,
      status,
    },
    errorMessage: res.error?.message,
    successMessage: null,
  });
  return res;
}

export async function updatePassword(payload) {
  const authRes = await supabase.auth.updateUser({
    password: payload.password,
  });
  const status = authRes.error ? 400 : 200;
  return parseApiResponse({
    response: {
      ...authRes,
      status,
    },
    errorMessage: authRes.error?.message,
    successMessage: "Password updated successfully",
  });
}

export async function updateUserMetadata(payload) {
  let res = await supabase.auth.updateUser({
    data: payload,
  });

  const status = res.error ? 400 : 200;
  res = parseApiResponse({
    response: {
      ...res,
      status,
    },
    errorMessage: res.error?.message,
    successMessage: "Profile updated successfully",
  });
  return res;
}

export async function uploadProfileAvatar(file, userId) {
  if (!userId) throw new Error("User authentication required");

  const ext = PROFILE_AVATAR_MIME_TO_EXT[file.type];
  if (!ext) throw new Error(`Unsupported file type: ${file.type}`);

  const path = `${userId}/avatar.${ext}`;
  const { error: uploadError } = await supabase.storage
    .from(PROFILE_AVATARS_STORAGE_BUCKET)
    .upload(path, file, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  const { data } = supabase.storage
    .from(PROFILE_AVATARS_STORAGE_BUCKET)
    .getPublicUrl(path);

  return {
    avatarUrl: data.publicUrl,
    avatarPath: path,
  };
}

export async function deleteProfileAvatar(path) {
  if (!path) return;

  const { error } = await supabase.storage
    .from(PROFILE_AVATARS_STORAGE_BUCKET)
    .remove([path]);

  if (error) throw new Error(`Failed to delete avatar: ${error.message}`);
}

export async function deleteAccount() {
  const { data, error } = await supabase.functions.invoke("delete-account", {
    method: "POST",
  });

  if (error) throw new Error(error.message || "Failed to delete account");
  if (data?.error) throw new Error(data.error);

  return data;
}
