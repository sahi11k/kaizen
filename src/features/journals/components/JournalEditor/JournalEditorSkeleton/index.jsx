import { Skeleton } from "@/shared/ui";

const JournalEditorSkeleton = () => (
  <div className="mx-auto w-full max-w-[1800px] px-6 pt-6 xl:px-12">
    <div className="flex h-full w-full flex-col">
      <Skeleton className="w-full h-12 mb-4" />
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-40" />
      </div>
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-60 w-full" />
    </div>
  </div>
);

export default JournalEditorSkeleton;
