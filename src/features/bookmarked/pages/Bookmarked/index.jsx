import { useState, useMemo } from "react";
import { useAuthStore } from "@/features/auth";
import { useBookmarkedQuery } from "@/features/bookmarked/queries";
import BookmarkedFilters from "@/features/bookmarked/components/BookmarkedFilters";
import BookmarkedGrid from "@/features/bookmarked/components/BookmarkedGrid";
import BookmarkedFormDialog from "@/features/bookmarked/components/BookmarkedFormDialog";
import { PageHeader, Button } from "@/shared/ui";
import { Plus } from "lucide-react";

export default function Bookmarked() {
  const { user } = useAuthStore();
  const { data: items = [], isLoading } = useBookmarkedQuery(user?.id);

  const [activeTypes, setActiveTypes] = useState(new Set());
  const [activeStatuses, setActiveStatuses] = useState(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const toggleType = (value) =>
    setActiveTypes((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });

  const toggleStatus = (value) =>
    setActiveStatuses((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });

  const clearAll = () => {
    setActiveTypes(new Set());
    setActiveStatuses(new Set());
  };

  const isFiltered = activeTypes.size > 0 || activeStatuses.size > 0;

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchType = activeTypes.size === 0 || activeTypes.has(item.type);
      const matchStatus =
        activeStatuses.size === 0 || activeStatuses.has(item.status);
      return matchType && matchStatus;
    });
  }, [items, activeTypes, activeStatuses]);

  const handleAdd = () => {
    setEditItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setEditItem(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-6">
      <PageHeader
        title="Bookmarked"
        subtitle="Books, articles, and links worth your time."
        action={
          <Button
            icon={<Plus className="size-4" />}
            onClick={handleAdd}
            size="sm"
          >
            Add
          </Button>
        }
      />
      {items.length > 0 && (
        <BookmarkedFilters
          activeTypes={activeTypes}
          activeStatuses={activeStatuses}
          onTypeToggle={toggleType}
          onStatusToggle={toggleStatus}
          onClearAll={clearAll}
        />
      )}
      <BookmarkedGrid
        items={filtered}
        userId={user?.id}
        onEdit={handleEdit}
        isLoading={isLoading}
        isFiltered={isFiltered}
        onAdd={handleAdd}
        onClear={clearAll}
      />
      <BookmarkedFormDialog
        open={dialogOpen}
        onClose={handleClose}
        userId={user?.id}
        editItem={editItem}
      />
    </div>
  );
}
