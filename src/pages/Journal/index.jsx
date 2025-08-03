import React, { useState } from "react";
import JournalList from "@/components/Journals/JournalList";

import { CREATE } from "@/utils/constants";
import AddJournal from "@/components/Journals/AddJournal";

const Journal = () => {
  const [isInputBoxOpen, setIsInputBoxOpen] = useState(false);
  const [mode, setMode] = useState(CREATE);

  const showInputHandler = () => {
    setIsInputBoxOpen(true);
    setMode(CREATE);
  };

  return (
    <div>
      <AddJournal showInputHandler={showInputHandler} />
      <JournalList
        isInputBoxOpen={isInputBoxOpen}
        setIsInputBoxOpen={setIsInputBoxOpen}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
};

export default Journal;
