import React from "react";
import JournalListContent from "../JournalListContent";

const JournalListLaptop = () => {
  return (
    <div className="hidden lg:flex w-100 px-6 flex-col border-l border-border h-full">
      <JournalListContent />
    </div>
  );
};

export default JournalListLaptop;
