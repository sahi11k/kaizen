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
      md: "w-5 h-5 md:w-6 md:h-6 xl:w-7 xl:h-7",
      lg: "w-7 h-7 md:w-8 xl:w-9",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const textVariants = cva("heading-6 text-primary uppercase tracking-[4px]", {
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

const Logo = ({
  size = "md",
  className = "",
  showText = true,
  link = false,
  iconClassName = "",
  textClassName = "",
}) => {
  const content = (
    <Button variant="link" className={cn(logoVariants({ size }), className)}>
      <span className={cn(iconVariants({ size }), iconClassName)}>
        <LogoIcon className="!w-full !h-full fill-current" />
      </span>
      {showText && (
        <span className={cn(textVariants({ size }), textClassName)}>
          Kaizen
        </span>
      )}
    </Button>
  );

  if (link) {
    return <Link to="/">{content}</Link>;
  }

  return content;
};

export { Logo };
