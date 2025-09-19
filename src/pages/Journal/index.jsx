import React from "react";
import JournalDetail from "@/components/Journals/JournalDetail";
import { JournalListLaptop } from "@/components/Journals/JournalList";
import JournalsMobile from "@/components/Journals/JournalsMobile";
import { TAB_TITLES } from "@/constants/routes";
import useTabTitle from "@/hooks/useTabTitle";

const Journal = () => {
  useTabTitle(TAB_TITLES.JOURNALS);

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
