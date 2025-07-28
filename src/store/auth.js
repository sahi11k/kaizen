import { create } from "zustand";
import { STATUS } from "@/utils/constants";
import { getUserSession } from "@/db/apis/auth";

const useAuthStore = create((set, get) => ({
  user: null,
  userFetchStatus: STATUS.LOADING,
  setUser: (user) => set(() => ({ user })),
  setUserFetchStatus: (status) => set(() => ({ userFetchStatus: status })),
  loadUser: async () => {
    if (get().user) return;
    const response = await getUserSession();
    if (response.error || !response.data.session) {
      set(() => ({ user: null }));
    } else if (response.data.session) {
      set(() => ({ user: response.data.session.user }));
    }
    set(() => ({ userFetchStatus: STATUS.FETCHED }));
  },
}));

export default useAuthStore;
