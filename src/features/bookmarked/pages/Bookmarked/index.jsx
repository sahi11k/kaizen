import { useState, useMemo } from "react";
import { useAuthStore } from "@/features/auth";
import { useBookmarkedQuery } from "@/features/bookmarked/queries";
import BookmarkedHeader from "@/features/bookmarked/components/BookmarkedHeader";
import BookmarkedFilters from "@/features/bookmarked/components/BookmarkedFilters";
import BookmarkedGrid from "@/features/bookmarked/components/BookmarkedGrid";
import BookmarkedFormDialog from "@/features/bookmarked/components/BookmarkedFormDialog";

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
    <div className="h-full bg-background px-3 py-3 md:px-6 md:py-5 lg:px-8">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col">
        <div className="mx-4 flex flex-1 flex-col md:mx-6">
          <BookmarkedHeader onAdd={handleAdd} />
          {items.length > 0 && (
            <BookmarkedFilters
              activeTypes={activeTypes}
              activeStatuses={activeStatuses}
              onTypeToggle={toggleType}
              onStatusToggle={toggleStatus}
              onClearAll={clearAll}
            />
          )}
          <div className="mt-4 pb-6">
            <BookmarkedGrid
              items={filtered}
              userId={user?.id}
              onEdit={handleEdit}
              isLoading={isLoading}
              isFiltered={isFiltered}
              onAdd={handleAdd}
              onClear={clearAll}
            />
          </div>
          <BookmarkedFormDialog
            open={dialogOpen}
            onClose={handleClose}
            userId={user?.id}
            editItem={editItem}
          />
        </div>
      </div>
    </div>
  );
}
