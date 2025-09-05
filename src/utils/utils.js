import dayjs from "dayjs";
import { DATE_FORMAT, SUCCESS_STATUS_CODES } from "./constants";

export function deepCopy(obj) {
  if (!obj) return obj;

  if (!window.structuredClone) {
    return JSON.parse(JSON.stringify(obj));
  }
  return window.structuredClone(obj);
}

export const handleResponse = ({
  response = {},
  errorMessage = "API request failed",
  successMessage = "API request successful",
}) => {
  if (SUCCESS_STATUS_CODES.includes(response?.status)) {
    return {
      status: 200,
      data: response.data,
      error: null,
      message: successMessage,
    };
  }

  return {
    status: response.status,
    data: null,
    error: errorMessage,
    message: errorMessage,
  };
};

export const arraysEqual = (arr1, arr2) => {
  if (arr1 === arr2) return true;
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

export const validateField = (field, value) => {
  const trimmedValue = value?.trim();
  switch (field) {
    case "name":
      if (!trimmedValue || !trimmedValue?.length)
        return "Please enter a valid name";
      if (trimmedValue?.length > 50)
        return "Name must be less than 50 characters";
      return "";
    case "email":
      if (trimmedValue?.includes("@") && trimmedValue?.includes(".")) return "";
      return "Please enter a valid email";
    case "password":
      if (trimmedValue?.length >= 6 && trimmedValue?.length <= 32) return "";
      return "Password must be between 6 and 32 characters";
  }
};

export const formatDate = (dateInput) => {
  return dayjs(dateInput).format(DATE_FORMAT);
};

export const getDayOfWeek = (dateInput) => {
  return dayjs(dateInput).format("dddd"); // e.g., "Monday"
};

export const getDayOfMonth = (dateInput) => {
  return dayjs(dateInput).format("DD");
};

export const getUserDisplayName = (user) => {
  return user?.user_metadata?.display_name || user?.email?.split("@")[0];
};
