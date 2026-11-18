/** Empty ProseMirror document for TipTap (StarterKit-compatible). */
export const EMPTY_TIPTAP_DOC = Object.freeze({
  type: "doc",
  content: [],
});

function isDoc(value) {
  return Boolean(value && typeof value === "object" && value.type === "doc");
}

/**
 * Normalize stored journal/editor string into a TipTap JSON document.
 * Supports: TipTap JSON string, legacy plain text, empty.
 */
export function storedStringToTipTapContent(stored) {
  if (stored == null || stored === "") {
    return { ...EMPTY_TIPTAP_DOC, content: [] };
  }
  if (typeof stored === "object" && isDoc(stored)) {
    return stored;
  }
  const raw = String(stored);
  const trimmed = raw.trim();
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (isDoc(parsed)) return parsed;
    } catch {
      /* treat as plain text */
    }
  }
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: trimmed ? [{ type: "text", text: raw }] : [],
      },
    ],
  };
}

function collectTextFragments(node, out) {
  if (!node) return;
  if (node.type === "text" && node.text) {
    out.push(node.text);
    return;
  }
  if (!Array.isArray(node.content)) return;
  for (const child of node.content) {
    collectTextFragments(child, out);
  }
}

/** Flatten a TipTap/ProseMirror JSON doc to plain text (for previews and word count). */
export function plainTextFromTipTapDoc(doc) {
  if (!isDoc(doc)) return "";
  const parts = [];
  collectTextFragments(doc, parts);
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function emptyParagraphNode() {
  return { type: "paragraph", content: [] };
}

/** Plain text of the leading H1 if present; used as the journal day title. */
export function journalTitleFromDoc(doc) {
  if (!isDoc(doc)) return "";
  const first = doc.content?.[0];
  if (!first || first.type !== "heading" || first.attrs?.level !== 1) {
    return "";
  }
  return plainTextFromTipTapDoc({ type: "doc", content: [first] });
}

/**
 * Document for the editor body only: removes the first H1 (day title) if present.
 * Ensures at least one empty paragraph for TipTap.
 */
export function stripLeadingJournalTitle(doc) {
  if (!isDoc(doc)) {
    return { ...EMPTY_TIPTAP_DOC, content: [emptyParagraphNode()] };
  }
  const nodes = Array.isArray(doc.content) ? [...doc.content] : [];
  if (nodes.length === 0) {
    return { ...EMPTY_TIPTAP_DOC, content: [emptyParagraphNode()] };
  }
  const [first, ...rest] = nodes;
  if (first.type === "heading" && first.attrs?.level === 1) {
    if (rest.length === 0) {
      return { type: "doc", content: [emptyParagraphNode()] };
    }
    return { ...doc, content: rest };
  }
  return doc;
}

/**
 * @param {{ title?: string, content?: string } | null | undefined} journal
 * @param {{ defaultBackendTitle?: string }} [options] - DB placeholder title to show as empty in the UI (e.g. "Untitled Journal").
 * @returns {{ bodyForEditor: object, titleForField: string }}
 */
export function journalLoadPartsFromRecord(journal, options = {}) {
  const defaultBackendTitle =
    options.defaultBackendTitle != null
      ? String(options.defaultBackendTitle)
      : "Untitled Journal";

  if (!journal) {
    return {
      bodyForEditor: { ...EMPTY_TIPTAP_DOC, content: [emptyParagraphNode()] },
      titleForField: "",
    };
  }

  const storedDoc = storedStringToTipTapContent(journal.content ?? "");
  const bodyForEditor = stripLeadingJournalTitle(storedDoc);
  const titleFromLegacyH1 = journalTitleFromDoc(storedDoc);
  const rawDbTitle =
    journal.title != null && String(journal.title).trim() !== ""
      ? String(journal.title).trim()
      : "";

  let titleForField = "";
  if (rawDbTitle && rawDbTitle !== defaultBackendTitle) {
    titleForField = rawDbTitle;
  } else if (!rawDbTitle) {
    titleForField = titleFromLegacyH1;
  } else {
    /* DB still has server default (e.g. after insert); prefer legacy H1 if content was not migrated yet. */
    titleForField = titleFromLegacyH1 || "";
  }

  return {
    bodyForEditor,
    titleForField,
  };
}

/** Plain text for previews/word count from stored JSON string or legacy plain text. */
export function plainTextFromStoredJournalContent(stored) {
  const doc = storedStringToTipTapContent(stored);
  return plainTextFromTipTapDoc(doc);
}
