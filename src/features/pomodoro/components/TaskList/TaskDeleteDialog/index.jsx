import React from "react";

import { Button, ResponsiveDialog } from "@/shared/ui";

const TaskDeleteDialog = ({
  task,
  isDeleting,
  onCancel,
  onConfirm,
}) => (
  <ResponsiveDialog
    open={!!task}
    onOpenChange={(open) => {
      if (!open) onCancel();
    }}
    title="Delete Task"
    contentClassName="w-md p-6 shadow-md"
    footer={
      <>
        <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="destructive" loading={isDeleting} onClick={onConfirm}>
          Delete
        </Button>
      </>
    }
  >
    {task && (
      <p className="text-sm text-muted-foreground">
        Delete{" "}
        <strong className="font-semibold text-foreground">{task.title}</strong>
        ?{" "}
        This permanently deletes the task and all its progress history
        (sessions, counts, and related logs). This action cannot be undone.
      </p>
    )}
  </ResponsiveDialog>
);

export default TaskDeleteDialog;
