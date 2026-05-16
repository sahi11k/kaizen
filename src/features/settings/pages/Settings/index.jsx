import React from "react";
import Settings from "@/features/settings/components";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

const SettingsPage = () => {
  useDocumentTitle(BROWSER_TAB_TITLES.SETTINGS);

  return (
    <Settings />
  );
};

export default SettingsPage;
