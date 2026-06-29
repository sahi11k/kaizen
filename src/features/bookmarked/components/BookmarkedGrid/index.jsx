import { EmptyState, EmptyFiltered, Skeleton } from "@/shared/ui";
import EmptyBookIllustration from "@/assets/illustrations/empty-book.svg?react";
import BookmarkedItem from "@/features/bookmarked/components/BookmarkedItem";

const GROUPS = [
  { status: "reading", label: "Currently Reading" },
  { status: "pending", label: "Want to Read" },
  { status: "finished", label: "Finished Reading" },
];

export default function BookmarkedGrid({ items, userId, onEdit, isLoading, isFiltered, onAdd, onClear }) {
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
      return <EmptyFiltered onClear={onClear} />;
    }
    return (
      <EmptyState
        className="w-full py-20"
        icon={
          <div className="w-72 md:w-96">
            <EmptyBookIllustration />
          </div>
        }
        title="Nothing bookmarked yet"
        description="Start building your reading list — add books or links you want to revisit."
        action={
          onAdd && (
            <button
              type="button"
              onClick={onAdd}
              className="mt-2 text-sm font-medium text-primary hover:underline"
            >
              + Add your first item
            </button>
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
          <div key={status} className="flex flex-col gap-2.5">
            <p className="text-[11px] text-[#555] uppercase tracking-[0.05em] mb-2 px-1">
              {label}
            </p>
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
