import * as React from "react";

import { Dialog } from "@/shared/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/shared/ui/drawer";
import useIsMobile from "@/shared/hooks/useIsMobile";
import { cn } from "@/shared/lib/utils";

interface ResponsiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
  contentClassName?: string;
}

function ResponsiveDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  className,
  contentClassName,
}: ResponsiveDialogProps): React.ReactElement {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
        title={title}
        description={description}
        footer={footer}
        showCloseButton={showCloseButton}
        className={className}
        contentClassName={contentClassName}
      >
        {children}
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
      <DrawerContent className="border-border px-6 pb-6">
        {(title || description) && (
          <DrawerHeader className={cn("px-0", className)}>
            {title && <DrawerTitle className="">{title}</DrawerTitle>}
            {description && (
              <DrawerDescription className="">{description}</DrawerDescription>
            )}
          </DrawerHeader>
        )}
        {children}
        {footer && (
          <DrawerFooter className="px-0 flex-row gap-6 [&>*]:flex-1">
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export { ResponsiveDialog };
export type { ResponsiveDialogProps };
