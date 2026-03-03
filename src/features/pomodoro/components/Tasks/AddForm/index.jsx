import React from "react";

import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

import { Button } from "@/shared/ui/button";
import { Dialog } from "@/shared/ui/dialog";
import { MAX_SESSIONS, MIN_SESSIONS } from "@/features/pomodoro/constants";
import { CREATE } from "@/shared/constants";

const AddForm = ({
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
    <Dialog
      open={showModal}
      onOpenChange={setShowModal}
      title={mode === CREATE ? "Add Task" : "Edit Task"}
      contentClassName="w-lg p-6 overflow-y-auto scrollbar-thin shadow-md"
      footer={
        <div className="flex items-center gap-4 self-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" onClick={onSave}>
            Save Changes
          </Button>
        </div>
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
    </Dialog>
  );
};

export default AddForm;
