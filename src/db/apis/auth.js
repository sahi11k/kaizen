import { supabase } from "@/db/supabase";
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
  // const response = await supabase.auth.verifyOtp({
  //   email: payload.email,
  //   token: payload.token,
  //   type: "email",
  // });
  // return response;
}

export async function resendOTP(payload) {
  // const response = await supabase.auth.resend({
  //   email: payload.email,
  //   type: "email",
  // });
  // return response;
}

export async function signInWithEmail(payload) {
  const response = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });
  return response;
}

// export async function signOut() {
//   const response = await supabase.auth.signOut();
//   return response;
// }

export async function getUserSession() {
  const response = await supabase.auth.getSession();
  return response;
}
