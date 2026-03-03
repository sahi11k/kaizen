import { Button } from "@/shared/ui/button";
import { Dialog } from "@/shared/ui/dialog";

const TaskSwitchDialog = ({ task, onConfirm, onCancel }) => {
  return (
    <Dialog
      open={!!task}
      onOpenChange={(open) => !open && onCancel()}
      title="Timer in Progress"
      description={
        <>
          You have an active timer. Switching to{" "}
          <span className="font-semibold text-foreground">{task?.title}</span>{" "}
          will stop the timer and reset your current session.
        </>
      }
      showCloseButton={false}
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            Keep Working
          </Button>
          <Button onClick={onConfirm}>Switch Task</Button>
        </>
      }
    />
  );
};

export default TaskSwitchDialog;
