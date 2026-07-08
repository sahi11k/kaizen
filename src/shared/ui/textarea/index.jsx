import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "text-foreground placeholder:text-muted-foreground selection:bg-border selection:text-foreground border-border flex w-full min-w-0 rounded-lg border bg-transparent px-3 py-2 text-sm transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 xl:text-base xl:px-4 xl:py-2",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "min-h-16 resize-y",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
