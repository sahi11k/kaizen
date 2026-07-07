import { Skeleton } from "@/shared/ui";

const JournalEditorSkeleton = () => (
  <div className="h-full w-full flex-col max-w-5xl mx-auto pt-6 px-3">
    <Skeleton className="w-full h-12 mb-4" />
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-5 w-40" />
    </div>
    <Skeleton className="h-10 w-full mb-4" />
    <Skeleton className="h-60 w-full" />
  </div>
);

export default JournalEditorSkeleton;
