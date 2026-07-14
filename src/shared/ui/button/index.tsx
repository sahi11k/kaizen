import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium text-sm transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive-hover focus-visible:ring-destructive-soft",
        outline:
          "border border-border bg-transparent shadow-xs hover:bg-muted hover:text-muted-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-muted-foreground",
        link: "text-link underline-offset-2 !p-0 h-auto",
        icon: "text-muted-foreground hover:bg-muted hover:text-foreground !px-2",
      },
      size: {
        default:
          "h-9 px-3 py-2 md:h-10 md:px-4 md:py-2 lg:h-11 lg:px-6 lg:py-2 lg:text-base",
        sm: "h-8 rounded-lg px-3 md:h-9 md:px-3 lg:h-9 lg:px-4",
        lg: "h-10 rounded-lg px-6 md:h-11 md:px-8 lg:h-12 lg:px-10 lg:text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ShadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  asChild?: boolean;
}

const ShadButton = React.forwardRef<HTMLButtonElement, ShadButtonProps>(
  function ShadButton(
    { className, variant, size, asChild = false, children, ...rest },
    ref,
  ) {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        className={cn(buttonVariants({ variant, size }), className)}
        {...rest}
      >
        {children}
      </Comp>
    );
  },
);

interface ButtonProps extends ShadButtonProps {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  rounded?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    loading = false,
    icon = null,
    iconPosition = "left",
    variant,
    size,
    asChild = false,
    type = "button",
    disabled,
    rounded = false,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;

  const iconElement = icon ? (
    <span aria-hidden="true" className="shrink-0 flex items-center">
      {icon}
    </span>
  ) : null;

  return (
    <ShadButton
      ref={ref}
      asChild={asChild}
      variant={variant}
      size={size}
      type={type}
      className={cn(
        rounded || variant === "icon" ? "rounded-full" : "rounded-lg",
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading ? "true" : undefined}
      aria-disabled={isDisabled ? "true" : undefined}
      {...props}
    >
      {loading ? (
        <Loader2
          className="animate-spin shrink-0"
          size={16}
          aria-hidden="true"
          aria-label="Loading"
        />
      ) : icon && iconPosition === "left" ? (
        iconElement
      ) : null}

      {children}

      {!loading && icon && iconPosition === "right" ? iconElement : null}
    </ShadButton>
  );
});

export { Button, buttonVariants };
export type { ButtonProps, ShadButtonProps, ButtonVariantProps };
export default Button;
