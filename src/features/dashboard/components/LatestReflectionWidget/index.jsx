import React, { useMemo } from "react";
import { Link } from "react-router";
import { useAuthStore } from "@/features/auth";
import { useJournalsQuery } from "@/features/journals";
import { getSortedJournals, getJournalStreak, getJournalPlainText } from "@/features/journals";
import { Card, Skeleton } from "@/shared/ui";

const LatestReflectionWidget = () => {
  const { user } = useAuthStore();
  const { data: journals = [], isLoading } = useJournalsQuery(user?.id);

  const sortedJournals = useMemo(() => getSortedJournals(journals), [journals]);
  const latestJournal = sortedJournals[0];
  const journalStreak = useMemo(() => getJournalStreak(sortedJournals), [sortedJournals]);

  const hasReflection = Boolean(latestJournal?.content);
  const reflectionText = hasReflection
    ? getJournalPlainText(latestJournal.content)
    : null;

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  return (
    <Card className="h-full !pb-4" contentClassName="flex h-full flex-col">
      <p className="label-overline mb-5">
        Latest Reflection
      </p>
      {hasReflection ? (
        <p className="font-sans text-sm leading-relaxed line-clamp-5 text-foreground/70">
          {reflectionText}
        </p>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="font-sans text-sm leading-snug text-center text-subtle-foreground italic">
            No reflections yet.
            <br />
            <Link to="/dashboard/journals/new" className="text-muted-foreground underline">
              Write a journal
            </Link>{" "}
            to get started.
          </p>
        </div>
      )}
      {hasReflection && (
        <div className="mt-auto pt-3 border-t border-border flex items-center">
          <span className="text-xs text-primary tracking-wide">
            {journalStreak > 0 ? (
              <><span className="font-mono tracking-tight">{journalStreak}</span>-day streak — active</>
            ) : (
              "No streak yet — write to start one"
            )}
          </span>
        </div>
      )}
    </Card>
  );
};

export default LatestReflectionWidget;
