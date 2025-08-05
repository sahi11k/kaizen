import { supabase } from "@/db/supabase";
import { EMAIL_NOT_VERIFIED_ERROR } from "@/utils/constants";
import { handleResponse } from "@/utils/utils";

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
  const status = res.error ? 400 : 200;
  res = handleResponse({
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
  res = handleResponse({
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
  res = handleResponse({
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
  res = handleResponse({
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
  res = handleResponse({
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
  res = handleResponse({
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
    redirectTo: `${import.meta.env.VITE_APP_URL}/auth/update-password`,
  });

  const status = res.error ? 400 : 200;
  res = handleResponse({
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
  let res = await supabase.auth.updateUser({
    password: payload.password,
  });
  const status = res.error ? 400 : 200;
  res = handleResponse({
    response: {
      ...res,
      status,
    },
    errorMessage: res.error?.message,
    successMessage: "Password updated successfully",
  });
  return res;
}

export async function updateUserMetadata(payload) {
  let res = await supabase.auth.updateUser({
    data: payload,
  });

  const status = res.error ? 400 : 200;
  res = handleResponse({
    response: {
      ...res,
      status,
    },
    errorMessage: res.error?.message,
    successMessage: "Profile updated successfully",
  });
  return res;
}
