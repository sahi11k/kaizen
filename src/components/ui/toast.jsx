import { CircleCheck, CircleX, X } from "lucide-react";
import { toast, Toaster } from "sonner";

export const Toast = () => {
  return (
    <Toaster
      position="top-right"
      closeButton
      richColors
      toastOptions={{
        classNames: {
          toast: "!rounded-lg !text-base !w-max !pr-12",
          closeButton:
            "!top-1/2 -translate-y-[2px] !left-auto !right-2 !border-none [&>svg]:!size-4 bg-transparent hover:!bg-transparent",
        },
      }}
      icons={{
        success: <CircleCheck className="size-5" />,
        error: <CircleX className="size-5" />,
        close: <X className="size-5" />,
      }}
    />
  );
};

Toast.toast = toast;
