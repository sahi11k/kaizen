import React from "react";
import { Skeleton } from "@/shared/ui";

const base = "surface-card rounded-lg p-6 !pt-4";

const JournalListSkeleton = () => (
  <div className="flex flex-col gap-6" aria-hidden="true">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className={base}>
        <Skeleton className="h-3 w-36 rounded" />
        <Skeleton className="h-6 w-2/5 rounded mt-3 mb-2.5" />
        <Skeleton className="h-16 w-full rounded" />
      </div>
    ))}
  </div>
);

export default JournalListSkeleton;
