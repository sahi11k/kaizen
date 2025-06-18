import { SUCCESS_STATUS_CODES } from "./constants";

export function deepCopy(obj) {
  if (!obj) return obj;

  if (!window.structuredClone) {
    return JSON.parse(JSON.stringify(obj));
  }
  return window.structuredClone(obj);
}

export const handleResponse = (
  response = {},
  errorMessage = "API request failed"
) => {
  if (SUCCESS_STATUS_CODES.includes(response.status)) {
    return {
      status: 200,
      data: response.data,
      error: null,
    };
  }

  return {
    status: response.status,
    data: null,
    error: errorMessage,
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
