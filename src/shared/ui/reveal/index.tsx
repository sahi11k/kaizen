import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import useRevealOnScroll from "@/shared/hooks/useRevealOnScroll";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}

export const Reveal = ({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) => {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6",
        className,
      )}
    >
      {children}
    </Tag>
  );
};
