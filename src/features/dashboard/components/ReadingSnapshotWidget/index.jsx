import React, { useMemo } from "react";
import dayjs from "dayjs";
import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import { useAuthStore } from "@/features/auth";
import { useBookmarkedQuery } from "@/features/bookmarked";
import { Card, Skeleton } from "@/shared/ui";
import { formatDaysAgo } from "../../utils/timeFormat";

const MetricCell = ({ value, label, highlight }) => (
  <div className="text-center px-2">
    <div
      className={`heading-4 !font-mono mb-1.5 ${
        value === 0 ? "text-subtle-foreground" : highlight ? "text-primary" : "text-foreground"
      }`}
    >
      {value}
    </div>
    <div className="text-label text-subtle-foreground">
      {label}
    </div>
  </div>
);

const ReadingSnapshotWidget = () => {
  const { user } = useAuthStore();
  const { data: items = [], isLoading } = useBookmarkedQuery(user?.id);

  const { pending, reading, finished, highlightItem } = useMemo(() => {
    const pendingItems = items.filter((i) => i.status === "pending");
    const readingItems = items.filter((i) => i.status === "reading");
    const finishedItems = items.filter((i) => i.status === "finished");

    const currentlyReading = readingItems[0];

    let highlight = null;
    if (currentlyReading) {
      highlight = {
        label: "Currently Reading",
        title: currentlyReading.title,
        url: currentlyReading.url,
        days: null,
      };
    } else {
      const latestAdded = items.reduce((newest, item) => {
        if (!newest) return item;
        return dayjs(item.createdAt).isAfter(dayjs(newest.createdAt)) ? item : newest;
      }, null);
      if (latestAdded) {
        highlight = {
          label: "Newly Added",
          title: latestAdded.title,
          url: latestAdded.url,
          days: null,
        };
      }
    }

    return {
      pending: pendingItems.length,
      reading: readingItems.length,
      finished: finishedItems.length,
      highlightItem: highlight,
    };
  }, [items]);

  const hasActivity = pending > 0 || reading > 0 || finished > 0;

  if (isLoading) {
    return (
      <Skeleton className="h-full w-full py-3 md:py-4 xl:py-6 px-3 md:px-4 xl:px-6" />
    );
  }

  return (
    <Card
      className="h-full py-3 md:py-4 xl:py-6"
      contentClassName="flex h-full flex-col px-3 md:px-4 xl:px-6"
    >
      <p className="text-label mb-5">
        Reading Snapshot
      </p>

      {hasActivity ? (
        <>
          <div
            className="grid mb-5 pb-5 border-b border-border items-center"
            style={{ gridTemplateColumns: "1fr 1px 1fr 1px 1fr" }}
          >
            <MetricCell value={pending} label="Pending" />
            <div className="bg-border h-9" />
            <MetricCell value={reading} label="Reading" highlight />
            <div className="bg-border h-9" />
            <MetricCell value={finished} label="Finished" />
          </div>

          {highlightItem && (
            <div className="mt-4">
              <p className="text-label text-subtle-foreground mb-2.5">
                {highlightItem.label}
              </p>
              <p className="body-base !text-sm flex items-baseline justify-between gap-2">
                {highlightItem.url ? (
                  <a
                    href={highlightItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 truncate underline hover:text-primary"
                  >
                    <span className="truncate">{highlightItem.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                ) : (
                  <span className="truncate">{highlightItem.title}</span>
                )}
                {highlightItem.days !== null && (
                  <span className="font-sans text-xs text-subtle-foreground shrink-0">
                    {formatDaysAgo(highlightItem.days)}
                  </span>
                )}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="font-sans text-sm leading-snug text-center text-subtle-foreground italic">
            No bookmarks yet.
            <br />
            <Link to="/dashboard/bookmarked" className="text-muted-foreground underline">
              Add a bookmark
            </Link>{" "}
            to get started.
          </p>
        </div>
      )}
    </Card>
  );
};

export default ReadingSnapshotWidget;
