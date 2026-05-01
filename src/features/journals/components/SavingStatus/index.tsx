import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import {
  AUTO_SAVE_STATUS,
  JOURNAL_META_ROW_TEXT_CLASS,
} from "@/features/journals/constants";
import { RefreshCcw, CloudCheck, CloudAlertIcon } from "lucide-react";
import dayjs from "dayjs";

type AutoSaveStatusValue =
  (typeof AUTO_SAVE_STATUS)[keyof typeof AUTO_SAVE_STATUS];

type SavingStatusProps = {
  status: AutoSaveStatusValue;
  updatedAt?: string;
};

const STATUS_UI: Partial<
  Record<
    AutoSaveStatusValue,
    { icon: ReactNode; getText: (updatedAt?: string) => string | null }
  >
> = {
  [AUTO_SAVE_STATUS.ERROR]: {
    icon: (
      <CloudAlertIcon className="size-4 text-muted-foreground cursor-pointer" />
    ),
    getText: () => "Failed to save",
  },
  [AUTO_SAVE_STATUS.SAVING]: {
    icon: (
      <RefreshCcw className="size-4 text-muted-foreground cursor-pointer animate-spin" />
    ),
    getText: () => "Saving",
  },
  [AUTO_SAVE_STATUS.SAVED]: {
    icon: (
      <CloudCheck className="size-4 text-muted-foreground cursor-pointer" />
    ),
    getText: (updatedAt) =>
      updatedAt
        ? `Last saved at ${dayjs(updatedAt).format("MMM D, YYYY h:mm A")}`
        : null,
  },
};

const SavingStatus = ({ status, updatedAt }: SavingStatusProps) => {
  const config = STATUS_UI[status];
  if (!config) return null;

  const text = config.getText(updatedAt);
  if (text == null) return null;

  return (
    <div
      className={cn(
        "flex self-start md:self-center items-center gap-2",
        JOURNAL_META_ROW_TEXT_CLASS,
      )}
    >
      {config.icon}
      <span>{text}</span>
    </div>
  );
};

export default SavingStatus;
