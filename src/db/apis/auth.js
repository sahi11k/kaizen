import { supabase } from "@/db/supabase";

export async function signUpNewUser(payload) {
  const response = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      emailRedirectTo: `${import.meta.env.VITE_APP_URL}/auth/callback`,
      data: {
        display_name: payload.name,
      },
    },
  });
  return response;
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
