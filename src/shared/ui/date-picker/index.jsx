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
}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (defaultDate) {
      setDate(new Date(defaultDate));
    }
  }, [defaultDate]);

  const handleDateChange = (newDate) => {
    setDate(newDate || new Date());
    if (onDateChange) {
      onDateChange(newDate || new Date());
    }
  };

  return (
    <Popover>
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
      >
        <Calendar mode="single" selected={date} onSelect={handleDateChange} />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
