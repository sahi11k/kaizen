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
          <DialogTitle className="heading-3 text-foreground">
            Timer in Progress
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-muted-foreground">
            You have an active timer. Switching to{" "}
            <span className="font-semibold text-foreground">{task?.title}</span>{" "}
            will stop the timer and reset your current session.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onCancel}>
            Keep Working
          </Button>
          <Button onClick={onConfirm}>Switch Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskSwitchDialog;
