import React from "react";
import { Loader2 } from "lucide-react";

const Fallback = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loader2 className="size-10 animate-spin" />
    </div>
  );
};

export { Fallback };
