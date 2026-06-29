import * as React from "react";

import { cn } from "@/shared/lib/utils";

function BaseCard({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "surface-card flex flex-col gap-6 rounded-lg py-6",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading leading-none font-semibold text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

function Card({
  title,
  children,
  footer,
  className,
  contentClassName,
  footerClassName,
  titleClassName,
}) {
  return (
    <BaseCard className={className}>
      {title && (
        <CardHeader>
          <CardTitle className={titleClassName}>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={contentClassName}>{children}</CardContent>
      {footer && <CardFooter className={footerClassName}>{footer}</CardFooter>}
    </BaseCard>
  );
}

export { Card };
