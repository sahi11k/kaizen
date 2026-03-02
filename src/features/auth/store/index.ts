import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "@/shared/supabase";

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const useAuthStore = create<AuthState>(() => ({
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
