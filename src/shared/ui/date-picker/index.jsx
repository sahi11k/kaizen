import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover";
import { Calendar } from "@/shared/ui/calendar";
import { cn } from "@/shared/lib/utils";
import { formatDate } from "@/shared/lib/date";
import { Tooltip } from "@/shared/ui/tooltip";

const DatePicker = ({
  defaultDate,
  onDateChange,
  triggerClassName,
  popoverClassName,
  format = "LL",
  showIcon = true,
  tooltip,
  tooltipContentClassName,
  side = "bottom",
  align = "center",
  portalled = true,
}) => {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (defaultDate) {
      setDate(new Date(defaultDate));
    }
  }, [defaultDate]);

  const handleDateChange = (newDate) => {
    const nextDate = newDate || new Date();
    setDate(nextDate);
    if (onDateChange) {
      onDateChange(nextDate);
    }
    if (newDate) setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip content={tooltip} contentClassName={tooltipContentClassName}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className={cn(
              "data-[empty=true]:text-muted-foreground w-auto justify-start text-left font-normal",
              triggerClassName
            )}
          >
            {showIcon && <CalendarIcon />}
            {date ? formatDate(date, format) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent
        className={cn("w-auto p-0", popoverClassName)}
        side={side}
        align={align}
        portalled={portalled}
      >
        <Calendar mode="single" selected={date} onSelect={handleDateChange} />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
