import { Spacer } from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/spacer";
import {
  ToolbarGroup,
  ToolbarSeparator,
} from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/toolbar";
import { ColorHighlightPopoverButton } from "@/shared/ui/tiptap-editor/tiptap-ui/color-highlight-popover";
import { LinkButton } from "@/shared/ui/tiptap-editor/tiptap-ui/link-popover";
import { ThemeToggle } from "@/shared/ui/tiptap-editor/tiptap-templates/simple/theme-toggle";
import { ToolbarMainGroups } from "@/shared/ui/tiptap-editor/tiptap-templates/simple/toolbar-main-groups";

export function MobileMainToolbar({
  showThemeToggle,
  isJournal,
  onHighlighterClick,
  onLinkClick,
}) {
  return (
    <>
      {!isJournal && <Spacer />}

      <ToolbarMainGroups
        highlightSlot={
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        }
        linkSlot={<LinkButton onClick={onLinkClick} />}
      />

      {!isJournal && <Spacer />}

      {showThemeToggle && (
        <>
          <ToolbarSeparator />
          <ToolbarGroup>
            <ThemeToggle />
          </ToolbarGroup>
        </>
      )}
    </>
  );
}
