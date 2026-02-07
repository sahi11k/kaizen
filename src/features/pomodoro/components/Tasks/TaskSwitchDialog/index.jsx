import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";

const TaskSwitchDialog = ({ task, onConfirm, onCancel }) => {
  return (
    <Dialog open={!!task} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Timer in Progress</DialogTitle>
          <DialogDescription>
            You have an active timer. Switching to{" "}
            <span className="font-semibold text-foreground">
              {task?.title}
            </span>{" "}
            will stop the timer and reset your current session.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Keep Working
          </Button>
          <Button size="sm" onClick={onConfirm}>
            Switch Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskSwitchDialog;
