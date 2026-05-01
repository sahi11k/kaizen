import { ReactNodeViewRenderer } from "@tiptap/react"
import { Image } from "@tiptap/extension-image"

import { ImageNode as ImageNodeComponent } from "@/shared/ui/tiptap-editor/tiptap-node/image-node/image-node"

export const ImageNode = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeComponent)
  },
})

export default ImageNode
