import "@/shared/ui/tiptap-editor/tiptap-ui-primitive/separator/separator.scss"
import { cn } from "@/shared/ui/tiptap-editor/lib/tiptap-utils"

export function Separator({
  decorative,
  orientation = "vertical",
  className,
  ...props
}) {
  const ariaOrientation = orientation === "vertical" ? orientation : undefined
  const semanticProps = decorative
    ? { role: "none" }
    : { "aria-orientation": ariaOrientation, role: "separator" }

  return (
    <div
      className={cn("tiptap-separator", className)}
      data-orientation={orientation}
      {...semanticProps}
      {...props} />
  );
}
