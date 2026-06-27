import { useState } from 'react';
import { BookOpen, Link2, ExternalLink, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/ui';
import { useDeleteBookmarkedItemMutation, useUpdateBookmarkedItemMutation } from '@/features/bookmarked/mutations';
import { cn } from '@/shared/lib/utils';

const STATUS_CYCLE = ['want_to_read', 'reading', 'finished'];

const STATUS_BADGE = {
  want_to_read: 'bg-[#2A2A2A] border border-[#444] text-[#888]',
  reading:      'bg-sidebar-active text-sidebar-active-foreground border border-primary/30',
  finished:     'bg-[#2A2A2A] border border-[#444] text-[#888]',
};

const STATUS_LABEL = {
  want_to_read: 'Want to Read',
  reading:      'Reading',
  finished:     'Done',
};

const TYPE_LABEL = {
  book: 'Book',
  link: 'Link',
};

function TypeIcon({ type, status }) {
  const active = status === 'reading';
  const Icon = type === 'book' ? BookOpen : Link2;
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#2A2A2A] shrink-0">
      <Icon className={cn('w-4 h-4', active ? 'text-primary' : 'text-[#555]')} />
    </div>
  );
}

export default function BookmarkedItem({ item, userId, onEdit }) {
  const [hovered, setHovered] = useState(false);
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
    <div
      className="flex items-center gap-3 px-3.5 py-3 rounded-lg transition-colors"
      style={{ backgroundColor: hovered ? '#222222' : '#1A1A1A' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TypeIcon type={item.type} status={item.status} />

      {/* Title + type label */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-base truncate',
            done ? 'line-through text-[#555]' : 'text-[#F2F2F2]',
          )}
        >
          {item.title}
        </p>
        <p className="text-xs text-[#555] mt-0.5">{TYPE_LABEL[item.type] ?? item.type}</p>
      </div>

      {/* Status badge */}
      <button
        type="button"
        onClick={cycleStatus}
        disabled={updateMutation.isPending}
        className={cn(
          'shrink-0 px-2 py-0.5 rounded-full text-[11px] font-medium cursor-pointer transition-opacity',
          STATUS_BADGE[item.status],
          updateMutation.isPending && 'opacity-50',
        )}
      >
        {STATUS_LABEL[item.status]}
      </button>

      {/* External link — only on hover, only if URL exists */}
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={cn(
            'shrink-0 text-[#555] hover:text-primary transition-all',
            hovered ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      )}

      {/* Three-dot menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="shrink-0 ml-2 text-[#555] hover:text-foreground transition-colors cursor-pointer">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(item)}>Edit</DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-destructive focus:text-destructive"
            disabled={deleteMutation.isPending}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
