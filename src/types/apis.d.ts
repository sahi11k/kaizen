export type ApiResponse<T = unknown> = {
  status: number;
  data: T | null;
  error: string | null;
  message: string;
};
