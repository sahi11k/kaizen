import { cn } from "@/shared/lib/utils";

interface SidebarPanelProps {
  title?: string;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const SidebarPanel = ({
  title,
  subtitle,
  action,
  children,
  className,
}: SidebarPanelProps): React.ReactElement => {
  return (
    <div
      className={cn(
        "flex flex-1 px-4 xl:px-6 md:flex-none md:w-72 xl:w-92 flex-col border-r border-border",
        className,
      )}
    >
      {title && (
        <div className="mt-4 xl:mt-6 pb-2 xl:pb-4 items-center justify-between hidden md:flex">
          <div>
            <span className="heading-3 mr-1">{title}</span>
            {subtitle}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
};

export { SidebarPanel };
export type { SidebarPanelProps };
