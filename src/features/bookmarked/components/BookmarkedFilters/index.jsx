import { SlidersHorizontal, X } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent, Button } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';

const TYPE_OPTIONS = [
  { value: 'book', label: 'Books' },
  { value: 'link', label: 'Links' },
];

const STATUS_OPTIONS = [
  { value: 'want_to_read', label: 'Want to Read' },
  { value: 'reading', label: 'Reading' },
  { value: 'finished', label: 'Finished' },
];

function OptionPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-3 py-1 rounded-full text-sm font-medium border-2 transition-colors cursor-pointer',
        active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-overlay text-muted-foreground border-foreground/20 hover:border-primary/60',
      )}
    >
      {label}
    </button>
  );
}

function ActiveTag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
      {label}
      <button type="button" onClick={onRemove} className="hover:opacity-70 transition-opacity">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

export default function BookmarkedFilters({ activeTypes, activeStatuses, onTypeToggle, onStatusToggle, onClearAll }) {
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
    <div className="sticky top-[5.25rem] md:top-[6.25rem] z-20 bg-background pb-3 before:absolute before:inset-x-0 before:bottom-full before:h-1 before:bg-background flex flex-wrap items-center gap-2 relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1.5">
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
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</p>
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map((opt) => (
                <OptionPill
                  key={opt.value}
                  label={opt.label}
                  active={activeTypes.has(opt.value)}
                  onClick={() => onTypeToggle(opt.value)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</p>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <OptionPill
                  key={opt.value}
                  label={opt.label}
                  active={activeStatuses.has(opt.value)}
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
        <ActiveTag key={tag.key} label={tag.label} onRemove={tag.onRemove} />
      ))}
    </div>
  );
}
