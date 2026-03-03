import Button from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const FloatingButton = ({ icon, label, onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "rounded-full absolute right-8 bottom-20 h-12 px-6 flex items-center justify-center",
        className,
      )}
      icon={icon}
      variant="secondary"
    >
      {label}
    </Button>
  );
};

export { FloatingButton };
