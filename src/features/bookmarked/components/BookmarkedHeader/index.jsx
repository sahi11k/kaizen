import { Button } from '@/shared/ui';
import { Plus } from 'lucide-react';

export default function BookmarkedHeader({ onAdd }) {
  return (
    <div className="sticky top-3 md:top-5 z-30 bg-background before:absolute before:inset-x-0 before:bottom-full before:h-3 before:bg-background md:before:h-5">
      <div className="flex items-center justify-between pb-4 md:pb-5">
        <div>
          <h1 className="text-2xl font-semibold leading-tight text-foreground md:text-3xl">Bookmarked</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Books, articles, and links worth your time.</p>
        </div>
        <Button icon={<Plus className="size-4" />} onClick={onAdd} size="sm">
          Add
        </Button>
      </div>
    </div>
  );
}
