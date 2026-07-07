import { cn } from "@/shared/lib/utils";

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  children?: React.ReactNode;
}

const PageHeader = ({
  title,
  subtitle,
  action,
  className,
  titleClassName,
  children,
}: PageHeaderProps): React.ReactElement => {
  return (
    <div className={cn("sticky top-0 z-30 bg-background py-6", className)}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className={cn("heading-4", titleClassName)}>{title}</h1>
          {subtitle && <div className="body-base !text-sm">{subtitle}</div>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </div>
  );
};

export { PageHeader };
export type { PageHeaderProps };
