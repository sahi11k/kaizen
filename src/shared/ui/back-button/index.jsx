import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import Button from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const BackButton = ({ to, className, "aria-label": ariaLabel = "Go back" }) => {
  return (
    <Link to={to}>
      <Button
        variant="icon"
        icon={<ArrowLeft />}
        aria-label={ariaLabel}
        className={cn("pomodoro-control-button", className)}
      />
    </Link>
  );
};

export { BackButton };
