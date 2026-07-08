import {
  ToolbarGroup,
  ToolbarSeparator,
} from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/toolbar";
import { ColorHighlightPopover } from "@/shared/ui/tiptap-editor/tiptap-ui/color-highlight-popover";
import { LinkPopover } from "@/shared/ui/tiptap-editor/tiptap-ui/link-popover";
import { ThemeToggle } from "@/shared/ui/tiptap-editor/tiptap-templates/simple/theme-toggle";
import { ToolbarMainGroups } from "@/shared/ui/tiptap-editor/tiptap-templates/simple/toolbar-main-groups";

export function DesktopMainToolbar({ showThemeToggle, isJournal }) {
  return (
    <>
      <ToolbarMainGroups
        highlightSlot={<ColorHighlightPopover />}
        linkSlot={<LinkPopover />}
      />

      {showThemeToggle && (
        <>
          {isJournal && <ToolbarSeparator />}
          <ToolbarGroup>
            <ThemeToggle />
          </ToolbarGroup>
        </>
      )}
    </>
  );
}
