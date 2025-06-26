import { supabase } from "@/db/supabase";

export async function signInWithEmail(email) {
  const response = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      //   emailRedirectTo: "https://example.com/welcome",
    },
  });

  return response;
}
