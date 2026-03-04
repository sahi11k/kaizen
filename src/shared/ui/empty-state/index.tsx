import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps): React.ReactElement => {
  return (
    <div
      className={cn(
        "flex justify-center items-center h-full w-full",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        {icon && <div>{icon}</div>}
        <div className="flex flex-col items-center">
          <h3 className="heading-3">{title}</h3>
          {description && (
            <p className="body-description text-center">{description}</p>
          )}
        </div>
        {action}
      </div>
    </div>
  );
};

export { EmptyState };
export type { EmptyStateProps };
