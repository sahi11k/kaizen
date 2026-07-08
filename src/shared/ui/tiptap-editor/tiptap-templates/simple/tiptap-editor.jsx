import { useEffect, useRef, useState } from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

import "@/shared/ui/tiptap-editor/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-node/code-block-node/code-block-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-node/list-node/list-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-node/image-node/image-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-node/heading-node/heading-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/shared/ui/tiptap-editor/tiptap-templates/simple/simple-editor.scss";

// --- UI Primitives ---
import { Toolbar } from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/toolbar";

// --- Hooks ---
import useIsMobile from "@/shared/hooks/useIsMobile";
import { useWindowSize } from "@/shared/ui/tiptap-editor/hooks/use-window-size";
import { useCursorVisibility } from "@/shared/ui/tiptap-editor/hooks/use-cursor-visibility";
import { useToolbarPosition } from "@/shared/ui/tiptap-editor/hooks/use-toolbar-position";

// --- Lib ---
import { cn } from "@/shared/ui/tiptap-editor/lib/tiptap-utils";
import { buildEditorExtensions } from "@/shared/ui/tiptap-editor/tiptap-templates/simple/build-editor-extensions";

// --- Auth ---
import useAuthStore from "@/features/auth/store";

import demoContent from "@/shared/ui/tiptap-editor/tiptap-templates/simple/data/content.json";
import { DesktopMainToolbar } from "@/shared/ui/tiptap-editor/tiptap-templates/simple/desktop-main-toolbar";
import { MobileMainToolbar } from "@/shared/ui/tiptap-editor/tiptap-templates/simple/mobile-main-toolbar";
import { MobileToolbarOverlay } from "@/shared/ui/tiptap-editor/tiptap-templates/simple/mobile-toolbar-overlay";

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
      extensions: buildEditorExtensions({
        isJournal,
        journalId,
        userId,
        bodyPlaceholder,
      }),
      content: isJournal ? initialContent : demoContent,
      onUpdate: ({ editor: ed }) => {
        if (!isJournal) return;
        onPersistentUpdate(JSON.stringify(ed.getJSON()));
      },
    },
    isJournal ? [journalId] : [],
  );

  const toolbarHeight = toolbarRef.current?.getBoundingClientRect().height ?? 0;
  const mobileJournalToolbarLiftPx = isJournal && isMobile ? 12 : 0;

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarHeight + mobileJournalToolbarLiftPx,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  const toolbarStyle = useToolbarPosition({
    isMobile,
    isJournal,
    rect,
    height,
  });

  const toolbar = (
    <Toolbar ref={toolbarRef} style={toolbarStyle}>
      {mobileView === "main" ? (
        isMobile ? (
          <MobileMainToolbar
            showThemeToggle={isJournal ? showThemeToggle : true}
            isJournal={isJournal}
            onHighlighterClick={() => setMobileView("highlighter")}
            onLinkClick={() => setMobileView("link")}
          />
        ) : (
          <DesktopMainToolbar
            showThemeToggle={isJournal ? showThemeToggle : true}
            isJournal={isJournal}
          />
        )
      ) : (
        <MobileToolbarOverlay
          type={mobileView === "highlighter" ? "highlighter" : "link"}
          onBack={() => setMobileView("main")}
        />
      )}
    </Toolbar>
  );

  return (
    <div
      className={cn(
        "simple-editor-wrapper",
        isJournal && "simple-editor-wrapper--journal",
      )}
    >
      <EditorContext.Provider value={{ editor }}>
        {isJournal ? (
          <div className="simple-editor-journal-toolbar-shell">{toolbar}</div>
        ) : (
          toolbar
        )}

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  );
}
