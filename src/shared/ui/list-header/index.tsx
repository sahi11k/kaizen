import { Button } from "@/shared/ui/button";
import { Tooltip } from "@/shared/ui/tooltip";

interface ListHeaderButtonProps {
  label: string;
  icon?: React.ReactNode;
  tooltip?: string;
  onClick: () => void;
}

interface ListHeaderProps {
  title: string;
  buttonProps: ListHeaderButtonProps;
}

const ListHeader = ({ title, buttonProps }: ListHeaderProps): React.ReactElement => {
  return (
    <div className="px-4 xl:px-6 mt-4 xl:mt-6 pb-2 xl:pb-4 flex items-center justify-between hidden md:flex">
      <span className="heading-3">{title}</span>
      <Tooltip content={buttonProps.tooltip ?? buttonProps.label}>
        <Button
          icon={buttonProps.icon}
          size="sm"
          onClick={buttonProps.onClick}
        >
          {buttonProps.label}
        </Button>
      </Tooltip>
    </div>
  );
};

export { ListHeader };
export type { ListHeaderProps, ListHeaderButtonProps };
