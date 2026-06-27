import { EmptyState, Skeleton } from "@/shared/ui";
import EmptyBookIllustration from "@/assets/illustrations/empty-book.svg?react";
import BookmarkedItem from "@/features/bookmarked/components/BookmarkedItem";

const GROUPS = [
  { status: "reading", label: "Reading" },
  { status: "want_to_read", label: "Want to Read" },
  { status: "finished", label: "Done" },
];

export default function BookmarkedGrid({ items, userId, onEdit, isLoading }) {
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
    return (
      <EmptyState
        className="flex-1"
        icon={
          <div className="w-72 md:w-96">
            <EmptyBookIllustration />
          </div>
        }
        title="Nothing bookmarked yet"
        description="Add books or links you want to read."
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
