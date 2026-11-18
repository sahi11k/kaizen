import { Skeleton } from "@/shared/ui";

const GridSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 pb-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="surface-card flex items-center gap-3 px-3 py-3 sm:px-4 sm:py-3.5 xl:px-5 xl:py-4 rounded-lg"
        >
          <Skeleton className="hidden sm:block w-8 h-8 rounded-lg shrink-0" />
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <Skeleton className="h-5 w-1/2 rounded" />
            <Skeleton className="h-3 w-1/4 rounded" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  );
};

export default GridSkeleton;
