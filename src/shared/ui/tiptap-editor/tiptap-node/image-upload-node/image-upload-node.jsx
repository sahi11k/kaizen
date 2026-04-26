"use client";
import { useRef, useState } from "react"
import { NodeViewWrapper } from "@tiptap/react"
import { Button } from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/button"
import CloseIcon from "@/assets/icons/close-icon.svg?react"
import CloudUploadIcon from "@/assets/icons/cloud-upload-icon.svg?react"
import ImageUploadFileIcon from "@/assets/icons/image-upload-file-icon.svg?react"
import ImageUploadFileCornerIcon from "@/assets/icons/image-upload-file-corner-icon.svg?react"
import "@/shared/ui/tiptap-editor/tiptap-node/image-upload-node/image-upload-node.scss"
import { focusNextNode, isValidPosition } from "@/shared/ui/tiptap-editor/lib/tiptap-utils"

/**
 * Custom hook for managing multiple file uploads with progress tracking and cancellation
 */
function useFileUpload(options) {
  const [fileItems, setFileItems] = useState([])

  const uploadFile = async file => {
    if (file.size > options.maxSize) {
      const error = new Error(`File size exceeds maximum allowed (${options.maxSize / 1024 / 1024}MB)`)
      options.onError?.(error)
      return null
    }

    const abortController = new AbortController()
    const fileId = crypto.randomUUID()

    const newFileItem = {
      id: fileId,
      file,
      progress: 0,
      status: "uploading",
      abortController,
    }

    setFileItems((prev) => [...prev, newFileItem])

    try {
      if (!options.upload) {
        throw new Error("Upload function is not defined")
      }

      const url = await options.upload(file, (event) => {
        setFileItems((prev) =>
          prev.map((item) =>
            item.id === fileId ? { ...item, progress: event.progress } : item))
      }, abortController.signal)

      if (!url) throw new Error("Upload failed: No URL returned")

      if (!abortController.signal.aborted) {
        setFileItems((prev) =>
          prev.map((item) =>
            item.id === fileId
              ? { ...item, status: "success", url, progress: 100 }
              : item))
        options.onSuccess?.(url)
        return url
      }

      return null
    } catch (error) {
      if (!abortController.signal.aborted) {
        setFileItems((prev) =>
          prev.map((item) =>
            item.id === fileId
              ? { ...item, status: "error", progress: 0 }
              : item))
        options.onError?.(error instanceof Error ? error : new Error("Upload failed"))
      }
      return null
    }
  }

  const uploadFiles = async files => {
    if (!files || files.length === 0) {
      options.onError?.(new Error("No files to upload"))
      return []
    }

    if (options.limit && files.length > options.limit) {
      options.onError?.(
        new Error(`Maximum ${options.limit} file${options.limit === 1 ? "" : "s"} allowed`)
      )
      return []
    }

    // Upload all files concurrently
    const uploadPromises = files.map((file) => uploadFile(file))
    const results = await Promise.all(uploadPromises)

    // Filter out null results (failed uploads)
    return results.filter(url => url !== null);
  }

  const removeFileItem = (fileId) => {
    setFileItems((prev) => {
      const fileToRemove = prev.find((item) => item.id === fileId)
      if (fileToRemove?.abortController) {
        fileToRemove.abortController.abort()
      }
      if (fileToRemove?.url) {
        URL.revokeObjectURL(fileToRemove.url)
      }
      return prev.filter((item) => item.id !== fileId);
    })
  }

  const clearAllFiles = () => {
    fileItems.forEach((item) => {
      if (item.abortController) {
        item.abortController.abort()
      }
      if (item.url) {
        URL.revokeObjectURL(item.url)
      }
    })
    setFileItems([])
  }

  return {
    fileItems,
    uploadFiles,
    removeFileItem,
    clearAllFiles,
  }
}

/**
 * A component that creates a drag-and-drop area for image uploads
 */
