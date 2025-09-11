import React, { useEffect, useMemo, useState } from "react";
import JournalListItem from "@/components/Journals/JournalListItem";
import useJournalsStore from "@/store/journals";
import useAuthStore from "@/store/auth";
import { fetchJournals } from "@/db/apis/journals";

import { FileText, SquarePen } from "lucide-react";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";
import Button from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { deepCopy } from "@/utils/jsUtils";
import { useShallow } from "zustand/react/shallow";
import { STATUS } from "@/constants/db";

const groupByMonth = (journals = []) => {
  const sortedJournals = deepCopy(journals);
  sortedJournals.sort(
    (a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
  );

  const byMonth = sortedJournals.reduce((acc, j) => {
    const key = dayjs(j.date).format("YYYY-MM");
    if (!acc[key]) acc[key] = [];
    acc[key].push(j);
    return acc;
  }, {});

  const keys = Object.keys(byMonth).sort((a, b) => (a > b ? -1 : 1));

  return keys.map((k) => ({
    key: k,
    label: dayjs(k + "-01").format("MMMM YYYY"),
    items: byMonth[k],
  }));
};

const JournalListContent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    journals,
    setJournals,
    currentJournal,
    setCurrentJournal,
    journalsFetchStatus,
    setJournalsFetchStatus,
  } = useJournalsStore(
    useShallow((state) => ({
      journals: state.journals,
      setJournals: state.setJournals,
      setCurrentJournal: state.setCurrentJournal,
      currentJournal: state.currentJournal,
      journalsFetchStatus: state.journalsFetchStatus,
      setJournalsFetchStatus: state.setJournalsFetchStatus,
    }))
  );

  const { user } = useAuthStore();

  useEffect(() => {
    const loadJournals = async () => {
      if (!user?.id) return;
      setIsLoading(true);
      const response = await fetchJournals(user.id);
      setJournals(response.data);
      setIsLoading(false);
      setJournalsFetchStatus(STATUS.FETCHED);
    };

    if (journalsFetchStatus === STATUS.LOADING) {
      loadJournals();
    }
  }, [setJournals, user?.id, journalsFetchStatus, setJournalsFetchStatus]);

  const handleJournalClick = (journal) => {
    if (currentJournal?.id === journal.id) {
      setCurrentJournal(null);
    } else {
      setCurrentJournal(journal);
    }
  };

  const grouped = useMemo(() => groupByMonth(journals), [journals]);

  return (
    <>
      <div className="mt-4 xl:mt-6 pb-2 xl:pb-4 flex items-center justify-between">
        <div>
          <span className="heading-3 mr-1">Journals</span>
        </div>
        <Tooltip content="New Journal">
          <Button
            icon={<SquarePen className="size-4" />}
            size="sm"
            onClick={() => {
              setCurrentJournal(null);
            }}
            className="hidden md:flex"
          >
            New
          </Button>
        </Tooltip>
      </div>
      <div className="h-full overflow-y-auto scrollbar-thin -mx-4 xl:-mx-6">
        <div className="">
          {grouped.map(({ key, label, items }) => (
            <section key={key} className="mb-2">
              <div className="sticky top-0 z-10 px-4 py-2 bg-muted">
                <h4 className="px-0 xl:px-2 text-xs font-semibold text-muted-foreground">
                  {label}
                </h4>
              </div>
              <ul className="mt-2 space-y-2 mx-2 xl:mx-4" role="listbox">
                {items.map((journal) => (
                  <JournalListItem
                    key={journal.id}
                    journal={journal}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJournalClick(journal);
                    }}
                    isActive={currentJournal?.id === journal.id}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="pr-6">
          {isLoading &&
            journals.length === 0 &&
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-16 w-full bg-card mb-2 rounded-lg"
              />
            ))}
        </div>
        {journals.length === 0 && !isLoading && (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <FileText className="size-8" />
              <div className="flex flex-col items-center">
                <h3 className="heading-3">No Journals</h3>
                <p className="body-description">
                  Write a journal to get started.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default JournalListContent;
