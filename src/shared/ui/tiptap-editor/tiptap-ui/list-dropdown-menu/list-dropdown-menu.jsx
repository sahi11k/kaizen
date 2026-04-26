import { useCallback, useState } from "react"

// --- Hooks ---
import { useTiptapEditor } from "@/shared/ui/tiptap-editor/hooks/use-tiptap-editor"

// --- Icons ---
import ChevronDownIcon from "@/assets/icons/chevron-down-icon.svg?react"

// --- Tiptap UI ---
import { ListButton } from "@/shared/ui/tiptap-editor/tiptap-ui/list-button";

import { useListDropdownMenu } from "@/shared/ui/tiptap-editor/tiptap-ui/list-dropdown-menu/use-list-dropdown-menu"

import { Button } from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/shared/ui/tiptap-editor/tiptap-ui-primitive/dropdown-menu"

export function ListDropdownMenu({
  editor: providedEditor,
  types = ["bulletList", "orderedList", "taskList"],
  hideWhenUnavailable = false,
  onOpenChange,
  modal = true,
  ...props
}) {
  const { editor } = useTiptapEditor(providedEditor)
  const [isOpen, setIsOpen] = useState(false)

  const { filteredLists, canToggle, isActive, isVisible, Icon } =
    useListDropdownMenu({
      editor,
      types,
      hideWhenUnavailable,
    })

  const handleOnOpenChange = useCallback((open) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }, [onOpenChange])

  if (!isVisible) {
    return null
  }

  return (
    <DropdownMenu modal={modal} open={isOpen} onOpenChange={handleOnOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          data-active-state={isActive ? "on" : "off"}
          role="button"
          tabIndex={-1}
          disabled={!canToggle}
          data-disabled={!canToggle}
          aria-label="List options"
          tooltip="List"
          {...props}>
          <Icon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          {filteredLists.map((option) => (
            <DropdownMenuItem key={option.type} asChild>
              <ListButton
                editor={editor}
                type={option.type}
                text={option.label}
                showTooltip={false} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ListDropdownMenu
