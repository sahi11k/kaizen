import dayjs from "dayjs";
import { DATE_FORMAT } from "@/shared/constants";

type DateInput = string | number | Date | dayjs.Dayjs;

export const formatDate = (dateInput: DateInput, format: string = DATE_FORMAT): string => {
  return dayjs(dateInput).format(format);
};
