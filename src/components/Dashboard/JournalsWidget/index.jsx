import {
  getSortedJournals,
  getTotalWordsWritten,
  getJournalStreak,
} from "@/components/Journals/helpers";
import Button from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useJournalsStore from "@/store/journals";
import { getSelfReflectionDate } from "@/components/Journals/helpers";
import React from "react";
import { Link } from "react-router";

const JournalsWidget = () => {
  const { journals } = useJournalsStore();
  const sortedJournals = getSortedJournals(journals);

  const latestJournal = sortedJournals[0];
  const totalWordsWritten = getTotalWordsWritten(journals);
  const journalStreak = getJournalStreak(sortedJournals);

  return (
    <Card className="border-none shadow-none  h-full">
      <CardHeader className="font-medium">
        {latestJournal
          ? `Self Reflections from ${getSelfReflectionDate(
              latestJournal?.created_at
            )}`
          : "Take a moment to reflect"}
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center flex-1 gap-4">
        {latestJournal ? (
          <>
            <div className="flex-1 line-clamp-4">{latestJournal?.content}</div>
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
    <div className="rounded-md px-6 py-2 flex-1 bg-primary-light">
      <span className="text-primary font-medium block text-sm">{label}</span>
      <strong className="text-primary heading-2 !font-bold">{value}</strong>
    </div>
  );
};

export default JournalsWidget;
