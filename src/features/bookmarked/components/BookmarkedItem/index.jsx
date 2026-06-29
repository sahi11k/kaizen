import { BookOpen, Link2, ExternalLink } from 'lucide-react';
import { MoreOptions, Pill } from '@/shared/ui';
import { useDeleteBookmarkedItemMutation, useUpdateBookmarkedItemMutation } from '@/features/bookmarked/mutations';
import { cn } from '@/shared/lib/utils';

const STATUS_CYCLE = ['pending', 'reading', 'finished'];


const STATUS_LABEL = {
  pending:  'Pending',
  reading:  'Reading',
  finished: 'Finished',
};


function TypeIcon({ type, status }) {
  const active = status === 'reading';
  const Icon = type === 'book' ? BookOpen : Link2;
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-secondary shrink-0">
      <Icon className={cn('w-4 h-4', active ? 'text-primary' : 'text-muted-foreground')} />
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

  const done = item.status === 'finished';

  return (
    <div className="group flex items-center gap-3 px-3.5 py-3 rounded-lg transition-colors border border-border hover:bg-muted">
      <TypeIcon type={item.type} status={item.status} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={cn('text-base font-semibold font-heading truncate hover:underline', done ? 'line-through text-muted-foreground' : 'text-foreground')}
            >
              {item.title}
            </a>
          ) : (
            <p className={cn('text-base font-semibold font-heading truncate', done ? 'line-through text-muted-foreground' : 'text-foreground')}>
              {item.title}
            </p>
          )}
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        {item.tags?.length > 0 && (
          <p className="text-xs font-heading text-muted-foreground mt-0.5">
            {item.tags.slice(0, 3).map((tag, i) => (
              <span key={tag}>
                {i > 0 && <span className="text-sm mx-0.5">·</span>}
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && <> + {item.tags.length - 3} more</>}
          </p>
        )}
      </div>

      <Pill
        label={STATUS_LABEL[item.status]}
        variant={item.status === 'reading' ? 'active' : 'inactive'}
        onClick={cycleStatus}
        className={updateMutation.isPending ? 'opacity-50 pointer-events-none' : ''}
      />

      <MoreOptions
        triggerClassName="!p-0 w-0 overflow-hidden group-hover:w-auto data-[state=open]:w-auto hover:bg-transparent"
        contentClassName="border-border"
        align="end"
        items={[
          { label: 'Edit', onClick: () => onEdit(item) },
          {
            label: 'Delete',
            onClick: handleDelete,
            className: 'hover:!bg-destructive/10 !text-destructive',
          },
        ]}
      />
    </div>
  );
}
