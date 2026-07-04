import { Link } from "react-router";
import { cn } from "@/shared/lib/utils";

interface EmptyStateActionProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const actionClassName = "text-sm font-medium text-primary hover:opacity-75 transition-opacity";

const EmptyStateAction = ({
  to,
  onClick,
  children,
  className,
}: EmptyStateActionProps): React.ReactElement => {
  if (to) {
    return (
      <Link to={to} className={cn(actionClassName, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(actionClassName, className)}
    >
      {children}
    </button>
  );
};

export { EmptyStateAction };
