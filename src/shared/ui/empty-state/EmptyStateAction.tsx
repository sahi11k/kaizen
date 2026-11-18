import { Link } from "react-router";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface EmptyStateActionProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const EmptyStateAction = ({
  to,
  onClick,
  children,
  className,
}: EmptyStateActionProps): React.ReactElement => {
  if (to) {
    return (
      <Link to={to} className={cn("text-link", className)}>
        {children}
      </Link>
    );
  }

  return (
    <Button size="sm" onClick={onClick} className={className}>
      {children}
    </Button>
  );
};

export { EmptyStateAction };
