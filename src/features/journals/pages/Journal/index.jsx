import React from "react";
import JournalsDesktop from "@/features/journals/components/JournalsDesktop";
import JournalsMobile from "@/features/journals/components/JournalsMobile";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

const Journal = () => {
  useDocumentTitle(BROWSER_TAB_TITLES.JOURNALS);

  return (
    <>
      <JournalsDesktop />
      <JournalsMobile />
    </>
  );
};

export default Journal;
