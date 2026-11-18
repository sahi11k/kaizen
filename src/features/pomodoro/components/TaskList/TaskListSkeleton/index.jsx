import React from "react";

import { Skeleton } from "@/shared/ui";

import { TASK_LIST_CLASSES } from "../constants";

const TaskListSkeleton = () => (
  <ul className={TASK_LIST_CLASSES.list} aria-hidden="true">
    {Array.from({ length: 3 }).map((_, index) => (
      <li key={index} className={TASK_LIST_CLASSES.skeletonRow}>
        <Skeleton
          className={`size-5 shrink-0 rounded-full ${TASK_LIST_CLASSES.skeletonBlock}`}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton
            className={`h-6 w-2/3 ${TASK_LIST_CLASSES.skeletonBlock}`}
          />
          <Skeleton
            className={`h-4 w-1/2 ${TASK_LIST_CLASSES.skeletonBlock}`}
          />
        </div>
      </li>
    ))}
  </ul>
);

export default TaskListSkeleton;
