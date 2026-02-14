import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";
import { Loader2 } from "lucide-react";

/* Variants (kept mostly as you had them; tweak tokens in your theme) */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-link underline-offset-2 !p-0 h-auto",
        icon: "text-muted-foreground hover:bg-muted hover:text-primary !px-2",
      },
      size: {
        default:
          "h-9 px-3 py-2 md:h-10 md:px-4 md:py-2 lg:h-11 lg:px-6 lg:py-2 lg:text-base",
        sm: "h-8 rounded-md px-3 md:h-9 md:px-3 lg:h-9 lg:px-4",
        lg: "h-10 rounded-md px-6 md:h-11 md:px-8 lg:h-12 lg:px-10 lg:text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * ShadButton - low-level wrapper that supports asChild (Slot) or native 'button'
 * Forward ref so consumers can focus / measure button.
 */
const ShadButton = React.forwardRef(function ShadButton(props, ref) {
  const {
    className,
    variant,
    size,
    asChild = false,
    children,
    ...rest
  } = props;
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      {children}
    </Comp>
  );
});

/**
 * Button - high-level component with loading state, icon handling, accessibility
 *
 * Props added/changed:
 * - loading: boolean (auto-disables button)
 * - icon: ReactNode shown left or right
 * - iconPosition: "left" | "right" (default "left")
 * - asChild forwarded via ShadButton
 */
const Button = React.forwardRef(function Button(
  {
    children,
    className,
    loading = false,
    icon = null,
    iconPosition = "left",
    variant,
    size,
    asChild = false,
    type = "button", // default to button to avoid accidental form submits
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
        rounded || variant === "icon" ? "rounded-full" : "rounded-md",
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading ? "true" : undefined}
      aria-disabled={isDisabled ? "true" : undefined}
      {...props}
    >
      {/* Show spinner when loading; otherwise show icon (positioned) */}
      {loading ? (
        <Loader2
          className="animate-spin shrink-0"
          size={16}
          aria-hidden="true"
          title="Loading"
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
export default Button;
