import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/global";

export const formatDate = (dateInput, format = DATE_FORMAT) => {
  return dayjs(dateInput).format(format);
};

export const getDayOfWeek = (dateInput) => {
  return dayjs(dateInput).format("ddd"); // e.g., "Monday"
};

export const getDayOfMonth = (dateInput) => {
  return dayjs(dateInput).format("DD");
};
