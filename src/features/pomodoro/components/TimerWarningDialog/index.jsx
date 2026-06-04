import { Button, ResponsiveDialog } from "@/shared/ui";
import { TIMER_WARNING } from "@/features/pomodoro/constants";

const TimerWarningDialog = ({ open, onConfirm, onCancel }) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && onCancel()}
      title={TIMER_WARNING.TITLE}
      description={TIMER_WARNING.DESCRIPTION}
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            {TIMER_WARNING.CANCEL_LABEL}
          </Button>
          <Button onClick={onConfirm}>{TIMER_WARNING.CONFIRM_LABEL}</Button>
        </>
      }
    />
  );
};

export default TimerWarningDialog;
