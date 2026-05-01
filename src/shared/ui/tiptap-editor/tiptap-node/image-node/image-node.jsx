"use client";

import { NodeViewWrapper } from "@tiptap/react"

import CloseIcon from "@/assets/icons/close-icon.svg?react"
import { Button } from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/button"
import { focusNextNode, isValidPosition } from "@/shared/ui/tiptap-editor/lib/tiptap-utils"

export const ImageNode = (props) => {
  const { src, alt, title } = props.node.attrs

  const handleRemove = (e) => {
    e.stopPropagation()
    e.preventDefault()

    const pos = props.getPos()

    if (!isValidPosition(pos)) return

    props.editor
      .chain()
      .focus()
      .deleteRange({ from: pos, to: pos + props.node.nodeSize })
      .run()

    focusNextNode(props.editor)
  }

  return (
    <NodeViewWrapper
      as="figure"
      className={`tiptap-image-node ${props.selected ? "is-selected" : ""}`}>
      <img src={src} alt={alt || ""} title={title || undefined} draggable="true" />
      <Button
        type="button"
        variant="ghost"
        size="small"
        className="tiptap-image-node-remove"
        aria-label="Remove image"
        tooltip="Remove image"
        onClick={handleRemove}>
        <CloseIcon className="tiptap-button-icon" />
      </Button>
    </NodeViewWrapper>
  )
}
