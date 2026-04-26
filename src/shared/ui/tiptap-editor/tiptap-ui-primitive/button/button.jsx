import { forwardRef, Fragment, useMemo } from "react"

import { Tooltip } from "@/shared/ui/tooltip"

// --- Lib ---
import { cn, parseShortcutKeys } from "@/shared/ui/tiptap-editor/lib/tiptap-utils"

import "@/shared/ui/tiptap-editor/tiptap-ui-primitive/button/button-colors.scss"
import "@/shared/ui/tiptap-editor/tiptap-ui-primitive/button/button.scss"

export const ShortcutDisplay = ({
  shortcuts,
}) => {
  if (shortcuts.length === 0) return null

  return (
    <div>
      {shortcuts.map((key, index) => (
        <Fragment key={index}>
          {index > 0 && <kbd>+</kbd>}
          <kbd>{key}</kbd>
        </Fragment>
      ))}
    </div>
  );
}

export const Button = forwardRef((
  {
    className,
    children,
    tooltip,
    showTooltip = true,
    shortcutKeys,
    variant,
    size,
    ...props
  },
  ref
) => {
  const shortcuts = useMemo(() => parseShortcutKeys({ shortcutKeys }), [shortcutKeys])

  if (!tooltip || !showTooltip) {
    return (
      <button
        data-slot="tiptap-button"
        className={cn("tiptap-button", className)}
        ref={ref}
        data-style={variant}
        data-size={size}
        {...props}>
        {children}
      </button>
    );
  }

  return (
    <Tooltip
      content={
        <>
          {tooltip}
          <ShortcutDisplay shortcuts={shortcuts} />
        </>
      }
      contentClassName=""
      delayDuration={200}
      sideOffset={4}
      level="header"
    >
      <button
        data-slot="tiptap-button"
        className={cn("tiptap-button", className)}
        ref={ref}
        data-style={variant}
        data-size={size}
        {...props}>
        {children}
      </button>
    </Tooltip>
  );
})

Button.displayName = "Button"

export default Button
