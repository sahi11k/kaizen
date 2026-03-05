export const DEFAULT_NAV_ROUTE = "/dashboard";
export const APP_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/"
    : "https://www.gokaizen.app/";

export const BROWSER_TAB_TITLES = {
  POMODORO: "Pomodoro",
  JOURNALS: "Journals",
  LOGIN: "Login",
  SIGNUP: "Signup",
  UPDATE_PASSWORD: "Update Password",
  DASHBOARD: "Kaizen",
  HOME: "Kaizen",
};
