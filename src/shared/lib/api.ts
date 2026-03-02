import { SUCCESS_STATUS_CODES } from "@/shared/constants";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface ApiResponseInput {
  response?: { data?: unknown; status?: number };
  errorMessage?: string;
  successMessage?: string | null;
}

export const parseApiResponse = ({
  response = {},
  errorMessage = "API request failed",
  successMessage = "API request successful",
}: ApiResponseInput): { data: unknown; message: string | null } => {
  if (SUCCESS_STATUS_CODES.includes(response?.status)) {
    return {
      data: response.data,
      message: successMessage,
    };
  }

  const message = errorMessage === "{}" ? "Server Error" : errorMessage;
  throw new ApiError(message, response.status ?? 500);
};
