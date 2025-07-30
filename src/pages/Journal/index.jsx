import React, { useState } from "react";
import JournalList from "@/components/Journals/JournalList";
import Header from "@/components/Journals/Header";
import styles from "./style.module.css";
import { CREATE } from "@/utils/constants";

const Journal = () => {
  const [isInputBoxOpen, setIsInputBoxOpen] = useState(false);
  const [mode, setMode] = useState(CREATE);

  const showInputHandler = () => {
    setIsInputBoxOpen(true);
    setMode(CREATE);
  };

  return (
    <div className={styles.journalContainer}>
      <Header showInputHandler={showInputHandler} />
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