const ImageUploadDragArea = ({
  onFile,
  children,
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragActive(false)
      setIsDragOver(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      onFile(files)
    }
  }

  return (
    <div
      className={`tiptap-image-upload-drag-area ${isDragActive ? "drag-active" : ""} ${isDragOver ? "drag-over" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      {children}
    </div>
  );
}

/**
 * Component that displays a preview of an uploading file with progress
 */
const ImageUploadPreview = ({
  fileItem,
  onRemove,
}) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  return (
    <div className="tiptap-image-upload-preview">
      {fileItem.status === "uploading" && (
        <div
          className="tiptap-image-upload-progress"
          style={{ width: `${fileItem.progress}%` }} />
      )}
      <div className="tiptap-image-upload-preview-content">
        <div className="tiptap-image-upload-file-info">
          <div className="tiptap-image-upload-file-icon">
            <CloudUploadIcon className="tiptap-image-upload-icon" />
          </div>
          <div className="tiptap-image-upload-details">
            <span className="tiptap-image-upload-text">
              {fileItem.file.name}
            </span>
            <span className="tiptap-image-upload-subtext">
              {formatFileSize(fileItem.file.size)}
            </span>
          </div>
        </div>
        <div className="tiptap-image-upload-actions">
          {fileItem.status === "uploading" && (
            <span className="tiptap-image-upload-progress-text">
              {fileItem.progress}%
            </span>
          )}
          <Button
            type="button"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}>
            <CloseIcon className="tiptap-button-icon" />
          </Button>
        </div>
      </div>
    </div>
  );
}

const DropZoneContent = ({
  maxSize,
  limit,
}) => (
  <>
    <div className="tiptap-image-upload-dropzone">
      <ImageUploadFileIcon className="tiptap-image-upload-dropzone-rect-primary" />
      <ImageUploadFileCornerIcon className="tiptap-image-upload-dropzone-rect-secondary" />
      <div className="tiptap-image-upload-icon-container">
        <CloudUploadIcon className="tiptap-image-upload-icon" />
      </div>
    </div>

    <div className="tiptap-image-upload-content">
      <span className="tiptap-image-upload-text">
        <em>Click to upload</em> or drag and drop
      </span>
      <span className="tiptap-image-upload-subtext">
        Maximum {limit} file{limit === 1 ? "" : "s"}, {maxSize / 1024 / 1024}MB
        each.
      </span>
    </div>
  </>
)

export const ImageUploadNode = (props) => {
  const { accept, limit, maxSize } = props.node.attrs
  const inputRef = useRef(null)
  const extension = props.extension

  const uploadOptions = {
    maxSize,
    limit,
    accept,
    upload: extension.options.upload,
    onSuccess: extension.options.onSuccess,
    onError: extension.options.onError,
  }

  const { fileItems, uploadFiles, removeFileItem, clearAllFiles } =
    useFileUpload(uploadOptions)

  const handleUpload = async (files) => {
    const urls = await uploadFiles(files)

    if (urls.length > 0) {
      const pos = props.getPos()

      if (isValidPosition(pos)) {
        const imageNodes = urls.map((url, index) => {
          const filename =
            files[index]?.name.replace(/\.[^/.]+$/, "") || "unknown"
          return {
            type: extension.options.type,
            attrs: {
              ...extension.options,
              src: url,
              alt: filename,
              title: filename,
            },
          }
        })

        props.editor
          .chain()
          .focus()
          .deleteRange({ from: pos, to: pos + props.node.nodeSize })
          .insertContentAt(pos, imageNodes)
          .run()

        focusNextNode(props.editor)
      }
    }
  }

  const handleChange = (e) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      extension.options.onError?.(new Error("No file selected"))
      return
    }
    handleUpload(Array.from(files))
  }

  const handleClick = () => {
    if (inputRef.current && fileItems.length === 0) {
      inputRef.current.value = ""
      inputRef.current.click()
    }
  }

  const hasFiles = fileItems.length > 0

  return (
    <NodeViewWrapper className="tiptap-image-upload" tabIndex={0} onClick={handleClick}>
      {!hasFiles && (
        <ImageUploadDragArea onFile={handleUpload}>
          <DropZoneContent maxSize={maxSize} limit={limit} />
        </ImageUploadDragArea>
      )}
      {hasFiles && (
        <div className="tiptap-image-upload-previews">
          {fileItems.length > 1 && (
            <div className="tiptap-image-upload-header">
              <span>Uploading {fileItems.length} files</span>
              <Button
                type="button"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  clearAllFiles()
                }}>
                Clear All
              </Button>
            </div>
          )}
          {fileItems.map((fileItem) => (
            <ImageUploadPreview
              key={fileItem.id}
              fileItem={fileItem}
              onRemove={() => removeFileItem(fileItem.id)} />
          ))}
        </div>
      )}
      <input
        ref={inputRef}
        name="file"
        accept={accept}
        type="file"
        multiple={limit > 1}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()} />
    </NodeViewWrapper>
  );
}
