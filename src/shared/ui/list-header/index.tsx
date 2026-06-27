import { Button } from "@/shared/ui/button";
import { Tooltip } from "@/shared/ui/tooltip";

interface ListHeaderButtonProps {
  label: string;
  icon?: React.ReactNode;
  tooltip?: string;
  showTooltip?: boolean;
  onClick: () => void;
}

interface ListHeaderProps {
  title: string;
  buttonProps: ListHeaderButtonProps;
}

const ListHeader = ({ title, buttonProps }: ListHeaderProps): React.ReactElement => {
  const button = (
    <Button
      icon={buttonProps.icon}
      size="sm"
      onClick={buttonProps.onClick}
    >
      {buttonProps.label}
    </Button>
  );

  return (
    <div className="px-4 xl:px-6 mt-4 xl:mt-6 pb-2 xl:pb-4 flex items-center justify-between hidden md:flex">
      <span className="heading-3">{title}</span>
      {buttonProps.showTooltip === false ? (
        button
      ) : (
        <Tooltip content={buttonProps.tooltip ?? buttonProps.label}>
          {button}
        </Tooltip>
      )}
    </div>
  );
};

export { ListHeader };
export type { ListHeaderProps, ListHeaderButtonProps };
