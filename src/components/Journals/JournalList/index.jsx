import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import JournalCard from "@/components/Journals/JournalCard";
import InputBox from "@/components/Journals/InputBox";
import useJournalsStore from "@/store/journals";
import NoDataView from "@/utils/components/NoDataView";
import useAuthStore from "@/store/auth";
import { deleteJournal, fetchJournals } from "@/db/apis/journals";
import Skeleton from "@/utils/components/Skeleton";
import { Toast } from "@/utils/components/Toast";
import { CREATE, EDIT, PAGINATION } from "@/utils/constants";

const { toast } = Toast;

const JournalList = ({ isInputBoxOpen, setIsInputBoxOpen, mode, setMode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { journals, setJournals } = useJournalsStore();
  const [hasMoreJournals, setHasMoreJournals] = useState(true);

  const [currentJournal, setCurrentJournal] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const loadJournals = async () => {
      if (!user?.id) return;
      setIsLoading(true);
      const response = await fetchJournals(
        user.id,
        0,
        PAGINATION.JOURNALS_PAGE_SIZE
      );
      setHasMoreJournals(
        response.data.length === PAGINATION.JOURNALS_PAGE_SIZE
      );
      setJournals(response.data);
      setIsLoading(false);
    };

    loadJournals();
  }, [setJournals, user?.id]);

  const removeJournal = async (journalId) => {
    const res = await deleteJournal(journalId, user.id);
    if (res.error) {
      return toast.error(res.error);
    }
    const updatedJournals = journals.filter((j) => j.id !== journalId);
    setJournals(updatedJournals);
    toast.success("Journal deleted successfully");
  };

  const onResetFormCallback = () => {
    setIsInputBoxOpen(false);
    setMode(CREATE);
    setCurrentJournal(null);
  };

  const loadMoreJournals = async () => {
    setIsLoading(true);
    const res = await fetchJournals(
      user.id,
      journals.length,
      PAGINATION.JOURNALS_PAGE_SIZE
    );

    if (res.error) {
      setIsLoading(false);
      return toast.error("Error loading more journals");
    }
    setJournals([...journals, ...res.data]);
    setHasMoreJournals(res.data.length === PAGINATION.JOURNALS_PAGE_SIZE);
    setIsLoading(false);
  };

  return (
    <div className={` ${styles.journalListContainer}`}>
      {isInputBoxOpen && mode === CREATE && (
        <InputBox mode={mode} onResetFormCallback={onResetFormCallback} />
      )}
      {isLoading && !journals?.length && <Skeleton count={3} height={200} />}
      {journals?.length === 0 && !isLoading && !isInputBoxOpen && (
        <NoDataView />
      )}
      {journals?.length > 0 &&
        journals?.map((journal) => {
          if (mode === EDIT && currentJournal?.id === journal.id) {
            return (
              <InputBox
                key={journal.id}
                mode={EDIT}
                currentJournal={currentJournal}
                onResetFormCallback={onResetFormCallback}
              />
            );
          }
          return (
            <JournalCard
              key={journal.id}
              journal={journal}
              removeJournal={removeJournal}
              editJournal={(selectedJournal) => {
                setMode(EDIT);
                setCurrentJournal(selectedJournal);
              }}
            />
          );
        })}
      {!isLoading && journals?.length > 0 && hasMoreJournals && (
        <div className={styles.loadMoreContainer}>
          <button
            className={`${styles.loadMoreButton} btn btn--primary`}
            onClick={loadMoreJournals}
          >
            Load More
          </button>
        </div>
      )}
      {isLoading && journals?.length && <Skeleton count={3} height={200} />}
    </div>
  );
};

export default JournalList;
