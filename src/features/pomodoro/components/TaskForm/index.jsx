import React from "react";

import { Input, Textarea, Button, ResponsiveDialog } from "@/shared/ui";
import { MAX_SESSIONS, MIN_SESSIONS } from "@/features/pomodoro/constants";
import { CREATE } from "@/shared/constants";

const TaskForm = ({
  formValues,
  setFormValues,
  showModal,
  setShowModal,
  onSave = () => {},
  onCancel = () => {},
  mode = CREATE,
}) => {
  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ResponsiveDialog
      open={showModal}
      onOpenChange={setShowModal}
      title={mode === CREATE ? "Add Task" : "Edit Task"}
      contentClassName="w-lg p-6 overflow-y-auto scrollbar-thin shadow-md"
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" onClick={onSave}>
            Save Changes
          </Button>
        </>
      }
    >
      <form className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input
            type="text"
            name="task-title"
            id="task-title"
            placeholder="Write what you're going to do..."
            aria-label="task-title"
            autoFocus
            value={formValues.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4" data-field="total-sessions">
          <label
            htmlFor="total-sessions"
            className="text-description text-sm w-full pl-2"
          >
            Total Sessions (Max {MAX_SESSIONS})
          </label>
          <Input
            type="number"
            name="total-sessions"
            id="total-sessions"
            value={formValues.totalSessions}
            min={MIN_SESSIONS}
            max={MAX_SESSIONS}
            onChange={(e) => handleChange("totalSessions", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4" data-field="task-description">
          <Textarea
            aria-label="task-description"
            name="task-description"
            id="task-description"
            rows="8"
            placeholder="Write more details about the task..."
            value={formValues.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="max-h-80"
          ></Textarea>
        </div>
      </form>
    </ResponsiveDialog>
  );
};

export default TaskForm;
