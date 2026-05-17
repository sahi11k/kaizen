import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

type SelectOption = {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
};

interface SelectProps {
  value?: string;
  defaultValue?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  placeholder?: string;
  "aria-label"?: string;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
}

const Select = ({
  value,
  defaultValue,
  options,
  onChange,
  placeholder,
  "aria-label": ariaLabel,
  disabled,
  className,
  contentClassName,
}: SelectProps): React.ReactElement => {
  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        aria-label={ariaLabel}
        className={cn(
          "border-border bg-background text-foreground flex h-10 w-full items-center justify-between gap-2 rounded-md border px-3 py-1 text-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 xl:h-11 xl:px-4 xl:py-2",
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className={cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-[1000] max-h-96 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-border shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            contentClassName,
          )}
        >
          <SelectScrollButton direction="up" />
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <span className="absolute right-2 flex size-3.5 items-center justify-center">
                  <SelectPrimitive.ItemIndicator>
                    <CheckIcon className="size-4" />
                  </SelectPrimitive.ItemIndicator>
                </span>
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectScrollButton direction="down" />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

const SelectScrollButton = ({
  direction,
}: {
  direction: "up" | "down";
}): React.ReactElement => {
  const Comp =
    direction === "up"
      ? SelectPrimitive.ScrollUpButton
      : SelectPrimitive.ScrollDownButton;
  const Icon = direction === "up" ? ChevronUpIcon : ChevronDownIcon;

  return (
    <Comp className="flex cursor-default items-center justify-center py-1">
      <Icon className="size-4" />
    </Comp>
  );
};

export { Select };
export type { SelectOption, SelectProps };
