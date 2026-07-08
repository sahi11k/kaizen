import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { Eye, EyeOff, Minus, Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";

function Input({ className = "", type = "text", ...props }) {
  const isPassword = type === "password";
  const isNumber = type === "number";

  if (isPassword) {
    return <Password className={className} {...props} />;
  }

  if (isNumber) {
    return <InputNumber className={className} {...props} />;
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "text-foreground placeholder:text-muted-foreground selection:bg-border selection:text-foreground border-border flex h-10 w-full min-w-0 rounded-lg border bg-transparent px-3 py-1 text-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 xl:text-base xl:h-11 xl:px-4 xl:py-2 file:text-foreground",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

const Password = ({ className = "", ...props }) => {
  const [show, setShow] = React.useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        data-slot="input"
        className={cn(
          "text-foreground placeholder:text-muted-foreground selection:bg-border selection:text-foreground border-border flex h-10 w-full min-w-0 rounded-lg border bg-transparent px-3 pr-9 py-1 text-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 xl:text-base xl:h-11 xl:px-4 xl:pr-12 xl:py-2 file:text-foreground",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />
      <button
        type="button"
        aria-label={show ? "Hide password" : "Show password"}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setShow((s) => !s)}
        className="absolute inset-y-0 right-2 my-auto inline-flex size-5 items-center justify-center text-muted-foreground"
      >
        {show ? <EyeOff className="size-4 " /> : <Eye className="size-4" />}
      </button>
    </div>
  );
};

const InputNumber = ({
  className = "",
  onChange,
  min,
  max,
  name,
  value,
  step = 1,
  ...rest
}) => {
  const handleChange = (e) => {
    const rawValue = e.target.value;
    const numValue = rawValue === "" ? "" : Number(rawValue);

    onChange({
      target: {
        name,
        value: numValue,
      },
    });
  };

  const handleIncrement = () => {
    const numericValue = Number(value);
    const currentValue = Number.isFinite(numericValue) ? numericValue : 0;
    const stepValue = Number(step);
    const maxValue = max === undefined ? undefined : Number(max);
    const nextValue = currentValue + stepValue;

    if (maxValue === undefined || nextValue <= maxValue) {
      onChange({ target: { name, value: nextValue } });
    }
  };

  const handleDecrement = () => {
    const numericValue = Number(value);
    const currentValue = Number.isFinite(numericValue) ? numericValue : 0;
    const stepValue = Number(step);
    const minValue = min === undefined ? undefined : Number(min);
    const nextValue = currentValue - stepValue;

    if (minValue === undefined || nextValue >= minValue) {
      onChange({ target: { name, value: nextValue } });
    }
  };

  const numericValue = Number(value);
  const minValue = min === undefined ? undefined : Number(min);
  const maxValue = max === undefined ? undefined : Number(max);
  const canDecrement =
    value !== "" &&
    Number.isFinite(numericValue) &&
    (minValue === undefined || numericValue > minValue);
  const canIncrement =
    value !== "" &&
    Number.isFinite(numericValue) &&
    (maxValue === undefined || numericValue < maxValue);

  return (
    <div className="relative">
      <input
        type="number"
        data-slot="input"
        className={cn(
          "text-foreground placeholder:text-muted-foreground selection:bg-border selection:text-foreground border-border flex h-10 w-full min-w-0 rounded-lg border bg-transparent px-3 py-1 pr-16 text-sm transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 xl:text-base xl:h-11 xl:px-4 xl:py-2 xl:pr-20",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]",
          className,
        )}
        value={value}
        onChange={handleChange}
        {...rest}
      />
      <div className="absolute inset-y-px right-px flex my-auto">
        <Button
          type="button"
          aria-label="Decrement"
          onClick={handleDecrement}
          disabled={!canDecrement}
          variant="icon"
          className="w-9 min-w-8 min-h-8 rounded-none border border-border border-y-0 !bg-transparent !text-foreground hover:!bg-dropdown-hover hover:!text-foreground disabled:opacity-50 disabled:!bg-control-inactive !h-full"
        >
          <Minus />
        </Button>
        <Button
          type="button"
          aria-label="Increment"
          onClick={handleIncrement}
          disabled={!canIncrement}
          variant="icon"
          className="w-9 min-w-8 min-h-8 rounded-l-none rounded-r-md border border-y-0 border-l-0 border-border !bg-transparent !text-foreground hover:!bg-dropdown-hover hover:!text-foreground disabled:opacity-50 disabled:!bg-control-inactive !h-full"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};

InputNumber.displayName = "InputNumber";

export { Input };
