import { X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const pillBase = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors';

const pillVariants = {
  active: 'bg-primary-soft text-primary-soft-foreground border-primary/30',
  inactive: 'bg-muted text-muted-foreground border-border',
};

interface PillProps {
  label: string;
  variant?: keyof typeof pillVariants;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}

export const Pill = ({ label, variant = 'inactive', onClick, onRemove, className }: PillProps) => {
  const Tag = onClick ? 'button' : 'span';

  return (
    <Tag
      {...(onClick ? { type: 'button' as const, onClick } : {})}
      className={cn(
        pillBase,
        pillVariants[variant],
        onClick && 'cursor-pointer hover:text-foreground hover:border-primary/30',
        className,
      )}
    >
      {label}
      {onRemove && (
        <button type="button" onClick={onRemove} className="hover:opacity-70 transition-opacity">
          <X className="w-3 h-3" />
        </button>
      )}
    </Tag>
  );
};
