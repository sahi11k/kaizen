import {
  EmptyState,
  EmptyStateAction,
  EmptyFiltered,
  Skeleton,
} from "@/shared/ui";
import BookmarkedItem from "@/features/bookmarked/components/BookmarkedItem";

const GROUPS = [
  { status: "reading", label: "Currently Reading" },
  { status: "pending", label: "Want to Read" },
  { status: "finished", label: "Finished Reading" },
];

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
    return (
      <div className="flex flex-col gap-2.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg bg-card" />
        ))}
      </div>
    );
  }

  if (!items.length) {
    if (isFiltered) {
      return <EmptyFiltered onClear={onClear} className="mt-[20%]" />;
    }
    return (
      <EmptyState
        className="border border-green-500 grow-1"
        title="Nothing bookmarked yet."
        description="Add books or articles you want to read."
        action={
          onAdd && (
            <EmptyStateAction onClick={onAdd}>
              Add a bookmark →
            </EmptyStateAction>
          )
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {GROUPS.map(({ status, label }) => {
        const group = items.filter((item) => item.status === status);
        if (!group.length) return null;
        return (
          <div key={status} className="flex flex-col gap-4">
            <div className="sticky top-[10.25rem] md:top-[11.25rem] z-20 bg-background before:absolute before:inset-x-0 before:bottom-full before:h-3 before:bg-background md:before:h-5">
              <p className="label-overline mb-2 px-1 py-1">{label}</p>
            </div>
            {group.map((item) => (
              <BookmarkedItem
                key={item.id}
                item={item}
                userId={userId}
                onEdit={onEdit}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
