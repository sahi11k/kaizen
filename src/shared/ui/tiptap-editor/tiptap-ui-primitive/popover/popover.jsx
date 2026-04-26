import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/shared/ui/tiptap-editor/lib/tiptap-utils"
import "@/shared/ui/tiptap-editor/tiptap-ui-primitive/popover/popover.scss"

function Popover({
  ...props
}) {
  return <PopoverPrimitive.Root {...props} />;
}

function PopoverTrigger({
  ...props
}) {
  return <PopoverPrimitive.Trigger {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn("tiptap-popover", className)}
        {...props} />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverTrigger, PopoverContent }
