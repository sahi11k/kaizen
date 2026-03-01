import { SUCCESS_STATUS_CODES } from "@/shared/constants";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const parseApiResponse = ({
  response = {},
  errorMessage = "API request failed",
  successMessage = "API request successful",
}) => {
  if (SUCCESS_STATUS_CODES.includes(response?.status)) {
    return {
      data: response.data,
      message: successMessage,
    };
  }

  const message = errorMessage === "{}" ? "Server Error" : errorMessage;
  throw new ApiError(message, response.status);
};
