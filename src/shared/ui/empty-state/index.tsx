import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
  code?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState = ({
  code,
  title,
  description,
  action,
  className,
}: EmptyStateProps): React.ReactElement => {
  return (
    <div className={cn("w-full h-full", className)}>
      <div className="flex flex-col items-center text-center gap-6 max-w-500">
        {code && (
          <h1 className="heading-0 !text-subtle-foreground/25 !font-sans !font-normal tracking-tight select-none">
            {code}
          </h1>
        )}
        <div className="flex flex-col gap-2">
          <h2 className="heading-4 !font-normal">{title}</h2>
          {description && <p className="body-base">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};

export { EmptyState };
export type { EmptyStateProps };
