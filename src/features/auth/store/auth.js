import { create } from "zustand";
import { supabase } from "@/shared/api/supabase";

const useAuthStore = create(() => ({
  user: null,
  isLoading: true,
}));

supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.setState({
    user: session?.user ?? null,
    isLoading: false,
  });
});

export default useAuthStore;
