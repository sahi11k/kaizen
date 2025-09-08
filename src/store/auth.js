import { create } from "zustand";
import { STATUS } from "@/constants/db";
import { getUserSession } from "@/db/apis/auth";
import { fetchUserSettings } from "@/db/apis/userSettings";

const useAuthStore = create((set, get) => ({
  user: null,
  userSettings: null,
  userFetchStatus: STATUS.LOADING,
  setUser: (user) => set(() => ({ user })),
  setUserFetchStatus: (status) => set(() => ({ userFetchStatus: status })),
  setUserSettings: (userSettings) => set(() => ({ userSettings })),
  loadUser: async () => {
    let userData = get().user;
    let userSettingsData = get().userSettings;
    if (userData) return;
    const response = await getUserSession();
    if (response.error || !response.data.session) {
      userData = null;
      userSettingsData = null;
    } else if (response.data.session) {
      userData = response.data.session.user;
      const userSettingsResponse = await fetchUserSettings(userData.id);
      if (!userSettingsResponse.error && userSettingsResponse) {
        userSettingsData = userSettingsResponse;
      } else {
        console.error(
          "Failed to fetch user settings:",
          userSettingsResponse.error
        );
        userSettingsData = null;
      }
    }
    set(() => ({ user: userData }));
    set(() => ({ userSettings: userSettingsData }));
    set(() => ({ userFetchStatus: STATUS.FETCHED }));
  },
}));

export default useAuthStore;
