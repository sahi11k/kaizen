import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { SquarePen } from "lucide-react";
import JournalList from "@/features/journals/components/JournalList";
import JournalEditor from "@/features/journals/components/JournalEditor";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";
import useJournalsStore from "@/features/journals/store";
import { useAuthStore } from "@/features/auth";
import { useJournalByIdQuery } from "@/features/journals/queries";
import { DEFAULT_JOURNAL_STATE } from "@/features/journals/constants";
import { EmptyState, EmptyStateAction, Skeleton } from "@/shared/ui";

const JOURNALS_ROUTE = "/dashboard/journals";

const JournalDetailShell = ({ children }) => (
  <div className="h-full bg-background px-3 py-3 md:px-6 md:py-5 lg:px-8">
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col">
      {children}
    </div>
  </div>
);

const JournalEditorSkeleton = () => (
  <JournalDetailShell>
    <div className="flex min-w-0 w-full flex-col">
      <div className="relative mx-4 shrink-0 bg-background pt-5 pb-3 max-[480px]:pt-4 max-[480px]:pb-3 md:mx-6 md:pt-6 md:pb-4">
        <div className="space-y-3">
          <Skeleton className="h-9 w-3/4 rounded-lg bg-card md:h-10" />
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-5 w-44 rounded-full bg-card" />
            <Skeleton className="h-5 w-28 rounded-full bg-card" />
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-col">
        <Skeleton className="mx-4 my-1 h-11 w-80 max-w-[calc(100%-2rem)] rounded-lg bg-card md:mx-6 md:w-[42rem]" />
        <div className="space-y-4 px-4 pt-3 md:px-6">
          <Skeleton className="h-7 w-11/12 rounded-lg bg-card" />
          <Skeleton className="h-4 w-full rounded-lg bg-card" />
          <Skeleton className="h-4 w-5/6 rounded-lg bg-card" />
          <Skeleton className="h-4 w-3/4 rounded-lg bg-card" />
          <Skeleton className="h-80 w-full rounded-lg bg-card" />
          <Skeleton className="h-44 w-4/5 rounded-lg bg-card" />
        </div>
      </div>
    </div>
  </JournalDetailShell>
);

const JournalEditorRoute = ({ mode }) => {
  const navigate = useNavigate();
  const { journalId } = useParams();
  const { user } = useAuthStore();
  const {
    data: matchingJournal,
    isLoading,
  } = useJournalByIdQuery(journalId, user?.id, mode === "detail");
  const {
    unsavedJournal,
    setUnsavedJournal,
  } = useJournalsStore();

  useEffect(() => {
    if (mode !== "new" || unsavedJournal) return;
    const journal = {
      ...DEFAULT_JOURNAL_STATE,
      id: crypto.randomUUID(),
    };
    setUnsavedJournal(journal);
  }, [mode, setUnsavedJournal, unsavedJournal]);

  const goBack = () => {
    navigate(JOURNALS_ROUTE);
  };

  const handleNewJournalSaved = useCallback(
    (savedJournal) => {
      setUnsavedJournal(null);
      navigate(`${JOURNALS_ROUTE}/${savedJournal.id}`, { replace: true });
    },
    [navigate, setUnsavedJournal],
  );

  const activeJournal = mode === "new" ? unsavedJournal : matchingJournal;

  if ((mode === "detail" && isLoading) || (mode === "new" && !activeJournal)) {
    return <JournalEditorSkeleton />;
  }

  const detailNotFound =
    mode === "detail" &&
    !isLoading &&
    journalId &&
    !matchingJournal;

  if (detailNotFound) {
    return (
      <JournalDetailShell>
        <EmptyState
          title="Journal not found."
          description="This entry may have been deleted or is no longer available."
          action={
            <EmptyStateAction to={JOURNALS_ROUTE}>
              ← Back to journals
            </EmptyStateAction>
          }
        />
      </JournalDetailShell>
    );
  }

  return (
    <JournalDetailShell>
      <JournalEditor
        journal={activeJournal}
        onBack={goBack}
        onNewJournalSaved={mode === "new" ? handleNewJournalSaved : undefined}
      />
    </JournalDetailShell>
  );
};

const JournalLibraryRoute = () => {
  return (
    <div className="min-h-full bg-background px-3 py-3 md:px-6 md:py-5 lg:px-8">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col">
        <JournalList
          showHeader
          headerTitle="Journals"
          headerButtonLabel="New"
          headerButtonIcon={<SquarePen className="size-4" />}
        />
      </div>
    </div>
  );
};

const Journal = ({ mode = "list" }) => {
  useDocumentTitle(BROWSER_TAB_TITLES.JOURNALS);

  if (mode === "new" || mode === "detail") {
    return <JournalEditorRoute mode={mode} />;
  }

  return <JournalLibraryRoute />;
};

export default Journal;
