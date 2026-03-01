import dayjs from "dayjs";
import { DATE_FORMAT } from "@/shared/constants";

type DateInput = string | number | Date | dayjs.Dayjs;

export const formatDate = (dateInput: DateInput, format: string = DATE_FORMAT): string => {
  return dayjs(dateInput).format(format);
};

export const getDayOfWeek = (dateInput: DateInput): string => {
  return dayjs(dateInput).format("ddd");
};

export const getDayOfMonth = (dateInput: DateInput): string => {
  return dayjs(dateInput).format("DD");
};
