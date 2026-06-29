import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
  titleClassName,
  descriptionClassName,
}: EmptyStateProps): React.ReactElement => {
  return (
    <div
      className={cn(
        "flex justify-center items-center h-full w-full",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {icon && <div>{icon}</div>}
        <div className="flex flex-col items-center">
          <h2 className={titleClassName ?? "heading-2"}>{title}</h2>
          {description && (
            <p className={descriptionClassName ?? "body-description text-center"}>
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
    </div>
  );
};

export { EmptyState };
export type { EmptyStateProps };
