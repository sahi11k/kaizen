import { Spacer } from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/spacer";
import {
  ToolbarGroup,
  ToolbarSeparator,
} from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/toolbar";
import { HeadingDropdownMenu } from "@/shared/ui/tiptap-editor/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/shared/ui/tiptap-editor/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/shared/ui/tiptap-editor/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/shared/ui/tiptap-editor/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/shared/ui/tiptap-editor/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
} from "@/shared/ui/tiptap-editor/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkButton,
} from "@/shared/ui/tiptap-editor/tiptap-ui/link-popover";
import { MarkButton } from "@/shared/ui/tiptap-editor/tiptap-ui/mark-button";
import { TextAlignButton } from "@/shared/ui/tiptap-editor/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/shared/ui/tiptap-editor/tiptap-ui/undo-redo-button";
import { ThemeToggle } from "@/shared/ui/tiptap-editor/tiptap-templates/simple/theme-toggle";

export function MainToolbarContent({
  onHighlighterClick,
  onLinkClick,
  isMobile,
  showThemeToggle,
  isJournal,
}) {
  if (isJournal) {
    return (
      <>
        <ToolbarGroup>
          <UndoRedoButton action="undo" />
          <UndoRedoButton action="redo" />
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <HeadingDropdownMenu modal={false} levels={[1, 2, 3, 4]} />
          <ListDropdownMenu
            modal={false}
            types={["bulletList", "orderedList", "taskList"]}
          />
          <BlockquoteButton />
          <CodeBlockButton />
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="strike" />
          <MarkButton type="code" />
          <MarkButton type="underline" />
          {!isMobile ? (
            <ColorHighlightPopover />
          ) : (
            <ColorHighlightPopoverButton onClick={onHighlighterClick} />
          )}
          {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <MarkButton type="superscript" />
          <MarkButton type="subscript" />
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <TextAlignButton align="left" />
          <TextAlignButton align="center" />
          <TextAlignButton align="right" />
          <TextAlignButton align="justify" />
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <ImageUploadButton text="Add" />
        </ToolbarGroup>
        {showThemeToggle ? (
          <>
            <ToolbarSeparator />
            <ToolbarGroup>
              <ThemeToggle />
            </ToolbarGroup>
          </>
        ) : null}
      </>
    );
  }

  return (
    <>
      {!isJournal ? <Spacer /> : null}
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <HeadingDropdownMenu modal={false} levels={[1, 2, 3, 4]} />
        <ListDropdownMenu
          modal={false}
          types={["bulletList", "orderedList", "taskList"]}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>
      {!isJournal || showThemeToggle ? <Spacer /> : null}
      {isMobile && <ToolbarSeparator />}
      {showThemeToggle ? (
        <ToolbarGroup>
          <ThemeToggle />
        </ToolbarGroup>
      ) : null}
    </>
  );
}
