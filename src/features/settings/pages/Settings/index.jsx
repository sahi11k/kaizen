import React from "react";
import Settings from "@/features/settings/components";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

const SettingsPage = () => {
  useDocumentTitle(BROWSER_TAB_TITLES.SETTINGS);

  return (
    <div className="h-full bg-background px-3 py-3 md:px-6 md:py-5 lg:px-8">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col">
        <Settings />
      </div>
    </div>
  );
};

export default SettingsPage;
