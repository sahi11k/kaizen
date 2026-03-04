import { getSelfReflectionDate, useJournalsQuery } from "@/features/journals";
import { getJournalsWidgetData } from "@/features/dashboard/utils/journalsWidgetHelper";
import { Button, Card } from "@/shared/ui";

import React from "react";
import { Link } from "react-router";

import { useAuthStore } from "@/features/auth";

const JournalsWidget = () => {
  const { user } = useAuthStore();

  const { data: journals } = useJournalsQuery(user.id);

  const { latestJournal, totalWordsWritten, journalStreak, truncatedContent } =
    getJournalsWidgetData(journals);

  return (
    <Card
      title={
        latestJournal
          ? `Self Reflections from ${getSelfReflectionDate(
              latestJournal?.createdAt,
            )}`
          : "Take a moment to reflect"
      }
      className="border-none shadow-none h-full"
      contentClassName="flex flex-col items-center justify-center flex-1 gap-4"
      footer={
        <Link to="/dashboard/journals" className="w-full block">
          <Button className="w-full">
            {latestJournal ? "Take a moment to reflect" : "Write a journal"}
          </Button>
        </Link>
      }
    >
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
            Write anything — <br /> a thought, a win, or just how your day felt.
          </p>
        </div>
      )}
    </Card>
  );
};

const MetricItem = ({ label, value }) => {
  return (
    <div className="rounded-lg px-6 py-2 flex-1 bg-primary-container h-full">
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
