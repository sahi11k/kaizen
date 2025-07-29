import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import JournalCard from "@/components/Journals/JournalCard";
import InputBox from "@/components/Journals/InputBox";
import useJournalsStore from "@/store/journals";
import NoDataView from "@/utils/components/NoDataView";
import useAuthStore from "@/store/auth";
import { fetchJournals } from "@/db/apis/journals";
import Skeleton from "@/utils/components/Skeleton";

const JournalList = ({ isInputBoxOpen, setIsInputBoxOpen }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { journals, setJournals } = useJournalsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const loadJournals = async () => {
      if (!user?.id) return;
      setIsLoading(true);
      const response = await fetchJournals(user.id);
      setJournals(response.data);
      setIsLoading(false);
    };

    loadJournals();
  }, [setJournals, user?.id]);

  return (
    <div className={` ${styles.journalListContainer}`}>
      {isInputBoxOpen && <InputBox setIsInputBoxOpen={setIsInputBoxOpen} />}
      {isLoading && <Skeleton count={3} height={200} />}
      {journals.length === 0 && !isLoading && <NoDataView />}
      {!isLoading &&
        journals.map((journal) => (
          <JournalCard key={journal.id} journal={journal} />
        ))}
    </div>
  );
};

export default JournalList;
