import { toast, Toaster } from "sonner";

export const Toast = () => {
  return <Toaster position="top-right" />;
};

Toast.toast = toast;
