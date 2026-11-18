import { StarterKit } from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";
import { JournalFirstBlockPlaceholder } from "@/shared/ui/tiptap-editor/journal-first-block-placeholder";
import { ImageUploadNode } from "@/shared/ui/tiptap-editor/tiptap-node/image-upload-node/image-upload-node-extension";
import { ImageNode } from "@/shared/ui/tiptap-editor/tiptap-node/image-node/image-node-extension";
import { HorizontalRule } from "@/shared/ui/tiptap-editor/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import {
  handleImageUpload,
  MAX_RAW_FILE_SIZE,
  createImageUploadHandler,
} from "@/shared/ui/tiptap-editor/lib/tiptap-utils";

const ExclusiveSuperscript = Superscript.extend({
  excludes: "subscript code",
});

const ExclusiveSubscript = Subscript.extend({
  excludes: "superscript code",
});

export function buildEditorExtensions({
  isJournal,
  journalId,
  userId,
  bodyPlaceholder,
}) {
  return [
    StarterKit.configure({
      horizontalRule: false,
      link: {
        openOnClick: false,
        enableClickSelection: true,
      },
    }),
    HorizontalRule,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    TaskList,
    TaskItem.configure({ nested: true }),
    Highlight.configure({ multicolor: true }),
    ImageNode,
    Typography,
    ExclusiveSuperscript,
    ExclusiveSubscript,
    Selection,
    ImageUploadNode.configure({
      accept: isJournal
        ? "image/jpeg,image/png,image/gif,image/webp"
        : "image/*",
      maxSize: MAX_RAW_FILE_SIZE,
      limit: 3,
      upload:
        isJournal && userId
          ? createImageUploadHandler(journalId, userId)
          : handleImageUpload,
      onError: (error) => console.error("Upload failed:", error),
    }),
    ...(isJournal && bodyPlaceholder
      ? [
          JournalFirstBlockPlaceholder.configure({
            placeholder: bodyPlaceholder,
          }),
        ]
      : []),
  ];
}
