import { cn } from "@/shared/ui/tiptap-editor/lib/tiptap-utils"
import "@/shared/ui/tiptap-editor/tiptap-ui-primitive/input/input.scss"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="tiptap-input"
      className={cn("tiptap-input", className)}
      {...props} />
  );
}

export { Input }
