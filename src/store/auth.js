import { create } from "zustand";
import { STATUS } from "@/utils/constants";

const useAuthStore = create((set, get) => ({
  user: null,
  userFetchStatus: STATUS.LOADING,
  setUser: (user) => set(() => ({ user })),
  setUserFetchStatus: (status) => set(() => ({ userFetchStatus: status })),

  //   loadUser: async () => {
  //     if(get().user) return;
  //     const user = await getUser();
  //     if (user) {
  //       set(() => ({ user: JSON.parse(user) }));
  //     }
  //   },
}));

export default useAuthStore;
