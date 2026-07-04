import { useState, useEffect } from "react";
import {
  ResponsiveDialog,
  Button,
  Input,
  Textarea,
  Pill,
  Select,
} from "@/shared/ui";
import {
  useCreateBookmarkedItemMutation,
  useUpdateBookmarkedItemMutation,
} from "@/features/bookmarked/mutations";
import {
  DEFAULT_BOOKMARKED_FORM_STATE,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "@/features/bookmarked/constants";

export default function BookmarkedFormDialog({
  open,
  onClose,
  userId,
  editItem = null,
}) {
  const [form, setForm] = useState(DEFAULT_BOOKMARKED_FORM_STATE);

  const createMutation = useCreateBookmarkedItemMutation();
  const updateMutation = useUpdateBookmarkedItemMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (editItem) {
      setForm({
        type: editItem.type,
        title: editItem.title,
        url: editItem.url ?? "",
        author: editItem.author ?? "",
        notes: editItem.notes ?? "",
        tags: editItem.tags?.join(", ") ?? "",
        status: editItem.status,
      });
    } else {
      setForm(DEFAULT_BOOKMARKED_FORM_STATE);
    }
  }, [editItem, open]);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target?.value ?? e }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const payload = {
      type: form.type,
      title: form.title.trim(),
      url: form.url.trim() || null,
      author: form.author.trim() || null,
      notes: form.notes.trim() || null,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      status: form.status,
      createdBy: userId,
    };

    if (editItem) {
      updateMutation.mutate(
        { id: editItem.id, item: payload, userId },
        { onSuccess: onClose },
      );
    } else {
      createMutation.mutate({ item: payload, userId }, { onSuccess: onClose });
    }
  };

  const footer = (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        disabled={isPending}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        form="bookmarked-form"
        disabled={isPending || !form.title.trim()}
      >
        {isPending ? "Saving…" : editItem ? "Save" : "Add"}
      </Button>
    </>
  );

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title={editItem ? "Edit Reading Entry" : "Add Reading Entry"}
      footer={footer}
    >
      <form
        id="bookmarked-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-2">
          {TYPE_OPTIONS.map((opt) => (
            <Pill
              key={opt.value}
              label={opt.label}
              variant={form.type === opt.value ? "active" : "inactive"}
              onClick={() => setForm((f) => ({ ...f, type: opt.value }))}
            />
          ))}
        </div>

        <Input
          placeholder="Title *"
          value={form.title}
          onChange={set("title")}
          required
        />

        <Input
          placeholder="URL"
          value={form.url}
          onChange={set("url")}
          type="url"
        />

        {form.type === "book" && (
          <Input
            placeholder="Author"
            value={form.author}
            onChange={set("author")}
          />
        )}

        <Textarea
          placeholder="Notes"
          value={form.notes}
          onChange={set("notes")}
          rows={3}
        />

        <Input
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={set("tags")}
        />

        <Select
          value={form.status}
          onChange={set("status")}
          options={STATUS_OPTIONS}
          placeholder="Status"
        />
      </form>
    </ResponsiveDialog>
  );
}
