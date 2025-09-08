import React from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MAX_SESSIONS, MIN_SESSIONS } from "@/constants/pomodoro";

const AddForm = ({
  formValues,
  setFormValues,
  showModal,
  setShowModal,
  onSave = () => {},
  onCancel = () => {},
}) => {
  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <form>
        <DialogContent className="w-lg p-6 overflow-y-auto scrollbar-thin">
          <DialogHeader>
            <DialogTitle className="heading-3">Add Task</DialogTitle>
          </DialogHeader>
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

            <div
              className="flex items-center gap-4"
              data-field="total-sessions"
            >
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

            <div
              className="flex items-center gap-4"
              data-field="task-description"
            >
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
          <DialogFooter>
            <div className="flex items-center gap-4 self-end">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" onClick={onSave}>
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddForm;
