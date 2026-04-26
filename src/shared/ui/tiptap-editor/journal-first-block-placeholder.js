import { Extension, isNodeEmpty } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { Decoration, DecorationSet } from "@tiptap/pm/view"

/**
 * @param {import("@tiptap/pm/model").Node} doc
 * @returns {{ pos: number; node: import("@tiptap/pm/model").Node; end: number } | null}
 */
function findFirstTextBlock(doc) {
  let found = null
  doc.descendants((node, pos) => {
    if (!node.type.isTextblock) return true
    found = { pos, node, end: pos + node.nodeSize }
    return false
  })
  return found
}

/** Like an empty input: only the initial single empty block counts as “no content”. */
function countTextBlocks(doc) {
  let n = 0
  doc.descendants((node) => {
    if (node.type.isTextblock) n += 1
  })
  return n
}

/**
 * Placeholder only when the doc is still “blank”: one text block, no text (input-style).
 * After Enter there are two blocks → no placeholder, even if both are empty.
 */
export const JournalFirstBlockPlaceholder = Extension.create({
  name: "journalFirstBlockPlaceholder",

  addOptions() {
    return {
      placeholder: "",
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("journalFirstBlockPlaceholder"),
        props: {
          decorations: ({ doc }) => {
            if (!this.editor.isEditable) return null

            const hit = findFirstTextBlock(doc)
            if (!hit || !isNodeEmpty(hit.node)) return null
            if (countTextBlocks(doc) !== 1) return null

            const isEmptyDoc = this.editor.isEmpty
            const classes = ["is-empty"]
            if (isEmptyDoc) classes.push("is-editor-empty")

            const deco = Decoration.node(hit.pos, hit.end, {
              class: classes.join(" "),
              "data-placeholder": this.options.placeholder,
            })

            return DecorationSet.create(doc, [deco])
          },
        },
      }),
    ]
  },
})
