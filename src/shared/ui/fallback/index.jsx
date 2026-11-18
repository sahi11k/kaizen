import React from "react";
import LogoIcon from "@/assets/icons/logo.svg?react";
import "./fallback.css";

const Fallback = () => {
  return (
    <div className="h-full w-full min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <span className="relative inline-block w-10 h-10">
        <LogoIcon className="absolute inset-0 w-10 h-10 text-subtle-foreground fill-current" />
        <LogoIcon className="absolute inset-0 w-10 h-10 text-primary fill-current animate-fill-sweep" />
      </span>
      <p className="text-sm text-subtle-foreground">Getting things ready</p>
    </div>
  );
};

export { Fallback };
