import React from "react";
import JournalListContent from "../JournalListContent";

const JournalListLaptop = () => {
  return (
    <div className="hidden lg:flex xl:w-100 w-75 px-6 flex-col border-l border-border h-full">
      <JournalListContent />
    </div>
  );
};

export default JournalListLaptop;
