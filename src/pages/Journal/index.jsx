import React, { useState } from "react";
import JournalDetail from "@/components/Journals/JournalDetail";
import {
  JournalListLaptop,
  JournalListMobile,
} from "@/components/Journals/JournalList";

const Journal = () => {
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <JournalDetail />
      <JournalListLaptop />
      <JournalListMobile />
    </div>
  );
};

export default Journal;
