import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/date";

const DatePicker = ({
  defautDate,
  onDateChange,
  triggerClassName,
  popoverClassName,
  format = "LL",
  showIcon = true,
}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (defautDate) {
      setDate(new Date(defautDate));
    }
  }, [defautDate]);

  const handleDateChange = (newDate) => {
    setDate(newDate || new Date());
    if (onDateChange) {
      onDateChange(newDate || new Date());
    }
  };

  return (
    <Popover>
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
      <PopoverContent className={cn("w-auto p-0", popoverClassName)}>
        <Calendar mode="single" selected={date} onSelect={handleDateChange} />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
