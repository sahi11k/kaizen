import React, { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router";
import JournalEditor from "@/features/journals/components/JournalEditor";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";
import useJournalsStore from "@/features/journals/store";
import { useAuthStore } from "@/features/auth";
import { useJournalByIdQuery } from "@/features/journals/queries";
import { DEFAULT_JOURNAL_STATE } from "@/features/journals/constants";
import { EmptyState, EmptyStateAction } from "@/shared/ui";
import JournalEditorSkeleton from "@/features/journals/components/JournalEditor/JournalEditorSkeleton";

const JOURNALS_ROUTE = "/dashboard/journals";

const JournalEditorPage = () => {
  useDocumentTitle(BROWSER_TAB_TITLES.JOURNALS);
  const { journalId } = useParams();
  const isNew = !journalId;

  const { user } = useAuthStore();
  const { data: matchingJournal, isLoading } = useJournalByIdQuery(
    journalId,
    user?.id,
    !isNew,
  );
  const { unsavedJournal, setUnsavedJournal } = useJournalsStore();
  const savedJournalRef = useRef(null);

  useEffect(() => {
    if (!isNew || unsavedJournal) return;
    const journal = {
      ...DEFAULT_JOURNAL_STATE,
      id: crypto.randomUUID(),
    };
    setUnsavedJournal(journal);
  }, [isNew, setUnsavedJournal, unsavedJournal]);

  const handleNewJournalSaved = useCallback(
    (savedJournal) => {
      savedJournalRef.current = savedJournal;
      window.history.replaceState(null, '', `${JOURNALS_ROUTE}/${savedJournal.id}`);
    },
    [],
  );

  // Once saved, clean up unsavedJournal on unmount so it doesn't persist stale state
  useEffect(() => {
    return () => {
      if (savedJournalRef.current) {
        setUnsavedJournal(null);
      }
    };
  }, [setUnsavedJournal]);

  const activeJournal = isNew ? (unsavedJournal ?? savedJournalRef.current) : matchingJournal;

  if ((!isNew && isLoading) || (isNew && !activeJournal)) {
    return <JournalEditorSkeleton />;
  }

  const detailNotFound = !isNew && !isLoading && journalId && !matchingJournal;

  if (detailNotFound) {
    return (
      <EmptyState
        code="404"
        title="Journal not found"
        description="This journal may have been deleted or is no longer available."
        action={
          <EmptyStateAction to={JOURNALS_ROUTE}>
            Back to journals
          </EmptyStateAction>
        }
        className="flex justify-center items-center h-full"
      />
    );
  }

  return (
    <JournalEditor
      journal={activeJournal}
      onNewJournalSaved={isNew ? handleNewJournalSaved : undefined}
    />
  );
};

export default JournalEditorPage;
