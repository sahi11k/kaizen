import { CircleCheck, CircleX } from "lucide-react";
import { toast, Toaster } from "sonner";

export const Toast = () => {
  return (
    <Toaster
      position="top-right"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "!bg-background !text-foreground  !rounded-lg !text-base !w-max !pr-12",
          closeButton:
            "!top-1/2 -translate-y-[2px] !left-auto !right-2 !border-none [&>svg]:!size-4",
        },
      }}
      icons={{
        success: <CircleCheck className="size-5 text-green-500" />,
        error: <CircleX className="size-5 text-red-500" />,
      }}
    />
  );
};

Toast.toast = toast;
