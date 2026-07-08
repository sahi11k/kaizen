import { BookOpen, Link2, ExternalLink, Dot } from "lucide-react";
import { MoreOptions, Pill } from "@/shared/ui";
import {
  useDeleteBookmarkedItemMutation,
  useUpdateBookmarkedItemMutation,
} from "@/features/bookmarked/mutations";
import { cn } from "@/shared/lib/utils";

const STATUS_CYCLE = ["pending", "reading", "finished"];

const STATUS_LABEL = {
  pending: "Pending",
  reading: "Reading",
  finished: "Finished",
};

const base =
  "surface-card group relative flex items-center gap-3 px-3.5 py-3 rounded-lg transition-colors hover:bg-muted";

function TypeIcon({ type, status }) {
  const active = status === "reading";
  const Icon = type === "book" ? BookOpen : Link2;
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-muted shrink-0">
      <Icon
        className={cn(
          "w-4 h-4",
          active ? "text-primary" : "text-muted-foreground",
        )}
      />
    </div>
  );
}

export default function BookmarkedItem({ item, userId, onEdit }) {
  const deleteMutation = useDeleteBookmarkedItemMutation();
  const updateMutation = useUpdateBookmarkedItemMutation();

  const cycleStatus = (e) => {
    e.stopPropagation();
    const idx = STATUS_CYCLE.indexOf(item.status);
    const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
    updateMutation.mutate({ id: item.id, item: { status: next }, userId });
  };

  const handleDelete = () => {
    deleteMutation.mutate({ id: item.id, userId });
  };

  const done = item.status === "finished";

  return (
    <li className={cn(base, done && "opacity-55 hover:opacity-75")}>
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 rounded-lg"
          aria-label={`Open: ${item.title}`}
        />
      )}
      <TypeIcon type={item.type} status={item.status} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <p
            className={cn(
              "body-base !text-foreground truncate",
              done && "line-through",
            )}
          >
            {item.title}
          </p>
          {item.url && (
            <ExternalLink className="w-3.5 h-3.5 shrink-0 text-subtle-foreground" />
          )}
        </div>
        {item.tags?.length > 0 && (
          <p className="body-description mt-0.5 flex items-center flex-wrap">
            {item.tags.slice(0, 3).map((tag, i) => (
              <span key={tag} className="inline-flex items-center">
                {i > 0 && <Dot className="size-4" aria-hidden />}
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && <> + {item.tags.length - 3} more</>}
          </p>
        )}
      </div>

      <Pill
        className={cn(
          "relative z-10",
          updateMutation.isPending && "opacity-50 pointer-events-none",
        )}
        label={STATUS_LABEL[item.status]}
        variant={item.status === "pending" ? "inactive" : "active"}
        onClick={cycleStatus}
      />

      <MoreOptions
        triggerClassName="relative z-10 !p-0 w-0 overflow-hidden group-hover:w-auto data-[state=open]:w-auto hover:bg-transparent"
        contentClassName="border-border"
        align="end"
        items={[
          { label: "Edit", onClick: () => onEdit(item) },
          {
            label: "Delete",
            onClick: handleDelete,
            className: "hover:!bg-destructive/10 !text-destructive",
          },
        ]}
      />
    </li>
  );
}
