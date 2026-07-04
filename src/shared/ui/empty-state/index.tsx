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
      <div className="flex flex-col items-center text-center max-w-lg px-6">
        {code && (
          <span className="font-number text-8xl md:text-9xl leading-none tracking-tight text-subtle-foreground/10 mb-9 select-none">
            {code}
          </span>
        )}
        <h2 className="font-heading text-2xl md:text-3xl font-normal leading-snug tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {action && <div className="mt-8">{action}</div>}
      </div>
    </div>
  );
};

export { EmptyState };
export type { EmptyStateProps };
