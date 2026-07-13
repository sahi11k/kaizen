import { EmptyState, EmptyStateAction, EmptyFiltered } from "@/shared/ui";
import BookmarkedItem from "@/features/bookmarked/components/BookmarkedItem";
import GridSkeleton from "@/features/bookmarked/components/GridSkeleton";
import { BOOKMARKED_GROUPS } from "@/features/bookmarked/constants";

export default function BookmarkedGrid({
  items,
  userId,
  onEdit,
  isLoading,
  isFiltered,
  onAdd,
  onClear,
}) {
  if (isLoading) {
    return <GridSkeleton />;
  }

  if (!items.length) {
    if (isFiltered) {
      return <EmptyFiltered onClear={onClear} />;
    }
    return (
      <EmptyState
        className="flex-1 flex items-center justify-center"
        title="Nothing bookmarked"
        description="Add books or articles you want to read."
        action={
          onAdd && (
            <EmptyStateAction onClick={onAdd}>Add Bookmark</EmptyStateAction>
          )
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-6">
      {BOOKMARKED_GROUPS.map(({ status, label }) => {
        const group = items.filter((item) => item.status === status);
        if (!group.length) return null;
        return (
          <ul key={status} className="flex flex-col gap-3" role="listbox">
            <h4 className="sticky top-[10.5rem] z-20 bg-background text-label py-2">
              {label}
            </h4>
            {group.map((item) => (
              <>
                <BookmarkedItem
                  key={item.id}
                  item={item}
                  userId={userId}
                  onEdit={onEdit}
                />
              </>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
