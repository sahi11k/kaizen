import { SUCCESS_STATUS_CODES } from "@/constants/db";

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
    error: errorMessage === "{}" ? "Server Error" : errorMessage,
    message: errorMessage === "{}" ? "Server Error" : errorMessage,
  };
};
