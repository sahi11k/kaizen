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
