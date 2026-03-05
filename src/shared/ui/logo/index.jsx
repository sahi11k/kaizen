import React from "react";
import LogoIcon from "@/assets/icons/logo.svg?react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Link } from "react-router";

const logoVariants = cva("flex items-center gap-2 !no-underline", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const iconVariants = cva("text-primary", {
  variants: {
    size: {
      sm: "w-4 h-4 md:w-5 md:h-5 xl:w-6 xl:h-6",
      md: "w-6 h-6 md:w-7 md:h-7 xl:w-8 xl:h-8",
      lg: "w-8 h-8 md:w-9 xl:w-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const textVariants = cva("text-foreground font-semibold leading-none", {
  variants: {
    size: {
      sm: "text-sm md:text-base xl:text-lg",
      md: "text-lg lg:text-xl xl:text-2xl",
      lg: "text-2xl xl:text-3xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const Logo = ({
  size = "md",
  className = "",
  showText = true,
  link = false,
  iconClassName = "",
}) => {
  const content = (
    <Button variant="link" className={cn(logoVariants({ size }), className)}>
      <span className={cn(iconVariants({ size }), iconClassName)}>
        <LogoIcon className="!w-full !h-full fill-current" />
      </span>
      {showText && <span className={cn(textVariants({ size }))}>Kaizen</span>}
    </Button>
  );

  if (link) {
    return <Link to="/">{content}</Link>;
  }

  return content;
};

export { Logo };
