import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import React from "react";

const TaskMoreOptions = ({ onEdit, onDelete, className }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          icon={<Ellipsis className="size-5" />}
          className={cn(className, "!p-0 data-[state=open]:opacity-100")}
          variant="icon"
          aria-label="More options"
          onClick={(e) => e.stopPropagation()}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-border" align="end">
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
