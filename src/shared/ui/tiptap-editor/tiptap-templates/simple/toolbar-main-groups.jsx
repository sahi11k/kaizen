import {
  ToolbarGroup,
  ToolbarSeparator,
} from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/toolbar";
import { HeadingDropdownMenu } from "@/shared/ui/tiptap-editor/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/shared/ui/tiptap-editor/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/shared/ui/tiptap-editor/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/shared/ui/tiptap-editor/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/shared/ui/tiptap-editor/tiptap-ui/code-block-button";
import { MarkButton } from "@/shared/ui/tiptap-editor/tiptap-ui/mark-button";
import { TextAlignButton } from "@/shared/ui/tiptap-editor/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/shared/ui/tiptap-editor/tiptap-ui/undo-redo-button";

/**
 * Button groups shared by the desktop and mobile main toolbars.
 * `highlightSlot`/`linkSlot` are injected so each variant can render its
 * own highlight/link control (popover on desktop, button on mobile).
 */
export function ToolbarMainGroups({ highlightSlot, linkSlot }) {
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
        {highlightSlot}
        {linkSlot}
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
    </>
  );
}
