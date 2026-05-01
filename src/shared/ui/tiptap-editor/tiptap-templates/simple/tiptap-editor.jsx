import { useEffect, useRef, useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";
import { JournalFirstBlockPlaceholder } from "@/shared/ui/tiptap-editor/journal-first-block-placeholder";

// --- UI Primitives ---
import { Toolbar } from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/shared/ui/tiptap-editor/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/shared/ui/tiptap-editor/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/shared/ui/tiptap-editor/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-node/code-block-node/code-block-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-node/list-node/list-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-node/image-node/image-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-node/heading-node/heading-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Hooks ---
import useIsMobile from "@/shared/hooks/useIsMobile";
import { useWindowSize } from "@/shared/ui/tiptap-editor/hooks/use-window-size";
import { useCursorVisibility } from "@/shared/ui/tiptap-editor/hooks/use-cursor-visibility";

// --- Lib ---
import {
  cn,
  handleImageUpload,
  MAX_RAW_FILE_SIZE,
  createImageUploadHandler,
} from "@/shared/ui/tiptap-editor/lib/tiptap-utils";

// --- Auth ---
import useAuthStore from "@/features/auth/store";

// --- Styles ---
import "@/shared/ui/tiptap-editor/tiptap-templates/simple/simple-editor.scss";

import demoContent from "@/shared/ui/tiptap-editor/tiptap-templates/simple/data/content.json";
import { MainToolbarContent } from "@/shared/ui/tiptap-editor/tiptap-templates/simple/simple-main-toolbar";
import { MobileToolbarContent } from "@/shared/ui/tiptap-editor/tiptap-templates/simple/simple-mobile-toolbar";

/**
 * @param {object} [props]
 * @param {string} [props.journalId] - When set with initialContent + onPersistentUpdate, enables journal autosave mode.
 * @param {object} [props.initialContent] - TipTap JSON doc. For journals: body only; title is persisted on the journal row, not inside `content`.
 * @param {(json: string) => void} [props.onPersistentUpdate]
 * @param {boolean} [props.showThemeToggle] - When false, hides template theme toggle (recommended inside the app shell).
 * @param {string} [props.bodyPlaceholder] - Shown in the first empty block when `journalId` + persistence props are set (e.g. journal body hint).
 */
export function TipTapEditor({
  journalId,
  initialContent,
  onPersistentUpdate,
  showThemeToggle = true,
  bodyPlaceholder = "",
} = {}) {
  const isJournal =
    journalId != null &&
    initialContent != null &&
    typeof onPersistentUpdate === "function";

  const { user } = useAuthStore();
  const userId = user?.id;

  const isMobile = useIsMobile();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState("main");
  const toolbarRef = useRef(null);

  const editor = useEditor(
    {
      immediatelyRender: false,
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          "aria-label": "Main content area, start typing to enter text.",
          class: "simple-editor",
        },
      },
      extensions: [
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
        Image,
        Typography,
        Superscript,
        Subscript,
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
      ],
      content: isJournal ? initialContent : demoContent,
      onUpdate: ({ editor: ed }) => {
        if (!isJournal) return;
        onPersistentUpdate(JSON.stringify(ed.getJSON()));
      },
    },
    isJournal ? [journalId] : [],
  );

  const toolbarHeight =
    toolbarRef.current?.getBoundingClientRect().height ?? 0;
  /* Tab bar (64px) + extra lift (0.75rem) — keep in sync with simple-editor.scss --tt-mobile-tab-clearance. */
  const mobileTabBarOverlayPx =
    isJournal && isMobile ? 64 + 12 : 0;

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarHeight + mobileTabBarOverlayPx,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <div
      className={cn(
        "simple-editor-wrapper",
        isJournal && "simple-editor-wrapper--journal",
      )}
    >
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile && isJournal
              ? {
                  position: "fixed",
                  /* Override sticky `top: 0` from toolbar.scss — without this, `top` + `bottom` stretch the bar full viewport height. */
                  top: "auto",
                  bottom: "var(--tt-mobile-tab-clearance, 0px)",
                  left: "0.75rem",
                  right: "0.75rem",
                  zIndex: 65,
                }
              : isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px + var(--tt-mobile-tab-clearance, 0px))`,
                }
              : {}),
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
              showThemeToggle={isJournal ? showThemeToggle : true}
              isJournal={isJournal}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  );
}
