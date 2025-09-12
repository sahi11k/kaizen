import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

const MoreOptions = ({
  triggerClassName,
  contentClassName,
  align = "end",
  items = [],
}) => {
  const menuItems = items.map((item) => (
    <DropdownMenuItem
      key={item.label}
      className={cn(item.className, "cursor-pointer")}
      onClick={item.onClick}
    >
      {item.label}
    </DropdownMenuItem>
  ));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          icon={<Ellipsis className="size-5" />}
          className={cn(triggerClassName, "w-auto lg:w-0")}
          variant="icon"
          aria-label="More options"
          onClick={(e) => e.stopPropagation()}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(contentClassName, "border-border")}
        align={align}
      >
        {menuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { MoreOptions };
