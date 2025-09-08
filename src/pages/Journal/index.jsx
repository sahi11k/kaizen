import React from "react";
import JournalDetail from "@/components/Journals/JournalDetail";
import { JournalListLaptop } from "@/components/Journals/JournalList";

const Journal = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <JournalListLaptop />
      <JournalDetail />
    </div>
  );
};

export default Journal;
