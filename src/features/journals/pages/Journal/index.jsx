import React from "react";
import JournalDetail from "@/features/journals/components/JournalDetail";
import { JournalListLaptop } from "@/features/journals/components/JournalList";
import JournalsMobile from "@/features/journals/components/JournalsMobile";
import { TAB_TITLES } from "@/shared/constants/routes";
import useTabTitle from "@/shared/hooks/useTabTitle";

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
