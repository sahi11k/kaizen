import { create } from "zustand";
import { STATUS } from "@/shared/constants/db";
import { getUserSession } from "@/features/auth/api/auth";

const useAuthStore = create((set, get) => ({
  user: null,
  userFetchStatus: STATUS.LOADING,
  setUser: (user) => set(() => ({ user })),
  setUserFetchStatus: (status) => set(() => ({ userFetchStatus: status })),
  loadUser: async () => {
    if (get().user) return;
    try {
      const response = await getUserSession();
      const userData = response.data?.session?.user ?? null;
      set(() => ({ user: userData, userFetchStatus: STATUS.FETCHED }));
    } catch {
      set(() => ({ user: null, userFetchStatus: STATUS.FETCHED }));
    }
  },
}));

export default useAuthStore;
