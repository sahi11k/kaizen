import {
  getSortedJournals,
  getTotalWordsWritten,
  getJournalStreak,
  getSelfReflectionDate,
} from "@/features/journals/helpers";
import Button from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import useJournalsStore from "@/features/journals/store/journals";
import React from "react";
import { Link } from "react-router";
import { JOURNAL_CONTENT_TRUNCATION_LENGTH } from "@/features/journals/constants/journals";

const JournalsWidget = () => {
  const { journals } = useJournalsStore();
  const sortedJournals = getSortedJournals(journals);

  const latestJournal = sortedJournals[0];
  const totalWordsWritten = getTotalWordsWritten(journals);
  const journalStreak = getJournalStreak(sortedJournals);

  const contentLength = latestJournal?.content.length;

  const truncatedContent = latestJournal?.content
    ?.slice(
      0,
      contentLength > JOURNAL_CONTENT_TRUNCATION_LENGTH
        ? JOURNAL_CONTENT_TRUNCATION_LENGTH
        : contentLength,
    )
    .concat(contentLength > JOURNAL_CONTENT_TRUNCATION_LENGTH ? "..." : "");

  return (
    <Card className="border-none shadow-none  h-full">
      <CardHeader>
        <CardTitle>
          {latestJournal
            ? `Self Reflections from ${getSelfReflectionDate(
                latestJournal?.created_at,
              )}`
            : "Take a moment to reflect"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-1 gap-4">
        {latestJournal ? (
          <>
            <div className="flex-1 line-clamp-4 w-full">{truncatedContent}</div>
            <div className="flex items-center justify-between gap-4 w-full">
              <MetricItem label="Streak" value={journalStreak} />
              <MetricItem label="Words Written" value={totalWordsWritten} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 gap-4">
            <p className="text-center">
              Write anything — <br /> a thought, a win, or just how your day
              felt.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link to="/dashboard/journals" className="w-full block">
          <Button className="w-full">
            {latestJournal ? "Take a moment to reflect" : "Write a journal"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const MetricItem = ({ label, value }) => {
  return (
    <div className="rounded-md px-6 py-2 flex-1 bg-primary-container h-full">
      <span className="text-primary-container-foreground font-medium block text-sm">
        {label}
      </span>
      <strong className="text-primary-container-foreground heading-2 !font-bold">
        {value}
      </strong>
    </div>
  );
};

export default JournalsWidget;
