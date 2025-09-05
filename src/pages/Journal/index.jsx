import React, { useState } from "react";
import JournalDetail from "@/components/Journals/JournalDetail";
import JournalListLaptop from "@/components/Journals/JournalList/JournalListLaptop";
import JournalListMobile from "@/components/Journals/JournalList/JournalListMobile";

const Journal = () => {
  const [currentJournal, setCurrentJournal] = useState({});

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <JournalDetail
        currentJournal={currentJournal}
        setCurrentJournal={setCurrentJournal}
      />
      <JournalListLaptop />
      <JournalListMobile />
    </div>
  );
};

export default Journal;
