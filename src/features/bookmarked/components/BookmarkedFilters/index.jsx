import { SlidersHorizontal } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Pill,
} from "@/shared/ui";

const TYPE_OPTIONS = [
  { value: "book", label: "Books" },
  { value: "link", label: "Links" },
];

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "reading", label: "Reading" },
  { value: "finished", label: "Finished" },
];

export default function BookmarkedFilters({
  activeTypes,
  activeStatuses,
  onTypeToggle,
  onStatusToggle,
  onClearAll,
}) {
  const totalActive = activeTypes.size + activeStatuses.size;

  const activeTags = [
    ...TYPE_OPTIONS.filter((o) => activeTypes.has(o.value)).map((o) => ({
      key: `type-${o.value}`,
      label: o.label,
      onRemove: () => onTypeToggle(o.value),
    })),
    ...STATUS_OPTIONS.filter((o) => activeStatuses.has(o.value)).map((o) => ({
      key: `status-${o.value}`,
      label: o.label,
      onRemove: () => onStatusToggle(o.value),
    })),
  ];

  return (
    <div className="sticky top-[6.25rem] md:top-[7.5rem] z-30 bg-background pb-3 before:absolute before:inset-x-0 before:bottom-full before:h-3 before:bg-background md:before:h-5 flex flex-wrap items-center gap-2 relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 bg-card"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filter
            {totalActive > 0 && (
              <span className="ml-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-foreground text-background text-[10px] font-bold">
                {totalActive}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-64 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-label text-muted-foreground">Type</p>
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map((opt) => (
                <Pill
                  key={opt.value}
                  label={opt.label}
                  variant={activeTypes.has(opt.value) ? "active" : "inactive"}
                  onClick={() => onTypeToggle(opt.value)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-label text-muted-foreground">Status</p>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <Pill
                  key={opt.value}
                  label={opt.label}
                  variant={
                    activeStatuses.has(opt.value) ? "active" : "inactive"
                  }
                  onClick={() => onStatusToggle(opt.value)}
                />
              ))}
            </div>
          </div>
          {totalActive > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left"
            >
              Clear all filters
            </button>
          )}
        </PopoverContent>
      </Popover>

      {activeTags.map((tag) => (
        <Pill
          key={tag.key}
          label={tag.label}
          variant="active"
          onRemove={tag.onRemove}
        />
      ))}
    </div>
  );
}
