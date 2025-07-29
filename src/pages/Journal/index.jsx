import React, { useState } from "react";
import JournalList from "@/components/Journals/JournalList";
import Header from "@/components/Journals/Header";
import styles from "./style.module.css";

const Journal = () => {
  const [isInputBoxOpen, setIsInputBoxOpen] = useState(false);
  return (
    <div className={styles.journalContainer}>
      <Header setIsInputBoxOpen={setIsInputBoxOpen} />
      <JournalList
        isInputBoxOpen={isInputBoxOpen}
        setIsInputBoxOpen={setIsInputBoxOpen}
      />
    </div>
  );
};

export default Journal;
