import { Skeleton } from "@/shared/ui";

const GridSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  );
};

export default GridSkeleton;
