import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import React from "react";

const TaskMoreOptions = ({ onEdit, onDelete, className }) => {
  return (
    <DropdownMenu>
      <Tooltip content="More options">
        <DropdownMenuTrigger asChild>
          <Button
            icon={<EllipsisVertical className="size-5" />}
            className={cn(className, "!p-0 ")}
            variant="icon"
          />
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent className="border-border" side="bottom" align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:!bg-destructive/10 !text-destructive"
          onClick={onDelete}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskMoreOptions;
