import { Button } from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/button";
import {
  ToolbarGroup,
  ToolbarSeparator,
} from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/toolbar";
import {
  ColorHighlightPopoverContent,
} from "@/shared/ui/tiptap-editor/tiptap-ui/color-highlight-popover";
import { LinkContent } from "@/shared/ui/tiptap-editor/tiptap-ui/link-popover";
import ArrowLeftIcon from "@/assets/icons/arrow-left-icon.svg?react"
import HighlighterIcon from "@/assets/icons/highlighter-icon.svg?react"
import LinkIcon from "@/assets/icons/link-icon.svg?react"

export function MobileToolbarOverlay({ type, onBack }) {
  return (
    <>
      <ToolbarGroup>
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeftIcon className="tiptap-button-icon" />
          {type === "highlighter" ? (
            <HighlighterIcon className="tiptap-button-icon" />
          ) : (
            <LinkIcon className="tiptap-button-icon" />
          )}
        </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      {type === "highlighter" ? (
        <ColorHighlightPopoverContent />
      ) : (
        <LinkContent />
      )}
    </>
  );
}
