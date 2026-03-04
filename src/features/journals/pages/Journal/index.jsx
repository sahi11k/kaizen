import React from "react";
import JournalDetail from "@/features/journals/components/JournalDetail";
import { JournalListLaptop } from "@/features/journals/components/JournalList";
import JournalsMobile from "@/features/journals/components/JournalsMobile";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

const Journal = () => {
  useDocumentTitle(BROWSER_TAB_TITLES.JOURNALS);

  return (
    <>
      <div className="hidden md:flex h-[calc(100vh-64px)] overflow-hidden">
        <JournalListLaptop />
        <JournalDetail />
      </div>
      <JournalsMobile />
    </>
  );
};

export default Journal;
