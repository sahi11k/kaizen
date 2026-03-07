import { AUTO_SAVE_STATUS } from "@/features/journals/constants";
import { RefreshCcw, CloudCheck, CloudAlertIcon } from "lucide-react";
import dayjs from "dayjs";

type SavingStatusProps = {
  status: keyof typeof AUTO_SAVE_STATUS;
  updatedAt?: string;
};

const SavingStatus = ({ status, updatedAt }: SavingStatusProps) => {
  let icon = null;
  let text = null;

  if (status === AUTO_SAVE_STATUS.SAVED || updatedAt) {
    icon = (
      <CloudCheck className="size-4 text-muted-foreground cursor-pointer" />
    );

    text = `Last saved at ${dayjs(updatedAt).format("MMM D, YYYY h:mm A")}`;
  }

  if (status === AUTO_SAVE_STATUS.SAVING) {
    icon = (
      <RefreshCcw className="size-4 text-muted-foreground cursor-pointer animate-spin" />
    );
    text = "Saving";
  }

  if (status === AUTO_SAVE_STATUS.ERROR) {
    icon = (
      <CloudAlertIcon className="size-4 text-muted-foreground cursor-pointer" />
    );
    text = "Failed to save";
  }

  return (
    <div className="flex self-start md:self-center items-center gap-2">
      {icon}
      <span className="text-xs md:text-sm text-muted-foreground font-medium">
        {text}
      </span>
    </div>
  );
};

export default SavingStatus;
